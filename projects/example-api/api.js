const express = require('express');
const app = express();
const port = 4210;

app.use(express.json({
  "type": "*/*"
}));



// @ts-ignore
const notifications = require('./notifications.json');

app.get('/', (req, res) => res.send('Hello World!'));

// Set special headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4201');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  next();
});

app.get('/notifications/overview', (req, res) => {
  res.send({
    data: 8
  });
});
app.get('/notifications', (req, res) => {
  res.send({
    data: notifications
  });
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));

