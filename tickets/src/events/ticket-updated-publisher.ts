import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@djticketsudemy/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
