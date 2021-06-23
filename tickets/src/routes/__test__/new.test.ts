import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it("has a route handler to listening to /api/tickets for post request", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("can only acces if user authenticated", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("return other than 401 if user authenticated", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin()) //set authenticated cookie
    .send({});

  expect(response.status).not.toEqual(401);
});

it("throw error if title invalid", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ price: 123 })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "", price: 123 })
    .expect(400);
});

it("throw error if price invalid", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "123" })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "ZADZAD", price: "ERFS" })
    .expect(400);
});

it("ticket created valid inputs", async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "azszasasz", price: 123 })
    .expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
});
