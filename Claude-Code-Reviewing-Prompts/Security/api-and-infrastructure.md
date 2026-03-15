## API & Infrastructure Security
## API 与基础设施安全

Review API-specific security configurations.
审查 API 专项安全配置。


Check for:
检查以下内容：

1. CORS configuration
   CORS 配置
   - Not using wildcard (*) in production
     生产环境不使用通配符 (*)
   - Proper origin validation
     正确的来源验证
   - Credentials handling
     凭据处理

2. Rate Limiting
   速率限制
   - Implemented on all endpoints
     所有端点均已实施
   - Different limits for different operations
     不同操作设置不同限制
   - Distributed rate limiting for scaled apps
     分布式应用使用分布式速率限制

3. API Versioning security
   API 版本安全
   - Deprecated version handling
     已废弃版本的处理
   - Breaking change management
     破坏性变更管理

4. Request size limits
   请求大小限制
   - Body parser limits
     请求体解析限制
   - File upload restrictions
     文件上传限制
   - JSON depth limits
     JSON 深度限制

5. HTTP Security Headers
   HTTP 安全头
   - Helmet.js configuration
     Helmet.js 配置
   - CSP headers
     CSP 头部
   - X-Frame-Options
   - X-Content-Type-Options
   - Strict-Transport-Security

6. API key/token management
   API 密钥/令牌管理
   - Secure storage
     安全存储
   - Rotation policy
     轮换策略
   - Scope limitations
     权限范围限制

7. Error handling
   错误处理
   - No stack traces in production
     生产环境不暴露堆栈跟踪
   - Generic error messages
     通用错误消息
   - Proper status codes
     正确的状态码

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
