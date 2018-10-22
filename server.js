const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const yelp = require('yelp-fusion');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const apikey = '2u2d9VILWvjODb79fEZ4y1mXe8B4NfLAY9g2bIGEwMQdbN6ZtBZTScblejzr_vG0vgbtpEvB9IdsUHCPllt3edbnwov_RS4VCbPnF3HhxXa5pBnr4vAJ6Q5ZjDrLW3Yx';
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

app.listen(3000, () => console.log('server is running'));
