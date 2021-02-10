const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const db = require('./database/queryMethods.js');
const faker = require('faker');
require('newrelic');
const PORT = 3001;

const app = express();

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/', express.static(`${__dirname}/../client/public`));
app.use('/bundle', cors(), express.static(`${__dirname}/../client/public/bundle.js`));


app.get('/lodge/:id', (req, res) => {
  db.getLodging(Number(req.params.id), (result) => {
    res.send(result)
  })
});

app.post('/reserve/:id', (req, res) => {
  var data = {
    lodge_id: Number(req.params.id),
    date_in: faker.date.past(10, new Date(2020, 0, 1)),
    date_out: faker.date.past(10, new Date(2020, 0, 1)),
    guest_id: 1992
  }
  console.log(data)
  db.reserveLoge(data)
  console.log('record inserted')
  res.send('record inserted')
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
