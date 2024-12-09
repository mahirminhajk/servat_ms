import { rabbitConnector } from "@km12dev/shared-servat";


// export let orderCreatedPublisher: OrderCreatedPublisher;
// export let orderDeletePublisher: OrderDeletePublisher;

export const rabbitMqConfig = async (): Promise<void> => {
    //* connect
    await rabbitConnector.init(process.env.RABBITMQ_URL!);
    //* publishers
    // orderCreatedPublisher = new OrderCreatedPublisher(rabbitConnector.publishChannel);
    // orderDeletePublisher = new OrderDeletePublisher(rabbitConnector.publishChannel);
    //* listeners
    // new PaymentCompleteListener(rabbitConnector.connection, queueName).listen();
    // new PaymentRefundListener(rabbitConnector.connection, queueName).listen();
};