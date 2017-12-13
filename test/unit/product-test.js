const Product = require('../../models/product');
const chai    = require('chai');
const expect  = chai.expect;
var knex      = require('../../models/database').knex;
var bookshelf = require('bookshelf')(knex);
var knexCleaner = require('knex-cleaner');


describe('Product Unit Tests', () => {

  beforeEach(function(done) {
    knexCleaner.clean(bookshelf.knex);
    done();
  });

  describe('#create()', () => {
    it('should create a new product', (done) => {
      Product.forge({
        name: 'milk',
        barcode: '123',
      }).save()
        .then((product) => {
        expect(product.attributes).to.include({name: 'milk'})
        expect(product.attributes).to.include({barcode: '123'})
        done()
      })
    })

    it('should raise an error if name field is blank', (done) => {
      Product.forge({
        "name": '',
        "barcode": '1234'
      }).save().then(function (result) {
        expect.fail();
        done();
      }).catch(function (err) {
        expect(err['message']).to.match(/Name cannot be empty./);
        done();
      });
    })

    it('should raise an error if barcode field is blank', (done) => {
      models.Product.create({
        "name": 'bread',
        "barcode": ''
      }).then(function (result) {
        expect.fail();
        done();
      }).catch(function (err) {
        expect(err['message']).to.match(/Barcode cannot be empty./);
        done();
      });
    })
  })
})
