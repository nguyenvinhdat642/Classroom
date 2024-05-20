const amqp = require('amqplib');

class customer {
    static async consumeFromQueue() {
        try {
            const connection = await amqp.connect(process.env.rabitMQ_HOST);
            const channel = await connection.createChannel();
            const queue = 'my_queue';
    
            await channel.assertQueue(queue, { durable: false });
    
            console.log(`[*] Waiting for messages in ${queue}. To exit press CTRL+C`);
    
            // Xử lý các tin nhắn từ hàng đợi
            channel.consume(queue, (message) => {
                console.log(`[x] Received message: ${message.content.toString()}`);
                return message;
            }, { noAck: true });
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }
}

module.exports = customer;
