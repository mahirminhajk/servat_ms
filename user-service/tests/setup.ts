import { Sequelize } from "sequelize";
import { sequelize as originalSequelize } from "../src/config/database";
import Customer from "../src/models/Customer";
import Provider from "../src/models/Provider";

jest.mock("../src/config/database", () => {
    const Sequelize = require("sequelize").Sequelize;
    return {
        sequelize: new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false            
        }),
    };
});

beforeAll(async () => {
    process.env.NODE_ENV = 'test';

    process.env.JWT_SECRET = "FOO"
    process.env.JWT_EXPIRES_IN = "1d"
    process.env.OTOKEN_JWT_SECRET = "FOOO"
    process.env.OTOKEN_JWT_EXPIRES_IN = "10m"

    process.env.JWT_SECRET_PROVIDER = "FOOOO"
    process.env.JWT_EXPIRES_IN_PROVIDER = "1d"

    process.env.OTP_EXPIRES_IN = "3"

    const { sequelize } = require("../src/config/database");
    await sequelize.sync({ force: true });

}); // runs before all tests

afterAll(async () => {
    const { sequelize } = require("../src/config/database");
    await sequelize.close();
}); // runs after all tests