import { client } from "./Cache.DBInit";
import { TEXT_TABLE, TRANSLATION_TABLE } from "./Cache.DBInfo";

/*
this file contains all the db queries, db functions and wrapped around the one more function
so if we want to change the caching strategy just need to change the functions
and queries indside the wrapper and this Cache db is isolated from all the 
parts of application
*/
interface CacheDBInterface {
  searchInCaching: (text: string, lang: string) => Promise<any>;
  cacheText: (text: string) => Promise<any>;
  cacheTranslation: (
    id: number,
    lang: string,
    translation: string
  ) => Promise<any>;
}

const _searchInCaching = `SELECT * 
                        FROM ${TEXT_TABLE.name} NATURAL JOIN ${TRANSLATION_TABLE.name} 
                        where ${TEXT_TABLE.atrr.text_in_english} = $1 AND ${TRANSLATION_TABLE.attr.lang} = $2`;

const _cacheText = `INSERT INTO ${TEXT_TABLE.name}
                    (
                        ${TEXT_TABLE.atrr.text_in_english}
                    )
                    VALUES ($1)
                    RETURNING ${TEXT_TABLE.atrr.id}`;

const _cacheTranslation = `INSERT INTO ${TRANSLATION_TABLE.name}
                    (
                        ${TRANSLATION_TABLE.attr.id},
                        ${TRANSLATION_TABLE.attr.lang},
                        ${TRANSLATION_TABLE.attr.translation}
                    )
                    VALUES ($1, $2, $3)
                    RETURNING ${TEXT_TABLE.atrr.id}`;

class CacheDB implements CacheDBInterface {
  //searching if text is cached earlier or not
  searchInCaching(text: string, lang: string) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const res = await client.query(_searchInCaching, [text, lang]);
        resolve(res.rows);
      } catch (error) {
        reject(error);
      }
    });
  }
  //this functions caches the text in text_table
  cacheText(text: string) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const res = await client.query(_cacheText, [text]);
        resolve(res.rows[0].id);
      } catch (error) {
        reject(error);
      }
    });
  }
  //this functions cache the translation in translation_table
  cacheTranslation(id: number, lang: string, translation: string) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const res = await client.query(_cacheTranslation, [
          id,
          lang,
          translation,
        ]);
        resolve(res);
      } catch (error) {}
    });
  }
}

export { CacheDB };
