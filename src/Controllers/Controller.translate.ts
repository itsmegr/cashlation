import { IPostRequestData } from "../Interfaces/Interfaces.all";
import { translateService } from "../Services/Services.translate";
import RouteHandler from "./RouteHandlerType";

/*
controller for the post request coming to '/translate'
calls the main function in service(model), get the response/error
and send back to user
*/
const postTranslate: RouteHandler = async (req, res, next) => {
  try {
    let reqData: IPostRequestData = {
      text: req.body.text,
      from: req.body.from,
      to: req.body.to,
    };
    console.log(reqData);

    let resData = await translateService(reqData);
    // console.log("response has been send");
    res.json(resData);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export default postTranslate;
