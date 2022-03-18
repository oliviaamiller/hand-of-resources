const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes

app.use('/api/v1/sweets', require('./controllers/sweets'));
app.use('/api/v1/cats', require('./controllers/cats'));
app.use('/api/v1/planets', require('./controllers/planets'));
app.use('/api/v1/pastas', require('./controllers/pastas'));
app.use('/api/v1/songs', require('./controllers/songs'));


// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
