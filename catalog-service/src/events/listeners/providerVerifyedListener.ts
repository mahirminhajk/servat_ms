import { BaseListener, Exchanges, ProviderVerifiedEvent, RouteKeys } from "@km12dev/shared-servat";
import { ProviderService } from "../../services/providerService";

export class ProviderVerifiedListener extends BaseListener<ProviderVerifiedEvent> {
    readonly exchange = Exchanges.USER;
    readonly routeKey = RouteKeys.PROVIDER_VERIFIED;

    async onMessage(data: { id: string; name: string; phone: string; version: number; }, msg: any): Promise<void> {

        const { id, name, phone, version } = data;

        const provider = await ProviderService.createProvider({
            _id: parseInt(id),
            name,
            phone,
            version
        });
        console.log('Provider created:', provider);

    }
};