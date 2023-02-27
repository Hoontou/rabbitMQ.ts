import fastify from 'fastify';
import { rabbitMQ } from './common/amqp';

const server = fastify();

server.get('/tst', (req, reply) => {
  const toTst1 = {
    tst1: 'tst1',
    ping: 'pong',
  };

  rabbitMQ.channel.sendToQueue('tst1', Buffer.from(JSON.stringify(toTst1)));
  rabbitMQ.channel.sendToQueue('tst2', Buffer.from('toTst2 Hi'));
});

server.listen({ host: '0.0.0.0', port: 80 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  //this can be async await, if u want
  rabbitMQ.initialize(['tst1', 'tst2']);//need string[] as list of que names
  console.log(`Server listening at ${address}`);
});
