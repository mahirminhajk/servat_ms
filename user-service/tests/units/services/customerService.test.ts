import { CustomerService } from "../../../src/services/customerService";

describe('Customer Service', () => {
    afterEach(async () => {
        await CustomerService.deleteAll();
    });

    it("should create a new customer", async () => {
        const data = {
            name: "John Doe",
            phone: "1234567890",
            password: "password"
        };
        const customer = await CustomerService.create(data);
        expect(customer.name).toBe(data.name);
        expect(customer.phone).toBe("911234567890");
    });

    it("should get a customer by phone", async () => {
        const data = {
            name: "John Doe",
            phone: "1234567890",
            password: "password"
        };
        const customer = await CustomerService.create(data);
        expect(customer.name).toBe(data.name);
        expect(customer.phone).toBe("911234567890");

        const foundCustomer = await CustomerService.getByPhone(data.phone);
        expect(foundCustomer?.phone).toBe(data.phone);
    });

    it("should verify a customer", async () => {
        const data = {
            name: "John Doe",
            phone: "918086009801",
            password: "password"
        };
        const customer = await CustomerService.create(data);
        expect(customer.name).toBe(data.name);
        expect(customer.phone).toBe("918086009801");

        const verifiedCustomer = await CustomerService.verify(customer.id);
        expect(verifiedCustomer?.verified).toBe(true);
    
    });


    it("should get a customer by id", async () => {
        const data = {
            name: "John Doe",
            phone: "918086009801",
            password: "password"
        };
        const customer = await CustomerService.create(data);
        expect(customer.name).toBe(data.name);
        expect(customer.phone).toBe("918086009801");

        const verifiedCustomer = await CustomerService.verify(customer.id);
        expect(verifiedCustomer?.verified).toBe(true);

        const foundCustomer = await CustomerService.get(customer.id);
        expect(foundCustomer?.phone).toBe(data.phone);
    });

});