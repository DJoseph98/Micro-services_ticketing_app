import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract subject: T["subject"]; // nom du canal de communication à utiliser / subject (ex: ticket:created)
  abstract queueGroupName: string; //Qgroupe to dispatch message between copy of the service
  private client: Stan; // client
  abstract onMessage(data: T["data"], msg: Message): void;
  protected ackWait = 5 * 1000; //5 seconde pour renvoyer message à la place de 30

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    //options à passer à mon client
    return this.client
      .subscriptionOptions()
      .setManualAckMode(true) //ackowledge permet de dire au NATS si un event à bien été recu et finit
      .setAckWait(this.ackWait) //définit renvoie message
      .setDeliverAllAvailable() //------------\
      .setDurableName(this.queueGroupName); //---------> permet de relancer tout les event qui n'ont pas pu être process si service offline
  }

  listen() {
    //config client pour écouter et récupère message
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on("message", (msg: Message) => {
      console.log(
        `msg received sub: ${this.subject} / qGName: ${this.queueGroupName}`
      );

      const parseData = this.parseMessage(msg);
      this.onMessage(parseData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getRawData();

    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}
