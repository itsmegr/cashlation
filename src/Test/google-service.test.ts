
let {translateToGivenLanguage} = require("../Helpers/TranslationLibrary/google-api")
let gstr = "As a bonus task, implement smart pre-caching. This means we assume that if a user translates a text into Kannada, he is \
likely to also translate the same text to Hindi. Therefore we want to not only request Kannada from the external service\
but also other languages like Hindi, Tamil, etc. and store it in our cache"
let gstr2 = "एक बोनस कार्य के रूप में, स्मार्ट प्री-कैशिंग को लागू करें। इसका मतलब यह है कि हम मानते हैं कि यदि कोई उपयोगकर्ता कन्नड़ में एक पाठ का अनुवाद करता है, तो वह उसी पाठ को हिंदी में भी अनुवाद करने की संभावना है। इसलिए हम न केवल बाहरी सेवा से कन्नड़ का अनुरोध करना चाहते हैं लेकिन हिंदी, तमिल इत्यादि जैसी अन्य भाषाओं को भी हमारे कैश में स्टोर करना चाहते हैं"

 async function test2(){
    try {
        let res = await translateToGivenLanguage(gstr2,"hi", "en");
        console.log(res);
    } catch (error) {
        console.log(error);
        expect(error).toBeNull();
    }
};
/*
test2();
let str :string = "This is first type of thing i am applying for";
translateToGivenLanguage(str, "en", "hi").then(async (res: { text: string; })=>{
    let ex;
    // ex = new CacheDB();
    let res1  = await ex.cacheText(str);
    console.log("cached text res", res1);
    let res2  = await ex.cacheTranslation(res1.rows[0].id, "hi", res.text);
    console.log(res2);
    let res3  = await ex.searchInCaching(str, "hi");
    
}).catch((err: any) =>{
    console.log(err);
})
*/