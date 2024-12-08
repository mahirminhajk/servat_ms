import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("mydb", "admin", "admin", {
    host: process.env.DATABASE_URL,
    dialect: "postgres",
    logging: false
});

