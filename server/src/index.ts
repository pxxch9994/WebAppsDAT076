import { app } from "./start";
import {connectToDatabase} from "../db/conn";


/**
* App Variables
*/


const PORT : number = 8080;


// Connect to database on server start
connectToDatabase().catch(error => console.error('Database connection failed', error));

/**
* Server Activation
*/
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});