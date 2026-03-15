# Logging and Monitoring
# 日志与监控

Review logging and monitoring implementation in this application.
审查本应用中日志与监控的实现。

Verify:
验证以下内容：

1. Sensitive data not logged
   敏感数据未被记录
   - Passwords, tokens, PII
     密码、令牌、个人身份信息
   - Credit card numbers
     信用卡号
   - API keys
     API 密钥

2. Security event logging
   安全事件日志
   - Failed login attempts
     登录失败尝试
   - Authorization failures
     授权失败
   - Input validation failures
     输入验证失败
   - System errors
     系统错误

3. Log injection prevention
   日志注入防护
   - Input sanitization in logs
     日志中的输入净化
   - Structured logging
     结构化日志

4. Log storage and retention
   日志存储与保留
   - Secure storage
     安全存储
   - Rotation policy
     轮换策略
   - Backup strategy
     备份策略

5. Monitoring alerts
   监控告警
   - Unusual activity detection
     异常活动检测
   - Error rate monitoring
     错误率监控
   - Performance anomalies
     性能异常

Provide a logging compliance checklist.
提供日志合规检查清单。

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
