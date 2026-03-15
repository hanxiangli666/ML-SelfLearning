Evaluate system resilience:
评估系统弹性：

Check for:
检查以下内容：

1. TIMEOUT HANDLING / 超时处理
   - HTTP request timeouts / HTTP 请求超时
   - Database query timeouts / 数据库查询超时
   - Long-running operation limits / 长时间运行操作限制

2. RETRY LOGIC / 重试逻辑
   - Exponential backoff / 指数退避
   - Maximum retry limits / 最大重试次数限制
   - Idempotency considerations / 幂等性考虑

3. CIRCUIT BREAKER PATTERN / 断路器模式
   - Service failure detection / 服务故障检测
   - Fallback mechanisms / 降级机制
   - Recovery testing / 恢复测试

4. BULKHEAD PATTERN / 舱壁模式
   - Resource isolation / 资源隔离
   - Thread pool separation / 线程池分离
   - Connection pool limits / 连接池限制

5. GRACEFUL DEGRADATION / 优雅降级
   - Feature flags / 功能开关
   - Fallback data sources / 备用数据源
   - Cached responses / 缓存响应
   - Default values / 默认值

Rate resilience (1-10) with improvement recommendations.
对弹性评分（1-10）并提供改进建议。

## Provide: / 提供：

A structured finding report
结构化的发现报告

A scale of 1/10 on how important each finding is
每项发现的重要性评分（1-10）

Remediation: precise code-level fix or config change (snippets welcome) if possible
修复建议：如可能，提供精确的代码级修复或配置更改（欢迎提供代码片段）

## Constraints & style: / 约束与风格：

Be concrete and cite exact code locations and identifiers.
具体说明并引用确切的代码位置和标识符。

Prefer minimal, drop-in fix snippets over prose.
优先提供简洁的即插即用修复片段，而非大段说明。

Do not invent files or functions that aren't present; if context is missing, mark as Unable to verify and say what code would prove it.
不要虚构不存在的文件或函数；如缺少上下文，标记为"无法验证"并说明需要什么代码来证明。

Write this into a markdown file and place it in the audits/ folder.
将结果写入 markdown 文件并放置在 audits/ 文件夹中。
