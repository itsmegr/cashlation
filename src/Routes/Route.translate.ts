import express, { Application } from "express";
import translatePost from "../Controllers/Controller.translate";
import RouteHandler from "../Controllers/RouteHandlerType";
const router = express.Router();

//handling the post request coming to '/translate'
//and sending it the controller
router.post("/translate", translatePost as RouteHandler);
export default router;
