const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', authRoutes);
app.use('/api', taskRoutes);

// Database connection
const db = mysql.createConnection({
  host: 'db',
  user: 'agent',
  password: 'agentpass',
  database: 'Obelien AI'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  } else {
    console.log('Connected to the MySQL database');
  }
});

// Start server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
