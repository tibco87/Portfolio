import { createContext, useContext, useState, useCallback } from 'react';
import translations from '../i18n/translations';

const LanguageContext = createContext();

export const LANGUAGES = {
    EN: 'en',
    SK: 'sk',
};

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        // 1. Try to get language from URL
        const pathLang = window.location.pathname.split('/')[1];
        if (pathLang === LANGUAGES.EN || pathLang === LANGUAGES.SK) {
            return pathLang;
        }

        // 2. Try to get from localStorage
        const saved = localStorage.getItem('language');
        if (saved && (saved === LANGUAGES.EN || saved === LANGUAGES.SK)) {
            return saved;
        }

        // 3. Try to detect browser language
        const browserLang = navigator.language.split('-')[0];
        return browserLang === 'sk' ? LANGUAGES.SK : LANGUAGES.EN;
    });

    const changeLanguage = useCallback((lang) => {
        if (lang === LANGUAGES.EN || lang === LANGUAGES.SK) {
            setLanguage(lang);
            localStorage.setItem('language', lang);
        }
    }, []);

    const toggleLanguage = useCallback(() => {
        const newLang = language === LANGUAGES.EN ? LANGUAGES.SK : LANGUAGES.EN;
        changeLanguage(newLang);
    }, [language, changeLanguage]);

    const t = useCallback((path) => {
        const keys = path.split('.');
        let value = translations[language];

        for (const key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key];
            } else {
                console.warn(`Translation missing for: ${path}`);
                return path;
            }
        }

        return value;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

export default LanguageContext;
