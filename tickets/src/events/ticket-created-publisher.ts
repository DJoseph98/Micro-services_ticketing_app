import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@djticketsudemy/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
