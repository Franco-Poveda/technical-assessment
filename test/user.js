"use strict";
// NPM install mongoose and chai. Make sure mocha is globally
// installed
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const expect = chai.expect;
// Create a new schema that accepts a 'name' object.
// 'name' is a required field
const User = require("../api/user/model");

describe('[ User ]', function () {
  //Before starting the test, create a sandboxed database connection
  //Once a connection is established invoke done()
  before(function (done) {
    mongoose.connect('mongodb://localhost/testDatabase');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function () {
      done();
    });
  });
  describe('Start:', function () {
    it('New user saved to test database', function (done) {
      var testUser = User({
        name: 'Mike',
        avatar: "http://www.google.com/avatar"
      });

      testUser.save(done);
    });
    it('Dont save incorrect format to database', function (done) {
      //Attempt to save with wrong info. An error should trigger
      var wrongSave = User({
        notName: 'Not Mike'
      });
      wrongSave.save(err => {
        if (err) { return done(); }
        throw new Error('Should generate error!');
      });
    });
    it('Dont save incorrect user name length to database', function (done) {
      //Attempt to save with wrong info. An error should trigger
      var wrongSave = User({
        name: 'asd',
        avatar: "http://www.google.com/avatar"
      });
      wrongSave.save(err => {
        if (err) { return done(); }
        throw new Error('Should generate error!');
      });
    });
    it('Dont save incorrect user avatar format to database', function (done) {
      //Attempt to save with wrong info. An error should trigger
      var wrongSave = User({
        name: 'Franco',
        avatar: "someNonURLAvatar"
      });
      wrongSave.save(err => {
        if (err) { return done(); }
        throw new Error('Should generate error!');
      });
    });
    it('Should retrieve data from test database', function (done) {
      //Look up the 'Mike' object previously saved.
      User.find({ name: 'Mike' }, (err, name) => {
        if (err) { throw err; }
        if (name.length === 0) { throw new Error('No data!'); }
        done();
      });
    });
  });
  //After all tests are finished drop database and close connection
  after(function (done) {
    mongoose.connection.db.dropDatabase(function () {
      mongoose.connection.close(done);
    });
  });
});