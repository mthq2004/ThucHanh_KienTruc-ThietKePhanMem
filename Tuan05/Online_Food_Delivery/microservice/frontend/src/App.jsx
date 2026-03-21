import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export default function App() {
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [menu, setMenu] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/api/users/u1`)
      .then((res) => res.json())
      .then((data) => setUser(data));

    fetch(`${API_BASE}/api/restaurants`)
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data);
        if (data.length > 0) {
          setSelectedRestaurant(data[0].id);
        }
      });
  }, []);

  useEffect(() => {
    if (!selectedRestaurant) {
      return;
    }

    fetch(`${API_BASE}/api/restaurants/${selectedRestaurant}/menu`)
      .then((res) => res.json())
      .then((data) => {
        setMenu(data);
        const initial = {};
        data.forEach((item) => {
          initial[item.id] = 0;
        });
        setQuantities(initial);
      });
  }, [selectedRestaurant]);

  const placeOrder = async () => {
    const items = Object.entries(quantities)
      .filter(([, quantity]) => Number(quantity) > 0)
      .map(([menuItemId, quantity]) => ({ menuItemId, quantity: Number(quantity) }));

    if (items.length === 0) {
      setMessage('Please choose at least one item.');
      return;
    }

    const res = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerName: user?.fullName || 'Guest', items }),
    });

    const data = await res.json();
    if (!res.ok) {
      setMessage(data.message || 'Order failed');
      return;
    }

    setMessage(`Microservice order ${data.id} placed. Total: $${data.total}`);
  };

  return (
    <main className="container">
      <h1>Online Food Delivery - Microservices</h1>

      <section className="card">
        <p>
          User: <strong>{user?.fullName || 'Loading...'}</strong> ({user?.tier || '...'})
        </p>
        <label>
          Restaurant
          <select value={selectedRestaurant} onChange={(e) => setSelectedRestaurant(e.target.value)}>
            {restaurants.map((restaurant) => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.name} ({restaurant.cuisine})
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="card">
        <h2>Menu from restaurant-service</h2>
        {menu.map((item) => (
          <div key={item.id} className="menu-item">
            <span>{item.name} - ${item.price}</span>
            <input
              type="number"
              min="0"
              value={quantities[item.id] ?? 0}
              onChange={(e) =>
                setQuantities((prev) => ({
                  ...prev,
                  [item.id]: e.target.value,
                }))
              }
            />
          </div>
        ))}
        <button onClick={placeOrder}>Place Order via API Gateway</button>
      </section>

      {message ? <p className="message">{message}</p> : null}
    </main>
  );
}
