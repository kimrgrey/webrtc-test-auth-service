const express = require('express');
const iceServers = require('../utils/iceServers');

const router = express.Router();

router.route('/')
  .get((request, responce, next) => {
    const { username } = request.query;

    iceServers.generate(username)
      .then(({ iceServers, expires }) => {
        if (iceServers) {
          responce.json({ iceServers, expires });
        }
        else {
          console.log('secret not found');
          responce.sendStatus(400);
        }
      })
      .catch(er => {
        console.log(e);
        responce.sendStatus(400);
      });
  });

module.exports = router;
