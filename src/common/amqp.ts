// eslint-disable-next-line @typescript-eslint/no-var-requires
const amqp = require('amqplib');
const RABBIT = process.env.RABBIT;
//amqp://guest:guest@rabbit:5672 in my docker env
if (!RABBIT) {
  throw new Error('missing RABBIT');
}

const handleTst1 = (message) => {
  const data = JSON.parse(message.content.toString());
  console.log('consume tst1 msg');
  console.log(data);
};

const handleTst2 = (message) => {
  const data = message.content.toString();
  console.log('consume tst2 msg');
  console.log(data);
};

class RabbitMQ {
  private conn;
  public channel;
  constructor(private rabbitUrl) {
    this.rabbitUrl = rabbitUrl;
  }

  async initialize(queList: string[]) {
    this.conn = await amqp.connect(this.rabbitUrl);
    this.channel = await this.conn.createChannel();
    queList.forEach(async (que) => {
      await this.channel.assertQueue(que, { durable: true });
      await this.channel.consume(
        que,
        (message) => {
          const targetQue: string = message.fields.routingKey;
          if (targetQue === 'tst1') {
            handleTst1(message);
          }
          if (targetQue === 'tst2') {
            handleTst2(message);
          }
        },
        { noAck: true },
      );
    });
    console.log('RabbitMQ connected');
  }
}
export const rabbitMQ = new RabbitMQ(RABBIT);
