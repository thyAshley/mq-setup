import { Channel } from 'amqplib';
import {connection} from '../connection';

const queueName = 'producer-test';

const throttledConsumer = (consumer: Channel, itemPerFetch: number, throttleSpeed: number, queueName: string) => {
    consumer.prefetch(itemPerFetch);
    consumer.consume(queueName, (msg => {
        if (msg) {
            console.log("[RabbitMQ] Received", msg.content.toString())
            setTimeout(() => {
                consumer.ack(msg)
            }, throttleSpeed)
        }
    }))
}

const baseConsumer = (consumer: Channel) => {
    consumer.consume(queueName, (msg => {
        if (msg) {
            console.log("[RabbitMQ] Received", msg.content.toString())
            consumer.ack(msg)
        }
    }))
}
const getMsgFromMQ = async () => {
    const mqConnection = await connection();
    console.log('Creating channel')
    const consumer = await mqConnection.createChannel();
    
    // assertQueue only for fail safe, not required
    console.log('creating queue', queueName)
    await consumer.assertQueue(queueName, { durable: false});
    // throttledConsumer(consumer, 2, 2000, queueName)
    baseConsumer(consumer)
}

getMsgFromMQ();