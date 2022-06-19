import amqplib from 'amqplib';


export const connection = async () => await amqplib.connect({
    hostname: 'localhost',
    username: 'guest',
    password: 'guest'
})
