# Buoi 4 - Architecture Styles (Microservices, SOA)

## 1. Monolith -> Microservices Migration (Online Food Delivery)

### 1.1 Hien trang monolith
Trong monolith, backend xu ly tat ca domain trong cung mot khoi:
- User/Auth
- Restaurant/Menu
- Cart/Order
- Payment
- Delivery
- Notification

Frontend goi mot API gateway duy nhat cua monolith.

### 1.2 Muc tieu migration
- Tach domain theo bounded context de giam coupling.
- Scale doc lap cac service tai khu vuc tai cao (Order, Delivery).
- Tang kha nang trien khai doc lap theo service.

### 1.3 Lo trinh migration de xuat
1. Trich xuat Auth + User Service truoc (de tach danh tinh nguoi dung).
2. Trich xuat Restaurant/Menu Service.
3. Trich xuat Order Service va Cart Service.
4. Trich xuat Payment Service va Delivery Service.
5. Trich xuat Notification Service.
6. Dat API Gateway va Event Bus (Kafka/RabbitMQ) de on dinh giao tiep.

### 1.4 Bounded Context
- Identity Context: user, role, token, profile.
- Catalog Context: restaurant, menu item, availability.
- Ordering Context: cart, order, order line.
- Payment Context: payment intent, transaction, refund.
- Delivery Context: driver, dispatch, tracking.
- Communication Context: email/sms/push templates, message log.

## 2. Sync vs Async trong he thong

### 2.1 Sync communication (HTTP/gRPC)
Dung khi can phan hoi ngay:
- API Gateway -> Auth Service (dang nhap/xac thuc)
- Order Service -> Payment Service (tao thanh toan)
- Order Service -> Restaurant Service (xac nhan menu/con suat)

### 2.2 Async communication (Event Bus)
Dung khi can loose coupling va eventually consistent:
- Order Service phat OrderCreated
- Payment Service nghe OrderCreated, xu ly thanh toan, phat PaymentSucceeded/PaymentFailed
- Delivery Service nghe PaymentSucceeded de tao giao hang
- Notification Service nghe cac event va gui thong bao

## 3. Event Messaging Design (muc mo hinh)

### 3.1 Broker lua chon
- Co the dung Kafka khi can throughput cao va replay event.
- Co the dung RabbitMQ khi can routing linh hoat theo queue/exchange.

### 3.2 Event chinh
- order.created
- order.cancelled
- payment.succeeded
- payment.failed
- delivery.assigned
- delivery.completed
- notification.requested

### 3.3 Topic/Queue mapping mau
- ordering.events
- payment.events
- delivery.events
- notification.events

## 4. Mapping voi cau truc thu muc hien tai
- Monolith code dat trong `mono/backend` + `mono/frontend`.
- Microservice code dat trong `microservice/backend` + `microservice/frontend`.
- Tai lieu thiet ke Buoi 4 dat trong thu muc `docs`.
