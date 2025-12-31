// Export Routes
// Contains routes for export functionality

const express = require('express');
const router = express.Router();
const exportController = require('../controllers/exportController');

// POST /export - Export observations to JSON file
router.post('/export', exportController.exportObservations);

module.exports = router;
