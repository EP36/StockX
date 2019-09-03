const stockx = require ('./pgModel');

const pgController = {};

/**
 * @name getData
 * @description selects all data and loads them into the res.locals.data array
 */
pgController.getRatings = (req, res, next) => {
  stockx.query({
    text: 'select * from ratings'
  })
  .then( data => {
    if (data.rowCount > 0) {
      console.log(`Found ${data.rowCount} ratings`);
      res.locals.data = [];
      data.rows.forEach( row => {
        res.locals.ratings.push({ 
          id: row.sneaker_id,
        })
      })
    } else {
      console.log("No ratings found")
    }
    next();
  })
  .catch(err => {next(err);});
}

module.exports = pgController;