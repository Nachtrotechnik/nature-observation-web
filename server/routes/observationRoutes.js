// Observation Routes
// Contains all routes for observation endpoints using Express Router

const express = require('express');
const router = express.Router();
const observationController = require('../controllers/observationController');

// POST /observation - Create a new observation
router.post('/observation', observationController.createObservation);

// GET /observations - Get all observations
router.get('/observations', observationController.getAllObservations);

// GET /observation/:id - Get a single observation by ID
router.get('/observation/:id', observationController.getObservationById);

// DELETE /observation/:id - Delete an observation
router.delete('/observation/:id', observationController.deleteObservation);

module.exports = router;
