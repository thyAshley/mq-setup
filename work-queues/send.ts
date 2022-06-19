import { connection } from '../connection';

const queueName = 'work-queue';
const msg = 'Work Queue....'

const sendMsgToMQ = async () => {
    const mqConnection = await connection();

    const producer = await mqConnection.createChannel();
    
    // create a queue if there is no queue, otherwise ignore.
    // durable: if false it will not create the queue again during a restart
    console.log('creating queue', queueName)
    await producer.assertQueue(queueName, { durable: true});

    for (let i = 0; i < 5000; i++) {

        producer.sendToQueue(queueName, Buffer.from(`${msg} ${i}`), {persistent: true})
    }
}

sendMsgToMQ();