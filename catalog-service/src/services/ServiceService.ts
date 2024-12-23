import Service, { IService, IServiceDocument } from "../models/Service";

export default class ServiceService {
    static async createService(service: IService): Promise<IServiceDocument> {
        return await Service.create(service);
    }

    static async updateService(id: string, service: IService, provider: number): Promise<IServiceDocument | null> {
        return await Service.findOneAndUpdate(
            { _id: id, provider },
            service,
            { new: true }
        );
    }

    static async deleteService(id: string, provider: number): Promise<IServiceDocument | null> {
        return await Service.findOneAndDelete({ _id: id, provider });
    }

    static async getServiceById(id: string): Promise<IServiceDocument | null> {
        return await Service.findById(id);
    }

    static async getServices(): Promise<IServiceDocument[]> {
        return await Service.find();
    }

    static async updateServicePrice(id: string, minPrice: number, maxPrice: number, provider: number): Promise<IServiceDocument | null> {
        return await Service.findOneAndUpdate(
            { _id: id, provider },
            { minPrice, maxPrice },
            { new: true }
        );
    };

    static checkServiceOwner(service: IServiceDocument, provider: number): boolean {
        return service.provider === provider;
    };
};