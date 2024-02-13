import { MongoClient, MongoClientOptions } from 'mongodb';

const MONGODB_URI = 'mongodb://localhost:5000';
const DATABASE_NAME = 'my_database';

const client = new MongoClient(`${MONGODB_URI}/${DATABASE_NAME}`);

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

async function disconnect() {
  await client.close();
  console.log('Disconnected from MongoDB');
}

export { connect, disconnect, client };
