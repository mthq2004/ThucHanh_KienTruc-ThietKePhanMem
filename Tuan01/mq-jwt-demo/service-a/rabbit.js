const amqp = require('amqplib');
const QUEUE = 'demo_queue';

exports.sendMessage = async (msg) => {
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();

  await channel.assertQueue(QUEUE);
  channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(msg)));

  console.log('📤 Sent:', msg);
};
