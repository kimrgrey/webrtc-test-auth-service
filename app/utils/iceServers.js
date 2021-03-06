const crypto  = require('crypto');
const lodash  = require('lodash');
const config  = require('../config');
const TurnSecret = require('../models/turnSecret');


const generate = (user, realm) => {
  return TurnSecret.current(realm)
    .then(secret => {
      if (secret) {
        const auth = config.get('auth');
        const servers = config.get('servers');

        const timestamp = parseInt(Date.now() / 1000) + auth.expirationRate;
        const username = [timestamp, user].join(auth.delimeter);
        const hmac = crypto.createHmac(auth.alg, secret.value);

        hmac.setEncoding(auth.encoding);
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

        return { iceServers, expires: timestamp };
      }

      return null;
    })
};

module.exports = {
  generate
};
