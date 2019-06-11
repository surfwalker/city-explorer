'use strict'

// load env variable from the .env file
require('dotenv').config();

// application depedencies
const express = require('express');
const cors = require('cors');

// application setup
const PORT = process.env.PORT;
const app = express();
app.use(cors());

// API routes
app.get('/location', (request, response) => {
  try {
    const locationData = searchToLatLong(request.query.data);
    response.send(locationData);
  }
  catch(error) {
    console.error(error);
    response.status(500).send('Status: 500. So sorry, something went wrong');
  }
});

function Location(query, geoData) {
  this.seach_query = query;
  this.formatted_query = geoData.results[0].formatted_address
  this.latitude = geoData.results[0].geometry.location.lat
  this.longitude = geoData.results[0].geometry.location.lng
}

function searchToLatLong(query) {
  const geoData = require('./data/geo.json');
  const location = new Location(query, geoData);
  return location
}

app.listen(PORT, () => console.log(`App is listening on ${PORT}`));