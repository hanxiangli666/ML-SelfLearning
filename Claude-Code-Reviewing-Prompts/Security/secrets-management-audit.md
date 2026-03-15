## Secrets Management Audit
## 密钥管理审计

Scan entire codebase for exposed secrets
扫描整个代码库中暴露的密钥

Check for:
检查以下内容：

1. Hardcoded secrets
   硬编码密钥
   - API keys
     API 密钥
   - Database passwords
     数据库密码
   - JWT secrets
     JWT 密钥
   - Encryption keys
     加密密钥

2. Environment variable usage
   环境变量使用
   - All secrets in env vars
     所有密钥使用环境变量
   - .env file not in git
     .env 文件未提交到 git
   - Production vs development configs
     生产环境与开发环境配置分离

3. Secret rotation capability
   密钥轮换能力
   - Database password rotation
     数据库密码轮换
   - API key rotation
     API 密钥轮换
   - Certificate updates
     证书更新

4. Encryption key management
   加密密钥管理
   - Key derivation functions
     密钥派生函数
   - Salt usage
     盐值使用
   - Key storage
     密钥存储

Flag any hardcoded secrets as CRITICAL.
将任何硬编码密钥标记为严重问题。

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
