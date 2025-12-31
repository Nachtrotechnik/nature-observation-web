// Observation Controller
// Contains all the functions for observation APIs

const Observation = require('../models/Observation');

// Create a new observation
const createObservation = async (req, res) => {
    try {
        const observationData = {
            title: req.body.title,
            latinName: req.body.latinName,
            location: req.body.location,
            date: req.body.date
        };

        const newObservation = new Observation(observationData);
        const savedObservation = await newObservation.save();

        res.status(201).json(savedObservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all observations
const getAllObservations = async (req, res) => {
    try {
        const observations = await Observation.find({});
        res.json(observations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single observation by ID
const getObservationById = async (req, res) => {
    try {
        const observation = await Observation.findById(req.params.id);
        if (!observation) {
            return res.status(404).json({ error: 'Beobachtung nicht gefunden' });
        }
        res.json(observation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete an observation
const deleteObservation = async (req, res) => {
    try {
        const observation = await Observation.findByIdAndDelete(req.params.id);
        if (!observation) {
            return res.status(404).json({ error: 'Beobachtung nicht gefunden' });
        }
        res.json({ message: 'Beobachtung gelöscht', observation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createObservation,
    getAllObservations,
    getObservationById,
    deleteObservation
};
