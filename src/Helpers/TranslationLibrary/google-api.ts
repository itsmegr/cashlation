const translate = require("@vitalets/google-translate-api");
import { ITranslateResponse } from "@vitalets/google-translate-api";
import { HttpError } from "http-errors";
import { TranslatedResponse } from "../../Interfaces/Interfaces.all";

/*
this is the wrapper around the, library function(npm package), so if we use another service than google,
than we can change the translate function with new library function and no need to change at 
anywhere
*/

function translateToGivenLanguage(
  givenText: string,
  from: string,
  to: string
): Promise<TranslatedResponse> {
  return new Promise<TranslatedResponse>((resolve, reject) => {
    //calling the library function
    translate(givenText, { from: from, to: to })
      .then((res: ITranslateResponse) => {
        resolve({
          status: 200,
          text: res.text,
        });
      })
      .catch((err: HttpError) => {
        reject(err);
      });
  });
}

export { translateToGivenLanguage };
