import express, { Request, Response } from "express";
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  NotAuthorizedError,
} from "@djticketsudemy/common";
import { createTicketSchema } from "../validations/req-ticket-validation";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  validateRequest(createTicketSchema),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      throw new NotFoundError();
    }
    if (req.currentUser!.id !== ticket.userId) {
      throw new NotAuthorizedError();
    }

    ticket.set(req.body);

    await ticket.save();

    res.send(ticket);
  }
);

export { router as updateTicketRoute };
