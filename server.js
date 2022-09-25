const express = require('express');
const app = express();
require('dotenv').config();
const events = require('events');
const router = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

let eventForRequest = new events.EventEmitter();

eventForRequest.on('Request', (data) => {
  console.table(data);
});
let homeRequestCounter = 0;

eventForRequest.on('HomeRequestCounter', () => {
  homeRequestCounter = homeRequestCounter + 1;
  console.log('Home Page is totally requested ', homeRequestCounter, ' times');
});

function getCurrentTime() {
  const newDate = new Date();
  const datetime = newDate.toLocaleString();
  return datetime;
}

app.get('/', (req, res) => {
  const data = {
    requestType: 'get',
    requestRoute: '/',
    time: getCurrentTime(),
  };
  eventForRequest.emit('Request', data);
  eventForRequest.emit('HomeRequestCounter');
  res.send('Home Page');
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
