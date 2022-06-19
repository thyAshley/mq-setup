import { Channel } from 'amqplib';
import {connection} from '../connection';

const exchangeName = 'fanout-exchange';

const baseConsumer = (consumer: Channel, queueName: string) => {
    consumer.consume(queueName, (msg => {
        if (msg) {
            console.log("[RabbitMQ] Received", msg.content.toString())
            consumer.ack(msg)
        }
    }))
}
const getMsgFromFanoutExchange = async () => {
    const mqConnection = await connection();
    console.log('Creating channel')
    const consumer = await mqConnection.createChannel();
    
    // assertQueue only for fail safe, not required
    console.log('creating queue', exchangeName)
    await consumer.assertExchange(exchangeName, 'fanout', {durable: false});
    
    // once connection closes the queue is gone
    const queue = await consumer.assertQueue('', {durable: false, exclusive: true});
    console.log('waiting for message in queue', queue.queue);

    // fan out doesnt need routing key
    console.log('binding queue to exchange')
    consumer.bindQueue(queue.queue, exchangeName, '')
    
    baseConsumer(consumer, queue.queue)
}

getMsgFromFanoutExchange();