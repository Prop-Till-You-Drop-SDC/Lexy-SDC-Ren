const faker = require('faker');
const fakeData = require('./fakeData.js');
const fs = require('fs');

console.time('create JSON file')

var populate = function (start, primary) {
  var reservationCount = 0;
  var lodgingFile, hostFile, reservationFile;

  if (start === 1) {
    lodgingFile = fs.createWriteStream('./generated_data/lodgings.json');
    hostFile = fs.createWriteStream('./generated_data/hosts.json');
    reservationFile = fs.createWriteStream('./generated_data/reservations.json');
  } else {
    lodgingFile = fs.createWriteStream('./generated_data/lodgings2.json');
    hostFile = fs.createWriteStream('./generated_data/hosts2.json');
    reservationFile = fs.createWriteStream('./generated_data/reservations2.json');
  }

  hostFile.write('[', (err) => {
    if (err) console.log(err.message);
  });
  lodgingFile.write('[', (err) => {
    if (err) console.log(err.message);
  });
  reservationFile.write('[', (err) => {
    if (err) console.log(err.message);
  });

  for (let i = start; i <= primary; i++) {
    var hostId = i * 5;
    var lodging = {
      _id: i,
      lodgingDetails: {
        description: faker.commerce.productDescription(),
        guests: fakeData.getRandomSmallNumber(10),
        bedrooms: fakeData.getRandomSmallNumber(5),
        beds: fakeData.getRandomSmallNumber(10),
        baths: fakeData.getRandomSmallNumber(5),
        price: fakeData.getPrice(),
        rating: fakeData.getRandomSmallFloat()
      },
      host: hostId,
      location: {
        city: faker.address.city(),
        country: faker.address.country(),
        state: faker.address.state(),
        state_abbrev: faker.address.stateAbbr(),
        longitude: faker.address.longitude(),
        latitude: faker.address.latitude(),
      }
    }
    if (i === start) {
      lodgingFile.write(JSON.stringify(lodging), (err) => {
        if (err) console.log(err.message);
      });
    } else {
      lodgingFile.write(`,${JSON.stringify(lodging)}`, (err) => {
        if (err) console.log(err.message);
      });
    }

    var host = {
      _id: hostId,
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      img_url: faker.internet.avatar(),
      superhost: fakeData.getBool()
    }

    if (i === start) {
      hostFile.write(JSON.stringify(host), (err) => {
        if (err) console.log(err.message);
      });
    } else {
      hostFile.write(`,${JSON.stringify(host)}`, (err) => {
        if (err) console.log(err.message);
      });
    }

    if (fakeData.getBool()) {
      var reservation = {
        lodge_id: i,
        date_in: faker.date.past(10, new Date(2001, 0, 1)),
        date_out: faker.date.past(10, new Date(2001, 0, 1)),
        guest_id: fakeData.getId()
      }
      if (reservationCount === 0) {
        reservationFile.write(JSON.stringify(reservation), (err) => {
          if (err) console.log(err.message);
        });
      } else {
        reservationFile.write(`,${JSON.stringify(reservation)}`, (err) => {
          if (err) console.log(err.message);
        });
      }
      reservationCount++;
    }
  }

  lodgingFile.write(']', (err) => {
    if (err) console.log(err.message);
  });
  hostFile.write(']', (err) => {
    if (err) console.log(err.message);
  });
  reservationFile.write(']', (err) => {
    if (err) console.log(err.message);
  });
}

populate(1, 5000000);
populate(5000001, 10000000);


console.timeEnd('create JSON file');