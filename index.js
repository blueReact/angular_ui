const path = require('path');
const express = require('express');

const app = express();

// serving static assets
app.use(express.static(path.join(__dirname, "dist")));

// listen for requests
app.listen(process.env.PORT || 3000, () => console.log('Example app listening on port 3000!'))