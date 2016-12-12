const express = require('express');
const iceServers = require('../utils/iceServers');

const router = express.Router();

router.route('/')
  .get((request, responce, next) => {
    const { username, realm = '' } = request.query;

    iceServers.generate(username, realm)
      .then(connectionConfig => {
        if (connectionConfig) {
          responce.json(connectionConfig);
        }
        else {
          console.log('secret not found');
          responce.sendStatus(400);
        }
      })
      .catch(er => {
        console.log(er);
        responce.sendStatus(400);
      });
  });

module.exports = router;
