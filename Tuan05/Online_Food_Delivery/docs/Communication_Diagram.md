# Communication Diagram (Sync vs Async)

```mermaid
sequenceDiagram
  participant C as Client
  participant G as API Gateway
  participant O as Order Service
  participant P as Payment Service
  participant D as Delivery Service
  participant N as Notification Service
  participant E as Event Bus

  C->>G: Place order
  G->>O: HTTP Create order (Sync)
  O-->>G: Order created
  G-->>C: 201 Created

  O->>E: Publish order.created (Async)
  E->>P: Consume order.created
  P->>E: Publish payment.succeeded/payment.failed

  E->>D: Consume payment.succeeded
  D->>E: Publish delivery.assigned

  E->>N: Consume order/payment/delivery events
  N-->>C: Push/Email/SMS notification
```

## Su dung Sync
- Dang nhap, lay menu, tao don hang, xac nhan thanh toan ngay.

## Su dung Async
- Cac buoc hau xu ly: thanh toan, dieu phoi giao hang, gui thong bao.
- Giam phu thuoc truc tiep giua service va tang kha nang mo rong.
