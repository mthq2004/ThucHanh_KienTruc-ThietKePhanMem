-- Single database design for monolith and first migration phase

CREATE TABLE users (
  user_id BIGINT PRIMARY KEY,
  full_name NVARCHAR(120) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);

CREATE TABLE restaurants (
  restaurant_id BIGINT PRIMARY KEY,
  name NVARCHAR(150) NOT NULL,
  city NVARCHAR(80) NOT NULL
);

CREATE TABLE menu_items (
  menu_item_id BIGINT PRIMARY KEY,
  restaurant_id BIGINT NOT NULL,
  item_name NVARCHAR(150) NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  is_available BIT NOT NULL DEFAULT 1,
  CONSTRAINT fk_menu_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id)
);

CREATE TABLE orders (
  order_id BIGINT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  restaurant_id BIGINT NOT NULL,
  status VARCHAR(30) NOT NULL,
  total_amount DECIMAL(12,2) NOT NULL,
  created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
  CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES users(user_id),
  CONSTRAINT fk_order_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id)
);

CREATE TABLE order_items (
  order_item_id BIGINT PRIMARY KEY,
  order_id BIGINT NOT NULL,
  menu_item_id BIGINT NOT NULL,
  qty INT NOT NULL,
  item_price DECIMAL(12,2) NOT NULL,
  CONSTRAINT fk_order_item_order FOREIGN KEY (order_id) REFERENCES orders(order_id),
  CONSTRAINT fk_order_item_menu FOREIGN KEY (menu_item_id) REFERENCES menu_items(menu_item_id)
);

CREATE TABLE payments (
  payment_id BIGINT PRIMARY KEY,
  order_id BIGINT NOT NULL,
  method VARCHAR(30) NOT NULL,
  status VARCHAR(30) NOT NULL,
  paid_at DATETIME2 NULL,
  CONSTRAINT fk_payment_order FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

CREATE TABLE deliveries (
  delivery_id BIGINT PRIMARY KEY,
  order_id BIGINT NOT NULL,
  driver_name NVARCHAR(120) NULL,
  status VARCHAR(30) NOT NULL,
  assigned_at DATETIME2 NULL,
  delivered_at DATETIME2 NULL,
  CONSTRAINT fk_delivery_order FOREIGN KEY (order_id) REFERENCES orders(order_id)
);
