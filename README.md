# 🎓 EduPlatform App


## Yêu cầu hệ thống

- Node.js 18.0 hoặc cao hơn
- npm hoặc yarn
- Git

## Hướng dẫn cài đặt

### Bước 1: Clone repository

```bash
git clone https://github.com/TruongDHiep/eduPlatform_app.git
```

### Bước 2: Di chuyển vào thư mục dự án

```bash
cd eduPlatform_app
```

### Bước 3: Cài đặt dependencies

Sử dụng npm:
```bash
npm install
```

Hoặc sử dụng yarn:
```bash
yarn install
```

### Bước 4: Chạy ứng dụng ở môi trường development

```bash
npm run dev
```

Hoặc:
```bash
yarn dev
```

### Bước 5: Mở trình duyệt

Ứng dụng sẽ chạy tại: [http://localhost:5173](http://localhost:5173)

## Scripts có sẵn

| Script | Mô tả |
|--------|-------|
| `npm run dev` | Chạy ứng dụng ở môi trường development |
| `npm run build` | Build ứng dụng cho production |
| `npm run preview` | Preview bản build |
| `npm run lint` | Kiểm tra lỗi code với ESLint |
| `npm run lint:fix` | Tự động sửa lỗi code với ESLint |

## Cấu trúc thư mục

```
eduPlatform_app/
├── public/                 # Static files
├── src/
│   ├── apis/              # API services
│   ├── assets/            # Images, icons
│   ├── components/        # React components
│   │   ├── course/        # Course related components
│   │   ├── layout/        # Layout components
│   │   ├── modal/         # Modal components
│   │   └── ui/            # UI components
│   ├── constants/         # Constants
│   ├── pages/             # Page components
│   ├── redux/             # Redux store & slices
│   └── utils/             # Utility functions
├── package.json
├── vite.config.js
└── README.md
```

## Build cho Production

### Tạo build

```bash
npm run build
```

### Preview build

```bash
npm run preview
```

Build files sẽ được tạo trong thư mục `dist/`.


## Troubleshooting

### Lỗi khi cài đặt dependencies
```bash
# Xóa node_modules và package-lock.json
rm -rf node_modules package-lock.json
# Cài đặt lại
npm install
```

### Lỗi port đã được sử dụng
```bash
# Thay đổi port trong vite.config.js hoặc chạy:
npm run dev -- --port 3000
```

### Lỗi ESLint
```bash
# Tự động sửa lỗi
npm run lint:fix
```

