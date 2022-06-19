import { connection } from '../connection';

const queueName = 'producer-test';

const sendMsgToMQ = async () => {
    const mqConnection = await connection();

    const producer = await mqConnection.createChannel();
    
    // create a queue if there is no queue, otherwise ignore.
    // durable: if false it will not create the queue again during a restart
    console.log('creating queue', queueName)
    await producer.assertQueue(queueName, { durable: false});

    for (let i = 0; i < 10; i++) {
        producer.sendToQueue(queueName, Buffer.from(`hello world ${i}`));
        console.log('sent message', i)
    }
    console.log('sending message');
}

sendMsgToMQ();