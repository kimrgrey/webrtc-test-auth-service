const randomstring = require('randomstring');
const config = require('../config');
const TurnSecret = require('../models/turnSecret');


const regenerate = () => {
  TurnSecret.remove()
    .then(()   => {
      const newSecret = new TurnSecret({ value: randomstring.generate(20) });
      return newSecret.save();
    })
    .then(()   => {
      console.log('secret regenerated');
    })
    .catch(err => {
      console.log(err);
    });
};

const start = () => {
  const token = config.get('token');

  regenerate();
  setInterval(regenerate, token.refreshRate *  1000);
};

module.exports = {
  regenerate,
  start,
};
