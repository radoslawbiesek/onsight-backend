const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const setHeaders = require('./middleware/setHeaders');
const errorHandler = require('./middleware/errorHandler');

const db = require('./config/db');

const app = express();

app.use(bodyParser.json());

app.use(setHeaders);
app.use(errorHandler);

mongoose
  .connect(db.url)
  .then(() => {
  app.listen(8080, () => console.log('App is listening on port 8080.'));
});
