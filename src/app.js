const express = require('express');
const bodyParser = require('body-parser');

const setHeaders = require('./middleware/setHeaders');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(bodyParser.json());

app.use(setHeaders);
app.use(errorHandler);

app.listen(8080, () => console.log('App is listening on port 8080.'));
