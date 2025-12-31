// Main Server File
// Express server setup and configuration

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Import routes
const observationRoutes = require('./routes/observationRoutes');
const exportRoutes = require('./routes/exportRoutes');

// Import middleware
const corsMiddleware = require('./middleware/cors');

// Create Express app
const app = express();

// Middleware - Serve static files (Frontend)
// Serve client files from the client directory
app.use(express.static(path.join(__dirname, '../client')));

// Middleware - Parse JSON bodies
app.use(express.json());

// Middleware - CORS
app.use(corsMiddleware);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/observations')
    .then(() => {
        console.log('MongoDB verbunden');
    })
    .catch((err) => {
        console.error('MongoDB Verbindungsfehler:', err);
    });

// API Routes
app.use('/', observationRoutes);
app.use('/', exportRoutes);

// Default route - serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
    console.log(`Frontend verfügbar unter: http://localhost:${PORT}`);
});
