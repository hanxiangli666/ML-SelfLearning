# Database Security Audit
# 数据库安全审计

Examine ALL database interactions
审查所有数据库交互

Verify:
验证以下内容：

1. Parameterized queries or ORM usage
   参数化查询或 ORM 使用

   * Ensure all queries use placeholders (`?`, `$1`, `:param`) or ORM bindings.
     确保所有查询使用占位符（`?`、`$1`、`:param`）或 ORM 绑定。
   * Flag any direct string concatenation in queries as CRITICAL.
     将查询中的任何直接字符串拼接标记为严重问题。

2. Connection string security
   连接字符串安全

   * No passwords or secrets hardcoded in code or committed to source control.
     代码中或源代码控制中不存在硬编码的密码或密钥。
   * Use environment variables or a secrets manager.
     使用环境变量或密钥管理器。

3. Database user permissions (principle of least privilege)
   数据库用户权限（最小权限原则）

   * Application account has only the rights it needs (e.g., no `SUPERUSER`, `DROP`, `GRANT`).
     应用账户仅拥有所需权限（如不含 `SUPERUSER`、`DROP`、`GRANT`）。
   * Separate accounts for read-only, migrations, and admin.
     只读、迁移和管理员操作使用独立账户。

4. Sensitive data encryption at rest
   静态敏感数据加密

   * Verify disk-level/database-native encryption.
     验证磁盘级/数据库原生加密。
   * Critical fields (e.g., SSN, tokens) use column-level encryption or tokenization.
     关键字段（如 SSN、令牌）使用列级加密或令牌化。

5. PII handling compliance
   个人身份信息处理合规

   * Personally identifiable information is minimized, redacted in logs, and handled per GDPR/CCPA.
     个人身份信息最小化、在日志中脱敏，并按 GDPR/CCPA 规定处理。
   * Retention/deletion policies exist and are enforced.
     存在并执行数据保留/删除策略。

6. Query timeout configurations
   查询超时配置

   * Query/statement timeouts configured at driver and DB server level to prevent runaway queries.
     在驱动程序和数据库服务器级别配置查询/语句超时，以防止失控查询。

7. Connection pool settings
   连接池设置

   * Pool limits configured (min/max); no unbounded connections.
     配置连接池限制（最小/最大）；不允许无限制连接。
   * Idle timeouts enforced to prevent exhaustion.
     强制执行空闲超时以防止资源耗尽。

8. Transaction handling for consistency
   事务处理一致性

   * Transactions wrap multi-step operations.
     事务封装多步骤操作。
   * Rollback paths tested to prevent partial updates.
     测试回滚路径以防止部分更新。

9. Audit logging for sensitive operations
   敏感操作审计日志

   * Log access to sensitive tables/fields, schema changes, permission changes, failed logins.
     记录对敏感表/字段的访问、模式变更、权限变更、登录失败。
   * Logs are centralized, immutable, and monitored.
     日志集中存储、不可篡改且受到监控。

10. NoSQL injection hardening (if applicable)
    NoSQL 注入加固（如适用）

    * User input never passed directly to filters.
      用户输入永远不会直接传递给过滤器。
    * `$where`, `$ne`, `$gt`, `$or` operators blocked/sanitized.
      `$where`、`$ne`、`$gt`、`$or` 操作符被屏蔽/净化。
    * ORM/driver sanitization enabled (e.g., `mongoose.set('sanitizeFilter', true)`).
      启用 ORM/驱动程序净化（如 `mongoose.set('sanitizeFilter', true)`）。

11. Row/Tenant isolation
    行级/租户隔离

    * Row-level security (Postgres RLS) or server-side ownership/tenant filters enforced.
      强制执行行级安全（Postgres RLS）或服务器端所有权/租户过滤。
    * Multi-tenant queries scoped by server, not client input.
      多租户查询范围由服务器确定，而非由客户端输入。

12. Least-privilege networking
    最小权限网络

    * Database not publicly exposed; network ACLs, VPC, firewall/security groups in place.
      数据库不公开暴露；配置网络 ACL、VPC、防火墙/安全组。
    * Only whitelisted application servers can connect.
      只有白名单中的应用服务器才能连接。

13. TLS in transit & certificate validation
    传输中的 TLS 与证书验证

    * DB connections use TLS (`sslmode=require/verify-full` or equivalent).
      数据库连接使用 TLS（`sslmode=require/verify-full` 或等效设置）。
    * Certificates validated and rotated.
      证书经过验证并定期轮换。

14. Secret management & rotation
    密钥管理与轮换

    * Credentials stored in a secrets manager, rotated periodically.
      凭据存储在密钥管理器中，定期轮换。
    * No static passwords in `.env` files without protection.
      `.env` 文件中不存在未加保护的静态密码。

15. Schema & integrity controls
    模式与完整性控制

    * Foreign keys, unique constraints, and NOT NULL enforced.
      强制执行外键、唯一约束和 NOT NULL。
    * Ownership/tenant columns marked `NOT NULL` and validated.
      所有权/租户列标记为 `NOT NULL` 并经过验证。

16. Field-level minimization
    字段级最小化

    * Avoid `SELECT *`; fetch only required fields.
      避免 `SELECT *`；只获取所需字段。
    * Reduces exposure of sensitive columns.
      减少敏感列的暴露。

17. Pagination & query limits
    分页与查询限制

    * Hard caps on `LIMIT`/page size; prevent unbounded queries that scan entire tables.
      对 `LIMIT`/页面大小设置硬性上限；防止扫描整个表的无限制查询。

18. Backup/restore security
    备份/恢复安全

    * Backups encrypted, access-controlled, tested for restoration.
      备份经过加密、访问控制并经过恢复测试。
    * No unprotected dumps in CI/CD or object storage.
      CI/CD 或对象存储中不存在未受保护的数据转储。

19. Data retention & deletion
    数据保留与删除

    * Clear policies for retention, archival, and deletion of PII.
      明确的个人身份信息保留、归档和删除策略。
    * Secure erasure when data is removed.
      数据删除时进行安全擦除。

20. Migrations safety
    迁移安全

    * Migrations run with controlled privileges.
      迁移使用受控权限运行。
    * Destructive operations reviewed; rollback plans exist.
      破坏性操作经过审查；存在回滚计划。

21. ORM raw-query escape hatch review
    ORM 原始查询逃逸口审查

    * Any `queryRaw`/`sequelize.query`/`knex.raw` usage audited.
      审计所有 `queryRaw`/`sequelize.query`/`knex.raw` 的使用。
    * Must still use parameterized bindings.
      必须仍然使用参数化绑定。

22. LIKE / regex input handling
    LIKE / 正则表达式输入处理

    * Special characters in user input escaped properly (`%`, `_`, regex metacharacters).
      用户输入中的特殊字符被正确转义（`%`、`_`、正则元字符）。
    * Prevents pattern abuse and heavy queries.
      防止模式滥用和高负载查询。

23. Query timeouts & resource guards
    查询超时与资源保护

    * Resource caps enforced (memory, work\_mem, CPU).
      强制执行资源上限（内存、work\_mem、CPU）。
    * Prevent denial-of-service via expensive queries.
      通过高开销查询防止拒绝服务攻击。

24. Audit & monitoring depth
    审计与监控深度

    * Privileged operations (DDL, GRANT, role changes) logged and alerted.
      特权操作（DDL、GRANT、角色变更）被记录并触发告警。
    * Centralized monitoring with anomaly detection.
      集中监控并配备异常检测。

25. PII in logs/metrics
    日志/指标中的个人身份信息

    * ORM debug or query logs do not leak PII or secrets.
      ORM 调试或查询日志不泄露个人身份信息或密钥。
    * Redaction/allowlisting enforced.
      强制执行脱敏/白名单。

26. Indexing of sensitive data
    敏感数据索引

    * Sensitive fields (e.g., SSN, tokens) not indexed in plaintext.
      敏感字段（如 SSN、令牌）不以明文索引。
    * Use hashed/indexed tokens or partial indexes where needed.
      在需要时使用哈希/索引令牌或部分索引。

27. Service/account lifecycle
    服务/账户生命周期

    * No shared admin accounts.
      不共享管理员账户。
    * Time-bound, purpose-specific service accounts.
      使用有时限、特定用途的服务账户。
    * Periodic review of granted privileges.
      定期审查授予的权限。

28. Caching layers
    缓存层

    * Sensitive data not cached in plaintext unless justified.
      敏感数据不以明文缓存，除非有合理理由。
    * Redis/Memcached require auth, not publicly exposed.
      Redis/Memcached 需要认证，不公开暴露。

29. Analytics/ETL exports
    分析/ETL 导出

    * PII masked or de-identified before export.
      导出前对个人身份信息进行掩码或去标识化处理。
    * Exports encrypted, access-controlled, and scrubbed of secrets.
      导出经过加密、访问控制，并清除密钥信息。

---

Critical flags:
关键标记：

* Direct string concatenation in queries = CRITICAL.
  查询中的直接字符串拼接 = 严重问题。
* Passing raw user JSON into NoSQL queries without sanitization = CRITICAL.
  将未净化的原始用户 JSON 传入 NoSQL 查询 = 严重问题。

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
