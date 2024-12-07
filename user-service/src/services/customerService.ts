import Customer, { ICustomer } from "../models/Customer";

export class CustomerService {
    static async create(customer: ICustomer): Promise<ICustomer> {
        const newCustomer = await Customer.create(customer);
        return newCustomer;
    };

    static async update(id: number, data: Partial<ICustomer>): Promise<ICustomer | null> {
        const customer = await Customer.findByPk(id);
        if (!customer) {
            return null;
        }
        await customer.update(data);
        return customer;
    };

};
