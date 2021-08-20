import makeError from "http-errors";

//this functions is used for making the error, with the wrapper around library function
function coatError(err: any) {
  if (err.status) return err;
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError")
    return new makeError.Unauthorized();
  return new makeError.InternalServerError();
}

export { makeError, coatError };
