const express = require('express');
const bodyParser = require('body-parser');
const { getRatings }

const app = express();

const PORT = process.env.PORT || '3000';

app.use(bodyParser.json());

app.get('/api/getData', (req, res) => {
  res.status(200)
})

app.post('/api/addData', (req, res) => {
  res.sendStatus(200)
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.error(err);
  res.status(err.status || 500).send(res.locals.message);
});

app.listen(PORT, (err) => {
  console.log(new Date(), err || 'server listening on port ' + PORT)
});

module.exports = app;