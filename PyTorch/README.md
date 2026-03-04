# PyTorch 深度学习完整课程 / PyTorch Deep Learning Complete Course

## 📚 项目概述 / Project Overview

这是一套**完整的 PyTorch 深度学习实战教程**，从张量基础知识到模型部署上线，涵盖数据处理、模型构建、训练优化、模型评估和生产部署等所有核心环节。项目采用**"演示 (Demo) + 习题 (Lab)"** 的双轨制学习模式，既有详细的讲解代码，也有实战编码题目，适合初学者和进阶开发者。

This is a comprehensive **PyTorch Deep Learning Hands-On Tutorial** that covers everything from tensor fundamentals to model deployment in production. It includes data processing, model building, training optimization, model evaluation, and production deployment. The project uses a dual-track learning model with **"Demos + Labs"**, offering both detailed explanatory code and practical coding exercises suitable for beginners and advanced developers.

---

## 🚀 快速开始 / Quick Start

### 环境安装 / Environment Setup

```bash
# 1. 克隆项目 / Clone the repository
git clone https://github.com/kodekloudhub/PyTorch.git
cd PyTorch

# 2. 创建虚拟环境 / Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 3. 安装依赖 / Install dependencies
pip install -r requirements.txt

# 4. 验证安装 / Verify installation
python -c "import torch; print(torch.__version__)"
```

### 检查依赖 / Required Packages

| 包名          | 版本      | 用途                                               |
| ------------- | --------- | -------------------------------------------------- |
| torch         | 2.4.1     | PyTorch 核心库 / Core framework                    |
| torchvision   | 0.19.1    | 计算机视觉工具 / Computer vision tools             |
| torchaudio    | 2.4.1     | 音频处理工具 / Audio processing tools              |
| pandas        | 2.2.3     | 数据分析与 CSV 处理 / Data analysis & CSV handling |
| pillow        | 10.4.0    | 图像处理 / Image processing                        |
| matplotlib    | 3.9.2     | 数据可视化 / Data visualization                    |
| opencv-python | 4.10.0.84 | 高级图像处理 / Advanced image processing           |
| torchmetrics  | 1.6.0     | 模型评估指标 / Model evaluation metrics            |

---

## 📖 完整课程大纲 / Complete Course Curriculum

### **第一部分：PyTorch 核心基础 / Section 1: PyTorch Fundamentals**

#### 🎯 学习目标 / Learning Objectives

- 理解张量(Tensor)的概念和操作
- 掌握 PyTorch 的基本语法
- 能够创建和操纵多维数组结构

---

#### **010-035 PyTorch 环境配置 / Setting Up PyTorch**

**概念 / Concept:** 正确配置开发环境，确保 PyTorch 库正确安装

**关键内容 / Key Content:**

- ✅ GPU/CPU 环境检测
- ✅ CUDA 工具包安装（如果使用 GPU）
- ✅ PyTorch 官方包安装
- ✅ 开发工具配置（Jupyter, IDE 等）

**实战应用 / Practical Application:**

```bash
# 检查 PyTorch 和 CUDA / Check PyTorch and CUDA
python -c "import torch; print(f'PyTorch: {torch.__version__}'); print(f'CUDA available: {torch.cuda.is_available()}')"
```

---

#### **010-065 PyTorch 张量介绍 / Introduction to PyTorch Tensors** ⭐ **重点**

**概念 / Concept:** 张量是 PyTorch 的基本数据结构，类似于 NumPy 的 ndarray，但具有 GPU 加速能力

**核心知识点 / Key Concepts:**

##### 1️⃣ 张量创建 / Tensor Creation

```python
import torch

# 从列表创建 / From list
tensor_1d = torch.tensor([1, 2, 3])        # Shape: (3,)
tensor_2d = torch.tensor([[1, 2], [3, 4]]) # Shape: (2, 2)
tensor_3d = torch.tensor([[[1, 2], [3, 4]], [[5, 6], [7, 8]]]) # Shape: (2, 2, 2)

# 随机初始化 / Random initialization
random_tensor = torch.rand(3, 4, 5)  # Shape: (3, 4, 5) 范围 [0, 1)
normal_tensor = torch.randn(2, 3)    # 正态分布 / Normal distribution
uniform_tensor = torch.rand(2, 3)    # 均匀分布 / Uniform distribution

# 特殊值初始化 / Special values
zeros_tensor = torch.zeros(2, 3)     # 全零张量 / All zeros
ones_tensor = torch.ones(2, 3)       # 全一张量 / All ones
empty_tensor = torch.empty(2, 3)     # 未初始化（随机值）/ Uninitialized

# 指定数据类型和设备 / Specify dtype and device
float_tensor = torch.tensor([1.0, 2.0], dtype=torch.float32)
int_tensor = torch.tensor([1, 2], dtype=torch.int32)
gpu_tensor = torch.tensor([1, 2], device='cuda')  # 放在 GPU 上
```

##### 2️⃣ 张量属性 / Tensor Attributes

```python
tensor = torch.rand(2, 3, 4)

# 形状 / Shape
print(tensor.shape)      # torch.Size([2, 3, 4])
print(tensor.size())     # torch.Size([2, 3, 4])

# 数据类型 / Data type
print(tensor.dtype)      # torch.float32

# 设备位置 / Device location
print(tensor.device)     # cpu 或 cuda:0

# 元素总数 / Total elements
print(tensor.numel())    # 24 (2 * 3 * 4)

# 维数 / Number of dimensions
print(tensor.dim())      # 3
```

##### 3️⃣ 索引与切片 / Indexing and Slicing

```python
tensor = torch.tensor([[10, 20, 30], [40, 50, 60], [70, 80, 90]])

# 行索引 / Row indexing
first_row = tensor[0]    # [10, 20, 30]

# 元素索引 / Element indexing
element = tensor[1, 2]   # 60

# 切片 / Slicing
first_two_rows = tensor[0:2]     # 前两行
middle_col = tensor[:, 1]        # 中间列
submatrix = tensor[0:2, 1:3]     # 左上 2x2 子矩阵
```

##### 4️⃣ 张量操作 / Tensor Operations

```python
tensor_a = torch.tensor([[1, 2], [3, 4]])
tensor_b = torch.tensor([[5, 6], [7, 8]])

# 算术操作 / Arithmetic operations
add_result = tensor_a + tensor_b        # 逐元素加法
sub_result = tensor_a - tensor_b        # 逐元素减法
mul_result = tensor_a * tensor_b        # 逐元素乘法（不是矩阵乘）
div_result = tensor_a / tensor_b        # 逐元素除法

# 矩阵乘法 / Matrix multiplication
matmul_result = torch.matmul(tensor_a, tensor_b)     # 或 tensor_a @ tensor_b
matrix_product = torch.mm(tensor_a, tensor_b)       # 仅用于 2D 张量

# 拼接 / Concatenation
concat_dim0 = torch.cat((tensor_a, tensor_b), dim=0)  # 沿行拼接
concat_dim1 = torch.cat((tensor_a, tensor_b), dim=1)  # 沿列拼接

# 堆叠 / Stacking
stacked = torch.stack((tensor_a, tensor_b), dim=0)    # 创建新维度

# 重形 / Reshaping
reshaped = tensor_a.reshape(4)        # 转换为 1D
reshaped = tensor_a.view(1, 4)        # 视图重形
flattened = tensor_a.flatten()        # 展平为 1D

# 转置 / Transpose
transposed = tensor_a.T               # 2D 转置
# permuted = tensor.permute(2, 0, 1)  # 3D 维度排列

# 聚合操作 / Aggregation operations
sum_all = tensor_a.sum()              # 所有元素和
sum_rows = tensor_a.sum(dim=1)        # 按行求和
mean_val = tensor_a.mean()            # 平均值
max_val = tensor_a.max()              # 最大值
min_val = tensor_a.min()              # 最小值
```

##### 5️⃣ 梯度计算 / Gradient Computation

```python
# PyTorch 最强大的特性：自动微分 / Automatic differentiation
tensor = torch.tensor([2.0, 3.0], requires_grad=True)

# 执行计算 / Perform computation
y = (tensor ** 2).sum()  # y = x1^2 + x2^2

# 反向传播 / Backward pass
y.backward()

# 访问梯度 / Access gradients
print(tensor.grad)  # [4.0, 6.0] (dy/dx1=2*x1, dy/dx2=2*x2)

# 清除梯度 / Clear gradients
tensor.grad.zero_()
```

**应用场景 / Use Cases:**

- 数据预处理与转换
- 神经网络的输入/输出
- 中间计算结果存储

---

#### **010-080 张量实战练习 / Using Tensors - Lab**

**习题概览 / Lab Overview:**
该部分包含 **9 个递进难度的编码题**，覆盖：

| 题目  | 难度   | 核心技能                                                     |
| ----- | ------ | ------------------------------------------------------------ |
| Q1-Q3 | ⭐     | 张量创建与基本操作 / Creation & basic operations             |
| Q4-Q6 | ⭐⭐   | 索引、切片、重形 / Indexing, slicing, reshaping              |
| Q7-Q9 | ⭐⭐⭐ | 矩阵运算、聚合、广播 / Matrix ops, aggregation, broadcasting |

**示例题目 / Sample Question:**

```python
# Question 1: 创建一个 2D 张量
# 使用 torch.tensor() 从两个列表创建二维张量，每个列表包含 4 个值
import torch 
tensor = torch.tensor([[1, 2, 3, 4], [5, 6, 7, 8]])
print(tensor.size())  # 输出: torch.Size([2, 4])
```

---

### **第二部分：数据处理与加载 / Section 2: Data Processing & Loading**

#### 🎯 学习目标 / Learning Objectives

- 掌握 PyTorch 数据集和数据加载器的使用
- 理解图像转换和数据增强技术
- 能够构建自定义数据集
- 实现训练/验证/测试集的划分

---

#### **020-015 PyTorch 数据集与数据加载器 / Datasets and DataLoaders** ⭐ **重点**

**概念 / Concept:** 数据集封装和数据加载是深度学习工作流的关键，PyTorch 提供了标准化的接口

**核心知识点 / Key Concepts:**

##### 1️⃣ 官方预加载数据集 / Official Pre-loaded Datasets

```python
import torchvision.datasets as dsets
from torchvision.transforms import ToTensor

# FashionMNIST 数据集（衣服分类）
dataset = dsets.FashionMNIST(
    root='./fashion',        # 数据存储路径
    train=False,             # False 表示加载测试集
    download=True,           # 本地无数据时自动下载
    transform=ToTensor()     # 自动将 PIL 图像转为张量
)

# 查看类别信息
print(dataset.classes)                    # ['T-shirt/top', 'Trouser', ...]
print(dataset.class_to_idx)              # {'T-shirt/top': 0, ...}

# 获取单个样本
image, label = dataset[0]                # image: (1, 28, 28), label: int
```

##### 2️⃣ DataLoader 批处理 / DataLoader for Batching

```python
from torch.utils.data import DataLoader

# 创建数据加载器
train_loader = DataLoader(
    dataset,
    batch_size=32,           # 每批样本数
    shuffle=True,            # 随机打乱顺序
    num_workers=2            # 多进程加载
)

# 迭代批次
for batch_images, batch_labels in train_loader:
    print(f"Images shape: {batch_images.shape}")  # (32, 1, 28, 28)
    print(f"Labels shape: {batch_labels.shape}")  # (32,)
    break  # 仅打印第一个批次
```

---

#### **020-045 图像转换与数据增强 / Image Transformations & Augmentation** ⭐ **重点**

**概念 / Concept:** 转换用于数据预处理；增强用于扩大数据多样性，防止过拟合

**核心知识点 / Key Concepts:**

##### 1️⃣ 基础转换 / Basic Transformations

```python
from torchvision import transforms
from PIL import Image

# 定义转换管道 / Define transformation pipeline
transformer = transforms.Compose([
    transforms.Resize((224, 224)),              # 调整大小 / Resize
    transforms.ToTensor(),                      # 转为张量 / To tensor
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],            # ImageNet 均值 / ImageNet mean
        std=[0.229, 0.224, 0.225]              # ImageNet 标准差 / ImageNet std
    )
])

# 应用转换 / Apply transformation
image = Image.open('image.jpg')
transformed = transformer(image)  # Output shape: (3, 224, 224)
```

##### 2️⃣ 数据增强技术 / Data Augmentation Techniques

```python
from torchvision.transforms import v2

# 定义增强管道 / Define augmentation pipeline
augmentation = v2.Compose([
    v2.ColorJitter(brightness=0.2, contrast=0.2),  # 亮度/对比度随机变化
    v2.RandomHorizontalFlip(p=0.5),                # 50% 概率水平翻转
    v2.RandomVerticalFlip(p=0.3),                  # 30% 概率竖直翻转
    v2.RandomRotation(degrees=15),                 # 随机旋转 ±15°
    v2.RandomAffine(degrees=0, translate=(0.1, 0.1)),  # 随机仿射变换
    v2.GaussianBlur(kernel_size=3),                # 高斯模糊
    v2.RandomPerspective(distortion_scale=0.2),    # 透视变换
])

# 应用增强 / Apply augmentation
augmented_image = augmentation(image)
```

**为什么需要数据增强？/ Why Data Augmentation?**

- ✅ 虚拟扩大数据集大小
- ✅ 提高模型的泛化能力
- ✅ 避免过拟合
- ✅ 让模型对图像变化更鲁棒（旋转、翻转、光照变化等）

---

#### **020-075 自定义数据集构建 / Building Custom Datasets** ⭐ **重点**

**概念 / Concept:** 为真实数据创建标准化的 PyTorch Dataset 接口

**核心知识点 / Key Concepts:**

##### 1️⃣ 数据清理与标注 / Data Cleaning & Annotation

```python
import glob
import pandas as pd
from PIL import Image

# 步骤 1: 查看所有图像 / Step 1: View all images
images_list = glob.glob("images/*/*jpg")
for image_path in images_list[:5]:
    img = Image.open(image_path)
    print(f"Image: {image_path}, Size: {img.size}")

# 步骤 2: 删除不良图像 / Step 2: Remove bad images
# （例如，模糊、损坏、错误标签的图像）
images_list.remove('images/cat/frog-1.jpg')

# 步骤 3: 创建标注文件 / Step 3: Create annotation file
data = []
for file_path in images_list:
    label = os.path.basename(os.path.dirname(file_path))  # 从路径提取类别
    data.append({"file_path": file_path, "label": label})

df = pd.DataFrame(data)
df.to_csv("image_data.csv", index=False)
```

##### 2️⃣ 自定义 Dataset 类 / Custom Dataset Class

```python
import pandas as pd
from torch.utils.data import Dataset
from PIL import Image
import os

class CustomImageDataset(Dataset):
    def __init__(self, annotations_file, transform=None):
        """
        参数说明 / Args:
            annotations_file (str): CSV 文件路径，包含 'file_path' 和 'label' 列
            transform (callable, optional): 应用于图像的转换 / Transformations to apply
        """
        self.img_labels = pd.read_csv(annotations_file)
        self.transform = transform

    def __len__(self):
        """返回数据集的总样本数 / Return total number of samples"""
        return len(self.img_labels)

    def __getitem__(self, idx):
        """获取第 idx 个样本 / Get the idx-th sample"""
        # 读取图像 / Read image
        img_path = self.img_labels.iloc[idx, 0]
        image = Image.open(img_path).convert('RGB')
      
        # 读取标签 / Read label
        label = self.img_labels.iloc[idx, 1]
      
        # 应用转换 / Apply transformations
        if self.transform:
            image = self.transform(image)
      
        return image, label
```

##### 3️⃣ 训练/验证/测试集划分 / Train/Validation/Test Split

```python
from torch.utils.data import DataLoader, random_split

# 创建完整数据集 / Create full dataset
full_dataset = CustomImageDataset(
    annotations_file='image_data.csv',
    transform=transformer
)

# 划分数据集（70% 训练，15% 验证，15% 测试）
train_size = int(0.7 * len(full_dataset))
val_size = int(0.15 * len(full_dataset))
test_size = len(full_dataset) - train_size - val_size

train_dataset, val_dataset, test_dataset = random_split(
    full_dataset, 
    [train_size, val_size, test_size]
)

# 创建数据加载器 / Create data loaders
train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=32, shuffle=False)
test_loader = DataLoader(test_dataset, batch_size=32, shuffle=False)
```

**最佳实践 / Best Practices:**

- ✅ 总是分离训练/验证/测试集
- ✅ 对训练集应用数据增强，对验证/测试集仅应用基本预处理
- ✅ 确保类别平衡（避免数据不平衡）
- ✅ 保存数据划分，以便后续重现实验

---

#### **020-030 数据集与加载器实战 / Lab**

#### **020-060 转换与增强实战 / Lab**

#### **020-090 构建自定义数据集实战 / Lab**

这三个 Lab 涵盖：

- 使用官方数据集
- 实现自定义转换
- 从本地图像文件构建数据集
- 数据集划分与统计

---

### **第三部分：模型构建与训练 / Section 3: Model Building & Training**

#### 🎯 学习目标 / Learning Objectives

- 掌握神经网络的搭建方法
- 理解模型训练的完整流程
- 学会模型保存和加载
- 掌握转迁学习技术
- 学会模型评估方法

---

#### **030-015 构建与训练模型 / Building and Training a Model** ⭐⭐ **核心重点**

**概念 / Concept:** 从零构建神经网络，理解前向传播、损失计算和反向传播

**核心知识点 / Key Concepts:**

##### 1️⃣ 定义神经网络 / Defining Neural Network

```python
import torch
import torch.nn as nn
import torch.nn.functional as F

class SimpleNeuralNetwork(nn.Module):
    """
    简单的全连接神经网络，用于分类任务
    A simple fully-connected neural network for classification
    """
    def __init__(self, input_size=10, num_classes=2):
        super(SimpleNeuralNetwork, self).__init__()
      
        # 定义层 / Define layers
        self.fc1 = nn.Linear(input_size, 128)          # 输入层 → 隐藏层1
        self.relu1 = nn.ReLU()                         # 激活函数
        self.dropout1 = nn.Dropout(0.3)                # Dropout 正则化
      
        self.fc2 = nn.Linear(128, 64)                  # 隐藏层1 → 隐藏层2
        self.relu2 = nn.ReLU()
        self.dropout2 = nn.Dropout(0.3)
      
        self.fc3 = nn.Linear(64, num_classes)          # 隐藏层2 → 输出层
  
    def forward(self, x):
        """
        前向传播 / Forward pass
        x: 输入张量，shape (batch_size, input_size)
        """
        x = self.fc1(x)
        x = self.relu1(x)
        x = self.dropout1(x)
      
        x = self.fc2(x)
        x = self.relu2(x)
        x = self.dropout2(x)
      
        x = self.fc3(x)  # 输出层，不加激活（由损失函数处理）
        return x

# 创建模型实例 / Create model instance
model = SimpleNeuralNetwork(input_size=784, num_classes=10)
print(model)
```

##### 2️⃣ 损失函数与优化器 / Loss Functions & Optimizers

```python
import torch.optim as optim

# 创建损失函数 / Create loss function
# 分类任务：交叉熵损失 / Classification: CrossEntropyLoss
criterion = nn.CrossEntropyLoss()

# 回归任务：均方误差 / Regression: MSELoss
mse_loss = nn.MSELoss()

# 创建优化器 / Create optimizer
optimizer = optim.Adam(
    model.parameters(),
    lr=0.001,              # 学习率 / Learning rate
    weight_decay=1e-5      # L2 正则化 / L2 regularization
)

# 其他常用优化器 / Other popular optimizers
sgd_optimizer = optim.SGD(model.parameters(), lr=0.01, momentum=0.9)
rmsprop_optimizer = optim.RMSprop(model.parameters(), lr=0.001)
```

##### 3️⃣ 完整训练循环 / Complete Training Loop

```python
num_epochs = 10
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model.to(device)

# 训练循环 / Training loop
for epoch in range(num_epochs):
    model.train()  # 设置为训练模式 / Set to training mode
    running_loss = 0.0
  
    for batch_images, batch_labels in train_loader:
        # 1️⃣ 将数据移到 GPU / Move data to device
        batch_images = batch_images.to(device)
        batch_labels = batch_labels.to(device)
      
        # 2️⃣ 梯度清零 / Zero the gradients
        optimizer.zero_grad()
      
        # 3️⃣ 前向传播 / Forward pass
        outputs = model(batch_images)
        loss = criterion(outputs, batch_labels)
      
        # 4️⃣ 反向传播 / Backward pass
        loss.backward()
      
        # 5️⃣ 梯度更新 / Update parameters
        optimizer.step()
      
        running_loss += loss.item()
  
    # 计算平均损失 / Calculate average loss
    avg_loss = running_loss / len(train_loader)
    print(f"Epoch [{epoch+1}/{num_epochs}], Loss: {avg_loss:.4f}")
  
    # 验证 / Validation
    model.eval()  # 设置为评估模式 / Set to evaluation mode
    with torch.no_grad():
        correct = 0
        total = 0
        for images, labels in val_loader:
            images = images.to(device)
            labels = labels.to(device)
          
            outputs = model(images)
            _, predicted = torch.max(outputs.data, 1)
          
            total += labels.size(0)
            correct += (predicted == labels).sum().item()
      
        accuracy = 100 * correct / total
        print(f"  Validation Accuracy: {accuracy:.2f}%")
```

##### 4️⃣ 理解激活函数 / Understanding Activation Functions

```python
import torch
import torch.nn as nn
import matplotlib.pyplot as plt

# 常用激活函数 / Common activation functions
activations = {
    'ReLU': nn.ReLU(),                    # y = max(0, x)
    'Sigmoid': nn.Sigmoid(),              # y = 1 / (1 + e^(-x))
    'Tanh': nn.Tanh(),                    # y = (e^x - e^(-x)) / (e^x + e^(-x))
    'LeakyReLU': nn.LeakyReLU(),          # y = x if x > 0, else 0.01x
    'ELU': nn.ELU(),                      # 指数线性单元 / Exponential Linear Unit
    'GELU': nn.GELU(),                    # 从 BERT 中流行 / Popular in BERT
}

# 绘制激活函数曲线 / Plot activation functions
x = torch.linspace(-3, 3, 100)
for name, activation in activations.items():
    y = activation(x)
    plt.plot(x.numpy(), y.numpy(), label=name)

plt.legend()
plt.grid()
plt.title('Activation Functions')
plt.show()
```

**为什么需要激活函数？/ Why Activation Functions?**

- 🔑 引入非线性，使网络能学习复杂函数
- 🔑 如果没有激活函数，多层网络等同于单个线性变换

---

#### **030-045 模型保存与加载 / Saving and Loading Models**

**概念 / Concept:** 将训练好的模型持久化，以便后续推理或继续训练

**核心知识点 / Key Concepts:**

##### 1️⃣ 保存方式对比 / Saving Methods Comparison

```python
import torch

# 方法 1: 保存完整模型 / Method 1: Save entire model
torch.save(model, 'model_complete.pth')
loaded_model = torch.load('model_complete.pth')

# 方法 2: 保存状态字典（推荐）/ Method 2: Save state_dict (Recommended)
torch.save(model.state_dict(), 'model_state.pth')

# 方法 3: 同时保存模型和优化器状态 / Method 3: Save model + optimizer
checkpoint = {
    'epoch': epoch,
    'model_state_dict': model.state_dict(),
    'optimizer_state_dict': optimizer.state_dict(),
    'loss': loss,
}
torch.save(checkpoint, 'checkpoint.pth')
```

**对比 / Comparison:**

| 方法       | 优点               | 缺点               | 用途               |
| ---------- | ------------------ | ------------------ | ------------------ |
| 完整模型   | 直接加载，简便     | 依赖代码定义       | 快速原型           |
| state_dict | 轻量级，灵活       | 需要手动定义模型类 | **生产环境** |
| Checkpoint | 完整，便于继续训练 | 文件较大           | 长期训练任务       |

##### 2️⃣ 加载模型 / Loading Models

```python
# 加载方式 1: 加载完整模型 / Load complete model
model = torch.load('model_complete.pth')

# 加载方式 2: 加载状态字典 / Load state_dict
model = SimpleNeuralNetwork()
model.load_state_dict(torch.load('model_state.pth'))

# 加载方式 3: 恢复检查点并继续训练 / Restore checkpoint
checkpoint = torch.load('checkpoint.pth')
model.load_state_dict(checkpoint['model_state_dict'])
optimizer.load_state_dict(checkpoint['optimizer_state_dict'])
epoch = checkpoint['epoch']
```

---

#### **030-105 高级训练方法 / Advanced Training Methods**

**概念 / Concept:** 提高模型训练效率和性能的高级技术

**核心知识点 / Key Concepts:**

##### 1️⃣ 学习率调度 / Learning Rate Scheduling

```python
from torch.optim.lr_scheduler import StepLR, CosineAnnealingLR

# 步长衰减 / Step decay
scheduler = StepLR(optimizer, step_size=10, gamma=0.1)  # 每 10 个 epoch 的学习率 ×0.1

# 余弦退火 / Cosine annealing
scheduler = CosineAnnealingLR(optimizer, T_max=10, eta_min=1e-6)

# 在每个 epoch 后更新 / Update after each epoch
for epoch in range(num_epochs):
    train()  # 训练
    scheduler.step()  # 更新学习率
```

##### 2️⃣ 正则化技术 / Regularization Techniques

```python
# L1 / L2 正则化 / L1/L2 Regularization
optimizer = optim.Adam(
    model.parameters(),
    weight_decay=1e-5  # L2 正则化系数
)

# Dropout（已在模型定义中展示）
self.dropout = nn.Dropout(p=0.3)  # 30% 的神经元在训练时被随机关闭

# 批归一化 / Batch Normalization
self.bn = nn.BatchNorm1d(num_features)  # 加速收敛，提高稳定性
```

##### 3️⃣ 混合精度训练 / Mixed Precision Training

```python
from torch.cuda.amp import autocast, GradScaler

scaler = GradScaler()

for epoch in range(num_epochs):
    for images, labels in train_loader:
        optimizer.zero_grad()
      
        # 使用自动混合精度 / Use automatic mixed precision
        with autocast():
            outputs = model(images)
            loss = criterion(outputs, labels)
      
        scaler.scale(loss).backward()
        scaler.step(optimizer)
        scaler.update()
```

**优势：** 加快训练速度，减少显存占用，无损精度

---

#### **030-135 模型评估 / Model Evaluation**

**概念 / Concept:** 全面评估模型性能的多维度指标

**核心知识点 / Key Concepts:**

##### 1️⃣ 分类指标 / Classification Metrics

```python
from torchmetrics import Accuracy, Precision, Recall, F1Score, ConfusionMatrix

# 初始化指标 / Initialize metrics
accuracy = Accuracy(task='multiclass', num_classes=10)
precision = Precision(task='multiclass', num_classes=10, average='weighted')
recall = Recall(task='multiclass', num_classes=10, average='weighted')
f1 = F1Score(task='multiclass', num_classes=10, average='weighted')

# 计算指标 / Calculate metrics
for images, labels in test_loader:
    outputs = model(images)
    preds = torch.argmax(outputs, dim=1)
  
    accuracy(preds, labels)
    precision(preds, labels)
    recall(preds, labels)
    f1(preds, labels)

print(f"Accuracy: {accuracy.compute():.4f}")
print(f"Precision: {precision.compute():.4f}")
print(f"Recall: {recall.compute():.4f}")
print(f"F1 Score: {f1.compute():.4f}")
```

##### 2️⃣ 混淆矩阵 / Confusion Matrix

```python
from sklearn.metrics import confusion_matrix, classification_report
import matplotlib.pyplot as plt
import seaborn as sns

# 收集所有预测和真实标签 / Collect all predictions
all_preds = []
all_labels = []

with torch.no_grad():
    for images, labels in test_loader:
        outputs = model(images)
        preds = torch.argmax(outputs, dim=1)
        all_preds.extend(preds.cpu().numpy())
        all_labels.extend(labels.cpu().numpy())

# 绘制混淆矩阵 / Plot confusion matrix
cm = confusion_matrix(all_labels, all_preds)
plt.figure(figsize=(10, 8))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.ylabel('True label')
plt.xlabel('Predicted label')
plt.title('Confusion Matrix')
plt.show()

# 打印分类报告 / Print classification report
print(classification_report(all_labels, all_preds))
```

---

#### **section 3 Labs**

| Lab     | 题目                       | 难度     |
| ------- | -------------------------- | -------- |
| 030-030 | 构建和训练模型             | ⭐⭐     |
| 030-060 | 图像分类模型训练与保存     | ⭐⭐⭐   |
| 030-120 | 迁移学习（使用预训练模型） | ⭐⭐⭐⭐ |
| 030-150 | 完整的模型评估流程         | ⭐⭐⭐   |

---

### **第四部分：模型部署 / Section 4: Model Deployment**

#### 🎯 学习目标 / Learning Objectives

- 了解不同的部署选项
- 掌握 Flask 模型服务
- 学会使用 Docker 容器化
- 理解 Kubernetes 编排部署

---

#### **040-010 部署选项概览 / Deployment Options**

**概念 / Concept:** 选择合适的部署策略取决于项目规模和需求

| 部署方式                | 使用场景                 | 复杂度 | 成本 |
| ----------------------- | ------------------------ | ------ | ---- |
| **本地/边缘设备** | 实时推理、隐私保护       | 低     | 低   |
| **Flask API**     | 小规模服务、快速原型     | 低     | 低   |
| **Docker 容器**   | 跨环境一致性、微服务     | 中     | 中   |
| **Kubernetes**    | 大规模、高可用、自动伸缩 | 高     | 高   |
| **云平台**        | AWS/Azure/GCP，托管服务  | 变     | 变   |

---

#### **040-040 Flask 模型服务 / Introduction to Flask**

**概念 / Concept:** 使用 Flask 快速搭建 HTTP API 服务

**核心知识点 / Key Concepts:**

##### 1️⃣ 基础 API 框架 / Basic API Framework

```python
from flask import Flask, request, jsonify
from PIL import Image
import torch
import torch.nn.functional as F
from torchvision import transforms
import io

app = Flask(__name__)

# 加载预训练模型 / Load pre-trained model
model = SimpleNeuralNetwork()
model.load_state_dict(torch.load('model_state.pth'))
model.eval()

# 定义转换 / Define transformations
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

class_names = ['cat', 'dog']  # 类别标签 / Class names

@app.route('/predict', methods=['POST'])
def predict():
    """
    接收图像，返回预测结果
    Receive image, return prediction
    """
    try:
        # 获取上传的图像 / Get uploaded image
        image_file = request.files['image']
        image = Image.open(io.BytesIO(image_file.read())).convert('RGB')
      
        # 预处理 / Preprocess
        image_tensor = transform(image).unsqueeze(0)  # 添加 batch 维度
      
        # 推理 / Inference
        with torch.no_grad():
            output = model(image_tensor)
            probabilities = F.softmax(output, dim=1)
            confidence, predicted_class = probabilities.max(1)
      
        # 返回结果 / Return results
        return jsonify({
            'class': class_names[predicted_class.item()],
            'confidence': float(confidence.item()),
            'probabilities': {
                class_names[i]: float(probabilities[0][i].item())
                for i in range(len(class_names))
            }
        })
  
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/health', methods=['GET'])
def health():
    """健康检查端点 / Health check endpoint"""
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5000)
```

##### 2️⃣ 测试 API / Testing API

```python
import requests
from PIL import Image

# 准备图像 / Prepare image
with open('test_image.jpg', 'rb') as f:
    files = {'image': f}
    response = requests.post('http://localhost:5000/predict', files=files)

print(response.json())
# 输出示例:
# {
#     "class": "dog",
#     "confidence": 0.95,
#     "probabilities": {"cat": 0.05, "dog": 0.95}
# }
```

---

#### **040-070 Docker 容器化 / Introduction to Docker**

**概念 / Concept:** 将应用及其依赖打包成容器，确保在任何环境中都能一致运行

**核心知识点 / Key Concepts:**

##### 1️⃣ Dockerfile 编写 / Writing Dockerfile

```dockerfile
# 使用官方 Python 基础镜像 / Use official Python base image
FROM python:3.10-slim

# 设置工作目录 / Set working directory
WORKDIR /app

# 复制要求文件 / Copy requirements file
COPY requirements.txt .

# 安装依赖 / Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# 复制应用代码 / Copy application code
COPY . .

# 暴露端口 / Expose port
EXPOSE 5000

# 设置启动命令 / Set startup command
CMD ["python", "app.py"]
```

##### 2️⃣ 构建和运行 Docker 镜像 / Building and Running Docker Image

```bash
# 构建镜像 / Build image
docker build -t pytorch-model-api:1.0 .

# 运行容器 / Run container
docker run -d -p 5000:5000 --name model-api pytorch-model-api:1.0

# 查看日志 / View logs
docker logs -f model-api

# 停止容器 / Stop container
docker stop model-api
```

---

#### **040-100 Kubernetes 编排 / Deploying to Kubernetes**

**概念 / Concept:** 使用 Kubernetes 管理大规模容器部署

**核心知识点 / Key Concepts:**

##### 1️⃣ Kubernetes Deployment / Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pytorch-model-deployment
spec:
  replicas: 3  # 运行 3 个实例 / Run 3 replicas
  selector:
    matchLabels:
      app: pytorch-model
  template:
    metadata:
      labels:
        app: pytorch-model
    spec:
      containers:
      - name: pytorch-model
        image: pytorch-model-api:1.0
        ports:
        - containerPort: 5000
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: pytorch-model-service
spec:
  selector:
    app: pytorch-model
  type: LoadBalancer  # 负载均衡器 / Load balancer
  ports:
  - protocol: TCP
    port: 80
    targetPort: 5000
```

##### 2️⃣ 部署命令 / Deployment Commands

```bash
# 应用配置 / Apply configuration
kubectl apply -f deployment.yaml

# 检查部署状态 / Check deployment status
kubectl get deployments
kubectl describe deployment pytorch-model-deployment

# 查看 Pod 日志 / View pod logs
kubectl logs -f <pod-name>

# 扩缩容 / Scale replicas
kubectl scale deployment pytorch-model-deployment --replicas=5
```

---

#### **section 4 Labs**

| Lab     | 题目                | 难度   |
| ------- | ------------------- | ------ |
| 040-050 | 使用 Flask 部署模型 | ⭐⭐   |
| 040-080 | Docker 容器化       | ⭐⭐   |
| 040-110 | Kubernetes 部署     | ⭐⭐⭐ |

---

## 🗺️ 完整学习路线图 / Complete Learning Roadmap

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Section 1: 基础概念                 Section 2: 数据处理        │
│  ├─ 张量创建与操作 (010-065)        ├─ 数据集加载 (020-015)   │
│  ├─ 张量实战 (010-080)              ├─ 数据转换 (020-045)     │
│  └─ Lab: 9 道递进习题                └─ 构建数据集 (020-075)   │
│                                                                 │
│  Section 3: 模型构建                 Section 4: 部署上线        │
│  ├─ 网络架构 (030-015)              ├─ Flask API (040-040)    │
│  ├─ 保存加载 (030-045)              ├─ Docker (040-070)       │
│  ├─ 高级技巧 (030-105)              └─ Kubernetes (040-100)   │
│  └─ 模型评估 (030-135)                                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 学习时间规划 / Learning Timeline

| 部分           | 内容           | 预计时间             | 难度   |
| -------------- | -------------- | -------------------- | ------ |
| Section 1      | 张量基础 + Lab | 4-6 小时             | ⭐     |
| Section 2      | 数据处理 + Lab | 6-8 小时             | ⭐⭐   |
| Section 3      | 模型训练 + Lab | 10-12 小时           | ⭐⭐⭐ |
| Section 4      | 模型部署 + Lab | 4-6 小时             | ⭐⭐   |
| **总计** |                | **24-32 小时** |        |

---

## 🎯 推荐学习路径 / Recommended Learning Paths

### 初学者路径（基础扎实）/ Beginner Path

```
010-065 张量入门
    ↓
010-080 张量习题（做完所有 9 题）
    ↓
020-015 数据集加载
    ↓
020-045 数据转换
    ↓
020-075 构建自定义数据集 + 相关 Lab
    ↓
030-015 构建模型
    ↓
030-045 保存加载
```

**时间：** 12-14 小时
**目标：** 理解 PyTorch 的核心概念和完整的训练流程

---

### 实践者路径（快速上手）/ Practitioner Path

```
初学者路径
    ↓
030-105 高级训练方法
    ↓
030-135 模型评估
    ↓
030-060 Lab（图像分类）
    ↓
040-040 Flask API
    ↓
040-050 Lab（Flask 部署）
```

**时间：** 20-24 小时
**目标：** 能够独立完成一个端到端的深度学习项目

---

### 专家路径（生产级应用）/ Expert Path

```
实践者路径
    ↓
030-120 Lab（转迁学习）
    ↓
030-150 Lab（完整评估）
    ↓
040-070 Docker 容器化
    ↓
040-080 Lab（Docker 部署）
    ↓
040-100 Kubernetes 编排
    ↓
040-110 Lab（Kubernetes 部署）
```

**时间：** 28-36 小时
**目标：** 构建生产级的可扩展深度学习系统

---

## 💡 核心概念速查 / Quick Reference Guide

### 张量操作速查 / Tensor Operations Cheat Sheet

```python
torch.tensor([1,2,3])              # 从列表创建
torch.rand(3,4)                    # 随机张量
torch.zeros(2,3)                   # 全零张量
torch.ones(2,3)                    # 全一张量
tensor.shape / tensor.size()       # 获取形状
tensor.reshape(4)                  # 重形
tensor.flatten()                   # 展平
tensor.T                           # 转置
tensor @ other_tensor              # 矩阵乘法
torch.cat([t1, t2], dim=0)        # 拼接
tensor.sum() / mean() / max()      # 聚合
tensor.to(device)                  # 移到设备
```

### 模型训练速查 / Model Training Cheat Sheet

```python
model = MyModel()
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

for epoch in range(num_epochs):
    for X, y in train_loader:
        optimizer.zero_grad()
        y_pred = model(X)
        loss = criterion(y_pred, y)
        loss.backward()
        optimizer.step()
```

### 常见损失函数 / Common Loss Functions

| 任务   | 损失函数                    | 用法               |
| ------ | --------------------------- | ------------------ |
| 二分类 | BCELoss / BCEWithLogitsLoss | 二元分类问题       |
| 多分类 | CrossEntropyLoss            | 多类分类（类互斥） |
| 回归   | MSELoss / MAELoss           | 回归问题           |
| 排序   | MarginRankingLoss           | 排序和排名问题     |

---

## 🐛 常见问题解决 / Troubleshooting Guide

### ❌ CUDA 错误 / CUDA Errors

```python
# 问题：RuntimeError: Expected all tensors to be on the same device
# 原因：张量和模型不在同一设备上
# 解决方案 / Solution:
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model.to(device)
X, y = X.to(device), y.to(device)
```

### ❌ 内存溢出 / Out of Memory

```python
# 解决方案 / Solutions:
1. 减小 batch_size (e.g., 32 → 16)
   reduce_batch_size()

2. 使用混合精度训练 / Use mixed precision
   from torch.cuda.amp import autocast
   with autocast():
       loss = model(X)

3. 梯度累积 / Use gradient accumulation
   loss = loss / accumulation_steps
   loss.backward()
   if (step + 1) % accumulation_steps == 0:
       optimizer.step()
       optimizer.zero_grad()
```

### ❌ 模型过拟合 / Overfitting

```python
# 解决方案 / Solutions:
1. 添加 Dropout
   self.dropout = nn.Dropout(0.5)

2. 使用正则化 / Use regularization
   optimizer = optim.Adam(model.parameters(), weight_decay=1e-5)

3. 数据增强 / Apply data augmentation
   transforms.Compose([
       transforms.RandomRotation(15),
       transforms.RandomFlip(),
   ])

4. 早停 / Early stopping
   if val_loss > best_val_loss:
       patience += 1
       if patience > 10:
           break
```

---

## 📚 学习资源 / Learning Resources

### 官方文档 / Official Documentation

- **PyTorch 官方：** https://pytorch.org/
- **PyTorch 教程：** https://pytorch.org/tutorials/
- **PyTorch API 参考：** https://pytorch.org/docs/stable/index.html

### 推荐书籍 / Recommended Books

- 《Deep Learning with PyTorch》- Eli Stevens & Luca Antiga
- 《Practical Deep Learning for Coders》 - Jeremy Howard (fast.ai)

### 在线课程 / Online Courses

- Fast.ai - Practical Deep Learning for Coders
- Stanford CS231N - Convolutional Neural Networks for Visual Recognition
- Kaggle Competitions - Hands-on practice with real datasets

---

## 📈 进度追踪 / Progress Tracking

完成后请打勾：

**Section 1: 基础概念**

- [ ] 010-035 设置(Setup)
- [ ] 010-065 张量介绍(Demo)
- [ ] 010-080 张量习题 Q1-Q9 (Lab)

**Section 2: 数据处理**

- [ ] 020-015 数据集与加载器(Demo)
- [ ] 020-030 数据集习题(Lab)
- [ ] 020-045 数据转换(Demo)
- [ ] 020-060 转换习题(Lab)
- [ ] 020-075 构建自定义数据集(Demo)
- [ ] 020-090 构建数据集习题(Lab)

**Section 3: 模型构建**

- [ ] 030-015 构建与训练(Demo)
- [ ] 030-030 构建训练习题(Lab)
- [ ] 030-045 保存加载(Demo)
- [ ] 030-060 图像分类习题(Lab)
- [ ] 030-105 高级方法(Demo)
- [ ] 030-120 转移学习习题(Lab)
- [ ] 030-135 模型评估(Demo)
- [ ] 030-150 评估习题(Lab)

**Section 4: 部署**

- [ ] 040-010 部署选项(Demo)
- [ ] 040-040 Flask 介绍(Demo)
- [ ] 040-050 Flask 部署习题(Lab)
- [ ] 040-070 Docker 介绍(Demo)
- [ ] 040-080 Docker 部署习题(Lab)
- [ ] 040-100 Kubernetes(Demo)
- [ ] 040-110 K8s 部署习题(Lab)

---

## 🎓 项目完成后的建议 / Next Steps

1. **构建个人项目**

   - 使用自己的数据集训练模型
   - 部署到云平台（AWS/GCP/Azure）
   - 开源你的项目到 GitHub
2. **深化专业知识**

   - 学习计算机视觉（CV）或自然语言处理（NLP）
   - 研究最新的论文和模型架构
   - 参与 Kaggle 竞赛
3. **性能优化**

   - 模型量化与剪枝
   - ONNX 模型转换
   - TorchScript 编译优化
4. **进阶主题**

   - 分布式训练
   - 联邦学习
   - 模型解释性 (XAI)

---

## 📝 许可证 / License

本项目遵循 MIT License

---

## 👨‍💻 贡献指南 / Contributing

欢迎提交 Issue 和 Pull Request！

---

## 📧 联系方式 / Contact

有问题？欢迎提出讨论！

---

**最后更新 / Last Updated:** 2026-03-04
**文档版本 / Documentation Version:** 1.0
**支持语言 / Languages Supported:** 中文 / English

---

## 🚀 快速参考 / Quick Links

| 概念         | 文件    | 难度   |
| ------------ | ------- | ------ |
| 张量基础     | 010-065 | ⭐     |
| 数据加载     | 020-015 | ⭐     |
| 数据增强     | 020-045 | ⭐⭐   |
| 自定义数据集 | 020-075 | ⭐⭐   |
| 模型构建     | 030-015 | ⭐⭐   |
| 模型保存     | 030-045 | ⭐     |
| 高级训练     | 030-105 | ⭐⭐⭐ |
| 模型评估     | 030-135 | ⭐⭐   |
| Flask 部署   | 040-040 | ⭐⭐   |
| Docker 化    | 040-070 | ⭐⭐   |
| Kubernetes   | 040-100 | ⭐⭐⭐ |

---

**祝你学习顺利！Happy Learning! 🎉🚀**
