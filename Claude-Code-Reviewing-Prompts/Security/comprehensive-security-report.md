## Comprehensive Security Report
## 综合安全报告

Based on our complete security audit, generate a comprehensive security report:
基于完整的安全审计，生成综合安全报告：

## Executive Summary
## 执行摘要

- Overall security posture (Critical/High/Medium/Low)
  整体安全态势（严重/高/中/低）
- Number of vulnerabilities by severity
  按严重级别划分的漏洞数量
- Immediate actions required
  需要立即采取的行动

## Critical Vulnerabilities (Fix Immediately)
## 严重漏洞（立即修复）

[List with CVE references if applicable]
[列出漏洞，如适用请附 CVE 参考编号]

## High Priority Issues (Fix within 1 week)
## 高优先级问题（1 周内修复）

[Detailed list with code locations]
[附代码位置的详细列表]

## Medium Priority Issues (Fix within 1 month)
## 中优先级问题（1 个月内修复）

[List with recommendations]
[附建议的问题列表]

## Low Priority Issues (Fix in next release)
## 低优先级问题（在下一版本中修复）

[List of improvements]
[改进建议列表]

## Security Recommendations
## 安全建议

1. Implementation priorities
   实施优先级
2. Security tools to adopt
   应采用的安全工具
3. Process improvements
   流程改进
4. Training needs
   培训需求

## Compliance Checklist
## 合规检查清单

- OWASP Top 10 coverage
  OWASP Top 10 覆盖情况
- PCI DSS (if handling payments)
  PCI DSS（如涉及支付处理）
- GDPR (if handling EU data)
  GDPR（如处理欧盟数据）
- SOC 2 requirements
  SOC 2 要求

## Code Examples
## 代码示例

Provide secure code examples for each vulnerability type found.
针对发现的每种漏洞类型，提供安全代码示例。

## Testing Guide
## 测试指南

Include curl commands or test scripts to verify each fix.
提供 curl 命令或测试脚本以验证每项修复。


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
