import Provider, { IProvider } from "../models/Provider";

export class ProviderService {
    static async createProvider(data: IProvider): Promise<IProvider> {
        return Provider.create(data);
    };

    static async updateProvider(id: number, data: IProvider): Promise<IProvider> {
        const updatedProvider = await Provider.findByIdAndUpdate(id, data, { new: true });
        if (!updatedProvider) {
            throw new Error('Provider not found');
        }
        return updatedProvider;
    }

}