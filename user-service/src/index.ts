import app from "./api/app";
import { serverSetups } from "./config";


const main = async () => {
    if(!process.env.PORT) {
        throw new Error('❌ PORT is not defined');
    }
    if(!process.env.DATABASE_URL) {
        throw new Error('❌ DATABASE_URL is not defined');
    }
    
    await serverSetups();

    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log('🟩 Server is running on', PORT);
    });
};

main();
