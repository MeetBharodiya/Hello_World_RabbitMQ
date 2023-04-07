const amqplib = require('amqplib');

const queueName = "sample";

const recieveMsg = async () => {
  const connection = await amqplib.connect('amqp://localhost');
//   const connection = await amqplib.connect('amqps://xjjtajhi:Ss6eREn7ImXLvQMkGStsRYSAX4N5fq-S@rat.rmq2.cloudamqp.com/xjjtajhi');
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, {durable: false});
  console.log(`Waiting for messages in queue: ${queueName}`);
  channel.consume(queueName, msg => {
    console.log("[X] Received:", msg.content.toString());
  }, {noAck: true}) // true is to send ack for successfully recieving msg and delete msg from queue
}

recieveMsg();