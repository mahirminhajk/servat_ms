import { BasePublisher, Exchanges, RouteKeys, ServicePriceUpdatedEvent } from "@km12dev/shared-servat";

export class ServicePriceUpdatedPublisher extends BasePublisher<ServicePriceUpdatedEvent> {
    readonly exchange = Exchanges.CATALOG;
    readonly routeKey = RouteKeys.SERVICE_PRICE_UPDATED;
};
