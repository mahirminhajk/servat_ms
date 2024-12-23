import app from "./api/app";
import { serverSetups } from "./config";
import { rabbitMqConfig } from "./events";


const main = async () => {
    if (!process.env.NODE_ENV) throw new Error('❌ NODE_ENV is not defined');
    if (!process.env.PORT) throw new Error('❌ PORT is not defined');
    if (!process.env.DATABASE_HOST) throw new Error('❌ DATABASE_HOST is not defined');
    if (!process.env.DATABASE_PORT) throw new Error('❌ DATABASE_PORT is not defined');
    if (!process.env.DATABASE_DB) throw new Error('❌ DATABASE_DB is not defined');
    if (!process.env.DATABASE_USER) throw new Error('❌ DATABASE_USER is not defined');
    if (!process.env.DATABASE_PASSWORD) throw new Error('❌ DATABASE_PASSWORD is not defined');
    if (!process.env.JWT_SECRET) throw new Error('❌ JWT_SECRET is not defined');
    if (!process.env.JWT_EXPIRES_IN) throw new Error('❌ JWT_EXPIRES_IN is not defined');
    if (!process.env.OTOKEN_JWT_SECRET) throw new Error('❌ OTOKEN_JWT_SECRET is not defined');
    if (!process.env.OTOKEN_JWT_EXPIRES_IN) throw new Error('❌ OTOKEN_JWT_EXPIRES_IN is not defined');
    if (!process.env.JWT_SECRET_PROVIDER) throw new Error('❌ JWT_SECRET_PROVIDER is not defined');
    if (!process.env.JWT_EXPIRES_IN_PROVIDER) throw new Error('❌ JWT_EXPIRES_IN_PROVIDER is not defined');
    if (!process.env.OTP_EXPIRES_IN) throw new Error('❌ OTP_EXPIRES_IN is not defined');
    if (!process.env.RABBITMQ_URL) throw new Error('❌ RABBITMQ_URL is not defined');

    await serverSetups();
    await rabbitMqConfig();

    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log('🟩 Server is running on', PORT);
    });
};

main();
