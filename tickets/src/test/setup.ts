import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import jwt from "jsonwebtoken";

//    /\
//   /  \ ---->
// ---- ANTI PATTERN D'ALLER APPELER UN AUTRE SERVICE POUR AIDER A TESTER UNE FONCTIONNALITE DU SERVICE COURANT :
//            (ex: appeler service AUTHENTICATION pour avoir un cookie auth)

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[];
    }
  }
}

let mongo: any;

//genere fake mongodb Uri for test and setup mongodb with this uri
beforeAll(async () => {
  process.env.JWT_KEY = "testtest";
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
//create fake cookie to test route with auth requirement
global.signin = () => {
  // Build a JWT payload.  { id, email }
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return a string thats the cookie with the encoded data
  return [`express:sess=${base64}`];
};
