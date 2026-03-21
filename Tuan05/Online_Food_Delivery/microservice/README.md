# Microservice View (Target State)

## Implemented code
- Backend: Node.js + Express trong `backend`
- Frontend: React.js (Vite) trong `frontend`

## Running services (implemented)
- `restaurant-service` (5001)
- `order-service` (5002)
- `user-service` (5003)
- `api-gateway` (5000)

## Run microservice demo
1. Chay backend services
	- `cd backend`
	- `npm install`
	- `npm start`
2. Chay frontend (terminal moi)
	- `cd frontend`
	- `npm install`
	- `npm run dev`

Frontend se goi API qua gateway o `http://localhost:5000`.

## De xuat service
- auth-service
- user-service
- restaurant-service
- cart-service
- order-service
- payment-service
- delivery-service
- notification-service
- api-gateway
- event-bus (Kafka/RabbitMQ)

## Giao tiep
- Sync: HTTP/gRPC qua API Gateway cho request can response ngay.
- Async: event messaging cho xu ly hau truong va loose coupling.

## Service ownership
Moi service so huu database rieng, khong truy cap DB cua nhau truc tiep.
