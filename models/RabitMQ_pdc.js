const amqp = require('amqplib');

class producer {
    static async sendToQueue(data) {
        try {
            const connection = await amqp.connect(process.env.rabitMQ_HOST);
            const channel = await connection.createChannel();
            const queue = 'my_queue';
    
            await channel.assertQueue(queue, { durable: false });
    
            // Gửi tin nhắn đến hàng đợi
            const message = data;
            channel.sendToQueue(queue, Buffer.from(message));
    
            console.log(`[x] Sent message: ${message}`);
    
            setTimeout(() => {
                connection.close();
                process.exit(0);
            }, 500);
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }
}

module.exports = producer;
