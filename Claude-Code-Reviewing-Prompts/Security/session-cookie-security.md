# Session and Cookie Security
# 会话与 Cookie 安全

Analyze this project's source code.
分析本项目的源代码。

Focus on session management and cookie security.
重点关注会话管理和 Cookie 安全。

Verify:
验证以下内容：

1. Session configuration
   会话配置
   - Secure flag (HTTPS only)
     Secure 标志（仅限 HTTPS）
   - HttpOnly flag (no JS access)
     HttpOnly 标志（禁止 JS 访问）
   - SameSite attribute
     SameSite 属性
   - Session timeout
     会话超时
   - Session regeneration after login
     登录后会话重新生成

2. Cookie security
   Cookie 安全
   - All cookies have appropriate flags
     所有 Cookie 设置了适当的标志
   - No sensitive data in cookies
     Cookie 中不包含敏感数据
   - Proper domain/path scoping
     正确的域/路径范围
   - Encryption for sensitive cookies
     敏感 Cookie 加密

3. CSRF Protection
   CSRF 防护
   - Token implementation
     令牌实现
   - Double submit cookie pattern
     双提交 Cookie 模式
   - Origin header validation
     Origin 头部验证

4. Session storage
   会话存储
   - Not using default in-memory storage in production
     生产环境不使用默认内存存储
   - Redis/database backed sessions
     Redis/数据库支持的会话
   - Session cleanup/expiration
     会话清理/过期处理

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
