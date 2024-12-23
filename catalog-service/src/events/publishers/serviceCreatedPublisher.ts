import { BasePublisher, Exchanges, RouteKeys, ServiceCreatedEvent } from "@km12dev/shared-servat";

export class ServiceCreatedPublisher extends BasePublisher<ServiceCreatedEvent> {
    readonly exchange = Exchanges.CATALOG;
    readonly routeKey = RouteKeys.SERVICE_CREATED;
};
