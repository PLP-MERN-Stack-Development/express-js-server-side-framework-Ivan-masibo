// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let products = [
  { id: uuidv4(), name: 'Laptop', description: 'Powerful device', price: 1200, category: 'Electronics', inStock: true },
  { id: uuidv4(), name: 'Sneakers', description: 'Comfortable shoes', price: 80, category: 'Fashion', inStock: true },
];

// GET all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST new productcode
app.post('/api/products', (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = { id: uuidv4(), name, description, price, category, inStock };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product
app.put('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Product not found' });
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Product not found' });
  const deleted = products.splice(index, 1);
  res.json({ message: 'Product deleted', deleted });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
