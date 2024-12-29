import { rabbitConnector } from "@km12dev/shared-servat";

//* publishers



// export let customerVerifiedPublisher: CustomerVerifiedPublisher;
// export let providerVerifiedPublisher: ProviderVerifiedPublisher;

export const rabbitMqConfig = async (): Promise<void> => {
    //* connect
    await rabbitConnector.init(process.env.RABBITMQ_URL!);
    //* publishers
    // customerVerifiedPublisher = new CustomerVerifiedPublisher(rabbitConnector.publishChannel);
    // providerVerifiedPublisher = new ProviderVerifiedPublisher(rabbitConnector.publishChannel);
    //* listeners
    // new PaymentCompleteListener(rabbitConnector.connection, queueName).listen();
    // new PaymentRefundListener(rabbitConnector.connection, queueName).listen();
};