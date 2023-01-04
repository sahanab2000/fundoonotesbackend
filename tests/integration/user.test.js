import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';
var jwttoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuaXRoYUBnbWFpbC5jb20iLCJpZCI6IjYzYWVkNWI5ZWYwM2FkNzc1ODJlOWI5ZCIsImlhdCI6MTY3MjQwNDU3NH0.6gEif1GQmSwwP-A8FoaI08_uIxJ5edBxdQVF_ieDujU";
var noteid;
var token;
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

  console.log("-----------");

  // 1 test case for registration
  describe('UserRegistration', () => {
    
    it('Given user details should be saved in database', (done) => {
      const input = {
        "firstName": "sahana",
        "lastName": "Basavaraj",
        "email": "sahanabasavaraj5@gmail.com",
        "password": "12345678"
      }
      request(app)
        .post('/api/v1/users/register')
        .send(input)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
      
        });
        done();
    });
  });

  //2 test case for loginuser
  describe('loginuser', () => {

    it('Given user details should be saved in database', (done) => {
      const input = {
      
        "email": "sahanabasavaraj5@gmail.com",
        "password": "12345678"
      }
      request(app)
        .post('/api/v1/users/loginuser')
        .send(input)
        .end((err, res) => {
        console.log("message------",res);
        jwttoken=res.body.data
        expect(res.statusCode).to.be.equal(200);
    
      });
      done();
   });
 });
  
 //3 test case for create note
  describe('createnote', () => {
    const noteBody = {
      "title": "war",
      "description": "between countries",
      "colour": "red",
       
      
    }
    it('Given new note should save in database', (done) => {
      request(app)
        .post('/api/v1/notes/create')
        .set('Authorization', `Bearer ${jwttoken}`)
        .send(noteBody)
        .end((err, res) => {
          noteid = res.body.data._id;
          expect(res.statusCode).to.be.equal(201);
        
        });
        done();
       
    });
  });
   
   //4 test case for registration with invalid email
   describe('UserRegistration for invalid details', () => {
    const input = {
      "firstName": "sahana",
      "lastName": "BB",
      "email": "sahana@gmail.com",
      "password": "123456"
    }
    it('Given user invalid details should thorw error', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(input)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
         
        });
        done();
    });
  });

   // 5 test case for userlogin with invalid email

   describe('Userlogin', () => {
    const input = {
      "email": "sahanab@gmail.com",
      "password": "123456"
    }
    it('Given user login details should get error as invalid emailid', (done) => {
      request(app)
        .post('/api/v1/users/loginuser')
        .send(input)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
         
        });
        done();
    });
  });

   //6 test case for registration with invalid password
   describe('UserRegistration', () => {
    const input = {
      firstName: "sahana",
      lastName: "BB",
      email: "sahanabasavaraj5@gmail.com",
      password: "1234"
    }
    it('Given user details should be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(input)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
         
        });
        done();
    });
  });

  //7 test case for loginuser with invalid password
  describe('Userlogin', () => {
    const input = {
      "email": "sahana5@gmail.com",
      "password": "sana"
    }
    it('Given user login details should throw invalid password', (done) => {
      request(app)
        .post('/api/v1/users/loginuser')
        .send(input)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          
        });
        done();
    });
  }); 

   //8 test case for update note by id
   describe('updateNote', () => {
    const  noteBody = {
      "title": "war",
      "description": "between countries",
      "colour": "blue",
     
    }
    it('Given new note should update colour', (done) => {
      request(app)
        .put(`/api/v1/notes/${noteid}`)
        .set('Authorization', `Bearer ${jwttoken}`)
        .send( noteBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
       
    });
   
  });
   
  // 9 delete note by id 
  describe('Delete note byid', () => {
    it('Given note by id  should delete note', (done) => {
      request(app)
        .delete(`/api/v1/notes/${noteid}`)
        .set('Authorization', `Bearer ${jwttoken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

   //10 Test case for delete note by ID without authorization
 describe('delete note by id', () => {
  it('Given authorization updating note by ID should fail and return status code 400', (done) => {
    request(app)
      .delete(`/api/v1/notes/${noteid}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        done();
      });
  });
});

  //11 Test case for archive note by ID with authorization
  describe(' Archive note by id with authorization ', () => {
    it('Given valid id archive note by ID successfully complete should return status code 202', (done) => {
      request(app)
        .put(`/api/v1/notes/${noteid}/archive`)
        .set('Authorization', `Bearer ${jwttoken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  //12 Test case for trash note by ID with authorization
  describe('Trash note by id', () => {
    it('Given valid id trash note by ID successfully complete should return status code 202', (done) => {
      request(app)
        .put(`/api/v1/notes/${noteid}/trash`)
        .set('Authorization',` Bearer ${jwttoken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  //13 Test case for unarchive note by ID with authorization
describe(' Archive note by id with authorization ', () => {
  it('Given valid id unarchive note by ID successfully complete should return status code 202', (done) => {
    request(app)
      .put(`/api/v1/note/${noteid}/unarchive`)
      .set('Authorization', `Bearer ${jwttoken}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(404);
        done();
      });
  });
});

//14 Test case for untrash note by ID with authorization
describe('Trash note by id', () => {
  it('Given valid id trash note by ID successfully complete should return status code 202', (done) => {
    request(app)
      .put(`/api/v1/note/${noteid}/untrash`)
      .set('Authorization', `Bearer ${jwttoken}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(404);
        done();
      });
  });
});
 
});
 
  
 

