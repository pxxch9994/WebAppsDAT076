import { app } from "./start";
import { connectToDatabase } from "./db/conn";


/**
* App Variables
*/


const PORT : number = 8080;


/**
* Server Activation
*/

connectToDatabase().catch(error => console.error('Database connection failed', error));

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});