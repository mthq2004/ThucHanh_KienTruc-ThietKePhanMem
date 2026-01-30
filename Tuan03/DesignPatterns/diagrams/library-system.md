# Library Management System - Multiple Design Patterns

## Sơ đồ tổng quan hệ thống

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     LIBRARY MANAGEMENT SYSTEM                                │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                     │    │
│  │   1. SINGLETON        2. FACTORY         3. STRATEGY               │    │
│  │   ┌─────────┐        ┌─────────┐        ┌─────────┐                │    │
│  │   │ Library │        │BookFact.│        │SearchCtx│                │    │
│  │   │  (1)    │        │         │        │         │                │    │
│  │   └────┬────┘        └────┬────┘        └────┬────┘                │    │
│  │        │                  │                  │                      │    │
│  │        │   creates        │  searches        │                      │    │
│  │        ▼                  ▼                  ▼                      │    │
│  │   ┌─────────────────────────────────────────────┐                  │    │
│  │   │                  Books[]                     │                  │    │
│  │   │  PrintedBook | EBook | AudioBook            │                  │    │
│  │   └─────────────────────────────────────────────┘                  │    │
│  │        │                                                            │    │
│  │        │ notifies                                                   │    │
│  │        ▼                                                            │    │
│  │   4. OBSERVER                      5. DECORATOR                    │    │
│  │   ┌─────────────┐                  ┌─────────────────┐             │    │
│  │   │ Observers[] │                  │ BorrowableBook  │             │    │
│  │   │ Staff/Member│                  │ + ExtendedLoan  │             │    │
│  │   └─────────────┘                  │ + Braille       │             │    │
│  │                                    │ + Translation   │             │    │
│  │                                    └─────────────────┘             │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 1. Singleton Pattern - Library

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Library                                            │
│                      <<Singleton>>                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ - instance: Library (static)                                                 │
│ - books: Book[]                                                              │
│ - borrowedBooks: BorrowRecord[]                                              │
│ - observers: LibraryObserver[]                                               │
│ - name: string                                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ + getInstance(): Library (static)                                            │
│ + resetInstance(): void (static)                                             │
│ + addBook(book): void                                                        │
│ + removeBook(bookId): boolean                                                │
│ + getAllBooks(): Book[]                                                      │
│ + getAvailableBooks(): Book[]                                                │
│ + borrowBook(bookId, user): BorrowRecord                                     │
│ + returnBook(bookId, user): boolean                                          │
│ + subscribe(observer): void                                                  │
│ + unsubscribe(observer): void                                                │
│ + notifyObservers(data): void                                                │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 2. Factory Method Pattern - BookFactory

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           <<abstract>>                                       │
│                              Book                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│ # id: string                                                                 │
│ # title: string                                                              │
│ # author: string                                                             │
│ # category: string                                                           │
│ # year: number                                                               │
│ # available: boolean                                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ + getType(): string (abstract)                                               │
│ + getDetails(): object                                                       │
│ + display(): void                                                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                    △
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          │                         │                         │
┌─────────┴─────────┐    ┌─────────┴─────────┐    ┌─────────┴─────────┐
│    PrintedBook    │    │       EBook       │    │     AudioBook     │
├───────────────────┤    ├───────────────────┤    ├───────────────────┤
│ - pages: number   │    │ - fileSize: MB    │    │ - duration: min   │
│ - publisher: str  │    │ - format: str     │    │ - narrator: str   │
│ - condition: str  │    │ - downloadCount   │    │ - playCount: num  │
├───────────────────┤    ├───────────────────┤    ├───────────────────┤
│ + getType()       │    │ + getType()       │    │ + getType()       │
│   => "📖 Sách giấy"│    │   => "💻 Sách ĐT" │    │   => "🎧 Sách nói"|
│ + getPages()      │    │ + download()      │    │ + play()          │
└───────────────────┘    └───────────────────┘    └───────────────────┘

                    ┌─────────────────────────────┐
                    │        BookFactory          │
                    ├─────────────────────────────┤
                    │ + createBook(type, data)    │
                    │ + createPrintedBook(data)   │
                    │ + createEBook(data)         │
                    │ + createAudioBook(data)     │
                    └─────────────────────────────┘
```

## 3. Strategy Pattern - Search

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           <<abstract>>                                       │
│                         SearchStrategy                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ + search(books, query): Book[]                                               │
│ + getName(): string                                                          │
└─────────────────────────────────────────────────────────────────────────────┘
                                    △
                                    │
     ┌──────────────┬───────────────┼───────────────┬──────────────┐
     │              │               │               │              │
┌────┴────┐   ┌────┴────┐    ┌─────┴─────┐   ┌────┴────┐   ┌────┴────┐
│SearchBy │   │SearchBy │    │SearchBy   │   │SearchBy │   │SearchBy │
│ Title   │   │ Author  │    │ Category  │   │  Year   │   │  Type   │
└─────────┘   └─────────┘    └───────────┘   └─────────┘   └─────────┘

                    ┌─────────────────────────────┐
                    │       SearchContext         │
                    ├─────────────────────────────┤
                    │ - strategy: SearchStrategy  │
                    │ - searchHistory: array      │
                    ├─────────────────────────────┤
                    │ + setStrategy(strategy)     │
                    │ + executeSearch(books, q)   │
                    │ + displayResults(results)   │
                    └─────────────────────────────┘
```

## 4. Observer Pattern - Notifications

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           <<abstract>>                                       │
│                        LibraryObserver                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ # name: string                                                               │
│ # email: string                                                              │
│ # notifications: Notification[]                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ + update(data): void (abstract)                                              │
│ + getName(): string                                                          │
│ + getNotifications(): Notification[]                                         │
│ + getUnreadNotifications(): Notification[]                                   │
└─────────────────────────────────────────────────────────────────────────────┘
                                    △
                                    │
              ┌─────────────────────┴─────────────────────┐
              │                                           │
┌─────────────┴───────────────────┐       ┌──────────────┴───────────────────┐
│        LibraryStaff              │       │        LibraryMember              │
│  (Nhân viên thư viện)            │       │  (Thành viên/Độc giả)             │
├──────────────────────────────────┤       ├───────────────────────────────────┤
│ - role: Role                     │       │ - memberType: MemberType          │
│   (LIBRARIAN|MANAGER|ASSISTANT)  │       │   (STUDENT|TEACHER|PUBLIC)        │
│ - id: string                     │       │ - borrowedBooks: array            │
├──────────────────────────────────┤       │ - favoriteCategories: array       │
│ + update(data)                   │       ├───────────────────────────────────┤
│   => Nhận tất cả thông báo       │       │ + update(data)                    │
│ + getRole(): Role                │       │   => Chỉ nhận NEW_BOOK            │
└──────────────────────────────────┘       │ + addFavoriteCategory(cat)        │
                                           └───────────────────────────────────┘
```

## 5. Decorator Pattern - Borrowing Features

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BorrowableBook                                       │
│                        (Component)                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ # book: Book                                                                 │
│ # borrowDate: Date                                                           │
│ # dueDate: Date                                                              │
│ # user: User                                                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ + borrow(user, days): void                                                   │
│ + returnBook(): boolean                                                      │
│ + getDetails(): object                                                       │
│ + getFee(): number                                                           │
└─────────────────────────────────────────────────────────────────────────────┘
                                    △
                                    │
                    ┌───────────────┴───────────────┐
                    │        BookDecorator          │
                    │      (Base Decorator)         │
                    ├───────────────────────────────┤
                    │ # wrappedBook: BorrowableBook │
                    ├───────────────────────────────┤
                    │ + borrow(user, days)          │
                    │ + returnBook()                │
                    │ + getDetails()                │
                    │ + getFee()                    │
                    └───────────────────────────────┘
                                    △
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          │                         │                         │
┌─────────┴─────────┐    ┌─────────┴─────────┐    ┌─────────┴─────────┐
│ ExtendedLoan      │    │ BrailleBook       │    │ TranslatedBook    │
│ Decorator         │    │ Decorator         │    │ Decorator         │
├───────────────────┤    ├───────────────────┤    ├───────────────────┤
│ - extraDays: num  │    │ - brailleFee: num │    │ - targetLang: str │
│ - extensionFee    │    ├───────────────────┤    │ - translationFee  │
├───────────────────┤    │ + borrow()        │    ├───────────────────┤
│ + borrow()        │    │ + getDetails()    │    │ + borrow()        │
│   => thêm ngày    │    │ + getFee()        │    │ + getDetails()    │
│ + getFee()        │    │   => +10.000đ     │    │ + getFee()        │
│   => +5.000đ      │    └───────────────────┘    │   => +15.000đ     │
└───────────────────┘                              └───────────────────┘

          ┌─────────────────────────┬─────────────────────────┐
          │                         │                         │
┌─────────┴─────────┐    ┌─────────┴─────────┐
│ PriorityDelivery  │    │ DigitalCopy       │
│ Decorator         │    │ Decorator         │
├───────────────────┤    ├───────────────────┤
│ - address: string │    │ - format: string  │
│ - deliveryFee: num│    │ - digitalFee: num │
├───────────────────┤    ├───────────────────┤
│ + borrow()        │    │ + borrow()        │
│   => giao hàng    │    │   => bản số       │
│ + getFee()        │    │ + getFee()        │
│   => +20.000đ     │    │   => +25.000đ     │
└───────────────────┘    └───────────────────┘
```

## System Context Diagram (C4 Model)

```
┌───────────────────────────────────────────────────────────────────────────┐
│                                                                           │
│                              Persons                                      │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                  │
│   │  Librarian  │    │   Member    │    │  Manager    │                  │
│   │ (Thủ thư)   │    │(Thành viên) │    │(Quản lý)    │                  │
│   └──────┬──────┘    └──────┬──────┘    └──────┬──────┘                  │
│          │                  │                  │                          │
│          │ Quản lý         │ Mượn sách       │ Giám sát                   │
│          │ sách            │ Tìm kiếm        │                           │
│          ▼                  ▼                  ▼                          │
│   ┌───────────────────────────────────────────────────────────────┐      │
│   │                LIBRARY MANAGEMENT SYSTEM                       │      │
│   │                                                                │      │
│   │  [Software System]                                             │      │
│   │                                                                │      │
│   │  - Quản lý sách (thêm, xóa, cập nhật)                         │      │
│   │  - Mượn/trả sách với nhiều tùy chọn                           │      │
│   │  - Tìm kiếm sách theo nhiều tiêu chí                          │      │
│   │  - Thông báo tự động cho người dùng                           │      │
│   │                                                                │      │
│   └───────────────────────────────────────────────────────────────┘      │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
```

## Container Diagram

```
┌───────────────────────────────────────────────────────────────────────────┐
│                     Library Management System                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                                                                     │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐ │  │
│  │  │Library Core │  │ Book Module │  │Search Module│  │Notification│ │  │
│  │  │ (Singleton) │──│  (Factory)  │──│ (Strategy)  │──│ (Observer) │ │  │
│  │  │             │  │             │  │             │  │            │ │  │
│  │  │ Quản lý     │  │ Tạo sách    │  │ Tìm kiếm    │  │ Thông báo  │ │  │
│  │  │ thư viện    │  │ các loại    │  │ sách        │  │ người dùng │ │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └────────────┘ │  │
│  │          │                                               │          │  │
│  │          │        ┌─────────────────────────┐           │          │  │
│  │          └───────▶│    Borrowing Module     │◀──────────┘          │  │
│  │                   │     (Decorator)         │                      │  │
│  │                   │                         │                      │  │
│  │                   │  Mượn sách với          │                      │  │
│  │                   │  tính năng mở rộng      │                      │  │
│  │                   └─────────────────────────┘                      │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────────┘
```

## Tổng kết các Design Patterns

| Pattern   | Mục đích                                  | Các class chính                           |
|-----------|-------------------------------------------|-------------------------------------------|
| Singleton | Đảm bảo chỉ có một Library                | Library                                   |
| Factory   | Tạo các loại sách khác nhau               | BookFactory, PrintedBook, EBook, AudioBook|
| Strategy  | Thay đổi chiến lược tìm kiếm              | SearchContext, SearchByTitle, SearchByAuthor, etc. |
| Observer  | Thông báo sách mới/quá hạn                | Library, LibraryStaff, LibraryMember      |
| Decorator | Mở rộng tính năng mượn sách               | BorrowableBook, ExtendedLoanDecorator, etc.|
