CREATE TABLE IF NOT EXISTS menu_item (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  price NUMERIC(10,2) NOT NULL
);

INSERT INTO menu_item (name, price)
VALUES
  ('Com tam', 45000),
  ('Bun cha', 40000),
  ('Tra tac', 20000);
