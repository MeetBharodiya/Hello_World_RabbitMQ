const amqplib = require('amqplib');

const queueName = "sample";
const msg = "Hello!! My name is Meet Bharodiya";

const sendMsg = async () => {
    //if you want to use RabbitMQ from localhost
    const connection = await amqplib.connect('amqp://localhost');

    //if you want to use cloude version of RabbitMQ
    // const connection = await amqplib.connect('amqps://xjjtajhi:Ss6eREn7ImXLvQMkGStsRYSAX4N5fq-S@rat.rmq2.cloudamqp.com/xjjtajhi');
    
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false });
    channel.sendToQueue(queueName, Buffer.from(msg));
    console.log('Sent: ', msg);
    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500)
}

sendMsg();