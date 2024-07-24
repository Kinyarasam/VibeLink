import amqp from 'amqplib';

async function connect() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    return { connection, channel };
  } catch (error) {

  }
}

export default connect;
