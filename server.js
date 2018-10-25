const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const yelp = require('yelp-fusion');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const apikey = '<your-api>';
const client = yelp.client(apikey);

app.get('/api/search', (req, res) => {
  const requestLocation = req.query.location;
  const requestOffset = req.query.offset;

  client.search({
    term: 'restaurants',
    location: requestLocation,
    limit: 20,
    offset: requestOffset
  })
    .then(response => {
      const results = response.jsonBody.businesses;
      const prettyJson = JSON.stringify(results, null, 4);
      res.send(prettyJson);
    })
    .catch(err => console.log(err));
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`server is running on ${process.env.PORT}`)
});
