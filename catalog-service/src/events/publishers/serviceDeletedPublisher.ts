import { BasePublisher, Exchanges, RouteKeys, ServiceDeletedEvent } from "@km12dev/shared-servat";

export class ServiceDeletedPublisher extends BasePublisher<ServiceDeletedEvent> {
    readonly exchange = Exchanges.CATALOG;
    readonly routeKey = RouteKeys.SERVICE_DELETED;
};
