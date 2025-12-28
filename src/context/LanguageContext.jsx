import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import translations from '../i18n/translations';

const LanguageContext = createContext();

export const LANGUAGES = {
    EN: 'en',
    SK: 'sk',
};

export function LanguageProvider({ children }) {
    const location = useLocation();

    const [language, setLanguage] = useState(() => {
        // 1. HIGHEST PRIORITY: URL
        const pathLang = window.location.pathname.split('/')[1];
        if (pathLang === LANGUAGES.EN || pathLang === LANGUAGES.SK) {
            return pathLang;
        }

        // 2. SECOND PRIORITY: LocalStorage
        const saved = localStorage.getItem('language');
        if (saved === LANGUAGES.EN || saved === LANGUAGES.SK) {
            return saved;
        }

        // 3. LOWEST PRIORITY: Browser Detection
        const browserLang = navigator.language.split('-')[0];
        return browserLang === 'sk' ? LANGUAGES.SK : LANGUAGES.EN;
    });

    // Valid check helper
    const isValidLang = (lang) => lang === LANGUAGES.EN || lang === LANGUAGES.SK;

    // Synchronize language state with URL changes
    useEffect(() => {
        const pathLang = location.pathname.split('/')[1];

        // If URL has a valid language code
        if (isValidLang(pathLang)) {
            // AND it's different from current state
            if (pathLang !== language) {
                setLanguage(pathLang);
                localStorage.setItem('language', pathLang);
            }
        }
    }, [location.pathname, language]);

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
