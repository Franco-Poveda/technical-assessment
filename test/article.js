"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const expect = chai.expect;
const Article = require("../api/article/model");
const User = require("../api/user/model");

describe('Database Tests', function() {
  before(function (done) {
    mongoose.connect('mongodb://localhost/testDatabase');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });
  describe('Test Database', function() {
        //Save user for future reference:
        var uid;
        before('New user saved to test database', function(done) {
          var testUser = User({
            name: 'Mike',
            avatar: "http://www.google.com/avatar"
          });
     
          testUser.save(function(err, u){
              uid = u._id;
              done();
          });
        });
    it('New article saved to test database', function(done) {
      var testArticle = Article({
        title:"test article 1",
        text:"text for test article 1",
         tags: ["news", "test"],
         userId: uid
      });
 
      testArticle.save(done);
    });
    it('Dont save incorrect format to database', function(done) {
      //Attempt to save with wrong info. An error should trigger
      var wrongSave = Article({
        notTitle: 'Not a title'
      });
      wrongSave.save(err => {
        if(err) { return done(); }
        throw new Error('Should generate error!');
      });
    });
    it('Dont save article without required userId', function(done) {
        //Attempt to save with wrong info. An error should trigger
        var wrongSave = Article({
          title:"test article 1",
          text:"text for test article 1",
           tags: ["news", "test"]
        });
        wrongSave.save(err => {
          if(err) { return done(); }
          throw new Error('Should generate error!');
        });
      });
      it('Dont save without required text value', function(done) {
        var wrongSave = Article({
          title:"test article 1",
           tags: ["news", "test"],
           userId:"5acdd1b051720cf0a96cd5d0"
        });
        wrongSave.save(err => {
          if(err) { return done(); }
          throw new Error('Should generate error!');
        });
      });
      it('Dont save without required title value', function(done) {
        var wrongSave = Article({
          text:"test article 1",
           tags: ["news", "test"],
           userId:"5acdd1b051720cf0a96cd5d0"
        });
        wrongSave.save(err => {
          if(err) { return done(); }
          throw new Error('Should generate error!');
        });
      });

    it('Should retrieve data from test database', function(done) {
      Article.find({}, (err, name) => {
        if(err) {throw err;}
        if(name.length === 0) {throw new Error('No data!');}
        done();
      });
    });
  });
  //After all tests are finished drop database and close connection
  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });
});