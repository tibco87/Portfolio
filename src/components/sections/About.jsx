import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import profileImage from '../../assets/profile.png';
import profileImageLight from '../../assets/profile-light.png';
import './About.css';

function About() {
    const { t } = useLanguage();
    const { resolvedTheme } = useTheme();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const stats = [
        { key: 'yearsExperience', value: '3+' },
        { key: 'projectsCompleted', value: '10+' },
        { key: 'technologiesUsed', value: '20+' },
    ];

    const currentProfileImage = resolvedTheme === 'light' ? profileImageLight : profileImage;

    return (
        <section id="about" className="about section" ref={ref}>
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    {t('about.title')}
                </motion.h2>

                <div className="about__content">
                    <motion.div
                        className="about__image"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="about__image-wrapper">
                            <img src={currentProfileImage} alt="Tibor Kútik" className="about__profile-img" loading="lazy" width="600" height="600" />
                            <div className="about__image-decoration" />
                        </div>
                    </motion.div>

                    <motion.div
                        className="about__text"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h3 className="about__intro">{t('about.intro')}</h3>
                        <p>{t('about.paragraph1')}</p>
                        <p>{t('about.paragraph2')}</p>
                        <p>{t('about.paragraph3')}</p>

                        <div className="about__stats">
                            {stats.map(({ key, value }, index) => (
                                <motion.div
                                    key={key}
                                    className="about__stat"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                >
                                    <span className="about__stat-value">{value}</span>
                                    <span className="about__stat-label">{t(`about.${key}`)}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default About;
