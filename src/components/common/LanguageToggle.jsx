import { useLanguage, LANGUAGES } from '../../context/LanguageContext';
import './LanguageToggle.css';

function LanguageToggle() {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            className="language-toggle"
            onClick={toggleLanguage}
            aria-label={`Switch language`}
        >
            <span className={`language-toggle__option ${language === LANGUAGES.EN ? 'language-toggle__option--active' : ''}`}>
                EN
            </span>
            <span className="language-toggle__divider">/</span>
            <span className={`language-toggle__option ${language === LANGUAGES.SK ? 'language-toggle__option--active' : ''}`}>
                SK
            </span>
        </button>
    );
}

export default LanguageToggle;
