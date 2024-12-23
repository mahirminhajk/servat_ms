import { BasePublisher, Exchanges, RouteKeys, ServiceUpdatedEvent } from "@km12dev/shared-servat";

export class ServiceUpdatedPublisher extends BasePublisher<ServiceUpdatedEvent> {
    readonly exchange = Exchanges.CATALOG;
    readonly routeKey = RouteKeys.SERVICE_UPDATED;
};
