const path = require('path');
const express = require('express');
const {
  check,
  validationResult
} = require('express-validator/check');
var compression = require('compression')

const bodyParser = require('body-parser');
const app = express();

app.use(compression());
app.use(bodyParser.json());

// serving static assets
app.use(express.static(path.join(__dirname, "public")));

app.post('/cal', [

  check('value').isNumeric().withMessage("Value must be a number").trim() // sanitize,
  .isLength({
    min: 1
  }).withMessage("Value must be atleast 1 character long")
  .not().isEmpty().withMessage("Password field cannot be empty"),

  check('value1').isNumeric().withMessage("Value must be a number").trim() // sanitize,
  .isLength({
    min: 1
  }).withMessage("Value must be atleast 1 character long")
  .not().isEmpty().withMessage("Password field cannot be empty")

], function (req, res, next) {

  // console.log(req.body);

  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }

  var x = JSON.parse(req.body.value);
  var y = JSON.parse(req.body.value1);
  var sign = req.body.operator;
  var result = 0;

  function plus(a, b) {
    return (a + b);
  }

  function minus(a, b) {
    return (a - b);
  }

  function multiply(a, b) {
    return (a * b);
  }

  function divide(a, b) {
    return (a / b);
  }

  function modulo(a, b) {
    return (a % b);
  }

  switch (sign) {
    case '+':
      result = plus(x, y);
      break;
    case '-':
      result = minus(x, y);
      break;
    case '*':
      result = multiply(x, y);
      break;
    case '/':
      result = divide(x, y);
      break;
    case '%':
      result = modulo(x, y);
      break;
    default:
      var err = new Error();
      return next(err);

  }

  res.status(200).json({
    'result': result
  });

});


app.use(function (err, req, res, next) {

  var err = new Error(err);
  err.code = err.status || 500;

  return res.status(err.code).json({
    message: err.message
  });

})

app.listen(3000, function () {
  console.log('App is running on port 3000');
})