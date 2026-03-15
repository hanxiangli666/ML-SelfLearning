Analyze code complexity across the codebase:
分析整个代码库的代码复杂度：

Look for complex functions/methods.
查找复杂的函数/方法。

Also look at functions/methods and calculate/evaluate:
同时查看函数/方法并计算/评估：

1. CYCLOMATIC COMPLEXITY / 圈复杂度
   - Functions with complexity > 10 / 复杂度大于 10 的函数
   - Nested if/else depth / 嵌套 if/else 深度
   - Switch statement complexity / Switch 语句复杂度
   - Recommend refactoring for high complexity / 为高复杂度推荐重构方案

2. COGNITIVE COMPLEXITY / 认知复杂度
   - How hard is the code to understand? / 代码理解难度如何？
   - Nested loops and conditions / 嵌套循环和条件
   - Recursive calls / 递归调用
   - Mixed levels of abstraction / 混合的抽象层级

3. LINES OF CODE METRICS / 代码行数指标
   - Functions over 50 lines / 超过 50 行的函数
   - Files over 300 lines / 超过 300 行的文件
   - Classes over 500 lines / 超过 500 行的类
   - Identify candidates for splitting / 识别可拆分的候选项

4. COUPLING METRICS / 耦合度指标
   - Afferent coupling (dependencies on this module) / 传入耦合（依赖此模块的数量）
   - Efferent coupling (dependencies of this module) / 传出耦合（此模块的依赖数量）
   - Instability index / 不稳定性指数
   - Identify tightly coupled modules / 识别紧耦合模块

5. COHESION ANALYSIS / 内聚性分析
   - Are related functions grouped? / 相关函数是否已分组？
   - Single responsibility adherence / 单一职责遵循情况
   - Module focus clarity / 模块职责清晰度

Provide specific refactoring recommendations for complex areas.
为复杂区域提供具体的重构建议。

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
