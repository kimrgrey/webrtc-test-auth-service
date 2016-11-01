const crypto  = require('crypto');
const lodash  = require('lodash');
const config  = require('../config');
const TurnSecret = require('../models/turnSecret');


const generate = (user) => {
  return TurnSecret.current()
    .then(secret => {
      if (secret) {
        const auth = config.get('auth');
        const servers = config.get('servers');

        const timestamp = parseInt(Date.now() / 1000) + auth.expirationRate;
        const username = [timestamp, user].join(auth.delimeter);
        const hmac = crypto.createHmac('sha1', secret.value);

        hmac.setEncoding('base64');
        hmac.write(username);
        hmac.end();

        const password = hmac.read();

        const iceServers = [
          {
            urls: lodash.map(servers.stun, s => s.url),
          },
          {
            urls: lodash.map(servers.turn, s => s.url),
            username: username,
            credential: password,
          },
        ];

        return { iceServers };
      }

      return null;
    })
};

module.exports = {
  generate
};
