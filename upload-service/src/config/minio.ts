import { Client } from "minio";

export class Minio {
    private readonly minioClient: Client;


    constructor() {
        this.minioClient = new Client({
            endPoint: process.env.MINIO_ENDPOINT!,
            port: process.env.MINIO_PORT ? parseInt(process.env.MINIO_PORT) : 9000,
            useSSL: false,
            accessKey: process.env.MINIO_ACCESS_KEY,
            secretKey: process.env.MINIO_SECRET_KEY,
        });
    }

    async init(): Promise<void> {
        const bucketExists = await this.minioClient.bucketExists(process.env.MINIO_BUCKET!);
        if (!bucketExists) {
            await this.minioClient.makeBucket(process.env.MINIO_BUCKET!);
            console.log('🟩 Minio bucket is created');
        }
        console.log('🟩 Minio is ready');
    }

    //* can't use any type for file
    async uploadFile(file: any, fileName: string): Promise<string> {
        await this.minioClient.putObject(process.env.MINIO_BUCKET!, fileName, file.buffer);
        console.log('🟩 File is uploaded to Minio');
        return fileName;
    }

    async removeFile(fileName: string): Promise<void> {
        console.log('🟩 File is removed from Minio');
        await this.minioClient.removeObject(process.env.MINIO_BUCKET!, fileName);
    }
}
