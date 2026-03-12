#!/usr/bin/env node

// Weather MCP server entry file.
// 天气 MCP 服务入口文件。

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fetch from 'node-fetch';

// Base endpoint for the Open-Meteo forecast API.
// Open-Meteo 预报 API 的基础地址。
const WEATHER_API_BASE = 'https://api.open-meteo.com/v1/forecast';

// MCP tool registry exposed to clients.
// Each tool describes its name, purpose, and JSON input schema.
// 暴露给 MCP 客户端的工具注册表。
// 每个工具都定义了名称、用途和 JSON 输入结构。
const tools = [
  {
    name: 'get_current_weather',
    description: 'Get current weather data for a specific location',
    inputSchema: {
      type: 'object',
      properties: {
        latitude: {
          type: 'number',
          description: 'Latitude of the location'
        },
        longitude: {
          type: 'number',
          description: 'Longitude of the location'
        }
      },
      required: ['latitude', 'longitude']
    }
  },
  {
    name: 'get_weather_forecast',
    description: 'Get hourly weather forecast for a specific location',
    inputSchema: {
      type: 'object',
      properties: {
        latitude: {
          type: 'number',
          description: 'Latitude of the location'
        },
        longitude: {
          type: 'number',
          description: 'Longitude of the location'
        },
        days: {
          type: 'number',
          description: 'Number of days to forecast (default: 7)',
          default: 7
        }
      },
      required: ['latitude', 'longitude']
    }
  },
  {
    name: 'get_weather_summary',
    description: 'Get a summary of current weather and today\'s forecast for a location',
    inputSchema: {
      type: 'object',
      properties: {
        latitude: {
          type: 'number',
          description: 'Latitude of the location'
        },
        longitude: {
          type: 'number',
          description: 'Longitude of the location'
        }
      },
      required: ['latitude', 'longitude']
    }
  }
];

// Create the MCP server instance and advertise tool capability.
// 创建 MCP 服务实例，并声明支持 tools 能力。
const server = new Server({
  name: 'weather-mcp-server',
  version: '1.0.0',
}, {
  capabilities: {
    tools: {}
  }
});

// Handle "tools/list" requests.
// Return all tool metadata so clients know what can be called.
// 处理 "tools/list" 请求。
// 返回所有工具元数据，让客户端知道可调用的能力。
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools
  };
});

// Handle "tools/call" requests.
// Route to the correct tool based on request.params.name.
// 处理 "tools/call" 请求。
// 根据 request.params.name 路由到对应工具。
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  // MCP tool call payload: { name, arguments }
  // MCP 工具调用载荷：{ name, arguments }
  const { name, arguments: args } = request.params;

  // Switch by tool name to keep logic clear and explicit.
  // 按工具名分发，逻辑清晰且便于扩展。
  switch (name) {
    case 'get_current_weather': {
      const { latitude, longitude } = args;
      
      // Guard clause for required coordinates.
      // 必填经纬度参数校验。
      if (!latitude || !longitude) {
        throw new Error('Latitude and longitude are required');
      }

      // Request current weather fields for the target location.
      // 请求目标位置的实时天气字段。
      const url = `${WEATHER_API_BASE}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code`;
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Normalize non-2xx responses into readable errors.
        // 将非 2xx 响应统一转换为可读错误。
        if (!response.ok) {
          throw new Error(`Weather API error: ${data.error || response.statusText}`);
        }

        // MCP tool response requires a content array.
        // MCP 工具返回值需要 content 数组。
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data.current, null, 2)
            }
          ]
        };
      } catch (error) {
        // Wrap lower-level errors with tool-specific context.
        // 对底层异常进行封装，提供工具级上下文信息。
        throw new Error(`Failed to fetch weather data: ${error.message}`);
      }
    }

    case 'get_weather_forecast': {
      const { latitude, longitude, days = 7 } = args;
      
      // Validate required coordinates before calling upstream API.
      // 调用上游 API 前，先校验必填经纬度参数。
      if (!latitude || !longitude) {
        throw new Error('Latitude and longitude are required');
      }

      // Request hourly forecast fields for N days.
      // 请求 N 天的逐小时预报字段。
      const url = `${WEATHER_API_BASE}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&forecast_days=${days}`;
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Surface API-side failures with as much detail as possible.
        // 尽可能携带详细信息抛出 API 侧错误。
        if (!response.ok) {
          throw new Error(`Weather API error: ${data.error || response.statusText}`);
        }

        // Return only hourly payload to keep output focused.
        // 仅返回 hourly 数据，保证输出聚焦。
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data.hourly, null, 2)
            }
          ]
        };
      } catch (error) {
        // Attach contextual message for easier debugging in clients.
        // 附加上下文信息，便于客户端排查问题。
        throw new Error(`Failed to fetch weather forecast: ${error.message}`);
      }
    }

    case 'get_weather_summary': {
      const { latitude, longitude } = args;
      
      // Validate required coordinates.
      // 校验必填经纬度参数。
      if (!latitude || !longitude) {
        throw new Error('Latitude and longitude are required');
      }

      // Request both current conditions and one-day hourly temperatures
      // so we can compute today's min/max summary.
      // 同时请求当前天气和 1 天逐小时温度，
      // 以便计算今日最高/最低温摘要。
      const url = `${WEATHER_API_BASE}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code&hourly=temperature_2m&forecast_days=1`;
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Handle upstream API errors consistently.
        // 统一处理上游 API 错误。
        if (!response.ok) {
          throw new Error(`Weather API error: ${data.error || response.statusText}`);
        }

        const current = data.current;
        const hourly = data.hourly;
        
        // Calculate today's temperature range from first 24 hourly entries.
        // 从前 24 个小时温数据计算今日温度区间。
        const todayTemps = hourly.temperature_2m.slice(0, 24);
        const minTemp = Math.min(...todayTemps);
        const maxTemp = Math.max(...todayTemps);

        // Build a compact summary structure for chat-style consumption.
        // 构建紧凑摘要结构，适合聊天场景直接展示。
        const summary = {
          current: {
            temperature: `${current.temperature_2m}°C`,
            wind_speed: `${current.wind_speed_10m} km/h`,
            humidity: `${current.relative_humidity_2m}%`,
            weather_code: current.weather_code
          },
          today: {
            min_temperature: `${minTemp}°C`,
            max_temperature: `${maxTemp}°C`
          },
          location: {
            latitude: data.latitude,
            longitude: data.longitude,
            timezone: data.timezone
          }
        };

        // Return summary as formatted JSON text.
        // 以格式化 JSON 文本返回摘要结果。
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(summary, null, 2)
            }
          ]
        };
      } catch (error) {
        // Provide explicit failure context for this tool.
        // 提供该工具的明确失败上下文。
        throw new Error(`Failed to fetch weather summary: ${error.message}`);
      }
    }

    default:
      // Defensive fallback for unknown tool names.
      // 未知工具名的兜底防御。
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Start MCP stdio transport and connect server.
// 启动 MCP 的 stdio 传输并连接服务。
const transport = new StdioServerTransport();
await server.connect(transport);

// Log to stderr to avoid interfering with MCP JSON-RPC on stdout.
// 输出到 stderr，避免污染 stdout 上的 MCP JSON-RPC 消息。
console.error('Weather MCP server started'); 