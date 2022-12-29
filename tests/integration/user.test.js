import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => { });
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

console.log("----------------------");


  //1-Test case for user registration
  describe('userRegistration', () => {
    const inputBody = {
      "firstName": "Sana",
      "lastName": "BB",
      "email": "sahanabasavaraj5@gmail.com",
      "password": "sahana123"
    }
    it('Given user details in registration should be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
        

        });
        done();
    });
  });

  // user registration with invalid data
  describe('userRegistration', () => {
    const inputBody = {
      "firstName": "Sana",
      "lastName": "B",
      "email": "sahana5@gmail.com",
      "password": "123456"
    }
    it('Given invalid data should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          

        });
        done();
    });
  });

  /// Test case for user login
  describe('userLogin', () => {
    const inputBody = {
      "email": "sahanabasavaraj5@gmail.com",
      "password": "sahana123"
    }
    it('Given user login details should be logged into account', (done) => {
      request(app)
        .post('/api/v1/users/loginuser')
        .send(inputBody)
        .end((err, res) => {
          //token = res.body.data;
          expect(res.statusCode).to.be.equal(202);
        

        });
        done();
    });
  });

  //  user login with invalid password
  describe('userLogin', () => {
    const inputBody = {
      "email": "sahana5@gmail.com",
      "password": "123456"
    }
    it('Given invalid password for login should get an error', (done) => {
      request(app)
        .post('/api/v1/users/loginuser')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
         
        });
        done();

    });
  });

});

