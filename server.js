const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.static(__dirname));

// Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',          // Replace with your actual MySQL username
    password: '12345678',          // Replace with your actual MySQL password (leave empty string if no password)
    database: 'todo_list'  // Make sure this database exists
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Routes
app.get('/api/tasks', (req, res) => {
    connection.query('SELECT * FROM tasks ORDER BY created_at DESC', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

app.post('/api/tasks', (req, res) => {
    const { text } = req.body;
    connection.query('INSERT INTO tasks (text) VALUES (?)', [text], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        connection.query('SELECT * FROM tasks WHERE id = ?', [result.insertId], (err, results) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(results[0]);
        });
    });
});

app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    connection.query('UPDATE tasks SET completed = ? WHERE id = ?', [completed, id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id, completed });
    });
});

app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id });
    });
});

app.delete('/api/tasks/completed', (req, res) => {
    connection.query('DELETE FROM tasks WHERE completed = true', (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Completed tasks deleted' });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 