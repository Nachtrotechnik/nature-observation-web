// Export Controller
// Handles export functionality

const fs = require('fs');
const timestamp = require('time-stamp');

const exportObservations = (req, res) => {
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
};

module.exports = {
    exportObservations
};
