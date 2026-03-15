## Business Logic Vulnerabilities
## 业务逻辑漏洞

Analyze business logic for security flaws:
分析业务逻辑中的安全缺陷：

Critical business operations:
关键业务操作：
[paste payment, transfer, or sensitive operations code]
[粘贴支付、转账或其他敏感操作代码]

Check for:
检查以下内容：

1. Race conditions
   竞争条件
   - Concurrent request handling
     并发请求处理
   - Double-spending prevention
     双花攻击防护
   - Inventory management
     库存管理

2. Price manipulation
   价格篡改
   - Client-side price validation only
     仅在客户端进行价格验证
   - Discount/coupon abuse
     折扣/优惠券滥用
   - Currency manipulation
     货币篡改

3. Workflow bypass
   工作流绕过
   - Skipping validation steps
     跳过验证步骤
   - Status manipulation
     状态篡改
   - Approval process bypass
     审批流程绕过

4. Time-based vulnerabilities
   时间类漏洞
   - TOCTOU (Time of Check, Time of Use)
     TOCTOU（检查时间与使用时间不一致）
   - Expiration bypass
     有效期绕过
   - Timezone manipulation
     时区篡改

5. Integer overflow/underflow
   整数溢出/下溢
   - Calculation errors
     计算错误
   - Negative value handling
     负值处理

Create a business logic threat model.
创建业务逻辑威胁模型。

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
