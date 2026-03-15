Trace error flow through the application:
追踪应用程序中的错误流转：

Critical paths to analyze:
需要分析的关键路径：
1. Database connection failure / 数据库连接失败
2. Third-party API timeout / 第三方 API 超时
3. Invalid user input / 无效用户输入
4. Authentication failure / 认证失败
5. File system errors / 文件系统错误

For each path, verify:
对于每条路径，验证：
- Where is the error caught? / 错误在哪里被捕获？
- How is it transformed? / 如何进行转换？
- What gets logged? / 记录了什么日志？
- What does the user see? / 用户看到什么？
- Is the system state consistent? / 系统状态是否一致？

Create an error flow diagram showing:
创建错误流转图，展示：
- Error origin points / 错误起源点
- Transformation layers / 转换层
- Final handling points / 最终处理点
- Recovery mechanisms / 恢复机制

Anti-patterns to identify:
需要识别的反模式：
- Swallowed exceptions (empty catch blocks) / 被吞噬的异常（空 catch 块）
- Generic catch-all handlers hiding specific errors / 通用捕获处理器掩盖具体错误
- Errors used for flow control / 将错误用于流程控制
- Missing error boundaries / 缺失的错误边界
- Inconsistent error formats / 不一致的错误格式

Provide a standardized error handling template.
提供标准化的错误处理模板。

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
