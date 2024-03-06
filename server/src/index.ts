import { app } from "./start";
import {connectToDatabase} from "../db/conn";


/**
* App Variables
*/


const PORT : number = 8080;
/*
Connect to database on server start
This function establishes a connection to the database.
If an error occurs during the connection process, it logs the error message.
 */

connectToDatabase().catch(error => console.error('Database connection failed', error));

/**
* Server Activation
 *This block of code activates the server by listening on the specified port.
*/
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});