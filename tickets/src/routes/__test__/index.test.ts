import request from "supertest";
import { app } from "../../app";

const createTicket = async () => {
  const ticket = { title: "azertyxsqu", price: 123 };

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send(ticket)
    .expect(201);
};

it("should return list of tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const retrievedTicket = await request(app)
    .get(`/api/tickets`)
    .send()
    .expect(200);

  expect(retrievedTicket.body.length).toEqual(3);
});
