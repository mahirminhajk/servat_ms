import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.DATABASE_DB!, process.env.DATABASE_USER!, process.env.DATABASE_PASSWORD!, {
    host: process.env.DATABASE_HOST!,
    port: parseInt(process.env.DATABASE_PORT!),
    dialect: "postgres",
    logging: false,
});

