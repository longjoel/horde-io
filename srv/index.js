const express = require('express');
const path = require('path');

const app = express();

app.use('/',express.static(path.join(__dirname,'..','horde-io-client','dist')));

app.listen(3000);