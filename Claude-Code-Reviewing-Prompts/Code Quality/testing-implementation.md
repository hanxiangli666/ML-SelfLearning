Evaluate testing implementation for this software project
评估此软件项目的测试实现情况

Analyze:
分析：

1. TEST COVERAGE / 测试覆盖率
   - Unit test coverage percentage / 单元测试覆盖率百分比
   - Integration test presence / 集成测试存在情况
   - E2E test coverage / 端到端测试覆盖率
   - Uncovered critical paths / 未覆盖的关键路径

2. TEST QUALITY / 测试质量
   - Test naming clarity / 测试命名清晰度
   - Arrange-Act-Assert pattern / Arrange-Act-Assert 模式
   - Test independence / 测试独立性
   - Mock usage appropriateness / Mock 使用适当性
   - Test data management / 测试数据管理

3. TEST PATTERNS / 测试模式
   - Test pyramid adherence (unit > integration > E2E) / 测试金字塔遵循情况（单元 > 集成 > E2E）
   - Testing anti-patterns (testing implementation vs behavior) / 测试反模式（测试实现而非行为）
   - Brittle tests identification / 脆弱测试识别
   - Test speed issues / 测试速度问题

4. MISSING TESTS / 缺失测试
   - Error scenarios / 错误场景
   - Edge cases / 边界情况
   - Security tests / 安全测试
   - Performance tests / 性能测试

Provide a test improvement plan with examples.
提供带示例的测试改进计划。

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
