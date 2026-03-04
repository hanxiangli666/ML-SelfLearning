# RAG 文档检索增强生成完整指南 / RAG (Retrieval-Augmented Generation) Complete Guide

## 📚 项目概述 / Project Overview

本项目是一套**完整的 RAG（检索增强生成）实战教程**，通过 16 个递进式脚本演示，从关键词搜索→语义搜索→向量数据库→高级文本切分→LLM 推理，逐步构建一个完整的 RAG 系统。项目采用**真实企业文档**（TechCorp 文档库）作为数据源，完全实践化，适合想要理解和构建生产级 RAG 系统的开发者。

This is a comprehensive **RAG (Retrieval-Augmented Generation) hands-on tutorial** with 16 progressive scripts demonstrating the complete lifecycle: keyword search → semantic search → vector databases → advanced text chunking → LLM reasoning. The project uses **real enterprise documents** (TechCorp document library) as data sources, making it fully practical for developers who want to understand and build production-grade RAG systems.

---

## 🚀 快速开始 / Quick Start

### 环境准备 / Environment Setup

```bash
# 1. 进入项目目录 / Enter project directory
cd rag-project

# 2. 创建虚拟环境 / Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 3. 安装依赖 / Install dependencies
pip install -r requirements.txt

# 4. 配置 OpenAI API（可选，仅用于高级脚本）
# Create .env file with:
echo "OPENAI_API_KEY=your_api_key_here" > .env
echo "OPENAI_API_BASE=https://api.openai.com/v1" >> .env

# 5. 验证环境 / Verify environment (builds all test markers)
python 01verify_environment.py
```

### 依赖包说明 / Dependencies

| 包名                  | 版本   | 用途                      |
| --------------------- | ------ | ------------------------- |
| scikit-learn          | 1.3.2  | TF-IDF 向量化与相似度计算 |
| rank-bm25             | 0.2.2  | BM25 关键词检索算法       |
| sentence-transformers | 2.2.2  | 本地句向量嵌入模型        |
| chromadb              | 0.4.22 | 向量数据库存储与检索      |
| langchain             | 0.1.0  | 文本切分与 LLM 编排       |
| pandas, numpy         | 最新   | 数据处理与矩阵操作        |

---

## 📖 完整课程大纲 / Complete Course Curriculum

### **第一阶段：关键词检索基础 / Phase 1: Keyword-Based Retrieval**

#### 学习目标 / Learning Objectives

- 理解 TF-IDF 和 BM25 传统关键词搜索的原理
- 掌握向量化与相似度计算
- 理解关键词搜索的局限性

---

#### **01verify_environment.py** 🔧 **环境检查**

**概念 / Concept:** 在运行任何 RAG 脚本前，确保所有必需的库和 Python 版本都已正确安装

**功能说明 / Functions:**

- ✅ Python 版本检查（需要 3.9+）
- ✅ 虚拟环境验证
- ✅ 依赖包自动安装（使用 uv pip）
- ✅ OpenAI API 配置验证

**运行方式 / How to Run:**

```bash
python 01verify_environment.py
```

**输出示例 / Sample Output:**

```
🐍 Python 3.9.13 verified
✅ Virtual environment active
📦 Installing missing packages...
✅ All dependencies installed
🔐 API configuration complete
```

---

#### **02tfidf_search.py** 🔍 **TF-IDF 关键词搜索**

**概念 / Concept:** TF-IDF (Term Frequency-Inverse Document Frequency) 是经典的文本搜索方法，基于词频统计

**核心原理 / Core Principle:**

$$
\text{TF-IDF}(t, d) = \text{TF}(t, d) \times \text{IDF}(t)
$$

其中：

- **TF (Term Frequency)** = 词 t 在文档 d 中出现次数 / 文档 d 总词数
- **IDF (Inverse Document Frequency)** = log(总文档数 / 包含词 t 的文档数)

**工作流程 / Workflow:**

```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# 步骤 1: 初始化向量化器 / Step 1: Initialize vectorizer
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(documents)

# 步骤 2: 查询向量化 / Step 2: Vectorize query
query_vector = vectorizer.transform([query])

# 步骤 3: 计算相似度 / Step 3: Calculate similarity
similarities = cosine_similarity(query_vector, tfidf_matrix)

# 步骤 4: 排序并返回 Top 结果 / Step 4: Rank and return top results
top_indices = similarities.argsort()[-3:][::-1]
```

**优缺点 / Pros & Cons:**

| 优点             | 缺点                |
| ---------------- | ------------------- |
| ✅ 快速高效      | ❌ 无法理解语义     |
| ✅ 可解释性强    | ❌ 对同义词无效     |
| ✅ 无需 API 成本 | ❌ 依赖词汇精确匹配 |

**示例查询 / Example Queries:**

```python
queries = [
    "remote work policy",       # ✅ 精确匹配
    "benefits",                 # ✅ 直接匹配
    "distributed workforce"     # ❌ 需要语义理解
]
```

---

#### **03bm25_search.py** 📊 **BM25 关键词搜索**

**概念 / Concept:** BM25 (Best Matching 25) 是比 TF-IDF 更先进的关键词检索算法，考虑了文档长度规范化

**优势对比 / Advantages over TF-IDF:**

- 📈 文档长度规范化（避免长文档偏差）
- 📈 参数化可调（k1, b 参数可调节）
- 📈 在实践中表现通常更好

**使用方式 / Usage:**

```python
from rank_bm25 import BM25Okapi

# 分词 / Tokenization
tokenized_docs = [doc.split() for doc in documents]

# 创建 BM25 模型 / Create BM25 model
bm25 = BM25Okapi(tokenized_docs)

# 查询与排序 / Query and rank
query_tokens = "remote work policy".split()
scores = bm25.get_scores(query_tokens)
top_indices = np.argsort(scores)[-3:][::-1]
```

**参数调节 / Parameter Tuning:**

```python
# k1: 控制词频饱和点（默认 1.5）
# b: 控制文档长度影响（默认 0.75）
bm25 = BM25Okapi(tokenized_docs, k1=2.0, b=0.5)
```

---

#### **06keyword_limitation_demo.py** ⚠️ **关键词局限性展示**

**概念 / Concept:** 演示关键词搜索失败的场景，为语义搜索的引入做铺垫

**失败案例 / Failure Cases:**

```python
# 查询：分布式员工队伍政策 / Query: distributed workforce policies
# 关键词搜索结果：❌ 无关或无结果
# 原因：文档中使用的是 "remote work policy"，不包含 "distributed workforce"

# 查询：弹性工作安排 / Query: flexible work arrangements  
# TF-IDF 结果：❌ 低分
# BM25 结果：❌ 低分
# 原因：虽然意思相同，但词汇完全不同
```

**失败的根本原因 / Root Cause:**

- 🔴 关键词搜索只看**词汇匹配**，不理解**语义**
- 🔴 无法处理同义词、近义词、相关概念
- 🔴 对自然语言的多样性拆建性极强

**解决方案：走向语义搜索 / Solution: Move to Semantic Search**

```
关键词搜索 (Word Level)
    ↓
语义搜索 (Semantic Level)
    ↓
向量相似度 (Vector Similarity)
```

---

### **第二阶段：语义搜索与向量化 / Phase 2: Semantic Search & Vectorization**

#### 学习目标 / Learning Objectives

- 理解文本嵌入（Embeddings）的概念
- 掌握语义相似度计算
- 了解向量数据库的基本使用

---

#### **07semantic_search_demo.py** 🧠 **语义搜索演示**

**概念 / Concept:** 使用句向量模型将文本转换为高维向量，通过向量相似度进行搜索而非词汇匹配

**工作原理 / Working Principle:**

```
原始文本 / Raw Text
    ↓
Sentence Transformer 模型 / Sentence Embedding Model
    ↓
高维向量 / High-dimensional Vector (384 维)
    ↓
计算余弦相似度 / Cosine Similarity
    ↓
排序返回最相似的文档 / Rank and Return
```

**代码示例 / Code Example:**

```python
from sentence_transformers import SentenceTransformer
import numpy as np

# 加载预训练模型 / Load pre-trained model
model = SentenceTransformer('all-MiniLM-L6-v2')
# 📊 384 维度，快速高效，适合 CPU 环境

# 生成文档向量 / Encode documents
doc_embeddings = model.encode(documents)

# 生成查询向量 / Encode query
query = "distributed workforce policies"
query_embedding = model.encode([query])

# 计算相似度 / Calculate cosine similarity
similarities = np.dot(query_embedding, doc_embeddings.T).flatten()

# 取 Top 结果 / Get top results
top_indices = similarities.argsort()[-3:][::-1]
```

**可用模型对比 / Model Comparison:**

| 模型名               | 维度 | 速度   | 质量 | 用途                     |
| -------------------- | ---- | ------ | ---- | ------------------------ |
| all-MiniLM-L6-v2     | 384  | ⚡⚡⚡ | 中   | **推荐：通用任务** |
| all-mpnet-base-v2    | 768  | ⚡⚡   | 高   | 精确搜索                 |
| multilingual-e5-base | 768  | ⚡⚡   | 高   | 多语言任务               |

**为什么语义搜索成功？/ Why Semantic Search Succeeds?**

```python
# 查询：distributed workforce policies
# 文档：remote work policy

# 向量空间中的"距离" / Distance in vector space
# distributed ≈ remote (都表示不在办公室)
# workforce ≈ work (都是工作相关)
# policies ≈ policy (都是政策)

# 结果：✅ 高度相似！
```

---

#### **04compare_methods.py** ⚖️ **搜索方法对比**

**概念 / Concept:** 在同一组查询上对比 TF-IDF、BM25 和语义搜索的效果

**对比维度 / Comparison Dimensions:**

| 维度       | TF-IDF | BM25   | 语义搜索 |
| ---------- | ------ | ------ | -------- |
| 速度       | ⚡⚡⚡ | ⚡⚡⚡ | ⚡⚡     |
| 精确度     | 中     | 中     | 高       |
| 语义理解   | ❌     | ❌     | ✅       |
| 同义词处理 | ❌     | ❌     | ✅       |
| 计算成本   | 低     | 低     | 中       |
| API 依赖   | ❌     | ❌     | ❌       |

**何时使用哪种方法？/ When to Use Each?**

```
快速原型开发 → TF-IDF/BM25
    ↓
生产系统 → 语义搜索
    ↓
需要精确+语义 → 混合搜索（Hybrid）
```

---

#### **05hybrid_search.py** 🔀 **混合搜索策略**

**概念 / Concept:** 结合关键词搜索和语义搜索，发挥两者优势

**混合搜索流程 / Hybrid Search Pipeline:**

```
查询 / Query
    ↓
并行执行：
├─ 关键词检索（BM25）→ 得分 1-10
└─ 语义检索（向量）→ 得分 0-1
    ↓
加权融合：
final_score = 0.3 × keyword_score + 0.7 × semantic_score
    ↓
排序并返回 Top 结果 / Rank and Return
```

**代码示例 / Code Example:**

```python
# 步骤 1: 运行 BM25 / Run BM25
bm25_scores = bm25.get_scores(query_tokens)
bm25_normalized = bm25_scores / bm25_scores.max()  # 归一化到 [0, 1]

# 步骤 2: 运行语义搜索 / Run semantic search
semantic_scores = cosine_similarity(query_emb, doc_embs).flatten()

# 步骤 3: 加权融合 / Weighted fusion
hybrid_scores = 0.3 * bm25_normalized + 0.7 * semantic_scores

# 步骤 4: 排序 / Rank
top_indices = hybrid_scores.argsort()[-3:][::-1]
```

**权重调节 / Weight Tuning:**

```
如果查询是"精确产品名" / If query is exact product name:
    → 增加关键词权重（0.5 × BM25 + 0.5 × Semantic）

如果查询是"抽象概念" / If query is abstract concept:
    → 增加语义权重（0.2 × BM25 + 0.8 × Semantic）
```

---

### **第三阶段：向量数据库 / Phase 3: Vector Database**

#### 学习目标 / Learning Objectives

- 掌握向量数据库的初始化与管理
- 理解文档存储和检索的完整流程
- 了解向量搜索的性能优化

---

#### **08init_vectordb.py** 🗄️ **向量数据库初始化**

**概念 / Concept:** 使用 ChromaDB 创建向量数据库并初始化集合

**什么是向量数据库？/ What is a Vector Database?**

```
关系数据库 (MySQL, PostgreSQL)
    ↓ 只能存储结构化数据
  
向量数据库 (ChromaDB, Pinecone, Weaviate)
    ↓ 存储向量 + 支持向量相似度搜索
    ↓ 特别优化了 ANN (Approximate Nearest Neighbor)
    ↓ 适合 RAG 和 AI 应用
```

**初始化步骤 / Initialization Steps:**

```python
import chromadb
from sentence_transformers import SentenceTransformer

# 1. 创建 ChromaDB 客户端 / Create client
client = chromadb.Client()

# 2. 创建集合（类似"表"）/ Create collection (like "table")
collection = client.create_collection("techcorp_docs")

# 3. 加载嵌入模型 / Load embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

# 4. 验证维度 / Verify dimensions
print(f"Embedding dimensions: {model.get_sentence_embedding_dimension()}")  # 384

# 5. 写入测试数据 / Write test data
test_embedding = model.encode(["test document"])
collection.add(
    documents=["test document"],
    ids=["doc_1"],
    embeddings=test_embedding
)

# 6. 验证 / Verify
print(f"Documents in collection: {collection.count()}")  # 1
```

**ChromaDB 关键概念 / Key Concepts:**

| 概念                 | 说明                           |
| -------------------- | ------------------------------ |
| **Client**     | 数据库客户端，内存或持久化模式 |
| **Collection** | 文档集合，相当于数据库中的表   |
| **Document**   | 文档内容                       |
| **Embedding**  | 向量表示                       |
| **ID**         | 唯一标识符                     |
| **Metadata**   | 元数据（可选，如来源、日期等） |

---

#### **09store_documents.py** 📚 **批量存储文档**

**概念 / Concept:** 将 TechCorp 文档库中的所有文档向量化并存储到向量数据库

**存储流程 / Storage Pipeline:**

```
读取 TechCorp 文档库 / Read documents
    ↓
逐个文档向量化 / Encode each document
    ↓
添加到 ChromaDB 集合 / Add to collection
    ↓
生成元数据 / Create metadata
    ↓
保存数据库 / Save database
```

**代码示例 / Code Example:**

```python
from utils import read_techcorp_docs
import chromadb
from sentence_transformers import SentenceTransformer

# 读取所有文档 / Read all documents
documents, doc_paths = read_techcorp_docs()

# 初始化 / Initialize
client = chromadb.Client()
collection = client.create_collection("techcorp_docs")
model = SentenceTransformer('all-MiniLM-L6-v2')

# 批量存储 / Batch store
for i, (doc, path) in enumerate(zip(documents, doc_paths)):
    embedding = model.encode([doc])[0]
  
    collection.add(
        documents=[doc],
        ids=[f"doc_{i}"],
        embeddings=[embedding],
        metadatas={
            "source": path,
            "filename": path.split('/')[-1]
        }
    )

print(f"✅ Stored {collection.count()} documents")

# 持久化 / Persist
client.persist()
```

**元数据的作用 / Role of Metadata:**

```python
# 存储时添加元数据 / Add metadata when storing
metadata = {
    "source": "employee-handbook/remote-work-policy.md",
    "category": "HR",
    "date_updated": "2024-03-01"
}

# 检索时可以使用元数据过滤 / Use metadata to filter results
results = collection.query(
    query_embeddings=query_emb,
    where={"category": "HR"},  # 仅搜索 HR 文档
    n_results=3
)
```

---

#### **10vector_search_demo.py** 🔍 **向量搜索演示**

**概念 / Concept:** 从向量数据库中检索与查询最相似的文档

**搜索工作流程 / Search Workflow:**

```python
# 查询向量化 / Encode query
query = "What is the remote work policy?"
query_embedding = model.encode([query])

# 向量相似度搜索 / Vector similarity search
results = collection.query(
    query_embeddings=query_embedding,
    n_results=3  # 返回 Top 3
)

# 结果结构 / Result structure
for doc, distance, metadata in zip(
    results['documents'][0],
    results['distances'][0],
    results['metadatas'][0]
):
    print(f"Document: {metadata['filename']}")
    print(f"Similarity: {1 - distance:.4f}")  # 将距离转为相似度
    print(f"Content: {doc[:100]}...")
```

**距离 vs 相似度 / Distance vs Similarity:**

```
Cosine Distance = 1 - Cosine Similarity
离得近（Distance 小） → 相似度高（Similarity 大）
```

---

### **第四阶段：文本切分（Chunking） / Phase 4: Text Chunking**

#### 学习目标 / Learning Objectives

- 理解文本切分的必要性
- 掌握多种切分策略
- 学会选择合适的切分参数

---

#### **为什么需要切分？/ Why Chunking?**

```
原始问题：文档太长，不能直接放入 LLM 上下文
/ Original Problem: Documents are too long for LLM context

例子 / Example:
- 一份 20 页的员工手册 = 10,000 字 = ~3,000 Token
- 但 LLM 上下文可能只有 2,000 Token 用于文档

解决方案：将文档切分成小块
/ Solution: Split document into smaller chunks

优势 / Benefits:
✅ 每个 chunk 进入 LLM 时不超过 Token 限制
✅ LLM 可以专注于最相关的片段
✅ 向量搜索更精准（可以返回最相关的 chunk）
```

---

#### **11basic_chunking.py** ✂️ **基础字符级切分**

**概念 / Concept:** 最简单的切分方法：按字符数和分隔符递归切分

**切分参数 / Chunking Parameters:**

```python
from langchain_text_splitters import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=200,        # 每块最大 200 字符
    chunk_overlap=50,      # 块之间重叠 50 字符（防止语义断裂）
    separators=[
        "\n\n",    # 优先按段落分割
        "\n",      # 其次按行分割
        " ",       # 然后按空格分割
        ""         # 最后按字符分割
    ]
)

chunks = splitter.split_text(long_document)
```

**重叠（Overlap）的作用 / Purpose of Overlap:**

```
Without Overlap:
┌──────────────┐──────────────┐──────────────┐
│  Chunk 1     │  Chunk 2     │  Chunk 3     │
└──────────────┘──────────────┘──────────────┘
❌ 可能在边界处丧失上下文 / Might lose context at boundaries

With Overlap (50 chars):
┌──────────────────────┐
│     Chunk 1          │
└───────┬──────────────┘
        │  Overlap
        ├──────────────────────┐
        │     Chunk 2          │
        └───────┬──────────────┘
               │  Overlap
               ├──────────────────────┐
               │     Chunk 3          │
               └──────────────────────┘

✅ 保持上下文连贯性 / Maintains contextual continuity
```

**优缺点 / Pros & Cons:**

| 优点          | 缺点                  |
| ------------- | --------------------- |
| ✅ 快速简单   | ❌ 可能在句子中间切分 |
| ✅ 无需额外库 | ❌ 不理解语义         |
|               | ❌ 硬约束可能破坏语义 |

---

#### **12overlap_chunking.py** 🔄 **重叠切分演示**

**概念 / Concept:** 展示不同 overlap 参数对切分结果的影响

**参数实验 / Parameter Experiments:**

```python
# 实验不同 overlap 值 / Test different overlap values
for chunk_size in [100, 200, 500]:
    for overlap in [0, 25, 50, 100]:
        splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=overlap
        )
        chunks = splitter.split_text(document)
      
        print(f"Size: {chunk_size}, Overlap: {overlap}")
        print(f"  → Generated {len(chunks)} chunks")
        print(f"  → Avg chunk size: {np.mean([len(c) for c in chunks]):.0f}")
```

**最佳实践 / Best Practices:**

```
Overlap = Chunk Size × 10-15%

例如 / Example:
- chunk_size = 200 → overlap = 20-30
- chunk_size = 500 → overlap = 50-75
- chunk_size = 1000 → overlap = 100-150
```

---

#### **13sentence_chunking.py** 📝 **句子级切分**

**概念 / Concept:** 按完整句子切分，而不是任意字符位置，保持语义完整性

**为什么要句子级切分？/ Why Sentence-Level Chunking?**

```
字符级切分 / Character-level:
"..., which is important. Sometimes" → 可能破坏句子
                                  ↑ 不完整

句子级切分 / Sentence-level:
"..., which is important." "Sometimes..." → 完整句子
                           ↑ 语义完整
```

**实现方法 / Implementation:**

```python
import nltk
from nltk.tokenize import sent_tokenize

nltk.download('punkt')

def sentence_chunking(document, target_chunk_size=300):
    """主要逻辑：先按句子分割，再按大小合并"""
    sentences = sent_tokenize(document)
  
    chunks = []
    current_chunk = ""
  
    for sentence in sentences:
        if len(current_chunk) + len(sentence) < target_chunk_size:
            current_chunk += " " + sentence
        else:
            if current_chunk:
                chunks.append(current_chunk.strip())
            current_chunk = sentence
  
    if current_chunk:
        chunks.append(current_chunk.strip())
  
    return chunks
```

**优缺点 / Pros & Cons:**

| 优点            | 缺点                 |
| --------------- | -------------------- |
| ✅ 保持句子完整 | ❌ 需要额外的 NLP 库 |
| ✅ 更好的语义   | ❌ 对非英文支持一般  |
| ✅ 提高搜索质量 | ❌ 句子长短不一      |

---

#### **14chunking_problem_demo.py** 🚨 **切分问题演示**

**概念 / Concept:** 展示不同切分方法可能遇到的问题

**常见问题 / Common Issues:**

##### 问题 1：过度分割（Over-Chunking）

```
原文档 / Original document:
"The remote work policy requires a minimum 25 Mbps internet 
connection. This ensures reliable video conferencing."

过小块 (chunk_size=50):
Chunk 1: "The remote work policy requires"
Chunk 2: "a minimum 25 Mbps internet"
Chunk 3: "connection. This ensures reliable"
Chunk 4: "video conferencing."

❌ 问题：上下文丧失，很难理解
```

##### 问题 2：语义破裂（Semantic Break）

```
文档片段 / Document fragment:
"Employees on performance improvement plans cannot work remotely. 
However, exceptions may be granted by the HR director."

字符切分 (在中间):
Chunk 1: "Employees on performance improvement plans cannot work remotely. H"
Chunk 2: "owever, exceptions may be granted..."

❌ 问题：单词被拆分，向量化效果差
```

##### 问题 3：信息重要性丧失（Lost Semantics）

```
仅保留切分后的 chunks，而没有清楚的来源标记

结果 / Result:
- 知道"远程政策说 25 Mbps "
- 但不知道这来自哪个文档/部分
- RAG 时无法追溯源文件

✅ 解决：添加元数据，记录 chunk 来源
```

---

#### **15chunked_search.py** 🔍 **基于切分的搜索**

**概念 / Concept:** 演示使用切分后的 chunks 进行向量搜索，对比整文档搜索的差异

**搜索管道 / Search Pipeline:**

```
用户查询 / User Query
    ↓
向量化查询 / Vectorize query
    ↓
在 Chunk 向量库中搜索 / Search chunk embeddings
    ↓
返回最相关的 Top 3 chunks
    ↓
LLM 可以通过这些 chunks 生成答案
```

**代码示例 / Code Example:**

```python
# 步骤 1: 将 TechCorp 文档切分 / Step 1: Chunk documents
all_chunks = []
chunk_metadata = []

for doc, path in zip(documents, doc_paths):
    chunks = splitter.split_text(doc)
    all_chunks.extend(chunks)
  
    for i, chunk in enumerate(chunks):
        chunk_metadata.append({
            "source": path,
            "chunk_index": i,
            "total_chunks": len(chunks)
        })

# 步骤 2: 向量化所有 chunks / Step 2: Encode all chunks
chunk_embeddings = model.encode(all_chunks)

# 步骤 3: 搜索 / Step 3: Search
query = "What is the internet requirement for remote work?"
query_embedding = model.encode([query])
similarities = cosine_similarity(query_embedding, chunk_embeddings).flatten()

top_indices = similarities.argsort()[-3:][::-1]

# 步骤 4: 返回结果，包含元数据 / Step 4: Return with metadata
for idx in top_indices:
    print(f"Chunk from: {chunk_metadata[idx]['source']}")
    print(f"Content: {all_chunks[idx]}")
    print(f"Similarity: {similarities[idx]:.4f}")
    print()
```

**基于 Chunk 搜索的优势 / Advantages:**

- ✅ 返回更精准的信息片段
- ✅ 降低 LLM 上下文负担
- ✅ 提高 RAG 的答案质量
- ✅ 可以追溯源信息

---

#### **16agentic_chunking_demo.py** 🤖 **智能切分（Agentic Chunking）**

**概念 / Concept:** 使用 LLM 来指导切分策略，根据文档内容和语义结构自动决定最优切分点

**需要前置条件 / Prerequisites:**

```bash
# 需要配置 OpenAI API
# Requires OpenAI API setup
echo "OPENAI_API_KEY=sk-..." >> .env
```

**智能切分 vs 传统切分 / Agentic vs Traditional:**

```
传统切分 / Traditional:
固定参数（200 字符，50 重叠）
    ↓
无法应对复杂文档结构
    ↓
❌ 可能不适合每个文档

智能切分 / Agentic:
LLM 分析文档结构
    ↓
识别主题边界和逻辑分割点
    ↓
动态调整切分位置
    ↓
✅ 保持每个 chunk 的语义完整性
```

**工作流程 / Workflow:**

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

# 初始化 LLM / Initialize LLM
llm = ChatOpenAI(model="gpt-4o-mini")

# 构建提示词 / Build prompt
prompt = ChatPromptTemplate.from_template("""
请分析这个文档的逻辑结构。
确定最佳的切分点，使得每个块都是完整的主题单位。
返回应该在哪里切分（行号）：

文档：
{document}

切分建议：
""")

# 使用 LLM 指导切分 / Use LLM to guide chunking
analysis = llm.invoke(prompt.format(document=sample_doc))
suggested_breaks = parse_breaks(analysis.content)

# 按 LLM 建议切分 / Split based on suggestions
chunks = split_at_breaks(sample_doc, suggested_breaks)
```

**成本考量 / Cost Considerations:**

```
优点 / Pros:
✅ 最高质量的 chunks
✅ 理想用于重要文档

缺点 / Cons:
❌ 每个文档需要 LLM API 调用（成本高）
❌ 处理速度慢
❌ 不适合大量文档

适用场景 / Use Cases:
- 关键合同文档
- 学术论文
- 技术规范
```

---

### **第五阶段：完整 RAG 系统 / Phase 5: Complete RAG Architecture**

#### 学习目标 / Learning Objectives

- 理解完整的 RAG 数据流
- 掌握 RAG 系统的性能优化
- 学会评估和改进 RAG 系统质量

---

#### **RAG 完整管道 / Complete RAG Pipeline:**

```
┌─────────────────────────────────────────────────────────────┐
│                    用户查询 / User Query                     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              1. 查询向量化 / Query Embedding               │
│         将查询文本转为向量（384 维）                        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│        2. 向量数据库搜索 / Vector Database Search          │
│    在 ChromaDB 中找最相似的 Top 3 chunks                   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│        3. 检索相关文档 / Retrieved Chunks                   │
│              包含元数据（来源、日期等）                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│   4. 组织上下文 / Organize Context for LLM                 │
│  原始查询 + 检索的chunks + 系统提示                         │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│     5. LLM 推理生成 / LLM Reasoning & Generation          │
│          生成基于检索文档的回答                              │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│            最终答案 / Final Answer                           │
│          包含来源引用、可追溯性                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 工具函数详解 / Utils Functions

### **utils.py** 🛠️ **通用工具库**

```python
# 核心函数 / Core functions:

def read_techcorp_docs():
    """
    读取 techcorp-docs 目录下的所有 MD 文件
    支持多种路径（Lab 环境、本地开发、Windows/Linux）
    """
  
def get_doc_info():
    """
    打印已加载文档的摘要
    显示文件数、路径、内容预览
    """
```

---

## 📊 TechCorp 文档库结构 / Document Library Structure

```
techcorp-docs/
├── employee-handbook/
│   ├── benefits-overview.md      # 福利概览
│   ├── pet-policy.md             # 宠物政策
│   └── remote-work-policy.md    # 远程工作政策 ⭐ (核心文档)
├── customer-faqs/
│   └── general-faqs.md           # 常见问题
├── meeting-notes/
│   ├── product-launch-review.md # 产品发布审查
│   └── q3-planning-meeting.md   # Q3 规划会议
└── product-specs/
    ├── cloudsync-pro.md         # CloudSync Pro 产品规范
    └── datavault.md             # DataVault 产品规范
```

**文档大小与内容 / Sizes & Content:**

| 文件                  | 大小  | 关键主题                 |
| --------------------- | ----- | ------------------------ |
| remote-work-policy.md | 2KB   | 远程工作、核心时间、设备 |
| benefits-overview.md  | 1.5KB | 健康保险、退休、福利     |
| pet-policy.md         | 1KB   | 办公室宠物政策           |

---

## 🎯 推荐学习路径 / Recommended Learning Path

### 初学者路径（对 RAG 完全陌生）/ Beginner Path

```
01verify_environment.py
    ↓
02tfidf_search.py （理解关键词搜索）
    ↓
03bm25_search.py （对比搜索方法）
    ↓
06keyword_limitation_demo.py （理解局限性）
    ↓
07semantic_search_demo.py （引入语义搜索）
    ↓
04compare_methods.py （全面对比）
    ↓
05hybrid_search.py （混合搜索）
```

**时间：** 3-4 小时
**目标：** 理解从关键词到语义搜索的升级

---

### 实践者路径（要构建完整系统）/ Practitioner Path

```
初学者路径
    ↓
08init_vectordb.py （初始化向量库）
    ↓
09store_documents.py （批量存储）
    ↓
10vector_search_demo.py （向量搜索）
    ↓
11basic_chunking.py （基础切分）
    ↓
12overlap_chunking.py （切分优化）
    ↓
13sentence_chunking.py （更好的切分）
    ↓
15chunked_search.py （基于切分的搜索）
```

**时间：** 6-8 小时
**目标：** 构建一个完整的 RAG 系统原型

---

### 高级路径（生产级系统）/ Advanced Path

```
实践者路径
    ↓
14chunking_problem_demo.py （诊断问题）
    ↓
16agentic_chunking_demo.py （LLM 指导的切分）
    ↓
vectordb_concepts_demo.py （向量库高级概念）
    ↓
自定义项目：使用自己的文档
```

**时间：** 10+ 小时
**目标：** 构建生产级 RAG 系统，可处理实际数据

---

## 💡 关键概念速查表 / Quick Reference

### 搜索方法对比

| 方法     | 复杂度 | 质量 | 成本 | 何时用         |
| -------- | ------ | ---- | ---- | -------------- |
| TF-IDF   | 低     | 低   | 无   | 快速原型       |
| BM25     | 低     | 中   | 无   | 关键词重       |
| 语义搜索 | 中     | 高   | 低   | 标准 RAG       |
| 混合搜索 | 中     | 高   | 低   | **推荐** |
| 智能切分 | 高     | 很高 | 中   | 关键文档       |

### 切分参数建议

```
文档类型          chunk_size    overlap    separators
────────────────────────────────────────────────────
技术文档           200-300      50         ["\n\n","\n"]
网页内容           500-800      100        ["\n\n","\n\n"]
法律文件           1000+        200        ["\n\n","\n"]
对话/FAQs          100-200      20         ["\n",".","!"]
```

---

## 🚀 进阶应用 / Advanced Applications

### Application 1: 企业知识库系统

```python
# 输入：公司所有文档（30+ 文档）
# 流程：
1. 批量加载和切分
2. 向量化存储到 ChromaDB
3. 搭建 Flask API
4. 员工通过聊天界面查询

# 输出：员工能立即获得准确答案，附带来源链接
```

### Application 2: 法律文件检索

```python
# 输入：合同、条款、法律文档
# 流程：
1. 智能切分（agentic chunking）
2. 混合搜索（关键词 + 语义）
3. LLM 根据检索条款生成法律意见

# 输出：加速法律审查过程，降低人工成本
```

### Application 3: 产品文档助手

```python
# 输入：API 文档、用户手册、常见问题
# 流程：
1. 按照层次结构切分
2. 建立向量索引
3. 集成到网站的搜索框

# 输出：用户能快速找到相关文档和示例
```

---

## 📈 性能优化技巧 / Performance Tips

### 1. 搜索速度优化

```python
# ❌ 慢速：每次查询都重新编码
query = "remote work policy"
query_emb = model.encode(query)  # 每次都调用

# ✅ 快速：缓存已编码的查询
query_cache = {}
if query not in query_cache:
    query_cache[query] = model.encode(query)
query_emb = query_cache[query]
```

### 2. 批处理编码

```python
# ❌ 慢速：逐个编码
embeddings = [model.encode([doc]) for doc in documents]

# ✅ 快速：批处理
embeddings = model.encode(documents, batch_size=32)
```

### 3. 向量库索引优化

```python
# 为常用搜索字段添加索引
collection.create_index(["source", "category"])
```

---

## 🐛 常见错误与解决 / Troubleshooting

### ❌ 找不到 TechCorp 文档

```
原因：路径配置错误
解决：检查 utils.py 中的 possible_paths，确保路径正确

# 修改路径
possible_paths = [
    "绝对路径/techcorp-docs/**/*.md",
    ...
]
```

### ❌ 向量维度不匹配

```
原因：使用了不同的嵌入模型
解决：确保所有地方使用相同的模型
model = SentenceTransformer('all-MiniLM-L6-v2')  # 一致
```

### ❌ 搜索结果相关性差

```
原因：可能是切分、模型或权重问题
解决方案：
1. 尝试不同的 chunk_size（100 vs 300 vs 500）
2. 尝试不同的相似度阈值
3. 使用混合搜索而不是纯语义搜索
4. 查看 chunk 内容是否过长/过短
```

---

## 📚 扩展学习资源 / Learning Resources

### 核心概念

- **向量数据库：** https://www.pinecone.io/learn/vector-database/
- **RAG 架构：** https://arxiv.org/abs/2005.11401 (Retrieval-Augmented Generation 原论文)
- **Embedding 模型：** https://www.sbert.net/

### 工具文档

- **ChromaDB：** https://docs.trychroma.com/
- **LangChain：** https://python.langchain.com/
- **Sentence Transformers：** https://www.sbert.net/

### 最佳实践

- 向量搜索评估指标：NDCG, MAP, MRR
- RAG 系统评估：检索质量 + 生成质量
- 成本优化：本地模型 vs API 调用的权衡

---

## 🎓 本项目将教会你 / What You'll Learn

✅ 从零理解 RAG 的完整架构
✅ 对比 5 种不同的搜索方法
✅ 掌握 ChromaDB 向量数据库的使用
✅ 实现多种高级文本切分策略
✅ 理解何时使用哪种方法
✅ 构建自己的 RAG 系统原型
✅ 将系统部署或扩展到生产环境

---

## 📝 运行检查清单 / Running Checklist

在开始前，确保：

- [ ] 虚拟环境已激活
- [ ] `pip install -r requirements.txt` 已执行
- [ ] `python 01verify_environment.py` 通过
- [ ] TechCorp 文档库存在
- [ ] （可选）OpenAI API 已配置（用于 agentic chunking）

---

**最后更新 / Last Updated:** 2026-03-04
**版本 / Version:** 1.0
**支持语言 / Languages:** 中文 / English

---

**祝你 RAG 学习顺利！Happy RAG Learning! 🚀✨**
