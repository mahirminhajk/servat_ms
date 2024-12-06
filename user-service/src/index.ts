import app from "./api/app";


const main = async () => {
    if(!process.env.PORT) {
        throw new Error('PORT is not defined');
    }
    
    const PORT = process.env.PORT;
    
    app.listen(PORT, () => {
        console.log('Server is running on', PORT);
    });
};

main();
