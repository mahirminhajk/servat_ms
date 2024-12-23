import { BasePublisher, CustomerVerifiedEvent, Exchanges, RouteKeys } from "@km12dev/shared-servat";

export class CustomerVerifiedPublisher extends BasePublisher<CustomerVerifiedEvent> {
    readonly exchange = Exchanges.USER;
    readonly routeKey =  RouteKeys.CUSTOMER_VERIFIED;
};
    