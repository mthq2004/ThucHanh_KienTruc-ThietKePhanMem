const restaurants = [
  { id: 'r1', name: 'Pizza Hub', cuisine: 'Italian' },
  { id: 'r2', name: 'Pho Corner', cuisine: 'Vietnamese' },
  { id: 'r3', name: 'Sushi Spot', cuisine: 'Japanese' },
];

const menus = {
  r1: [
    { id: 'm1', name: 'Margherita Pizza', price: 8.5 },
    { id: 'm2', name: 'Pepperoni Pizza', price: 10.0 },
  ],
  r2: [
    { id: 'm3', name: 'Pho Bo', price: 4.0 },
    { id: 'm4', name: 'Spring Rolls', price: 3.0 },
  ],
  r3: [
    { id: 'm5', name: 'Salmon Sushi Set', price: 12.0 },
    { id: 'm6', name: 'Tempura', price: 6.5 },
  ],
};

const orders = [];

module.exports = { restaurants, menus, orders };
