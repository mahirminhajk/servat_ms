import { ProviderService } from "../../../src/services/providerService";

describe('Provider Service', () => {
    afterEach(async () => {
        await ProviderService.deleteAll();
    });

    it("should create a new provider", async () => {
        const data = {
            name: "John Doe",
            phone: "1234567890",
            password: "password"
        };
        const provider = await ProviderService.create(data);
        expect(provider.name).toBe(data.name);
        expect(provider.phone).toBe("911234567890");
    });

    it("should get a provider by phone", async () => {
        const data = {
            name: "John Doe",
            phone: "1234567890",
            password: "password"
        };
        const provider = await ProviderService.create(data);
        expect(provider.name).toBe(data.name);
        expect(provider.phone).toBe("911234567890");

        const foundProvider = await ProviderService.getByPhone(data.phone);
        expect(foundProvider?.phone).toBe(data.phone);
    });

    it("should verify a provider", async () => {
        const data = {
            name: "John Doe",
            phone: "918086009801",
            password: "password"
        };
        const provider = await ProviderService.create(data);
        expect(provider.name).toBe(data.name);
        expect(provider.phone).toBe("918086009801");

        const verifiedProvider = await ProviderService.verify(provider.id);
        expect(verifiedProvider?.verified).toBe(true);
    
    });


    it("should get a provider by id", async () => {
        const data = {
            name: "John Doe",
            phone: "918086009801",
            password: "password"
        };
        const provider = await ProviderService.create(data);
        expect(provider.name).toBe(data.name);
        expect(provider.phone).toBe("918086009801");

        const verifiedProvider = await ProviderService.verify(provider.id);
        expect(verifiedProvider?.verified).toBe(true);

        const foundProvider = await ProviderService.get(provider.id);
        expect(foundProvider?.phone).toBe(data.phone);
    });

});