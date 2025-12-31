// Step 1: Import required modules
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const timestamp = require('time-stamp');
const Observation = require('./models/Observation');

// Step 2: Create Express app
const app = express();

// Step 3: Middleware - Parse JSON bodies
app.use(express.json());

// Step 4: Middleware - CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight requests
    // "OPTIONS" is an HTTP method used for CORS preflight requests.
    // When a browser makes a cross-origin request, it first sends an OPTIONS request
    // to ask the server what HTTP methods and headers are allowed.
    // If this is an OPTIONS request, respond immediately with 200 OK.
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    // This line hands off control to the next middleware in the stack.
    // Without calling "next()", the request would hang and not reach subsequent handlers,
    // such as Express route handlers (e.g., app.get(), app.post()) or other middleware functions.
    next();
});

// Step 5: Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/observations')
    // We use a dot here (`.then`) to chain a callback function that will execute after the `mongoose.connect()` Promise resolves.
    .then(() => {
        console.log('MongoDB verbunden');
    })
    .catch((err) => {
        console.error('MongoDB Verbindungsfehler:', err);
    });

// Step 6: Define routes

// POST /observation - Create a new observation
// Explanation:
// In JavaScript, a "try...catch" block is used to handle errors that may occur during the execution of code. 
// The code inside the "try" block is executed. If an error occurs, execution stops, 
// and control is passed to the "catch" block, where the error can be handled gracefully.

// ".body" refers to the body property of the "req" (request) object provided by Express. 
// It contains data sent by the client in the body of the HTTP request, usually in JSON format if the client sends a POST request 
// with content-type "application/json".

app.post('/observation', async (req, res) => {
    // "req.body" holds data sent from the client
    // We'll create a new Observation document using data from the request body
    try {
        const observationData = {
            title: req.body.title,           // req.body.title: the "title" property from the posted JSON
            latinName: req.body.latinName,   // req.body.latinName: the "latinName" property
            location: req.body.location,     // req.body.location: the "location" property
            date: req.body.date              // req.body.date: the "date" property
        };

        const newObservation = new Observation(observationData);

        // Save the new observation to the database. This can fail, so we use try-catch to handle errors.
        const savedObservation = await newObservation.save();

        // If successful, send the new observation back with HTTP status 201 (Created)
        res.status(201).json(savedObservation);
    } catch (error) {
        // If any error occurs (e.g. missing field, database error), send a 400 (Bad Request) response with the error message
        res.status(400).json({ error: error.message });
    }
});

// GET /observations - Get all observations
app.get('/observations', async (req, res) => {
    try {
        const observations = await Observation.find({});
        res.json(observations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /observation/:id - Get a single observation by ID
// In JavaScript, "async" is used to declare an asynchronous function. Inside such a function, you can use "await" to pause the execution
// until a Promise (such as a database operation) settles, letting you write asynchronous code that looks synchronous.
// "await" waits for the promise on the right to resolve and then gives you its result, or throws an error if the promise rejects.

app.get('/observation/:id', async (req, res) => {
    try {
        // "await" pauses here until the database finds (or fails to find) the observation by ID.
        const observation = await Observation.findById(req.params.id);
        if (!observation) {
            return res.status(404).json({ error: 'Beobachtung nicht gefunden' });
        }
        res.json(observation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /observation/:id - Delete an observation
app.delete('/observation/:id', async (req, res) => {
    try {
        const observation = await Observation.findByIdAndDelete(req.params.id);
        if (!observation) {
            return res.status(404).json({ error: 'Beobachtung nicht gefunden' });
        }
        res.json({ message: 'Beobachtung gelöscht', observation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /export - Export observations to JSON file
app.post('/export', (req, res) => {
    try {
        const file = "export_" + timestamp('YYYYMMDDHHmmss') + ".json";
        const jsonData = JSON.stringify(req.body, null, 2);
        
        fs.writeFile(file, jsonData, (err) => {
            if (err) {
                console.error('Fehler beim Speichern:', err);
                res.status(500).json({ error: 'Fehler beim Speichern' });
            } else {
                console.log('Datei erfolgreich erstellt:', file);
                res.status(200).json({ message: 'Datei erfolgreich erstellt', filename: file });
            }
        });
    } catch (error) {
        console.error('Fehler beim Export:', error);
        res.status(500).json({ error: error.message });
    }
});

// Step 7: Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
