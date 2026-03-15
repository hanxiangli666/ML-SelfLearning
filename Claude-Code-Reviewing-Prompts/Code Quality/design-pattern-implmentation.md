Review the codebase for design pattern usage.
审查代码库中设计模式的使用情况。

Identify and evaluate:
识别并评估：

1. CREATIONAL PATTERNS / 创建型模式
   - Singleton usage (database connections, logger) / 单例模式使用（数据库连接、日志记录器）
   - Factory pattern (object creation) / 工厂模式（对象创建）
   - Builder pattern (complex object construction) / 建造者模式（复杂对象构建）
   - Are they implemented correctly? / 它们是否正确实现？

2. STRUCTURAL PATTERNS / 结构型模式
   - Adapter pattern (third-party integrations) / 适配器模式（第三方集成）
   - Facade pattern (simplified interfaces) / 外观模式（简化接口）
   - Decorator pattern (middleware) / 装饰器模式（中间件）
   - Proxy pattern (caching, lazy loading) / 代理模式（缓存、懒加载）

3. BEHAVIORAL PATTERNS / 行为型模式
   - Strategy pattern (payment processing, auth methods) / 策略模式（支付处理、认证方式）
   - Observer pattern (event handling) / 观察者模式（事件处理）
   - Chain of responsibility (middleware chain) / 责任链模式（中间件链）
   - Command pattern (task queuing) / 命令模式（任务队列）

4. DOMAIN PATTERNS / 领域模式
   - Repository pattern (data access) / 仓储模式（数据访问）
   - Service layer pattern / 服务层模式
   - DTO/Value objects / DTO/值对象
   - Domain model pattern / 领域模型模式

For each pattern found:
对于每种发现的模式：
- Is it appropriate for the use case? / 它是否适合该使用场景？
- Is it implemented correctly? / 它是否正确实现？
- Could a simpler solution work? / 是否有更简单的解决方案？
- Are there missing patterns that would improve the code? / 是否有缺失的模式可以改善代码？

Recommend pattern improvements with code examples.
提供带代码示例的模式改进建议。

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
