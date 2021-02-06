module.exports = {
  getRandomSmallNumber: function (max) {
    return Math.floor(Math.random() * (max + 1));
  },
  getRandomSmallFloat: function () {
    return (Math.random() * (4) + 1).toFixed(2)
  },
  getPrice: function () {
    return Math.floor(Math.random() * (500 - 50) + 50);
  },
  getId: function () {
    return Math.floor(Math.random() * (10000000 - 10000) + 10000);
  },
  getBool: function () {
    var num = Math.floor(Math.random() * (2));
    return num === 0 ? false : true;
  }
}