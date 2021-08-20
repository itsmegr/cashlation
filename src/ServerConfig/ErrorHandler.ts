import { Application } from "express";
import {
  makeError,
  coatError,
} from "../Helpers/ErrorHandling/Helper.EH.MakeError";

//handling all the errors at single place
function SinkErrorFor(server: Application) {
  server.use((req, res, next) => {
    //route not found
    next(new makeError.NotFound());
  });

  //other errors
  server.use((err: any, req: any, res: any, next: any) => {
    err = coatError(err);
    res.status(err.status || 500);
    res.send({
      status: err.status,
      message: err.message,
    });
  });
}

export default SinkErrorFor;
