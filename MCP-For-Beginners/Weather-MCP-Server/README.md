# Weather MCP Server

A Model Context Protocol (MCP) server that provides weather data using the Open-Meteo API. This server allows AI assistants to retrieve current weather conditions and forecasts for any location on Earth.

这是一个基于 Model Context Protocol (MCP) 的天气服务端，使用 Open-Meteo API 提供天气数据。它让 AI 助手能够查询全球任意位置的实时天气和天气预报。

## Features

- **Current Weather**: Get real-time temperature, wind speed, humidity, and weather conditions.
- **Weather Forecast**: Retrieve hourly forecasts for up to 7 days.
- **Weather Summary**: Get a comprehensive summary including current conditions and daily min/max temperatures.
- **Global Coverage**: Works with any latitude/longitude coordinates worldwide.
- **No API Key Required**: Uses the free Open-Meteo API.

- **实时天气**：获取实时温度、风速、湿度和天气状况。
- **天气预报**：获取最长 7 天的逐小时预报。
- **天气摘要**：返回当前天气和当日最高/最低温度的综合信息。
- **全球覆盖**：支持全球任意经纬度坐标。
- **无需 API Key**：使用免费的 Open-Meteo API。

## Installation

1. Clone or download this repository.
2. Install dependencies:

1. 克隆或下载本仓库。
2. 安装依赖：

```bash
npm install
```

## Usage

### Running the Server

Start the MCP server:

启动 MCP 服务：

```bash
npm start
```

For development with auto-restart:

开发模式（自动重启）：

```bash
npm run dev
```

### Available Tools

The server provides three main tools:

该服务提供三个主要工具：

#### 1. `get_current_weather`

Get current weather data for a specific location.

获取指定位置的实时天气数据。

**Parameters:**
- `latitude` (number): Latitude of the location
- `longitude` (number): Longitude of the location

**参数：**
- `latitude` (number)：位置纬度
- `longitude` (number)：位置经度

**Example / 示例：**

```json
{
  "name": "get_current_weather",
  "arguments": {
    "latitude": 52.52,
    "longitude": 13.41
  }
}
```

#### 2. `get_weather_forecast`

Get hourly weather forecast for a specific location.

获取指定位置的逐小时天气预报。

**Parameters:**
- `latitude` (number): Latitude of the location
- `longitude` (number): Longitude of the location
- `days` (number, optional): Number of days to forecast (default: 7)

**参数：**
- `latitude` (number)：位置纬度
- `longitude` (number)：位置经度
- `days` (number，可选)：预报天数（默认：7）

**Example / 示例：**

```json
{
  "name": "get_weather_forecast",
  "arguments": {
    "latitude": 52.52,
    "longitude": 13.41,
    "days": 3
  }
}
```

#### 3. `get_weather_summary`

Get a summary of current weather and today's forecast for a location.

获取某个位置的当前天气与今日预报摘要。

**Parameters:**
- `latitude` (number): Latitude of the location
- `longitude` (number): Longitude of the location

**参数：**
- `latitude` (number)：位置纬度
- `longitude` (number)：位置经度

**Example / 示例：**

```json
{
  "name": "get_weather_summary",
  "arguments": {
    "latitude": 52.52,
    "longitude": 13.41
  }
}
```

## API Reference

This server uses the [Open-Meteo API](https://open-meteo.com/), which provides:

本服务使用 [Open-Meteo API](https://open-meteo.com/)，可提供：

- **Temperature**: 2-meter temperature in Celsius
- **Wind Speed**: 10-meter wind speed in km/h
- **Humidity**: Relative humidity percentage
- **Weather Codes**: WMO weather codes for conditions

- **温度**：2 米高度气温（摄氏度）
- **风速**：10 米高度风速（km/h）
- **湿度**：相对湿度百分比
- **天气代码**：基于 WMO 标准天气代码

### Weather Codes

- 0: Clear sky
- 1-3: Partly cloudy
- 45, 48: Foggy
- 51-55: Drizzle
- 61-65: Rain
- 71-75: Snow
- 95: Thunderstorm

### 天气代码

- 0：晴天
- 1-3：局部多云
- 45, 48：有雾
- 51-55：毛毛雨
- 61-65：降雨
- 71-75：降雪
- 95：雷暴

## Configuration

The server is configured to use the Open-Meteo API base URL: `https://api.open-meteo.com/v1/forecast`

服务默认使用 Open-Meteo API 基础地址：`https://api.open-meteo.com/v1/forecast`

No API key is required as Open-Meteo is a free service.

由于 Open-Meteo 是免费服务，因此无需 API Key。

## Error Handling

The server includes comprehensive error handling for:

服务内置了完善的错误处理，覆盖：

- Missing required parameters
- Invalid API responses
- Network connectivity issues
- API rate limiting

- 缺少必要参数
- API 响应无效
- 网络连接问题
- API 频率限制

## Development

To modify the server:

如需修改服务：

1. Edit `server.js` to add new tools or modify existing ones.
2. Update the tool schemas in the `tools/list` handler.
3. Test your changes with `npm run dev`.

1. 编辑 `server.js`，新增工具或修改现有工具。
2. 更新 `tools/list` 处理器中的工具 schema。
3. 使用 `npm run dev` 测试你的改动。

## License

MIT License - feel free to use and modify as needed.

MIT 许可证，可自由使用和修改。

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

欢迎贡献！你可以随时提交 issue 和 pull request。