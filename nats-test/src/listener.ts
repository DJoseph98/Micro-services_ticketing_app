import nats, { Message, Stan } from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListener } from "./events/ticket-created-listener";
console.clear();

// nom client NATS (unique !!!)
const stan: any = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connect to NATS");

  // trick to say to nats to directy consider no responsd service as closed
  stan.on("close", () => {
    console.log("NATS connection closed");
    process.exit();
  });

  new TicketCreatedListener(stan).listen();

  /*   const options = stan
    .subscriptionOptions()
    .setManualAckMode(true) //ackowledge permet de dire au NATS si un event à bien été recu et finit
    .setDeliverAllAvailable() //------------\
    .setDurableName("service-test"); //---------> permet de relancer tout les event qui n'ont pas pu être process si service offline
  // récupère ticket:created event envoyé par le publiser
  const subscription = stan.subscribe(
    "ticket:created", //subject
    "order-service-queue-group", //Qgroupe to dispatch message between copy of the service
    options
  );

  // écoute le message envoyé
  subscription.on("message", (msg: Message) => {
    const data = msg.getRawData();

    console.log(
      // numéro de sequence(ordre) de NATS
      `Message received with sequence ${msg.getSequence()}, with data ${data}`
    );

    msg.ack(); //permet de dire au NATS que l'event à bien été reçu
  }); */
});

// trick to say to nats to directy consider no responsd service as closed

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
