import { connection } from '../connection';

const exchangeName = 'fanout-exchange';
const msg = process.argv.slice(2).join(' ') || 'fanout message'

const sendMsgToMQ = async () => {
    const mqConnection = await connection();

    const producer = await mqConnection.createChannel();
    
    // create a queue if there is no queue, otherwise ignore.
    // durable: if false it will not create the queue again during a restart
    console.log('creating queue', exchangeName)
    await producer.assertExchange(exchangeName, 'fanout', {durable: false})

    producer.publish(exchangeName, "", Buffer.from(msg))
}

sendMsgToMQ();