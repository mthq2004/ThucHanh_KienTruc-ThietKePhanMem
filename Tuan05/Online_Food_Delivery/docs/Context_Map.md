# Context Map - Bounded Context

```mermaid
graph LR
  Identity[Identity Context<br/>(Auth + User)]
  Catalog[Catalog Context<br/>(Restaurant + Menu)]
  Ordering[Ordering Context<br/>(Cart + Order)]
  Payment[Payment Context]
  Delivery[Delivery Context]
  Communication[Communication Context<br/>(Notification)]

  Identity --> Ordering
  Identity --> Payment
  Catalog --> Ordering
  Ordering --> Payment
  Payment --> Delivery
  Ordering --> Communication
  Payment --> Communication
  Delivery --> Communication
```

## Quan he context
- Identity cung cap thong tin user cho Ordering, Payment.
- Catalog cung cap menu/restaurant cho Ordering.
- Ordering la context trung tam cua luong dat mon.
- Payment va Delivery phu thuoc event tu Ordering.
- Communication tiep nhan su kien tu Ordering/Payment/Delivery de gui thong bao.
