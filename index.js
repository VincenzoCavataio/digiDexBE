const express = require('express')
const app = express()
const port = process.env.PORT || 8000;
const path = require('path');
const data = require('./data.json')
var cors = require('cors')

app.use(cors())


app.get('/digimon/:digimon', function (req, res) {
  const hostname = req.headers.host;
  let selected = data.filter(e => { if (e.name === req.params.digimon) return e }).map(e => ({...e, url: req.protocol+"://"+hostname+e.url}));
  res.send(selected);
});

app.get('/min/:digimon', function (req, res) {
  fs = require('fs');
  var img = fs.readFileSync('./assets/imgs/'+req.params.digimon);
  res.send(img);
});

app.get('/digimons', function (req, res) {
  const hostname = req.headers.host;
  let digimons = data.map(e => ({...e, url: req.protocol+"://"+hostname+e.url}))
  res.send(digimons);
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})