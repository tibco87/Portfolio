import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import './Hero.css';

function Hero() {
    const { t } = useLanguage();

    const scrollToSection = (sectionId) => {
        const element = document.querySelector(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="hero">
            <div className="hero__background">
                <div className="hero__gradient" />
                <div className="hero__grid" />
                <motion.div
                    className="hero__orb hero__orb--1"
                    animate={{
                        x: [0, 30, 0],
                        y: [0, -20, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="hero__orb hero__orb--2"
                    animate={{
                        x: [0, -25, 0],
                        y: [0, 25, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />
            </div>

            <div className="container">
                <div className="hero__content">
                    <motion.span
                        className="hero__greeting"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {t('hero.greeting')}
                    </motion.span>

                    <motion.h1
                        className="hero__name"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {t('hero.name')}
                    </motion.h1>

                    <motion.div
                        className="hero__title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <span className="hero__title-main">{t('hero.title')}</span>
                        <span className="hero__title-sub">{t('hero.subtitle')}</span>
                    </motion.div>

                    <motion.p
                        className="hero__description"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        {t('hero.description')}
                    </motion.p>

                    <motion.div
                        className="hero__cta"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <button
                            className="btn btn--primary"
                            onClick={() => scrollToSection('#projects')}
                        >
                            {t('hero.cta')}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </button>
                        <button
                            className="btn btn--secondary"
                            onClick={() => scrollToSection('#contact')}
                        >
                            {t('hero.contact')}
                        </button>
                    </motion.div>

                    <motion.div
                        className="hero__scroll"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <motion.div
                            className="hero__scroll-indicator"
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
