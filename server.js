const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3001);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());


app.get('/api/v1/all/', (request, response) => {
  return database('weather').select()
    .then(weather => {
      return response.status(200).json({
        status: 'success',
        weather
      });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/year/:yearID', (request, response) => {
  const yearID = request.params.yearID;
  return database('weather').where({
    year: yearID
  }).orderBy('id', 'asce').select()
    .then(year => {
      return response.status(200).json({
        status: 'success',
        year
      });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/last5', (request, response) => {
  const currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  return database('weather').whereBetween('year', [(currentYear - 5), currentYear]).select()
    .then(years => {
      return response.status(200).json({
        status: 'success',
        years
      });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});



server.listen(app.get('port'), () => {
  console.log(`Express intro running on localhost: ${app.get('port')}`);
});

module.exports = app;