# Nature Observation Web

An online platform for capturing and displaying nature observations, integrating with the iNaturalist API and a local MongoDB database.

## Features

- **Dual Data Sources**: Switch between iNaturalist API observations and locally stored observations
- **REST API**: Full CRUD operations for observations (Create, Read, Delete)
- **Interactive Map**: Leaflet-based map showing observation locations
- **Export Functionality**: Export observations to JSON files
- **Responsive Design**: Bootstrap 5-based modern UI

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap 5
- jQuery
- Leaflet (for maps)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- RESTful API

## Project Structure

```
_website/
├── index.html              # Main page
├── detail.html             # Observation detail page
├── observations.js         # Main observation handling logic
├── modal.js               # Modal form handling
├── map.js                 # Map functionality
├── sidebar.js             # Sidebar controls
├── main.js                # Main application logic
├── style.css              # Stylesheet
├── node_modul/
│   ├── server.js          # Express server
│   ├── models/
│   │   └── Observation.js  # Mongoose model
│   └── package.json      # Dependencies
└── README.md              # This file
```

## API Endpoints

- `POST /observation` - Create a new observation
- `GET /observations` - Get all observations
- `GET /observation/:id` - Get a single observation by ID
- `DELETE /observation/:id` - Delete an observation
- `POST /export` - Export observations to JSON file

## Setup

### Prerequisites
- Node.js
- MongoDB (running on localhost:27017)

### Installation

1. Install dependencies:
```bash
cd node_modul
npm install
```

2. Start MongoDB (if not already running):
```bash
# macOS with Homebrew
brew services start mongodb-community
```

3. Start the server:
```bash
node node_modul/server.js
```

The server will run on `http://localhost:3000`

4. Open `index.html` in your browser

## Usage

1. **View Observations**: 
   - Toggle between "iNaturalist" (API data) and "Lokal" (database data) views
   - Observations are displayed as cards in a responsive grid

2. **Add Observation**:
   - Click the "Beobachtung hinzufügen" button
   - Fill in the form (Title, Latin Name, Location, Date)
   - Submit to save to MongoDB

3. **Export Observations**:
   - Click the "Export" button to download observations as JSON

## Development

This project was developed as part of web technology exercises (Übung 6) focusing on:
- Server-side database integration
- REST API development
- MongoDB and Mongoose
- Express.js routing
- AJAX/fetch API integration

## License

This project is for educational purposes.
