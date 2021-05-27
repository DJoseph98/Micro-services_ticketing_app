import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>;
    }
  }
}

let mongo: any;

//genere fake mongodb Uri for test and setup mongodb with this uri
beforeAll(async () => {
  process.env.JWT_KEY = 'testtest';
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

//delete each document in db
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

//create global function to avoid repeat each test signup request
global.signin = async () => {
  const email = 'test1@test2.com';
  const password = 'password';
  const confirmPassword = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({ email, password, confirmPassword })
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
};
