import { Pool, PoolClient } from "pg";
import { migrateDB } from "./Cache.migrate";
let pool: Pool;
let client: PoolClient;
interface IDBConnectionConfig {
  user: string;
  password: string;
  host: string;
  port: number;
  database: string;
}

//connecting to postgres db, and creating a instance
//here client is the db instance which can be used, in application to access the db
async function connectToDB(dbConfig: IDBConnectionConfig) {
  pool = new Pool(dbConfig);

  //if any error occured while connecting, this will go
  //on connecting again and again until untill error get solved
  while (true) {
    try {
      client = await pool.connect();
      break;
    } catch (err) {
      console.log("Failed Connecting To DB, retrying");
      console.log(err);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
  console.log("Connected To DB");

  //migrating up the database
  while (true) {
    try {
      const isDBMigrated = await migrateDB();
      break;
    } catch (err) {
      console.log("Failed creating tables, retrying");
      console.log(err);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
  console.log("Migrated DB");
}
async function disconnectDB() {
  pool.end();
}
export { client, connectToDB, disconnectDB };
