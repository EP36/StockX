const stockx = require ('./pgModel');

const pgController = {};

/**
 * @name getData
 * @description selects all data and loads them into the res.locals.data array
 */
pgController.getData = (req, res, next) => {
  stockx.query({
    text: 'select * from sneaker_sizing;'
  })
  .then( data => {
    if (data.rowCount > 0) {
      console.log(`Found ${data.rowCount} ratings`);
      res.locals.data = [];
      data.rows.forEach( row => {
        res.locals.ratings.push({ 
          name: row.sneaker_name,
        })
      })
    } else {
      console.log("No ratings found")
    }
    next();
  })
  .catch(err => {next(err);});
};

/**
 * @name getAvg
 * @description selects avg size and loads them into the res.locals.data array
 */
pgController.getAvg = (req, res, next) => {
  stockx.query({
    text: 'SELECT sneaker_name, AVG(tts_data) FROM sneaker_sizing GROUP BY sneaker_name;'
  })
  .then( data => {
    if (data.rowCount > 0) {
      console.log(`Found ${data.rowCount} true to size calculations`);
      res.locals.data = [];
      data.rows.forEach( row => {
        res.locals.ratings.push({ 
          name: row.sneaker_name,
        })
      })
    } else {
      console.log("No true to size calculations found")
    }
    next();
  })
  .catch(err => {next(err);});
}

/**
 * @name addData
 * @description adds new data to sneaker_sizing table
 */
pgController.addData = (req, res, next ) => {
  stockx.query({
    text: 'INSERT INTO sneaker_sizing (sneaker_name, tts_data) VALUES ($1, $2)',
    values: [req.body.sneaker_name, req.body.tts_data]
  })
  .then(() => {
    next();
  })
  .catch(err => {
    next(err);
  });
};


module.exports = pgController;