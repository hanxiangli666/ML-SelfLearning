# Authorization Implementation
# 授权实现

Analyze authorization implementation across all routes:
分析所有路由的授权实现：

Check for:
检查以下内容：

1. Broken Object Level Authorization (BOLA / IDOR)
   对象级授权缺失（BOLA / IDOR）

   * Verify ownership/tenant checks on all object-level routes (`GET/PUT/DELETE /:id`).
     验证所有对象级路由（`GET/PUT/DELETE /:id`）上的所有权/租户检查。
   * Ensure identifiers in URL, body, or query cannot be manipulated to access others' data.
     确保 URL、请求体或查询中的标识符不能被篡改以访问他人数据。

2. Broken Function Level Authorization
   功能级授权缺失

   * Confirm role/permission checks exist on every privileged route.
     确认每个特权路由上都存在角色/权限检查。
   * Ensure enforcement is server-side, not just in the UI.
     确保在服务器端而非仅在 UI 层进行强制执行。

3. Missing authorization checks on sensitive endpoints
   敏感端点缺少授权检查

   * Validate middleware ordering (authN → authZ → handler).
     验证中间件顺序（认证 → 授权 → 处理器）。
   * Confirm no endpoints are left exposed (admin tools, bulk exports, feature-flagged routes).
     确认没有端点被暴露（管理工具、批量导出、功能标志路由）。

4. Role-based access control (RBAC) implementation
   基于角色的访问控制（RBAC）实现

   * Map roles → permissions explicitly; enforce deny-by-default.
     显式映射角色 → 权限；强制默认拒绝。
   * Ensure roles cannot be set/changed by the client.
     确保角色不能由客户端设置/更改。

5. Privilege escalation possibilities
   权限提升可能性

   * Check for update endpoints allowing fields like `role`, `tenantId`, or `isAdmin`.
     检查允许修改 `role`、`tenantId` 或 `isAdmin` 等字段的更新端点。
   * Validate multi-step workflows cannot escalate privileges indirectly.
     验证多步骤工作流不能间接提升权限。

6. JWT token validation on every protected route
   每个受保护路由上的 JWT 令牌验证

   * Require `jwt.verify` with strict `algorithms`, `iss`, `aud`, `exp`.
     要求使用 `jwt.verify` 并严格指定 `algorithms`、`iss`、`aud`、`exp`。
   * Ensure no route uses `jwt.decode` or trusts unverified claims.
     确保没有路由使用 `jwt.decode` 或信任未经验证的声明。
   * Validate `jti` or `tokenVersion` against revocation strategy.
     根据撤销策略验证 `jti` 或 `tokenVersion`。

7. Proper scope checking for API tokens
   API 令牌的正确权限范围检查

   * Verify least-privilege scopes are enforced.
     验证最小权限范围已被强制执行。
   * Differentiate user tokens vs service tokens; enforce `audience` and intended route access.
     区分用户令牌与服务令牌；强制执行 `audience` 和预期的路由访问。

---

Additional items to check for:
其他待检查项目：

8. Multi-tenant isolation
   多租户隔离

   * Tenant constraints injected server-side, not client-provided.
     租户约束在服务器端注入，而非由客户端提供。
   * List/search endpoints filtered by tenant at query time.
     列表/搜索端点在查询时按租户过滤。

9. Bulk endpoint protections
   批量端点保护

   * Batch/bulk operations enforce ownership per item, not just once at entry point.
     批量操作对每个条目强制执行所有权检查，而非仅在入口点检查一次。

10. Field-level authorization
    字段级授权

    * Sensitive fields (e.g., `ssn`, `apiKey`, `secrets`) excluded for non-privileged users.
      对非特权用户排除敏感字段（如 `ssn`、`apiKey`、`secrets`）。
    * Ensure field-level projection or serializer logic exists.
      确保存在字段级投影或序列化器逻辑。

11. Error handling & resource enumeration
    错误处理与资源枚举

    * Uniform errors (`403` vs `404`) to prevent leaking resource existence.
      统一错误响应（`403` vs `404`）以防止泄露资源是否存在。
    * Consistent status codes across owned vs non-owned resources.
      对已拥有与未拥有的资源使用一致的状态码。

12. Middleware ordering
    中间件顺序

    * Confirm routes cannot bypass authorization due to wrong order (e.g., handler before auth middleware).
      确认路由不能因顺序错误而绕过授权（如处理器在认证中间件之前）。
    * Check nested routers for missing parent auth guards.
      检查嵌套路由器是否缺少父级认证守卫。

13. CORS & CSRF considerations
    CORS 与 CSRF 注意事项

    * No wildcard origins with credentials.
      不使用带凭据的通配符来源。
    * If cookies are used for auth, CSRF defenses are in place (SameSite, CSRF token).
      如果使用 Cookie 进行认证，则需要有 CSRF 防御（SameSite、CSRF 令牌）。

14. Open redirect protections
    开放重定向保护

    * Verify post-login `redirect`/`next` parameters are validated against allowlists.
      验证登录后的 `redirect`/`next` 参数是否经过白名单验证。

15. Fallback/debug routes
    后备/调试路由

    * Ensure no `/seed`, `/reset`, `/debug` endpoints are left exposed without strict admin checks.
      确保没有 `/seed`、`/reset`、`/debug` 等端点在没有严格管理员检查的情况下被暴露。

---

For each endpoint, verify:
对每个端点，验证：

* Who can access it (roles, scopes, tenant).
  谁可以访问（角色、范围、租户）。
* What data they can see/modify (including hidden fields).
  他们可以查看/修改什么数据（包括隐藏字段）。
* Whether ownership/tenancy is properly checked (query-level filter + post-fetch check).
  所有权/租户是否被正确检查（查询级过滤 + 获取后检查）。
* That middleware enforces authN/authZ consistently (no bypass possible).
  中间件是否一致地执行认证/授权（不可绕过）。


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
