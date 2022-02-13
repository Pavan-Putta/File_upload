const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/routes');
const errorLogger = require('./utilities/errorLogger')
const app = express();

const port = 4500;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/',router);
app.use(errorLogger);

app.listen(port);
console.log('Servise started at '+ port);

