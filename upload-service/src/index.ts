import app from "./api/app";
import { serverSetups } from "./config";
import { rabbitMqConfig } from "./events";


const main = async () => {
    if (!process.env.NODE_ENV) throw new Error('❌ NODE_ENV is not defined');
    if (!process.env.PORT) throw new Error('❌ PORT is not defined');
    if (!process.env.REDIS_URL) throw new Error('❌ REDIS_URL is not defined');
    if (!process.env.MINIO_ENDPOINT) throw new Error('❌ MINIO_ENDPOINT is not defined');
    if (!process.env.MINIO_PORT) throw new Error('❌ MINIO_PORT is not defined');
    if (!process.env.MINIO_ACCESS_KEY) throw new Error('❌ MINIO_ACCESS_KEY is not defined');
    if (!process.env.MINIO_SECRET_KEY) throw new Error('❌ MINIO_SECRET_KEY is not defined');
    if (!process.env.MINIO_BUCKET) throw new Error('❌ MINIO_BUCKET is not defined');

    console.log('🚀 Starting upload-service');


    await serverSetups();
    await rabbitMqConfig();

    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log('🟩 Server is running on', PORT);
    });
};

main();
