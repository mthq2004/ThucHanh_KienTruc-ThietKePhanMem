# Monolith View (Current State)

Monolith backend gom cac module:
- Auth/User
- Restaurant/Menu
- Cart/Order
- Payment
- Delivery
- Notification

Monolith frontend goi mot backend duy nhat.

## Implemented code
- Backend: Node.js + Express trong `backend`
- Frontend: React.js (Vite) trong `frontend`

## Run monolith
1. Chay backend
	- `cd backend`
	- `npm install`
	- `npm start`
	- Backend chay o cổng `4000`
2. Chay frontend (terminal moi)
	- `cd frontend`
	- `npm install`
	- `npm run dev`
	- Frontend chay o cổng `5173`

## Main APIs
- `GET /api/health`
- `GET /api/restaurants`
- `GET /api/restaurants/:id/menu`
- `GET /api/orders`
- `POST /api/orders`

## Migration note
Monolith la nguon de tach dan sang microservices theo bounded context.
