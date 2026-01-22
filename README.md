# Nature Observation Web

An online platform for capturing and displaying nature observations, integrating with the iNaturalist API and a local MongoDB database.

## Features

- **Dual Data Sources**: Switch between iNaturalist API observations and locally stored observations
- **REST API**: Full CRUD operations for observations (Create, Read, Update, Delete)
- **Interactive Map**: Leaflet-based map showing observation locations
- **Export Functionality**: Export observations to JSON files
- **Responsive Design**: Bootstrap 5-based modern UI
- **Docker Support**: Containerized development and deployment

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

### DevOps
- Docker & Docker Compose
- npm

## Project Structure

```
_website/
├── client/                          # Frontend
│   ├── components/                 # Reusable components
│   │   ├── modal.js                # Modal form handling
│   │   └── sidebar.js               # Sidebar controls
│   ├── config/                      # Configuration files
│   │   └── api.config.js           # API endpoints configuration
│   ├── features/                   # Feature components
│   │   └── map.js                  # Map functionality
│   ├── lib/                        # Core libraries
│   │   ├── observations.js        # Observation logic
│   │   └── main.js                 # Main app logic
│   ├── assets/                     # Static assets
│   │   └── logo.jpg
│   ├── *.html                      # HTML pages
│   └── style.css                   # Stylesheet
│
├── server/                         # Backend
│   ├── controllers/               # API controller functions
│   │   ├── observationController.js
│   │   └── exportController.js
│   ├── routes/                     # Express routes
│   │   ├── observationRoutes.js
│   │   └── exportRoutes.js
│   ├── models/                     # Database models
│   │   └── Observation.js          # Mongoose schema
│   ├── middleware/                 # Express middleware
│   │   └── cors.js                # CORS handling
│   ├── server.js                   # Main server file
│   └── package.json               # Dependencies
│
├── docs/                           # Documentation
│   ├── helper/                    # Helper documentation
│   ├── übungen/                   # Exercise documentation
│   ├── terminal_commands_guide.md # Terminal commands reference
│   └── project_overview_template.md # Project template guide
│
├── Dockerfile                      # Docker image definition
├── docker-compose.yml              # Docker Compose configuration
├── .dockerignore                   # Docker build exclusions
└── README.md                       # This file
```

## API Endpoints

### Observations
- `POST /observation` - Create a new observation
- `GET /observations` - Get all observations
- `GET /observation/:id` - Get a single observation by ID
- `DELETE /observation/:id` - Delete an observation

### Export
- `POST /export` - Export observations to JSON file

## Setup

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (for local development) or **Docker Desktop** (for containerized setup)
- **npm** (comes with Node.js)

### Option 1: Docker Setup (Recommended)

#### 1. Install Docker Desktop
- Download from: https://www.docker.com/products/docker-desktop/
- Install and start Docker Desktop
- Wait until Docker Desktop is fully running

#### 2. Start the Application
```bash
# Navigate to project directory
cd /Users/studio/Documents/dev/MA_IIW/ma_webtech/_website

# Start containers (builds images on first run)
docker compose up -d

# Check status
docker compose ps

# View logs
docker compose logs -f
```

#### 3. Access the Application
- Open your browser: `http://localhost:3000`
- MongoDB is available on `localhost:27017`

#### 4. Stop Containers
```bash
# Stop containers
docker compose stop

# Stop and remove containers
docker compose down
```

**Note:** If `docker compose` doesn't work, try `docker-compose` (with hyphen) or restart your terminal after installing Docker Desktop.

### Option 2: Local Development Setup

#### 1. Install Dependencies
```bash
cd server
npm install
```

#### 2. Start MongoDB
```bash
# macOS with Homebrew
brew services start mongodb-community

# Or start manually
mongod
```

#### 3. Start the Server
```bash
# From server directory
npm start
# or
node server.js
```

#### 4. Access the Application
- Open your browser: `http://localhost:3000`
- The server serves the frontend automatically

## Environment Variables

The application uses environment variables for configuration:

- `MONGODB_URL` - MongoDB connection string (default: `mongodb://localhost:27017/observations`)

For Docker, this is set in `docker-compose.yml`. For local development, you can set it:

```bash
export MONGODB_URL="mongodb://localhost:27017/observations"
```

## Usage

### View Observations
1. Toggle between **"iNaturalist"** (API data) and **"Lokal"** (database data) views using the radio buttons
2. Observations are displayed as cards in a responsive grid
3. Click "Mehr anzeigen" to load more observations

### Add Observation
1. Click the **"Beobachtung hinzufügen"** button
2. Fill in the form:
   - **Titel** (Title)
   - **Lateinischer Name** (Latin Name)
   - **Beobachtungsort** (Location)
   - **Beobachtungsdatum** (Date)
3. Click **"Speichern"** to save to MongoDB
4. The observation will appear in the "Lokal" view

### Export Observations
1. Click the **"Export"** button
2. Observations are exported as a JSON file with timestamp

### View Map
1. Click **"Karte anzeigen"** to open the sidebar with map
2. Map shows observation locations with markers
3. Click markers to see observation details

## Development

### Project Branches
- **`main`**: Stable version for presentation
- **`docker`**: Docker setup and experiments
- **`uebung-6-mongodb`**: MongoDB exercise implementation

### Code Structure
- **MVC Pattern**: Models, Views (Routes), Controllers
- **Separation of Concerns**: Clear frontend/backend separation
- **RESTful API**: Standard HTTP methods and status codes
- **Modular Architecture**: Reusable components and libraries

### Development Workflow

#### Daily Start
```bash
cd /Users/studio/Documents/dev/MA_IIW/ma_webtech/_website
git checkout docker  # or main
docker compose up -d
docker compose ps
```

#### Daily End
```bash
git add .
git commit -m "Description of changes"
docker compose stop  # optional
git push origin docker  # optional
```

### Rebuild After Code Changes
```bash
# Docker
docker compose up --build -d

# Local
cd server
npm start
```

## Documentation

- **Terminal Commands Guide**: `docs/terminal_commands_guide.md`
- **Project Overview & Template**: `docs/project_overview_template.md`
- **Helper Documentation**: `docs/helper/helper_6.md` (Express, MongoDB, Mongoose)
- **Exercise Documentation**: `docs/übungen/`

## Troubleshooting

### Docker Issues

**Problem:** `command not found: docker`
- **Solution**: Install Docker Desktop and restart terminal

**Problem:** `Cannot connect to Docker daemon`
- **Solution**: Start Docker Desktop and wait until fully running

**Problem:** Port already in use
- **Solution**: Stop other services on ports 3000 or 27017

### MongoDB Issues

**Problem:** MongoDB connection error
- **Solution**: Ensure MongoDB is running (`brew services list | grep mongodb`)
- **Docker**: Wait a few seconds for MongoDB container to fully start

### Server Issues

**Problem:** Dependencies not found
- **Solution**: Run `npm install` in the `server/` directory

**Problem:** Module not found errors
- **Solution**: Check that you're running from the correct directory and all dependencies are installed

## Exercises Completed

This project was developed as part of web technology exercises:

- **Übung 3**: Bootstrap Framework
- **Übung 4**: JavaScript, DOM, AJAX, JSON, jQuery, Leaflet
- **Übung 5**: Node.js, npm, http module
- **Übung 6**: Express, MongoDB, Mongoose, REST API

## License

This project is for educational purposes.

## Author

Tobias

---

**Last Updated:** 2026-01-02
