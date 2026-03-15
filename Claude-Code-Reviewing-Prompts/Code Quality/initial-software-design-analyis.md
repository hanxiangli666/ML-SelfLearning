Initial Software Design Analysis:
初始软件设计分析：

Analyze the project architecture and identify:
分析项目架构并识别：

Evaluate:
评估：
1. Is there clear separation of concerns? / 是否有清晰的关注点分离？
2. Which architectural pattern is used (MVC, Layered, Microservices)? / 使用了哪种架构模式（MVC、分层、微服务）？
3. Are there any God objects or modules doing too much? / 是否存在上帝对象或职责过重的模块？
4. Is the dependency flow clean (no circular dependencies)? / 依赖流是否干净（无循环依赖）？
5. Rate the modularity (1-10) with justification / 对模块化程度评分（1-10）并说明理由

Create an architecture diagram showing:
创建架构图，展示：
- Layer dependencies / 层级依赖关系
- Data flow / 数据流
- External service integrations / 外部服务集成
- Potential bottlenecks / 潜在瓶颈

Identify anti-patterns:
识别反模式：
- Spaghetti code / 意大利面条式代码
- Copy-paste programming / 复制粘贴式编程
- God classes/modules / 上帝类/模块
- Tight coupling / 紧耦合
- Missing abstractions / 缺失的抽象

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
