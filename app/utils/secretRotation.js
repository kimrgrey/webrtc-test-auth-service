const crypto = require('crypto');
const config = require('../config');
const TurnSecret = require('../models/turnSecret');


const regenerate = () => {
  const token = config.get('token');

  TurnSecret.remove()
    .then(()   => {
      const secrets = token.realms.map(realm => {
        const newSecret = new TurnSecret({
          realm: realm,
          value: crypto.randomBytes(48).toString('base64')
        });
        return newSecret.save();
      });

      return Promise.all(secrets);
    })
    .then(()   => {
      console.log('secrets regenerated');
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
