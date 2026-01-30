# Design Patterns Practice - Node.js

## Thông tin sinh viên
- **Họ và tên:** Mai Thành Hải Quân
- **MSSV:** 22653671

## Mục tiêu
Hiểu và áp dụng các Design Pattern đúng trong từng trường hợp cụ thể

## Cấu trúc dự án
```
DesignPatterns/
├── src/
│   ├── composite/          # I. Composite Design Pattern
│   │   ├── FileSystemComponent.js
│   │   ├── File.js
│   │   ├── Folder.js
│   │   ├── FileManager.js
│   │   └── index.js
│   ├── observer/           # II. Observer Design Pattern
│   │   ├── Subject.js
│   │   ├── Observer.js
│   │   ├── Stock.js
│   │   ├── Investor.js
│   │   ├── Task.js
│   │   ├── TeamMember.js
│   │   └── index.js
│   ├── adapter/            # III. Adapter Design Pattern
│   │   ├── JsonService.js
│   │   ├── XmlService.js
│   │   ├── XmlToJsonAdapter.js
│   │   └── index.js
│   └── library-system/     # IV. Library Management System
│       ├── patterns/
│       │   ├── Singleton.js      # Library singleton
│       │   ├── Factory.js        # Book factory
│       │   ├── Strategy.js       # Search strategies
│       │   ├── Observer.js       # Notification system
│       │   └── Decorator.js      # Extended features
│       └── index.js
├── diagrams/               # Sơ đồ UML/C4
├── package.json
└── index.js
```

## Cách chạy

### Chạy từng pattern riêng lẻ:
```bash
npm run composite    # Chạy Composite Pattern
npm run observer     # Chạy Observer Pattern
npm run adapter      # Chạy Adapter Pattern
npm run library      # Chạy Library Management System
```

### Chạy tất cả:
```bash
npm run all
```

## Design Patterns

### I. Composite Design Pattern
- **Mô tả:** Xây dựng hệ thống quản lý thư mục và tập tin theo mô hình cây
- **Thành phần:**
  - `FileSystemComponent`: Interface chung
  - `File`: Leaf (tập tin)
  - `Folder`: Composite (thư mục)
  - `FileManager`: Client

### II. Observer Design Pattern
- **Mô tả:** Thông báo thay đổi giá cổ phiếu và trạng thái công việc
- **Thành phần:**
  - `Subject`: Đối tượng bị theo dõi
  - `Observer`: Đối tượng theo dõi
  - `Stock/Task`: ConcreteSubject
  - `Investor/TeamMember`: ConcreteObserver

### III. Adapter Design Pattern
- **Mô tả:** Chuyển đổi dữ liệu giữa XML và JSON
- **Thành phần:**
  - `JsonService`: Target
  - `XmlService`: Adaptee
  - `XmlToJsonAdapter`: Adapter

### IV. Library Management System
Kết hợp 5 Design Patterns:
1. **Singleton:** Đảm bảo chỉ có một Library
2. **Factory Method:** Tạo các loại sách khác nhau
3. **Strategy:** Thay đổi chiến lược tìm kiếm
4. **Observer:** Thông báo sách mới/quá hạn
5. **Decorator:** Mở rộng chức năng mượn sách
