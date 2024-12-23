import { connect } from "./database";

export const serverSetups = async () => {
    try {
        await connect();
    } catch (error) {
        console.log("🟥 Error in serverSetup: ", error);
    }
}