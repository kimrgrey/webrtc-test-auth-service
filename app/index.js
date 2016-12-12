const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const database = require('./utils/database');
const logger   = require('./utils/logger');
const secretRotation = require('./utils/secretRotation');

const authRouter = require('./routes/auth');

const application = express();
const server = http.createServer(application);

application.use(logger);
application.use(cors());
application.use(bodyParser.urlencoded({ extended: true }));
application.use(bodyParser.json());
application.use(authRouter);

const applicationHost = process.env.WEBRTC_HOST ||
                        process.env.HOST ||
                        'localhost';
const applicationPort = process.env.WEBRTC_PORT ||
                        process.env.PORT ||
                        3000;

database.connect();
secretRotation.start();

server.listen(applicationPort, applicationHost, () => {
  console.log('started on', applicationHost + ':' + applicationPort);
});
