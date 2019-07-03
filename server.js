const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const yelp = require('yelp-fusion');
const { apiKey } = process.env || require('./secret');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const client = yelp.client(apiKey);

app.get('/api/search', (req, res) => {
  const requestLocation = req.query.location;
  const requestOffset = req.query.offset;
  const latitude = Number(req.query.latitude);
  const longitude = Number(req.query.longitude);

  let location = {};

  if (requestLocation) {
    location = {
      term: 'restaurants',
      location: requestLocation,
      limit: 20,
      offset: requestOffset,
    };
  } else {
    location = {
      term: 'restaurants',
      latitude: latitude,
      longitude: longitude,
      radius: 5000,
      limit: 20,
      offset: requestOffset,
    };
  }

  client
    .search(location)
    .then(response => {
      const results = response.jsonBody.businesses;
      const prettyJson = JSON.stringify(results, null, 4);
      res.send(prettyJson);
    })
    .catch(err => console.log(err));
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
