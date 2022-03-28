import * as mongoDB from "mongodb"

class database {
    constructor() {
        this.connect();
    }

    private static uri = 'mongodb://localhost:27018';
    client = new mongoDB.MongoClient(database.uri);

    async connect() {
        try {
            await this.client.connect();
            console.log("Connected correctly to server");
        } catch {
            console.error;
        }
    }
}

var db = new database()

export default db;