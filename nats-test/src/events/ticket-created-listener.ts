import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = "order-service-queue-group";
  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log(`Data event !!! : ${JSON.stringify(data)}`);

    msg.ack(); //permet de dire au NATS que l'event à bien été reçu et compléter
  }
}
