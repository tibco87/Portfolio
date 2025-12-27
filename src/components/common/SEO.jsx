import { Helmet } from 'react-helmet-async';
import { useLanguage, LANGUAGES } from '../../context/LanguageContext';

function SEO() {
    const { language } = useLanguage();

    const meta = {
        [LANGUAGES.EN]: {
            title: 'Tibor Kútik | Full-Stack Web & Mobile App Developer',
            description: 'Professional portfolio of Tibor Kútik, a Full-Stack Web and Mobile App Developer specializing in modern frontend, backend, and cross-platform mobile solutions.',
        },
        [LANGUAGES.SK]: {
            title: 'Tibor Kútik | Vývojár webových a mobilných aplikácií',
            description: 'Profesionálne portfólio Tibora Kútika, Full-Stack vývojára špecializujúceho sa na moderné frontendové, backendové a mobilné riešenia.',
        }
    };

    const currentMeta = meta[language] || meta[LANGUAGES.EN];

    return (
        <Helmet>
            <html lang={language} />
            <title>{currentMeta.title}</title>
            <meta name="description" content={currentMeta.description} />
            <meta property="og:title" content={currentMeta.title} />
            <meta property="og:description" content={currentMeta.description} />
            <meta property="og:locale" content={language === LANGUAGES.SK ? 'sk_SK' : 'en_US'} />
            <link rel="canonical" href={`https://www.tibcoo.sk/${language}`} />
        </Helmet>
    );
}

export default SEO;
