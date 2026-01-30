# Observer Design Pattern - Class Diagram

## Sơ đồ UML Class Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           <<abstract>>                                       │
│                            Subject                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ # observers: Observer[]                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ + subscribe(observer: Observer): void                                        │
│ + unsubscribe(observer: Observer): void                                      │
│ + notify(data: object): void                                                 │
│ + getObserverCount(): number                                                 │
└─────────────────────────────────────────────────────────────────────────────┘
                                    △
                                    │
              ┌─────────────────────┴─────────────────────┐
              │                                           │
┌─────────────┴───────────────────┐       ┌──────────────┴───────────────────┐
│           Stock                  │       │           Task                    │
│    (ConcreteSubject)             │       │    (ConcreteSubject)              │
├──────────────────────────────────┤       ├───────────────────────────────────┤
│ - symbol: string                 │       │ - id: string                      │
│ - companyName: string            │       │ - title: string                   │
│ - price: number                  │       │ - status: string                  │
│ - priceHistory: array            │       │ - priority: string                │
├──────────────────────────────────┤       │ - assignee: string                │
│ + getPrice(): number             │       ├───────────────────────────────────┤
│ + setPrice(price): void          │       │ + getStatus(): string             │
│ + getSymbol(): string            │       │ + setStatus(status): void         │
│ + getPriceHistory(): array       │       │ + setPriority(priority): void     │
└──────────────────────────────────┘       │ + assign(assignee): void          │
                                           └───────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                           <<abstract>>                                       │
│                            Observer                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ # name: string                                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ + update(data: object): void                                                 │
│ + getName(): string                                                          │
└─────────────────────────────────────────────────────────────────────────────┘
                                    △
                                    │
              ┌─────────────────────┴─────────────────────┐
              │                                           │
┌─────────────┴───────────────────┐       ┌──────────────┴───────────────────┐
│          Investor                │       │         TeamMember                │
│    (ConcreteObserver)            │       │    (ConcreteObserver)             │
├──────────────────────────────────┤       ├───────────────────────────────────┤
│ - email: string                  │       │ - email: string                   │
│ - notifications: array           │       │ - role: string                    │
│ - portfolio: array               │       │ - notifications: array            │
├──────────────────────────────────┤       ├───────────────────────────────────┤
│ + update(data): void             │       │ + update(data): void              │
│ + getNotifications(): array      │       │ + getNotifications(): array       │
│ + getUnreadNotifications(): arr  │       │ + getRole(): string               │
│ + markAllAsRead(): void          │       │ + markAllAsRead(): void           │
└──────────────────────────────────┘       └───────────────────────────────────┘
```

## System Context Diagram (C4 Model)

### Trường hợp 1: Theo dõi cổ phiếu

```
┌───────────────────────────────────────────────────────────────────────────┐
│                                                                           │
│                              Person                                       │
│                        ┌─────────────┐                                    │
│                        │  Investor   │                                    │
│                        │ (Nhà đầu   │                                    │
│                        │   tư)       │                                    │
│                        └─────┬───────┘                                    │
│                              │                                            │
│                              │ Nhận thông báo                             │
│                              ▼                                            │
│                  ┌───────────────────────┐                                │
│                  │   Stock Notification  │                                │
│                  │       System          │                                │
│                  │                       │                                │
│                  │  [Software System]    │                                │
│                  │                       │                                │
│                  │  Thông báo thay đổi   │                                │
│                  │  giá cổ phiếu         │                                │
│                  └───────────────────────┘                                │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
```

### Trường hợp 2: Theo dõi trạng thái Task

```
┌───────────────────────────────────────────────────────────────────────────┐
│                                                                           │
│                              Person                                       │
│                        ┌─────────────┐                                    │
│                        │ Team Member │                                    │
│                        │ (Thành viên │                                    │
│                        │   nhóm)     │                                    │
│                        └─────┬───────┘                                    │
│                              │                                            │
│                              │ Nhận thông báo                             │
│                              ▼                                            │
│                  ┌───────────────────────┐                                │
│                  │   Task Management     │                                │
│                  │   Notification System │                                │
│                  │                       │                                │
│                  │  [Software System]    │                                │
│                  │                       │                                │
│                  │  Thông báo thay đổi   │                                │
│                  │  trạng thái task      │                                │
│                  └───────────────────────┘                                │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
```

## Container Diagram

```
┌───────────────────────────────────────────────────────────────────────────┐
│                        Notification System                                │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                                                                     │  │
│  │    ┌───────────────────┐          ┌───────────────────────────┐    │  │
│  │    │  Notification UI  │◄─────────│  Notification Service     │    │  │
│  │    │                   │          │                           │    │  │
│  │    │  [Container:      │          │  [Container:              │    │  │
│  │    │   Web/Mobile]     │          │   Node.js Module]         │    │  │
│  │    │                   │          │                           │    │  │
│  │    │  Hiển thị         │          │  Xử lý Observer Pattern   │    │  │
│  │    │  thông báo        │          │  Quản lý Subjects &       │    │  │
│  │    │                   │          │  Observers                │    │  │
│  │    └───────────────────┘          └───────────────────────────┘    │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────────┘
```

## Component Diagram

```
┌───────────────────────────────────────────────────────────────────────────┐
│                      Notification Service                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                                                                     │  │
│  │    ┌─────────────────────────────────────────────────────────┐     │  │
│  │    │                    <<abstract>>                          │     │  │
│  │    │                      Subject                             │     │  │
│  │    │                                                          │     │  │
│  │    │  + subscribe(observer)                                   │     │  │
│  │    │  + unsubscribe(observer)                                 │     │  │
│  │    │  + notify(data)                                          │     │  │
│  │    └──────────────────────┬───────────────────────────────────┘     │  │
│  │                           │                                         │  │
│  │              ┌────────────┴────────────┐                           │  │
│  │              │                         │                           │  │
│  │    ┌─────────▼─────────┐     ┌────────▼──────────┐                │  │
│  │    │      Stock        │     │       Task        │                │  │
│  │    │ [ConcreteSubject] │     │ [ConcreteSubject] │                │  │
│  │    │                   │     │                   │                │  │
│  │    │  Cổ phiếu         │     │  Công việc        │                │  │
│  │    └─────────┬─────────┘     └─────────┬─────────┘                │  │
│  │              │ notifies                │ notifies                  │  │
│  │              ▼                         ▼                          │  │
│  │    ┌─────────────────────────────────────────────────────────┐     │  │
│  │    │                    <<abstract>>                          │     │  │
│  │    │                      Observer                            │     │  │
│  │    │                                                          │     │  │
│  │    │  + update(data)                                          │     │  │
│  │    └──────────────────────┬───────────────────────────────────┘     │  │
│  │                           │                                         │  │
│  │              ┌────────────┴────────────┐                           │  │
│  │              │                         │                           │  │
│  │    ┌─────────▼─────────┐     ┌────────▼──────────┐                │  │
│  │    │     Investor      │     │    TeamMember     │                │  │
│  │    │[ConcreteObserver] │     │[ConcreteObserver] │                │  │
│  │    │                   │     │                   │                │  │
│  │    │  Nhà đầu tư       │     │  Thành viên nhóm  │                │  │
│  │    └───────────────────┘     └───────────────────┘                │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────────┘
```

## Sequence Diagram - Theo dõi giá cổ phiếu

```
┌─────────┐         ┌─────────┐         ┌─────────────┐         ┌─────────────┐
│  Stock  │         │ Subject │         │  Investor1  │         │  Investor2  │
└────┬────┘         └────┬────┘         └──────┬──────┘         └──────┬──────┘
     │                   │                     │                       │
     │  subscribe(inv1)  │                     │                       │
     │──────────────────▶│                     │                       │
     │                   │  ✓ added            │                       │
     │                   │                     │                       │
     │  subscribe(inv2)  │                     │                       │
     │──────────────────▶│                     │                       │
     │                   │                     │              ✓ added  │
     │                   │                     │                       │
     │  setPrice(100)    │                     │                       │
     │───────────┐       │                     │                       │
     │           │       │                     │                       │
     │◀──────────┘       │                     │                       │
     │                   │                     │                       │
     │    notify(data)   │                     │                       │
     │──────────────────▶│                     │                       │
     │                   │    update(data)     │                       │
     │                   │────────────────────▶│                       │
     │                   │                     │    update(data)       │
     │                   │─────────────────────┼──────────────────────▶│
     │                   │                     │                       │
     ▼                   ▼                     ▼                       ▼
```

## Ánh xạ Pattern vào Code

| Pattern Role       | Class Name   | Mục đích                                    |
|--------------------|--------------|---------------------------------------------|
| Subject (Abstract) | Subject      | Quản lý danh sách observers, notify         |
| ConcreteSubject    | Stock        | Cổ phiếu - thông báo khi giá thay đổi       |
| ConcreteSubject    | Task         | Công việc - thông báo khi trạng thái đổi    |
| Observer (Abstract)| Observer     | Interface cho các observers                 |
| ConcreteObserver   | Investor     | Nhà đầu tư - nhận thông báo giá cổ phiếu    |
| ConcreteObserver   | TeamMember   | Thành viên - nhận thông báo về task         |
