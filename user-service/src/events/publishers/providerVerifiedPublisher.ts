import { BasePublisher, ProviderVerifiedEvent, Exchanges, RouteKeys } from "@km12dev/shared-servat";

export class ProviderVerifiedPublisher extends BasePublisher<ProviderVerifiedEvent> {
    readonly exchange = Exchanges.USER;
    readonly routeKey =  RouteKeys.PROVIDER_VERIFIED;
};
    