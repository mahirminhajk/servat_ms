import Provider, { IProvider } from "../models/Provider";

export class ProviderService {
    static async getByPhone(phone: string): Promise<Provider | null> {                
        const customer = await Provider.unscoped().findOne({ where: { phone } });
        return customer;
    };
    
    static async create(data: { name: string, phone: string, password: string }): Promise<Provider> {
        
        if(data.phone.length == 10) {
            data.phone = `91${data.phone}`;
        }
        
        const newCustomer = await Provider.create(data);
        return newCustomer;
    };

    static async get(id: number): Promise<IProvider | null> {
        const customer = await Provider.findByPk(id);
        return customer;
    };

    static async verify(id: number): Promise<IProvider | null> {
        const customer = await Provider.unscoped().findByPk(id);
        if (!customer) {
            return null;
        }
        await customer.update({ verified: true });
        return customer;
    };

    static async deleteAll(): Promise<number> {
        const deletedCount = await Provider.unscoped().destroy({ where: {} });
        return deletedCount;
    };
};
