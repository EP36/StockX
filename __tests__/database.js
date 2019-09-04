// Here we will be unit testing the 3 main database functions from server/db/markets.js
const fs = require('fs');
const path = require('path');
const db = require('../server/db/database.js');

const testJsonFile = path.resolve(__dirname, '../server/db/data.test.json');

/**
 * Like many testing frameworks, in Jest we use the "describe" function to
 * separate our tests into sections. They make your test outputs readable.
 *
 * You can place "beforeAll", "beforeEach", "afterAll", and "afterEach"
 * functions inside of "describe" blocks and they will only run for tests
 * inside that describe block. You can even nest describes within describes!
 */
describe('db unit tests', () => {
  /**
   * Jest runs the "beforeAll" function once, before any tests are executed.
   * Here, we write to the file and then reset our database model. Then, we
   * invoke the "done" callback to tell Jest our async operations have
   * completed. This way, the tests won't start until the "database" has been
   * reset to an empty Array!
   */
  beforeAll((done) => {
    fs.writeFile(testJsonFile, JSON.stringify([]), () => {
      db.reset();
      done();
    });
  });

  afterAll((done) => {
    fs.writeFile(testJsonFile, JSON.stringify([]), done);
  });

  describe('#sync', () => {
    it('writes a valid marketList to the JSON file', () => {
      const marketList = [{ location: 'here', cards: 11 }, { location: 'there', cards: 0 }];
      const result = db.sync(marketList);
      expect(result).not.toBeInstanceOf(Error);
      const table = JSON.parse(fs.readFileSync(testJsonFile));
      expect(table).toEqual(marketList);
    });

    // TODO: Finish unit testing the sync function

    it('overwrites previously existing markets', () => {
      // test case for original marketList
      // test case for new marketList
      const marketList = [{ location: 'here', cards: 11 }, { location: 'there', cards: 0 }];
      db.sync(marketList);
      const newMarketList = [{ location: 'here', cards: 11 }, { location: 'there', cards: 0 }, { location: 'codesmith' , cards: 5}];
      // we are going to sync with new marketList
      const result = db.sync(newMarketList);
      expect(result).not.toBeInstanceOf(Error);
      // check if db updated with new marketList
      const table = JSON.parse(fs.readFileSync(testJsonFile));
      expect(table).toEqual(newMarketList);
    });

    it('returns an error when location and/or cards fields are not provided', () => {
      // check if cards fields exist
      // test case for cards
      const marketList = [{ cards: 3 }];
      const result = db.sync(marketList);
      expect(result).toBeInstanceOf(Error);
      // return new Error('Missing fields on some markets');
    });

    /**
     *  TODO: Type validation is not yet correctly implemented! Follow the TDD
     *  (test driven development) approach:
     *    1. Write a test describing the desired feature (db.sync returns a
     *      TypeError when the types are wrong)
     *    2. Confirm that your tests fail
     *    3. Follow the errors to implement your new functionality
     */
    it('returns an error when location value is not a string', () => {
      const marketList = [{ location: 1, cards: 5 }];
      const result = db.sync(marketList);
      expect(result).toBeInstanceOf(Error);
    });

    it('returns an error when cards value is not a number', () => {
      const marketList = [{ location: 'new york', cards: 'hey' }];
      const result = db.sync(marketList);
      expect(result).toBeInstanceOf(Error);
    });
  });

  // Extension TODO: Unit test the #find and #drop functions
  describe('#find', () => {
    it('returns list of all markets from the json file', () => {
      const marketList = [{ location: 'New York', cards: 5 }];
      db.sync(marketList);
      const result = db.find();
      expect(result).toEqual(marketList);
    });

    it('works if the list of markets is empty', () => {
      const marketList = [];
      db.sync(marketList);
      const result = db.find();
      expect(result).toEqual(marketList);
    });
  });

  describe('#drop', () => {
    it('writes an empty array to the json file', () => {
      const marketList = [{ location: 'New York', cards: 5 }];
      db.sync(marketList);
      db.drop();
      const result = db.find();
      expect(result).toEqual([]);
    });
  });
});
