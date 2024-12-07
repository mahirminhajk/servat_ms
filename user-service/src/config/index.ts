import { sequelize } from "./database";

export const serverSetups = async () => {
    try {
        await sequelize.authenticate();
        console.log("🟩 Connection has been established successfully.");

        await sequelize.sync({ alter: true }); // This will create the tables if they do not exist, and alter them if necessary.
        console.log("✅ All models were synchronized successfully.");

    } catch (error) {
        console.log("🟥 Error in serverSetup: ", error);
    }
}