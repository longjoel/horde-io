const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const path = require('path');
const reqIp = require('request-ip');

const users = require('./api/users');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(reqIp.mw());

users.register(app);

app.use(cors);
app.use('/',express.static(path.join(__dirname,'..','horde-io-client','dist')));


app.listen(3000);