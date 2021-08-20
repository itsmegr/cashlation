import { TEXT_TABLE, TRANSLATION_TABLE } from "./Cache.DBInfo";
import { client } from "./Cache.DBInit";

//creating the initail tables at the time of migrating
const _createTextTable = `CREATE TABLE IF NOT EXISTS ${TEXT_TABLE.name}
                        (
                            ${TEXT_TABLE.atrr.id} SERIAL PRIMARY KEY,
                            ${TEXT_TABLE.atrr.text_in_english} TEXT NOT NULL
                        )`;

const _createTranslationTable = `CREATE TABLE IF NOT EXISTS ${TRANSLATION_TABLE.name}
                        (
                            ${TRANSLATION_TABLE.attr.id} SERIAL,
                            ${TRANSLATION_TABLE.attr.lang} TEXT NOT NULL,
                            ${TRANSLATION_TABLE.attr.translation} TEXT NOT NULL,
                            FOREIGN KEY (${TRANSLATION_TABLE.attr.id}) REFERENCES ${TEXT_TABLE.name} (${TEXT_TABLE.atrr.id})
                        )`;
function migrateDB(): Promise<boolean> {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      await client.query(_createTextTable);
      await client.query(_createTranslationTable);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

export { migrateDB };
