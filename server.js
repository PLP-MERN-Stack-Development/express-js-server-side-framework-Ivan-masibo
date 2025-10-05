// server.js
// server.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const logger = require('./middleware/logger');
const { errorHandler, notFound } = require('./middleware/errorHandler');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Routes
app.get('/', (req, res) => {
  res.send('Hello World 🌍 - Express.js API Running');
});

app.use('/api/products', productRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
