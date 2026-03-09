# Image Optimizer / 图像优化器

<div align="center">

A powerful web-based image optimization tool that reduces file size without compromising quality.

一个强大的基于网页的图像优化工具，在不影响质量的前提下减小文件大小。

</div>

---

## 📋 Overview / 项目概述

### English

Image Optimizer is a full-stack web application designed to optimize images for web usage. It combines a React-based frontend with a Flask backend powered by OpenCV and Pillow for high-quality image compression. The tool provides an intuitive interface for users to upload images, adjust compression quality, and compare results in real-time.

### 中文

图像优化器是一个全栈网页应用程序，专为优化网页图像而设计。它结合了基于 React 的前端和由 OpenCV 和 Pillow 驱动的 Flask 后端，实现高质量的图像压缩。该工具提供直观的界面，让用户可以上传图像、调整压缩质量并实时比较结果。

---

## ✨ Key Features / 核心功能

### English

- **Smart Image Compression**: Reduce file sizes while maintaining visual quality
- **Quality Control**: Adjustable compression quality (0-100)
- **Real-time Comparison**: View original and optimized images side-by-side
- **File Size Display**: See exact file size before and after optimization
- **Multi-format Support**: Supports PNG, JPG, and JPEG formats
- **RESTful API**: Easy integration with other applications
- **Secure Processing**: File validation and sanitization for security
- **Modern UI**: Clean, responsive interface built with React

### 中文

- **智能图像压缩**：在保持视觉质量的同时减小文件大小
- **质量控制**：可调节的压缩质量（0-100）
- **实时对比**：并排查看原始图像和优化后的图像
- **文件大小显示**：查看优化前后的确切文件大小
- **多格式支持**：支持 PNG、JPG 和 JPEG 格式
- **RESTful API**：易于与其他应用程序集成
- **安全处理**：文件验证和清理以确保安全性
- **现代化界面**：使用 React 构建的简洁、响应式界面

---

## 🏗️ Architecture / 架构设计

### English

The project consists of two main components:

**Backend (`imageoptimizer.app`)**

- Framework: Flask 3.1.0
- Image Processing: OpenCV 4.10.0 + Pillow 11.0.0
- CORS Support: Flask-CORS 5.0.0
- Security: Input validation and sanitization

**Frontend (`imageoptimizer.web`)**

- Framework: React 18.3.1
- Build Tool: Vite 5.4.10
- Code Quality: ESLint
- Development Server: Fast refresh with HMR

### 中文

项目由两个主要组件组成：

**后端 (`imageoptimizer.app`)**

- 框架：Flask 3.1.0
- 图像处理：OpenCV 4.10.0 + Pillow 11.0.0
- 跨域支持：Flask-CORS 5.0.0
- 安全性：输入验证和清理

**前端 (`imageoptimizer.web`)**

- 框架：React 18.3.1
- 构建工具：Vite 5.4.10
- 代码质量：ESLint
- 开发服务器：支持热模块替换（HMR）的快速刷新

---

## 📦 Technology Stack / 技术栈

### English

**Backend:**

- Python 3.8+
- Flask 3.1.0
- OpenCV 4.10.0
- Pillow 11.0.0
- NumPy 2.1.3
- Flask-CORS 5.0.0

**Frontend:**

- React 18.3.1
- Vite 5.4.10
- JavaScript (ES6+)
- CSS3

### 中文

**后端：**

- Python 3.8+
- Flask 3.1.0
- OpenCV 4.10.0
- Pillow 11.0.0
- NumPy 2.1.3
- Flask-CORS 5.0.0

**前端：**

- React 18.3.1
- Vite 5.4.10
- JavaScript (ES6+)
- CSS3

---

## 🚀 Installation Guide / 安装指南

### Prerequisites / 前置要求

#### English

**Backend Requirements:**

- Python 3.8 or higher
- pip (Python package manager)
- Virtual environment (recommended)

**Frontend Requirements:**

- Node.js (version 18 or later)
- npm (version 9 or later)

#### 中文

**后端要求：**

- Python 3.8 或更高版本
- pip（Python 包管理器）
- 虚拟环境（推荐）

**前端要求：**

- Node.js（18 或更高版本）
- npm（9 或更高版本）

---

### Backend Setup (Python/Flask) / 后端设置

#### English

> **Note:** Backend code is located in `imageoptimizer.app`

1. **Clone the Repository**

```bash
git clone https://github.com/JeremyMorgan/Super-Image-Optimizer.git
cd Super-Image-Optimizer/imageoptimizer.app
```

2. **Create a Virtual Environment**

```bash
# On macOS/Linux
python3 -m venv venv
source venv/bin/activate

# On Windows
python -m venv venv
venv\Scripts\activate
```

3. **Install Dependencies**

```bash
pip install -r requirements.txt
```

4. **Run the Application**

```bash
# Direct method
python run.py

# Or using Flask CLI
export FLASK_APP=run.py  # On Windows: set FLASK_APP=run.py
flask run
```

The backend server will start at `http://127.0.0.1:5000`

#### 中文

> **注意：** 后端代码位于 `imageoptimizer.app` 目录

1. **克隆仓库**

```bash
git clone https://github.com/JeremyMorgan/Super-Image-Optimizer.git
cd Super-Image-Optimizer/imageoptimizer.app
```

2. **创建虚拟环境**

```bash
# macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

3. **安装依赖**

```bash
pip install -r requirements.txt
```

4. **运行应用程序**

```bash
# 直接运行
python run.py

# 或使用 Flask CLI
export FLASK_APP=run.py  # Windows: set FLASK_APP=run.py
flask run
```

后端服务器将在 `http://127.0.0.1:5000` 启动

---

### Frontend Setup (React/Vite) / 前端设置

#### English

> **Note:** Frontend code is located in `imageoptimizer.web`

1. **Navigate to Frontend Directory**

```bash
cd Super-Image-Optimizer/imageoptimizer.web
```

2. **Install Dependencies**

```bash
npm install
```

3. **Configure Backend Connection**
   Ensure the backend server is running at `http://127.0.0.1:5000`. The frontend is configured to connect to this endpoint by default.
4. **Run Development Server**

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

5. **Build for Production**

```bash
npm run build
```

6. **Preview Production Build**

```bash
npm run preview
```

#### 中文

> **注意：** 前端代码位于 `imageoptimizer.web` 目录

1. **进入前端目录**

```bash
cd Super-Image-Optimizer/imageoptimizer.web
```

2. **安装依赖**

```bash
npm install
```

3. **配置后端连接**
   确保后端服务器运行在 `http://127.0.0.1:5000`。前端默认配置连接到此端点。
4. **运行开发服务器**

```bash
npm run dev
```

应用程序将在 `http://localhost:5173` 可用

5. **生产环境构建**

```bash
npm run build
```

6. **预览生产构建**

```bash
npm run preview
```

---

## 📚 API Documentation / API 文档

### English

#### POST `/upload`

Upload and optimize an image.

**Request:**

- Method: `POST`
- Content-Type: `multipart/form-data`
- Parameters:
  - `image` (file): Image file (PNG, JPG, JPEG)
  - `quality` (integer): Compression quality (0-100)

**Response:**

- Success (200): Optimized image file (binary)
- Error (400): JSON error message

**Example using cURL:**

```bash
curl -X POST \
  -F "image=@/path/to/image.jpg" \
  -F "quality=80" \
  http://127.0.0.1:5000/upload \
  -o optimized_image.jpg
```

### 中文

#### POST `/upload`

上传并优化图像。

**请求：**

- 方法：`POST`
- 内容类型：`multipart/form-data`
- 参数：
  - `image`（文件）：图像文件（PNG、JPG、JPEG）
  - `quality`（整数）：压缩质量（0-100）

**响应：**

- 成功（200）：优化后的图像文件（二进制）
- 错误（400）：JSON 错误消息

**cURL 示例：**

```bash
curl -X POST \
  -F "image=@/path/to/image.jpg" \
  -F "quality=80" \
  http://127.0.0.1:5000/upload \
  -o optimized_image.jpg
```

---

## 🛠️ Available Scripts / 可用脚本

### English

**Frontend:**

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

**Backend:**

- `python run.py` - Start Flask development server
- `flask run` - Alternative method to start server

### 中文

**前端：**

- `npm run dev` - 启动开发服务器（支持热重载）
- `npm run build` - 生产环境构建
- `npm run preview` - 本地预览生产构建
- `npm run lint` - 运行 ESLint 进行代码质量检查

**后端：**

- `python run.py` - 启动 Flask 开发服务器
- `flask run` - 启动服务器的替代方法

---

## 📁 Project Structure / 项目结构

### English

```
AI-Assisted-Development/
├── imageoptimizer.app/          # Backend Flask application
│   ├── app/
│   │   ├── __init__.py         # Flask app factory
│   │   ├── routes.py           # API endpoints
│   │   └── templates/          # HTML templates
│   ├── run.py                   # Application entry point
│   ├── requirements.txt         # Python dependencies
│   └── programmer.md           # Developer documentation
├── imageoptimizer.web/          # Frontend React application
│   ├── src/
│   │   ├── App.jsx             # Main React component
│   │   ├── App.css             # Styles
│   │   └── main.jsx            # Entry point
│   ├── public/                  # Static assets
│   ├── package.json            # Node dependencies
│   ├── vite.config.js          # Vite configuration
│   └── programmer.md           # Developer documentation
├── docs/                        # Project documentation
├── samples/                     # Sample images for testing
├── README.md                   # This file
└── LICENSE                     # CC0 1.0 Universal License
```

### 中文

```
AI-Assisted-Development/
├── imageoptimizer.app/          # 后端 Flask 应用
│   ├── app/
│   │   ├── __init__.py         # Flask 应用工厂
│   │   ├── routes.py           # API 端点
│   │   └── templates/          # HTML 模板
│   ├── run.py                   # 应用程序入口点
│   ├── requirements.txt         # Python 依赖
│   └── programmer.md           # 开发者文档
├── imageoptimizer.web/          # 前端 React 应用
│   ├── src/
│   │   ├── App.jsx             # 主 React 组件
│   │   ├── App.css             # 样式
│   │   └── main.jsx            # 入口点
│   ├── public/                  # 静态资源
│   ├── package.json            # Node 依赖
│   ├── vite.config.js          # Vite 配置
│   └── programmer.md           # 开发者文档
├── docs/                        # 项目文档
├── samples/                     # 测试用示例图片
├── README.md                   # 本文件
└── LICENSE                     # CC0 1.0 通用许可证
```

---

## 🔒 Security Features / 安全特性

### English

- **File Type Validation**: Extension and content verification
- **Secure Filename Handling**: Uses `werkzeug.secure_filename`
- **Image Verification**: Double validation with `imghdr` and Pillow
- **Input Sanitization**: Quality parameter validation (0-100)
- **CORS Configuration**: Controlled cross-origin requests

### 中文

- **文件类型验证**：扩展名和内容验证
- **安全文件名处理**：使用 `werkzeug.secure_filename`
- **图像验证**：使用 `imghdr` 和 Pillow 进行双重验证
- **输入清理**：质量参数验证（0-100）
- **CORS 配置**：受控的跨域请求

---

## 🧪 Testing / 测试

### English

Sample images are provided in the `samples/` directory for testing:

- Various formats (JPG, PNG, GIF)
- Different sizes and dimensions
- Test edge cases

### 中文

`samples/` 目录中提供了用于测试的示例图像：

- 各种格式（JPG、PNG、GIF）
- 不同的大小和尺寸
- 测试边界情况

---

## 🤝 Contributing / 参与贡献

### English

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 中文

欢迎贡献！以下是您可以提供帮助的方式：

1. Fork 本仓库
2. 创建功能分支（`git checkout -b feature/AmazingFeature`）
3. 提交更改（`git commit -m 'Add some AmazingFeature'`）
4. 推送到分支（`git push origin feature/AmazingFeature`）
5. 开启 Pull Request

---

## 📄 License / 许可证

### English

This project is licensed under the Creative Commons License (CC0 1.0 Universal). See the [LICENSE](LICENSE) file for details.

This means you can:

- Use the code commercially
- Modify the code
- Distribute the code
- Use the code privately

### 中文

本项目采用知识共享许可证（CC0 1.0 通用）。详见 [LICENSE](LICENSE) 文件。

这意味着您可以：

- 商业使用代码
- 修改代码
- 分发代码
- 私人使用代码

---

## 📞 Contact & Support / 联系与支持

### English

For questions, suggestions, or issues:

- Open an issue on GitHub
- Contact the repository owner

### 中文

如有问题、建议或错误报告：

- 在 GitHub 上开启 issue
- 联系仓库所有者

---

## 🙏 Acknowledgments / 致谢

### English

- Built with Flask and React
- Image processing powered by OpenCV and Pillow
- UI components styled with modern CSS

### 中文

- 使用 Flask 和 React 构建
- 图像处理由 OpenCV 和 Pillow 提供支持
- 使用现代 CSS 设计 UI 组件

---

<div align="center">

**Made with ❤️ for the developer community**

**用 ❤️ 为开发者社区打造**

</div>
