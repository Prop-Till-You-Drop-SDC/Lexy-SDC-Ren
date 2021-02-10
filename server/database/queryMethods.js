const { MongoClient } = require('mongodb');

var url = 'mongodb://localhost:27017';
const getLodging = function (id, cb) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    var dbo = db.db('scareBnb');
    dbo.collection('lodgings').find({ _id: id }).toArray((err, result) => {
      if (err) throw err;
      getHost(result[0].host, cb, result)
      db.close();
    })
  })
}

const getHost = function (id, cb, result) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    var dbo = db.db('scareBnb');
    dbo.collection('hosts').find({ _id: id }, { _id: 0}).toArray((err, hostInfo) => {
      if (err) throw err;
      result[0].host = hostInfo[0];
      cb(result);
      db.close();
    })
  })
}

const reserveLoge = function (data) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    var dbo = db.db('scareBnb');
    dbo.collection('reservations').insertOne(data)
      .then(() => {
        console.log('success!!!!!!');
        db.close();
    })
    // db.close();
  })
}

module.exports = {getLodging:getLodging, getHost:getHost, reserveLoge:reserveLoge}