import { Channel } from 'amqplib';
import {connection} from '../connection';

const queueName = 'work-queue';

const baseConsumer = (consumer: Channel) => {
    consumer.consume(queueName, (msg => {
        if (msg) {
            console.log("[RabbitMQ] Received", msg.content.toString())
        }
    }), {noAck: true})
}
const getMsgFromMQ = async () => {
    const mqConnection = await connection();
    console.log('Creating channel')
    const consumer = await mqConnection.createChannel();
    
    // assertQueue only for fail safe, not required
    console.log('creating queue', queueName)
    await consumer.assertQueue(queueName, { durable: true});
    
    baseConsumer(consumer)
}

getMsgFromMQ();