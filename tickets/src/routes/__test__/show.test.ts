import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("should return 404 error if ticket not found", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it("should return ticket if ticket found", async () => {
  const ticket = { title: "azertyxsqu", price: 123 };

  const newTicket = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send(ticket)
    .expect(201);

  const retrievedTicket = await request(app)
    .get(`/api/tickets/${newTicket.body.id}`)
    .send()
    .expect(200);

  expect(retrievedTicket.body.title).toStrictEqual(ticket.title);
  expect(retrievedTicket.body.price).toStrictEqual(ticket.price);
});
