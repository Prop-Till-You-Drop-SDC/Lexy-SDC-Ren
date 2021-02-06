const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression')

const db = require('./database');

const app = express();

app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// app.use(express.static(__dirname + '/../client/public'));
app.use('/', express.static(`${__dirname}/../client/public`));
app.use('/bundle', cors(), express.static(`${__dirname}/../client/public/bundle.js`));

const PORT = 3001;

app.get('/lodge', cors(), (req, res) => {
  console.log(`req.query.id ${req.query.id}`);
  const { id } = req.query;

  console.log(db);

  db.getLodgingById(id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
