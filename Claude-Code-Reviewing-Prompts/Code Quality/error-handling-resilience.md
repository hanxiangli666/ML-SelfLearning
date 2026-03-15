Evaluate this entire software package.
评估整个软件包。

Perform a comprehensive error handling review:
执行全面的错误处理审查：

Evaluate:
评估：

1. ERROR HANDLING CONSISTENCY / 错误处理一致性
   - Is there a centralized error handler? / 是否有集中式错误处理器？
   - Are errors handled uniformly? / 错误处理是否统一？
   - Custom error classes vs generic errors? / 自定义错误类与通用错误的使用情况？

2. ERROR CATEGORIES / 错误分类
   - Validation errors (400) / 验证错误（400）
   - Authentication errors (401) / 认证错误（401）
   - Authorization errors (403) / 授权错误（403）
   - Not found errors (404) / 未找到错误（404）
   - Server errors (500) / 服务器错误（500）
   - Rate limit errors (429) / 速率限制错误（429）
   - Are they properly categorized? / 它们是否正确分类？

3. ASYNC ERROR HANDLING / 异步错误处理
   - Unhandled promise rejections / 未处理的 Promise 拒绝
   - Async middleware wrapper usage / 异步中间件包装器的使用
   - Callback error handling / 回调错误处理
   - Event emitter error handling / 事件发射器错误处理

4. ERROR RECOVERY / 错误恢复
   - Graceful degradation / 优雅降级
   - Retry mechanisms / 重试机制
   - Circuit breakers / 断路器
   - Fallback strategies / 降级策略

5. ERROR INFORMATION / 错误信息
   - Development vs production error details / 开发与生产环境的错误详情
   - Stack trace exposure / 堆栈跟踪暴露情况
   - Error logging completeness / 错误日志完整性
   - User-friendly error messages / 用户友好的错误消息

Identify error handling gaps and provide improved implementation.
识别错误处理缺口并提供改进实现。

## Provide: / 提供：

A structured finding report
结构化的发现报告

A scale of 1/10 on how important each finding is
每项发现的重要性评分（1-10）

Remediation: precise code-level fix or config change (snippets welcome) if possible
修复建议：如可能，提供精确的代码级修复或配置更改（欢迎提供代码片段）

## Constraints & style: / 约束与风格：

Be concrete and cite exact code locations and identifiers.
具体说明并引用确切的代码位置和标识符。

Prefer minimal, drop-in fix snippets over prose.
优先提供简洁的即插即用修复片段，而非大段说明。

Do not invent files or functions that aren't present; if context is missing, mark as Unable to verify and say what code would prove it.
不要虚构不存在的文件或函数；如缺少上下文，标记为"无法验证"并说明需要什么代码来证明。

Write this into a markdown file and place it in the audits/ folder.
将结果写入 markdown 文件并放置在 audits/ 文件夹中。
