import { Channel } from 'amqplib';
import {connection} from '../connection';

const queueName = 'work-queue';

const baseConsumer = (consumer: Channel) => {
    consumer.prefetch(5)
    consumer.consume(queueName, (msg => {
        if (msg) {
            const secs = msg.content.toString().split('.').length - 1;
            console.log("[RabbitMQ] Received", msg.content.toString())
            setTimeout(() => {
                // console.log("Done with long waiting service")
                consumer.ack(msg)
            }, secs * 1000)
        }
    }))
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