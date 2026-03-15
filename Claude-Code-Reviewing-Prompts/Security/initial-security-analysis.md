# Initial Project Analysis
# 项目初始分析

**Perform a Project Structure Audit**
**执行项目结构审计**

Analyze the entire project structure and identify:
分析整个项目结构并识别：

1. All entry points (app.js, server.js, etc.)
   所有入口点（app.js、server.js 等）
2. All routes and endpoints
   所有路由和端点
3. Middleware chain and order
   中间件链及其顺序
4. External service integrations
   外部服务集成
5. Database connection points
   数据库连接点
6. Authentication/authorization flow
   认证/授权流程
7. File upload handling locations
   文件上传处理位置
8. API rate limiting implementation
   API 速率限制实现

Start by examining these core files:
从检查以下核心文件开始：

- package.json (for vulnerable dependencies)
  package.json（检查存在漏洞的依赖）
- app.js or server.js (for middleware configuration)
  app.js 或 server.js（检查中间件配置）
- All files in routes/
  routes/ 中的所有文件
- All files in middleware/
  middleware/ 中的所有文件

---

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
