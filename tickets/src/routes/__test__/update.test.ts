import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { natsWrapper } from "../../nats-wrapper";

const id = mongoose.Types.ObjectId().toHexString();
const ticket = { title: "azertyxsqu", price: 123 };

it("return 401 if user not logged in", async () => {
  await request(app).put(`/api/tickets/${id}`).send(ticket).expect(401);
});

it("return 401 if user does not have a ticket", async () => {
  const newTicket = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send(ticket)
    .expect(201);

  await request(app)
    .put(`/api/tickets/${newTicket.body.id}`)
    .set("Cookie", global.signin())
    .send({ title: "azertyxsqu", price: 3000 })
    .expect(401);
});

it("return 400 if invalid price and title", async () => {
  const cookie = global.signin();

  const newTicket = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send(ticket)
    .expect(201);

  await request(app)
    .put(`/api/tickets/${newTicket.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 123 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${newTicket.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "dzada", price: "" })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${newTicket.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "e&é", price: 123 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${newTicket.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "zaeazeazeaz", price: -50 })
    .expect(400);
});

it("return 404 if id does not exist", async () => {
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send(ticket)
    .expect(404);
});

it("should update ticket if ticket found", async () => {
  const cookie = global.signin();

  const newTicket = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send(ticket)
    .expect(201);

  await request(app)
    .put(`/api/tickets/${newTicket.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "testtesttest", price: 4000 })
    .expect(200);

  const retrievedTicket = await request(app)
    .get(`/api/tickets/${newTicket.body.id}`)
    .send()
    .expect(200);

  expect(retrievedTicket.body.title).toEqual("testtesttest");
  expect(retrievedTicket.body.price).toEqual(4000);
});

it("should submit event on update", async () => {
  const cookie = global.signin();

  const newTicket = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send(ticket)
    .expect(201);

  await request(app)
    .put(`/api/tickets/${newTicket.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "testtesttest", price: 4000 })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled(); //mock function
});
