import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { dr, fr } from "./translations";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORE_LANGUAGE_KEY = "settings.lang";

const languageDetectorPlugin = {
    type: "languageDetector",
    async: true,
    init: () => { },
    detect: async function (callback) {
        try {
            await AsyncStorage.getItem(STORE_LANGUAGE_KEY).then((language) => {
                if (language) {
                    return callback(language);
                } else {
                    return callback("fr");
                }
            });
        } catch (error) {
            console.log("Error reading language", error);
        }
    },
    cacheUserLanguage: async function (language) {
        try {
            await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
        } catch (error) { }
    },
};
const resources = {
    dr: {
        translation: dr,
    },
    fr: {
        translation: fr,
    },
};

i18n.use(initReactI18next).use(languageDetectorPlugin).init({
    resources,
    compatibilityJSON: 'v3',
    fallbackLng: "fr",
    interpolation: {
        escapeValue: false,
    },
});
export default i18n;