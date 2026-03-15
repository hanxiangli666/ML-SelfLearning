Examine all the code in our application.
检查应用程序中的所有代码。

Identify and analyze code duplication in our project. Look for similar looking functions.
识别并分析项目中的代码重复。查找外观相似的函数。

Check for:
检查以下内容：

1. EXACT DUPLICATES / 完全重复
   - Copy-pasted code blocks / 复制粘贴的代码块
   - Identical functions in different files / 不同文件中的相同函数

2. NEAR DUPLICATES / 近似重复
   - Similar logic with different variable names / 使用不同变量名的相似逻辑
   - Slightly modified algorithms / 略有修改的算法

3. STRUCTURAL DUPLICATES / 结构性重复
   - Similar patterns repeated / 重复出现的相似模式
   - Boilerplate code / 样板代码

4. DATA DUPLICATION / 数据重复
   - Repeated constants / 重复的常量
   - Configuration duplication / 配置重复
   - Schema duplication / Schema 重复

For each duplication found:
对于每处发现的重复：
- Calculate duplication percentage / 计算重复百分比
- Suggest extraction method (function, class, module) / 建议提取方式（函数、类、模块）
- Provide DRY (Don't Repeat Yourself) solution / 提供 DRY（不要重复自己）解决方案
- Estimate refactoring effort / 估算重构工作量

Create a utilities module for common functions.
为公共函数创建工具模块。

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
