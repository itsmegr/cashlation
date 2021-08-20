import { Application } from "express";
import translateRoutes from "../Routes/Route.translate";

//entry point for all the routes
function HandleRoutesFor(server: Application) {
  //routing them to their corresponding route file
  server.use("/", translateRoutes);
}

export default HandleRoutesFor;
