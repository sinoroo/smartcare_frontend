import i18n from "i18next";

// npm install react-i18next i18next --save
import { initReactI18next } from "react-i18next";

// # if you'd like to detect user language and load translation
// npm install i18next-http-backend i18next-browser-languagedetector --save
import detector from "i18next-browser-languagedetector";

import Backend from "i18next-http-backend";

import en from './locales/en-US';
import ko from './locales/ko-KR';
import cn from './locales/zh-CN';

i18n
  // .use(Backend)  //백엔드에서 리소스 가져올시
  .use(detector)  //사용자 언어 감지 : https://github.com/i18next/i18next-browser-languageDetect
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    // for all options read: https://www.i18next.com/overview/configuration-options
    resources: {
        ko:ko,
        en:en,
        cn:cn
    },
    // lng: "ko", //언어 감지기를 상요하는 경우 옵션 정의 X
    fallbackLng: "en",
    detection: { // languagedetector option
      order: ['querystring', 'htmlTag', 'cookie'], // detect 우선순위 
      lookupQueryString: 'lang', // ?lang=
      lookupCookie: 'i18n_lang' // cookie name
    },
    debug: true,
    saveMissing: true, //변환되지않는 키를 엔드포인트로 보냅니다.
    // keySeparator: false, //메세지 형식에서 키를 사용하지 않습니다.
    // ns:['pageKo','pageEn','pageCn'],    //ns는 namespace로 label, button, menu 등 구분해서 관리할 경우 필요
    interpolation: {
      escapeValue: false  
    }
  }, function(err) {
    if(err) console.error(err);
  });

  export default i18n