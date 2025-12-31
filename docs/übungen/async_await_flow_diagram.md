# Async/Await Flow Diagram: GET /observation/:id

This diagram shows how async/await works in detail for the `GET /observation/:id` endpoint.

```mermaid
sequenceDiagram
    participant Client as HTTP Client
    participant Express as Express Router
    participant Handler as async Handler Function
    participant EventLoop as JavaScript Event Loop
    participant Mongoose as Mongoose Model
    participant MongoDB as MongoDB Database
    participant Promise as Promise Object

    Client->>Express: GET /observation/:id<br/>(e.g., /observation/507f1f77bcf86cd799439011)
    Express->>Handler: Call async function<br/>app.get('/observation/:id', async (req, res) => {...})
    
    Note over Handler: Function starts executing synchronously
    Handler->>Handler: Extract ID from req.params.id
    
    Note over Handler: await Observation.findById() is called
    Handler->>Mongoose: Observation.findById(req.params.id)
    Mongoose->>Promise: Create Promise object<br/>(pending state)
    Mongoose->>MongoDB: Send query: findOne({ _id: id })
    
    Note over Handler,EventLoop: await pauses function execution here<br/>Control returns to Event Loop
    
    Handler-->>EventLoop: Function execution paused<br/>(awaiting Promise resolution)
    
    Note over EventLoop: Event Loop continues processing<br/>other tasks (other requests, timers, etc.)
    
    MongoDB->>MongoDB: Search collection for document<br/>with matching _id
    
    alt Document Found
        MongoDB-->>Mongoose: Return document data<br/>{ _id, title, latinName, ... }
        Mongoose-->>Promise: Promise resolves with data
        Promise-->>EventLoop: Promise fulfilled
        EventLoop->>Handler: Resume function execution<br/>(await returns the resolved value)
        Handler->>Handler: const observation = <resolved data>
        Handler->>Handler: Check: if (!observation)
        Note over Handler: observation exists, skip if block
        Handler->>Express: res.json(observation)
        Express-->>Client: HTTP 200 OK<br/>JSON: { _id, title, latinName, location, date }
    else Document Not Found
        MongoDB-->>Mongoose: Return null (no document found)
        Mongoose-->>Promise: Promise resolves with null
        Promise-->>EventLoop: Promise fulfilled
        EventLoop->>Handler: Resume function execution<br/>(await returns null)
        Handler->>Handler: const observation = null
        Handler->>Handler: Check: if (!observation)
        Note over Handler: observation is null, enter if block
        Handler->>Express: return res.status(404).json(...)
        Express-->>Client: HTTP 404 Not Found<br/>JSON: { error: 'Beobachtung nicht gefunden' }
    else Database Error
        MongoDB-->>Mongoose: Return error (invalid ID, connection error, etc.)
        Mongoose-->>Promise: Promise rejects with error
        Promise-->>EventLoop: Promise rejected
        EventLoop->>Handler: Throw error (await throws exception)
        Handler->>Handler: catch (err) block executes
        Handler->>Express: res.status(500).json({ error: err.message })
        Express-->>Client: HTTP 500 Internal Server Error<br/>JSON: { error: 'error message' }
    end
```

## Key Concepts Explained

### 1. **Async Function Declaration**
```javascript
app.get('/observation/:id', async (req, res) => {
```
- The `async` keyword makes the function return a Promise automatically
- Allows use of `await` inside the function

### 2. **Await Pauses Execution**
```javascript
const observation = await Observation.findById(req.params.id);
```
- `await` pauses the function execution at this line
- Control returns to the Event Loop (allows other code to run)
- Function execution resumes when the Promise resolves/rejects

### 3. **Promise Lifecycle**
- **Pending**: Promise is created, operation in progress
- **Fulfilled**: Operation succeeded, Promise resolves with value
- **Rejected**: Operation failed, Promise rejects with error

### 4. **Event Loop Behavior**
- While waiting for the database, JavaScript can process other requests
- This is why Node.js can handle many concurrent requests efficiently
- When Promise resolves, the function resumes from where it paused

### 5. **Error Handling**
- If Promise rejects, `await` throws an exception
- `try/catch` block catches the exception
- Error response is sent to client

## Comparison: Without Async/Await

**Without async/await (callback style):**
```javascript
app.get('/observation/:id', (req, res) => {
    Observation.findById(req.params.id, (err, observation) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!observation) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json(observation);
    });
});
```

**With async/await (current style):**
```javascript
app.get('/observation/:id', async (req, res) => {
    try {
        const observation = await Observation.findById(req.params.id);
        if (!observation) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json(observation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
```

**Benefits of async/await:**
- More readable (looks like synchronous code)
- Easier error handling (try/catch instead of nested callbacks)
- Better debugging (stack traces are clearer)
