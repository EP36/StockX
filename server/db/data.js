const fs = require('fs');

let writeLocation;
let dataList;

if (process.env.NODE_ENV === 'test') {
  writeLocation = `${__dirname}/data.test.json`;
  dataList = JSON.parse(fs.readFileSync(writeLocation));
} else {
  writeLocation = `${__dirname}/data.dev.json`;
  dataList = JSON.parse(fs.readFileSync(writeLocation));
}

const db = {};


/**
 * #sync - Overwrites the current database with data list from client
 *
 * @param {Array} data - the new data
 * @return {Array} the list of data
 */
db.sync = (data) => {
  if (!Array.isArray(data)) {
    return new Error(`data must be an array, received ${typeof data}`);
  }
  if (data.some(d => d.sneaker_name === undefined || d.tts_data === undefined)) {
    return new Error('Missing fields on some data');
  }
  if (data.some(d => typeof d.sneaker_name !== 'string')) {
    return new Error('Sneaker name value is not a string');
  }
  if (data.some(d => typeof d.tts_data !== 'number')) {
    return new Error('True to size rating value is not a number');
  }
  db.write(data);
  db.reset();
  return dataList;
};


/**
 * #find - Returns the entire list of data from the appropriate
 * data.env.json file.
 *
 * @return {Array} the list of data
 */
db.find = () => {
  db.reset();
  return dataList;
};


/**
 * #drop - Deletes everything from the appropriate data.env.json file and
 * writes an empty array in its place.
 */
db.drop = () => {
  dataList = [];
  db.write(dataList);
};


db.write = (data) => {
  fs.writeFileSync(writeLocation, JSON.stringify(data, null, 2));
};


db.reset = () => {
  dataList = JSON.parse(fs.readFileSync(writeLocation));
};


module.exports = db;
