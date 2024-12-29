import { Minio } from "./minio";

export let minio: Minio;

export const serverSetups = async () => {
    try {
        minio = new Minio();
        await minio.init();

    } catch (error) {
        console.log("🟥 Error in serverSetup: ", error);
    }
}