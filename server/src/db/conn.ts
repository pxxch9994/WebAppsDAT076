import { createConnection } from "mongoose";
const conn = createConnection("mongodb+srv://anjatomovic01:webbapplikationer@cluster0.fgaca4g.mongodb.net/");

const conn: Connection = createConnection("mongodb+srv://anjatomovic01:webbapplikationer@cluster0.fgaca4g.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true, // Enable SSL
  sslValidate: true, // Validate the SSL certificate
  sslCA: '<path_to_ca_certificate>', // Path to the CA certificate
});

conn.on("connected", () => {
    console.log("Connected to MongoDB");
});

conn.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

conn.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
});

// Close the connection when the Node process exits
process.on("SIGINT", async () => {
    await conn.close();
    process.exit(0);
});

export { conn };