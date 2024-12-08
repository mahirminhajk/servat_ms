import Customer, { ICustomer } from "../models/Customer";

export class CustomerService {
    static async getByPhone(phone: string): Promise<Customer | null> {                
        const customer = await Customer.unscoped().findOne({ where: { phone } });
        return customer;
    };
    
    static async create(data: { name: string, phone: string, password: string }): Promise<Customer> {
        
        if(data.phone.length == 10) {
            data.phone = `91${data.phone}`;
        }
        
        const newCustomer = await Customer.create(data);
        return newCustomer;
    };

    //* only name can be updated
    static async update(id: number, data: { name: string }): Promise<ICustomer | null> {
        const customer = await Customer.findByPk(id);
        if (!customer) {
            return null;
        }
        await customer.update(data);
        return customer;
    };

    static async delete(id: number): Promise<number> {
        const deletedCount = await Customer.unscoped().destroy({ where: { id } });
        return deletedCount;
    };

    static async get(id: number): Promise<ICustomer | null> {
        const customer = await Customer.findByPk(id);
        return customer;
    };

    static async verify(id: number): Promise<ICustomer | null> {
        const customer = await Customer.unscoped().findByPk(id);
        if (!customer) {
            return null;
        }
        await customer.update({ verified: true });
        return customer;
    };

    static async deleteAll(): Promise<number> {
        const deletedCount = await Customer.unscoped().destroy({ where: {} });
        return deletedCount;
    };
};
