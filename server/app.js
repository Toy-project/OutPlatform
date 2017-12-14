const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// All remaining requests return the React app, so it can handle routing.
app.get('/', function(request, response) {
  response.send('hello world');
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
