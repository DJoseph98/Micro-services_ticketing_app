import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@djticketsudemy/common";
import { createTicketRoute } from "./routes/new";
import { showTicketsRoute } from "./routes/show";
import { indexTicketRoute } from "./routes/index";
import { updateTicketRoute } from "./routes/update";
const app = express();

//Accept proxy
app.set("trust proxy", true);
app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    //authorize uniquement HTTPS
    secure: process.env.NODE_ENV !== "test",
  })
);
//apply middleware current user to setup jwt cookie if signed
app.use(currentUser);

app.use(createTicketRoute);
app.use(showTicketsRoute);
app.use(indexTicketRoute);
app.use(updateTicketRoute);
// match all request who not exist

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
