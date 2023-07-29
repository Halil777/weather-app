import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Navbar section
      home: "Home",

      // Navbar section ends here ...
    },
  },
  ru: {
    translation: {
      // Navbar section starts here ...

      home: "Главная",

      // Navbar section ends here .....
    },
  },
  tm: {
    translation: {
      // Navbar section ends here .....

      home: "Baş sahypa",

      // Navbar section ends here .....
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
