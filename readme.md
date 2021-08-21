# Translation Caching Api

### Features
- a **RESTful API** to translate a text from one language to another.
- Used **google translate Api** as translation service.
- Implemented **caching** in order to avoid repeated hits to the translation API
- Implement **smart pre-caching**. This means we assume that if a user translates a text into Hindi, he is likely to also translate the same text to Telugu. Therefore cached not only Hindi translation but also other languages translation like marathi, telugu etc. and store it in our cache.
- Smart pre-caching does affect the **response time** of the translation API.
- An **extensible architecture**. E.g. If we want to change our caching strategy or switch out our translation service, we need to change the code for folders/files releted to that service only, these external dependancies functions are wrapped by our api functions, and independent of external service

------------



### Run the server
- Make sure docker and docker compose is installed.
- Clone this git repo and change current working directory to the project or api directory
- Run the below command to run server in development environment
`docker-compose -f docker-compose.yml -f docker-compose.dev.yml up`
- Run the below command to run server in production environment
`docker-compose -f docker-compose.yml -f docker-compose.prod.yml up`

------------
### Endpoints
1 '/translate'
`POST http://localhost:3000/translate HTTP/1.1
content-type: application/json`
    
    Body
    {
        "text":"Himanshu lived in a small village in the south of Poland.",
        "from": "en",
        "to" : "hi"
    }
	//text :- text to be translated
	//from : -source language, value should be ISO code for the langauge like "en" for english
	//to :-  source language, value should be ISO code for the langauge "hi" for hindi
	
	   Response type
        {
          "status": 200,
          "text": "हिमांशु पोलैंड के दक्षिण में एक छोटे से गांव में रहते थे।"
        }`
```javascript
some example of ISO code{
	af = 'Afrikaans',
    am = 'Amharic',
    az = 'Azerbaijani',
    be = 'Belarusian',
    bg = 'Bulgarian',
    bn = 'Bengali',
    bs = 'Bosnian',
	en = 'english'
}
```


### Design decisions
- Used **docker, node, express, typescript, postgres** tech stack for this API
- Postgres because there is good relation among text and its translation in any other language, can be done with No-SQL db also but SQL or relational db is more suitable according to this requirement



### DB schema
- Value inside the attr indicates the attributes inside the table
- name is name of table
``` javascript
const TEXT_TABLE = {
  name: "text_table",
  atrr: {
    attr1: "id",
    attr2: "text_in_english",
  },
};

const TRANSLATION_TABLE = {
  name: "translation_table",
  attr: {
    attr1: "id",
    attr2: "lang",
    attr3: "translation",
  },
};
```

## Testing
[Testing video link](https://drive.google.com/file/d/16yF_MG5RkGQCtm9hLbpZfxRuvhaxRDit/view?usp=sharing "Testing video link")
 - Please have a look at response time

## Smart pre-caching
- For smart pre Caching, there are group of languages like (hindi, telugu, marathi) so whenenver user wants the translation of any language , to any of them, than server will also cache the translation in remaining languages of group
- we can add any group number of groups




