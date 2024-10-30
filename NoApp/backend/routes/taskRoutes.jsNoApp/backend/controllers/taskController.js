// NoApp/backend/routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/register', taskController.registerUser);
router.post('/login', taskController.loginUser);
router.delete('/task/:id', taskController.deleteTask);

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = router;

// NoApp/backend/controllers/taskController.js

const db = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO Users (email, password) VALUES (?, ?)', [email, hashedPassword]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const [user] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM Tasks WHERE id = ?', [id]);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  deleteTask
};
