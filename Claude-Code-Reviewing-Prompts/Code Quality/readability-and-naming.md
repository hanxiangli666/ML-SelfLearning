Evaluate our code for readability and naming.
评估代码的可读性和命名规范。

Review:
审查：

1. NAMING CONVENTIONS / 命名规范
   - Variables: descriptive vs cryptic (e.g., 'u' vs 'user') / 变量：描述性与晦涩命名（如 'u' vs 'user'）
   - Functions: verb-based, clear intent / 函数：基于动词，意图清晰
   - Classes: noun-based, single responsibility / 类：基于名词，单一职责
   - Constants: UPPER_CASE consistency / 常量：UPPER_CASE 一致性
   - Private methods: underscore convention / 私有方法：下划线命名约定

2. NAMING CONSISTENCY / 命名一致性
   - camelCase vs snake_case mixing / 驼峰命名与下划线命名混用
   - Abbreviation consistency / 缩写一致性
   - Domain terminology usage / 领域术语使用
   - British vs American spelling / 英式与美式拼写

3. CODE READABILITY / 代码可读性
   - Self-documenting code / 自文档化代码
   - Need for comments (too many = code smell) / 注释需求（过多 = 代码异味）
   - Magic numbers/strings / 魔法数字/字符串
   - Complex boolean expressions / 复杂布尔表达式
   - Ternary operator abuse / 三元运算符滥用

4. FUNCTION SIGNATURES / 函数签名
   - Parameter count (>3 is a smell) / 参数数量（超过 3 个是代码异味）
   - Boolean parameters (avoid) / 布尔参数（应避免）
   - Optional parameter handling / 可选参数处理
   - Return type clarity / 返回类型清晰度

Create a naming convention guide based on findings.
根据发现创建命名规范指南。

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
