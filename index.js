const path = require('path');
const express = require('express');

var compression = require('compression')


const app = express();

app.use(compression());


// serving static assets
app.use(express.static(path.join(__dirname, "public")));





app.listen(process.env.PORT || 3000, function () {
  console.log('App is running on port 3000');
})