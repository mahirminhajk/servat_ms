import { rabbitConnector } from "@km12dev/shared-servat";

//* publishers
import { ServiceCreatedPublisher, ServiceDeletedPublisher, ServicePriceUpdatedPublisher, ServiceUpdatedPublisher } from "./publishers";


export let serviceCreatedPublisher: ServiceCreatedPublisher;
export let serviceDeletedPublisher: ServiceDeletedPublisher;
export let servicePriceUpdatedPublisher: ServicePriceUpdatedPublisher;
export let serviceUpdatedPublisher: ServiceUpdatedPublisher;

export const rabbitMqConfig = async (): Promise<void> => {
    //* connect
    await rabbitConnector.init(process.env.RABBITMQ_URL!);
    //* publishers
    serviceCreatedPublisher = new ServiceCreatedPublisher(rabbitConnector.publishChannel);
    serviceDeletedPublisher = new ServiceDeletedPublisher(rabbitConnector.publishChannel);
    servicePriceUpdatedPublisher = new ServicePriceUpdatedPublisher(rabbitConnector.publishChannel);
    serviceUpdatedPublisher = new ServiceUpdatedPublisher(rabbitConnector.publishChannel);
    //* listeners
    // new PaymentCompleteListener(rabbitConnector.connection, queueName).listen();
    // new PaymentRefundListener(rabbitConnector.connection, queueName).listen();
};