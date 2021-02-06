const faker = require('faker');
const fakeData = require('./fakeData.js');
const fs = require('fs');

console.time('seed')
var data = 'host,city,country,state,state_abbrev,longitude,latitude,description,guests,bedrooms,baths,beds,price,rating\n';

const outputFile = fs.createWriteStream('output.csv');

outputFile.write(data, (err) => {
  if (err) {
    console.log(err.message);
  }
});

for (let i = 0; i < 100; i++) {
  var hostId = fakeData.getId();
  var d = `${hostId},${faker.address.city()},${faker.address.country()},${faker.address.state()},${faker.address.stateAbbr()},${faker.address.longitude()},${faker.address.latitude()},great place to stay,${fakeData.getRandomSmallNumber(10)},${fakeData.getRandomSmallNumber(5)},${fakeData.getRandomSmallNumber(10)},${fakeData.getRandomSmallNumber(5)},${fakeData.getPrice()},${fakeData.getRandomSmallFloat()}`;
  outputFile.write(d, (err) => {
    if (err) {
      console.log(err.message);
    }
  });
}

console.timeEnd('seed');