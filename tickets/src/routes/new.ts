import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@djticketsudemy/common";
import { createTicketSchema } from "../validations/req-ticket-validation";
import { Ticket } from "../models/ticket";
import { TicketCreatedPublisher } from "../events/ticket-created-publisher";
const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  validateRequest(createTicketSchema),
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });

    await ticket.save();

    /*  new TicketCreatedPublisher(client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
    }); */

    res.status(201).send(ticket);
  }
);

export { router as createTicketRoute };
