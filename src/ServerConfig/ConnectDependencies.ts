require("dotenv").config();
import { connectToDB } from "../Cache/Cache.DBInit";

//connecting server to the db dependancy
async function ConnectDependencies() {
  try {
    await connectToDB({
      user: process.env.POSTGRES_USER || "",
      password: process.env.POSTGRES_PASSWORD || "",
      host: process.env.POSTGRES_HOST || "",
      port: 5432,
      database: process.env.POSTGRES_DB || "",
    });
  } catch (err) {
    throw err;
  }
}
export default ConnectDependencies;
