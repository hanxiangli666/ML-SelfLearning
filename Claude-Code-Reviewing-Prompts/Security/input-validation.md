## Input Validation
## 输入验证

Review all input validation across the application.
审查应用程序中的所有输入验证。

Check for:
检查以下内容：

1. SQL Injection vulnerabilities
   SQL 注入漏洞
   - Raw SQL queries without parameterization
     未使用参数化的原始 SQL 查询
   - Dynamic query building
     动态查询构建
   - Stored procedure calls
     存储过程调用

2. NoSQL Injection (if using MongoDB)
   NoSQL 注入（如使用 MongoDB）
   - Unvalidated query operators ($where, $ne, $gt)
     未经验证的查询操作符（$where、$ne、$gt）
   - JavaScript execution in queries
     查询中的 JavaScript 执行

3. Command Injection
   命令注入
   - Child process spawning
     子进程生成
   - System command execution
     系统命令执行

4. XSS Prevention
   XSS 防护
   - Input sanitization
     输入净化
   - Output encoding
     输出编码
   - Content-Type headers
     Content-Type 头部

5. XXE (XML External Entity) attacks
   XXE（XML 外部实体）攻击
   - XML parsing configuration
     XML 解析配置
   - File upload handling
     文件上传处理

6. Path Traversal
   路径遍历
   - File system operations
     文件系统操作
   - Directory listing prevention
     目录列举防护

7. Request validation
   请求验证
   - Body size limits
     请求体大小限制
   - Parameter pollution
     参数污染
   - Type checking
     类型检查
   - Required field validation
     必填字段验证

Create a validation matrix showing each endpoint and its validation status.
创建验证矩阵，显示每个端点及其验证状态。

## Provide:
## 输出要求：

A structured finding report with the following for each issue:
针对每个问题，提供结构化发现报告，包含：

Title, Severity (Critical/High/Medium/Low), CWE (if applicable), Evidence (file, function, line ranges), and a short Why it matters.
标题、严重级别（严重/高/中/低）、CWE 编号（如适用）、证据（文件、函数、行范围），以及简短的危害说明。

Exploitability notes and, where safe, a minimal PoC or reproduction steps (no real secrets).
可利用性说明，以及在安全前提下的最小化 PoC 或复现步骤（不含真实密钥）。

Remediation: precise code-level fix or config change (snippets welcome), plus defense-in-depth guidance.
修复建议：精确的代码级修复或配置变更（欢迎提供代码片段），以及纵深防御指导。

A summary risk score (0–10) and top 3–5 prioritized fixes that reduce risk fastest.
综合风险评分（0–10），以及能最快降低风险的前 3–5 项优先修复项。

A checklist diff: which items from the "Check for" list are Pass/Fail/Not Applicable.
检查清单对比：标注"检查内容"列表中各项的通过/失败/不适用状态。

## Constraints & style:
## 约束与风格：

Be concrete and cite exact code locations and identifiers.
具体引用精确的代码位置和标识符。

Prefer minimal, drop-in fix snippets over prose.
优先提供最简可直接替换的代码片段，而非长篇描述。

Do not invent files or functions that aren't present; if context is missing, mark as Unable to verify and say what code would prove it.
不要编造不存在的文件或函数；如缺少上下文，标记为"无法验证"并说明需要什么代码来证明。

Write this into a markdown file and place it in the audits/ folder.
将结果写入 markdown 文件并放置在 audits/ 文件夹中。
