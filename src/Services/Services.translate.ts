import { InternalServerError } from "http-errors";
import { CacheDB } from "../Cache/Cache.translation";
import { makeError } from "../Helpers/ErrorHandling/Helper.EH.MakeError";
import { translateToGivenLanguage } from "../Helpers/TranslationLibrary/google-api";
import {
  IPostRequestData,
  TranslatedResponse,
} from "../Interfaces/Interfaces.all";

const preCachingGroups : Array<Array<string>> = [["hi", "mr", "te"]];

/*
contains core logic of the application
*/
//main function, that is exposed to controller
async function translateService(
  reqData: IPostRequestData
): Promise<TranslatedResponse> {
  return new Promise<TranslatedResponse>(async (resolve, reject) => {
    try {
      //searching in the cache
      let searchRes: IsearchResult = await searchInCache(
        reqData.text,
        reqData.to
      );
      //text present in the caching, with the required transection
      if (searchRes.status) {
        return resolve({
          status: 200,
          text: searchRes.translatedText,
        });
      }
      //translation is not present in the cache so finally getting the translation from google seervice
      let translatedResult: TranslatedResponse = await translateToGivenLanguage(
        reqData.text,
        reqData.from,
        reqData.to
      );
      //sending the response first
      resolve(translatedResult);

      //caching the data, this won't affect the response time
      const dbobj = new CacheDB();
      let rowData = await dbobj.cacheText(reqData.text);
      dbobj.cacheTranslation(
        rowData as number,
        reqData.to,
        translatedResult.text
      );
      await cacheGroupTranslation(rowData as number, reqData.text, reqData.from, reqData.to);
      // console.log("caching is done");

      return;
    } catch (error) {
      reject(error);
    }
  });
}

interface IsearchResult {
  status: boolean;
  translatedText: string;
}
async function searchInCache(
  text: string,
  lang: string
): Promise<IsearchResult> {
  return new Promise<IsearchResult>(async (resolve, reject) => {
    try {
      let res = await new CacheDB().searchInCaching(text, lang);
      if (res.length === 0) {
        //then text is not cached
        return resolve({
          status: false,
          translatedText: "",
        });
      } else {
        //this text is present in caching
        return resolve({
          status: true,
          translatedText: res[0].translation,
        });
      }
    } catch (error) {
      console.log(error);
      return reject(makeError(InternalServerError));
    }
  });
}


async function cacheGroupTranslation(textId : number,text : string, from :string, to : string) :Promise<void> {
  return new Promise<void>(async(resolve, reject)=>{
    try {
      //find the group of language
      let index : number = -1;
      for(let i = 0 ;i < preCachingGroups.length ; i++){
        let tempIndex = preCachingGroups[i].indexOf(to);
        if(tempIndex > -1){
          index = i;
          break;
        }
      }
      //no group for such translation
      if(index === -1){
        return resolve();
      }

      //there is group for such translation, so cache for all other translation
      const dbObj = new CacheDB();
      let mainAraay : Array<string> = preCachingGroups[index];
      for (const toLang of mainAraay){
        if(toLang === to){
          //means already cached
          continue;
        }
        //getting the translation
        let translatedResult: TranslatedResponse = await translateToGivenLanguage(text, from, toLang);
        //caching translation
        await dbObj.cacheTranslation(textId, toLang, translatedResult.text)
      }


    } catch (error) {
      console.log(error);
      reject(error);
    }
  })
}

export { translateService };
