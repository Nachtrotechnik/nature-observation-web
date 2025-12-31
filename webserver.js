const fs = require("fs");
const http = require("http");
const timestamp = require("time-stamp");

const server = http.createServer((request, response) => {
    // CORS-Header setzen
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // OPTIONS-Request behandeln (Preflight)
    if (request.method === 'OPTIONS') {
        response.writeHead(200);
        response.end();
        return;
    }
    
    // POST-Request für Export verarbeiten
    if (request.method === 'POST' && request.url.includes('/export')) {
        let data = '';
        request.on('data', (chunk) => {
            data += chunk.toString();
        });
        request.on('end', () => {
            const file = "export_" + timestamp('YYYYMMDDHHmmss') + ".json";
            fs.writeFile(file, data, 
                (err) => {
                    if (err) {
                        console.error('Fehler beim Speichern:', err);
                        response.writeHead(500, { 'Content-Type': 'text/plain' });
                        response.end('Fehler beim Speichern');
                    } else {
                        console.log('Datei erfolgreich erstellt:', file);
                        response.writeHead(200, { 'Content-Type': 'text/plain' });
                        response.end('Datei erfolgreich erstellt');
                    }
                });
        });
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Not Found');
    }

});

server.listen(3001, () => {
    console.log('Server läuft auf Port 3001');
});
