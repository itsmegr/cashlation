import { makeError } from "./Helper.EH.MakeError";


//handling the DB error
function DBError(err: any) {
  console.log(err);

  switch (err.code) {
    case "42P01":
      return new makeError.InternalServerError();
    case "23505":
      return new makeError.MethodNotAllowed("Data already present");
    default:
      return new makeError.InternalServerError();
  }
}
export default DBError;
