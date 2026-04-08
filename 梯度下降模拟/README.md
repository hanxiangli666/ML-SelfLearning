# micrograd

![awww](puppy.jpg)

A tiny Autograd engine (with a bite! :)). Implements backpropagation (reverse-mode autodiff) over a dynamically built DAG and a small neural networks library on top of it with a PyTorch-like API. Both are tiny, with about 100 and 50 lines of code respectively. The DAG only operates over scalar values, so e.g. we chop up each neuron into all of its individual tiny adds and multiplies. However, this is enough to build up entire deep neural nets doing binary classification, as the demo notebook shows. Potentially useful for educational purposes.

一款小巧却功能强劲的自动求导引擎。可针对动态构建的有向无环图实现反向传播（反向模式自动微分），并在其基础上搭建了一个轻量级神经网络库，提供类似PyTorch的应用程序编程接口。二者均十分精简，代码量分别约为100行和50行。该有向无环图仅对标量数值进行运算，例如会将每个神经元拆解为一系列独立的微小加法与乘法运算。不过，正如演示笔记本文件所示，仅凭这些已足以构建完整的深度神经网络以完成二分类任务。该工具或对教学用途具有潜在价值。

### Project structure / 项目结构

This repository intentionally contains both notebooks and Python modules. The notebooks are for interactive learning and experiments, while the .py files are the reusable and testable implementation.

本项目同时包含 notebook 与 Python 源码文件，这是有意的设计：notebook 用于交互式学习与实验，.py 文件用于可复用、可测试、可维护的工程实现。

```text
.
├── demo.ipynb
├── trace_graph.ipynb
├── micrograd/
│   ├── __init__.py
│   ├── engine.py
│   └── nn.py
├── test/
│   └── test_engine.py
├── setup.py
└── README.md
```

- `demo.ipynb`
	- End-to-end training demo for binary classification (data -> loss -> backprop -> SGD -> decision boundary).
	- 二分类训练全流程演示，适合学习与调参。
- `trace_graph.ipynb`
	- Graphviz-based computation graph tracing and gradient visualization.
	- 用于观察计算图结构与梯度传播路径。
- `micrograd/engine.py`
	- Core scalar autograd engine (`Value`) with dynamic DAG construction and reverse-mode differentiation.
	- 自动求导核心实现，包含运算符重载与 `backward()` 反向传播。
- `micrograd/nn.py`
	- Tiny neural network library built on top of `Value` (`Neuron`, `Layer`, `MLP`).
	- 在引擎之上封装神经网络模块。
- `test/test_engine.py`
	- Unit tests that compare results against PyTorch to verify forward values and gradients.
	- 使用 PyTorch 作为参考实现，验证前向与梯度正确性。
- `setup.py`
	- Packaging metadata for installing/distributing this project as a Python package.
	- 项目打包发布配置。

Why not only notebooks?

- Notebooks are great for learning and visualization, but weak for long-term code reuse and regression checks.
- Source modules keep implementation clean and reusable.
- Tests ensure changes do not silently break gradients.

为什么不只保留 notebook？

- notebook 适合演示与实验，不擅长长期复用与回归校验。
- 核心逻辑放在源码中，结构更清晰，也便于被其他脚本导入。
- 测试可以防止“看起来能跑，但梯度已算错”的隐性问题。

### Installation

```bash
pip install micrograd
```

### Example usage

Below is a slightly contrived example showing a number of possible supported operations:

下面是一个稍作编排的示例，展示了多种可能支持的操作：

```python
from micrograd.engine import Value

a = Value(-4.0)
b = Value(2.0)
c = a + b
d = a * b + b**3
c += c + 1
c += 1 + c + (-a)
d += d * 2 + (b + a).relu()
d += 3 * d + (b - a).relu()
e = c - d
f = e**2
g = f / 2.0
g += 10.0 / f
print(f'{g.data:.4f}') # prints 24.7041, the outcome of this forward pass
g.backward()
print(f'{a.grad:.4f}') # prints 138.8338, i.e. the numerical value of dg/da
print(f'{b.grad:.4f}') # prints 645.5773, i.e. the numerical value of dg/db
```

### Training a neural net

The notebook `demo.ipynb` provides a full demo of training an 2-layer neural network (MLP) binary classifier. This is achieved by initializing a neural net from `micrograd.nn` module, implementing a simple svm "max-margin" binary classification loss and using SGD for optimization. As shown in the notebook, using a 2-layer neural net with two 16-node hidden layers we achieve the following decision boundary on the moon dataset:

notebook文件demo.ipynb提供了训练一个2层神经网络（多层感知机）二分类器的完整演示。实现过程包括从micrograd.nn模块初始化一个神经网络，实现简单的支持向量机“最大间隔”二分类损失函数，并采用随机梯度下降（SGD）进行优化。正如该notebook中所示，使用包含两个16神经元隐藏层的2层神经网络，我们在月牙形数据集上得到了如下决策边界：

![2d neuron](moon_mlp.png)

### Tracing / visualization

For added convenience, the notebook `trace_graph.ipynb` produces graphviz visualizations. E.g. this one below is of a simple 2D neuron, arrived at by calling `draw_dot` on the code below, and it shows both the data (left number in each node) and the gradient (right number in each node).

为提升使用便捷性，notebook文件trace_graph.ipynb可生成graphviz可视化图表。例如，下方所示即为一个简单的二维神经元图表，通过对下述代码调用draw_dot方法绘制而成，该图表同时展示了数据（每个节点左侧的数值）与梯度（每个节点右侧的数值）。

```python
from micrograd import nn
n = nn.Neuron(2)
x = [Value(1.0), Value(-2.0)]
y = n(x)
dot = draw_dot(y)
```

![2d neuron](gout.svg)

### Running tests

To run the unit tests you will have to install [PyTorch](https://pytorch.org/), which the tests use as a reference for verifying the correctness of the calculated gradients. Then simply:

要运行单元测试，你必须安装PyTorch，测试会将其用作参考，以验证计算出的梯度是否正确。之后只需执行以下操作：

```bash
python -m pytest
```
