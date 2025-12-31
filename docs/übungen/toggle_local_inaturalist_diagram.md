# Toggle Between Local and iNaturalist Views - Flow Diagram

This diagram shows how the toggle functionality works to switch between local MongoDB observations and iNaturalist API observations.

```mermaid
flowchart TD
    Start([User on Page]) --> CurrentView{Current View?}
    
    CurrentView -->|iNaturalist| ShowINaturalist[iNaturalist View Active<br/>Shows API observations]
    CurrentView -->|Local| ShowLocal[Local View Active<br/>Shows MongoDB observations]
    
    ShowINaturalist --> UserClicksLocal[User Clicks<br/>'Lokal' Button]
    ShowLocal --> UserClicksINaturalist[User Clicks<br/>'iNaturalist' Button]
    
    UserClicksLocal --> ClearGrid[Clear Grid<br/>Remove all displayed observations]
    UserClicksINaturalist --> ClearGrid2[Clear Grid<br/>Remove all displayed observations]
    
    ClearGrid --> ResetVariables[Reset Variables<br/>currentPage = 1<br/>displayedObservationIds.clear]
    ClearGrid2 --> ResetVariables2[Reset Variables<br/>currentPage = 1<br/>displayedObservationIds.clear]
    
    ResetVariables --> UpdateViewState[Update currentView = 'local']
    ResetVariables2 --> UpdateViewState2[Update currentView = 'inaturalist']
    
    UpdateViewState --> UpdateButtonStyles[Update Button Styles<br/>'Lokal' = active<br/>'iNaturalist' = inactive]
    UpdateViewState2 --> UpdateButtonStyles2[Update Button Styles<br/>'iNaturalist' = active<br/>'Lokal' = inactive]
    
    UpdateButtonStyles --> LoadLocal[Load Local Observations<br/>GET /observations]
    UpdateButtonStyles2 --> LoadINaturalist[Load iNaturalist Observations<br/>API call]
    
    LoadLocal --> AJAXRequest[AJAX GET Request<br/>http://localhost:3000/observations]
    AJAXRequest --> ExpressServer[Express Server<br/>GET /observations]
    ExpressServer --> MongooseQuery[Mongoose Query<br/>Observation.find]
    MongooseQuery --> MongoDB[(MongoDB Database)]
    MongoDB --> ReturnData[Return JSON Array<br/>All observations]
    ReturnData --> ProcessLocalData[Process Local Data<br/>Format for display]
    
    ProcessLocalData --> DisplayLocal[Display Local Observations<br/>Create cards for each]
    LoadINaturalist --> DisplayINaturalist[Display iNaturalist Observations<br/>Existing function]
    
    DisplayLocal --> EndLocal([Local View Displayed])
    DisplayINaturalist --> EndINaturalist([iNaturalist View Displayed])
    
    style Start fill:#e1f5ff
    style EndLocal fill:#d4edda
    style EndINaturalist fill:#d4edda
    style LoadLocal fill:#74b9ff
    style LoadINaturalist fill:#74b9ff
    style MongoDB fill:#a29bfe
    style ExpressServer fill:#ffeaa7
```

## Detailed Sequence Diagram

```mermaid
sequenceDiagram
    participant User as User
    participant Button as Toggle Button
    participant JS as JavaScript
    participant Grid as Grid Container
    participant Express as Express Server
    participant Mongoose as Mongoose
    participant MongoDB as MongoDB Database

    Note over User,MongoDB: Scenario 1: Switch to Local View
    
    User->>Button: Clicks "Lokal" button
    Button->>JS: Click event triggered
    JS->>JS: currentView = 'local'
    JS->>Button: Update button styles<br/>(active/inactive)
    JS->>Grid: Clear all observations<br/>(remove all cards)
    JS->>JS: Reset variables<br/>(currentPage, displayedIds)
    
    JS->>Express: GET /observations<br/>(AJAX request)
    Express->>Mongoose: Observation.find({})
    Mongoose->>MongoDB: Query all documents
    MongoDB-->>Mongoose: Return documents array
    Mongoose-->>Express: JSON array of observations
    Express-->>JS: HTTP 200 OK<br/>[{title, latinName, location, date, _id}, ...]
    
    JS->>JS: Process each observation<br/>(format data)
    JS->>Grid: Create observation cards<br/>(for each observation)
    Grid-->>User: Display local observations
    
    Note over User,MongoDB: Scenario 2: Switch to iNaturalist View
    
    User->>Button: Clicks "iNaturalist" button
    Button->>JS: Click event triggered
    JS->>JS: currentView = 'inaturalist'
    JS->>Button: Update button styles<br/>(active/inactive)
    JS->>Grid: Clear all observations<br/>(remove all cards)
    JS->>JS: Reset variables<br/>(currentPage, displayedIds)
    
    JS->>JS: Call loadObservations()<br/>(existing iNaturalist function)
    JS->>JS: Fetch from iNaturalist API
    JS->>Grid: Create observation cards<br/>(for each observation)
    Grid-->>User: Display iNaturalist observations
```

## Code Structure Breakdown

### 1. **Global State Management**
```javascript
let currentView = 'inaturalist'; // Track which view is active
```

### 2. **Toggle Button Event Listeners**
```javascript
$('#view-local').on('click', function() {
    // Switch to local view
    currentView = 'local';
    clearGrid();
    loadLocalObservations();
});

$('#view-inaturalist').on('click', function() {
    // Switch to iNaturalist view
    currentView = 'inaturalist';
    clearGrid();
    loadObservations(1, true);
});
```

### 3. **Clear Grid Function**
```javascript
function clearGrid() {
    // Remove all observation cards
    // Reset variables
    // Update button styles
}
```

### 4. **Load Local Observations Function**
```javascript
function loadLocalObservations() {
    $.ajax({
        url: 'http://localhost:3000/observations',
        type: 'GET',
        success: function(observations) {
            displayLocalObservations(observations);
        }
    });
}
```

### 5. **Display Local Observations Function**
```javascript
function displayLocalObservations(observations) {
    // For each observation:
    // - Create card element
    // - Fill with data (title, latinName, location, date)
    // - Add to grid
    // Note: Local observations don't have photos
}
```

## Key Differences: Local vs iNaturalist

| Feature | Local (MongoDB) | iNaturalist (API) |
|---------|----------------|-------------------|
| **Data Source** | Express Server → MongoDB | iNaturalist API |
| **Endpoint** | `GET /observations` | `GET https://api.inaturalist.org/v1/observations` |
| **Data Format** | `{title, latinName, location, date, _id}` | `{taxon, photos, observed_on, place_guess, id}` |
| **Photos** | ❌ No photos | ✅ Has photos |
| **Pagination** | ❌ Load all at once | ✅ Pagination (6 per page) |
| **Filtering** | ❌ Not needed | ✅ Filter for valid observations |

## Implementation Steps

1. **Add global variable** to track current view
2. **Add event listeners** for toggle buttons
3. **Create clearGrid()** function to reset display
4. **Create loadLocalObservations()** function to fetch from Express
5. **Create displayLocalObservations()** function to show MongoDB data
6. **Update button styles** when switching views
7. **Handle empty state** (no local observations yet)
