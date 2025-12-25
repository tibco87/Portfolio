import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import clipSmartImage from '../../assets/clipsmart-preview.png';
import portfolioImage from '../../assets/portfolio-preview.png';
import './Projects.css';

// Placeholder projects - to be replaced with real projects
const projectsData = [
    {
        id: 1,
        title: 'ClipSmart – Clipboard Manager',
        description: 'Smart clipboard manager with unlimited history, instant translation to 40 languages, and powerful search. Boost your productivity with advanced clipboard tools.',
        image: clipSmartImage,
        technologies: ['JavaScript', 'Chrome API', 'HTML/CSS', 'Stripe'],
        liveUrl: 'https://chromewebstore.google.com/detail/clipsmart-%E2%80%93-clipboard-man/nbpndheaoecmgnlmfpleeahoicpcbppj?utm_source=ext_app_menu',
        githubUrl: 'https://github.com/tibco87/ClipsmartFinal',
        featured: true,
    },
    {
        id: 2,
        title: 'Portfolio Web',
        description: 'Modern personal portfolio website featuring a responsive design, dark mode, internationalization (i18n), and smooth animations. Built with a focus on performance and user experience.',
        image: portfolioImage,
        technologies: ['React', 'JavaScript', 'Vite', 'CSS', 'EmailJS'],
        liveUrl: '#',
        githubUrl: 'https://github.com/tibco87/Portfolio',
        featured: true,
    },
    {
        id: 3,
        title: 'Mobile Fitness App',
        description: 'Cross-platform mobile application for iOS and Android built with Flutter, featuring workout tracking & personalized fitness plans.',
        image: null,
        technologies: ['Flutter', 'Firebase', 'Dart'],
        liveUrl: '#',
        githubUrl: '#',
        featured: true,
    },
    {
        id: 4,
        title: 'Task Management Dashboard',
        description: 'A modern task management application with real-time collaboration features, built with Vue.js and Firebase.',
        image: null,
        technologies: ['Vue', 'Firebase', 'TypeScript', 'SASS'],
        liveUrl: '#',
        githubUrl: '#',
        featured: false,
    },
];

function Projects() {
    const { t } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="projects" className="projects section" ref={ref}>
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    {t('projects.title')}
                </motion.h2>

                <motion.p
                    className="projects__subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {t('projects.subtitle')}
                </motion.p>

                <div className="projects__grid">
                    {projectsData.map((project, index) => (
                        <motion.article
                            key={project.id}
                            className={`projects__card ${project.featured ? 'projects__card--featured' : ''}`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        >
                            <div className="projects__card-image">
                                {project.image ? (
                                    <img src={project.image} alt={project.title} loading="lazy" />
                                ) : (
                                    <div className="projects__card-placeholder">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                            <polyline points="21 15 16 10 5 21" />
                                        </svg>
                                        <span>Preview</span>
                                    </div>
                                )}
                                <div className="projects__card-overlay">
                                    <div className="projects__card-links">
                                        <a
                                            href={project.liveUrl}
                                            className="projects__card-link"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                <polyline points="15 3 21 3 21 9" />
                                                <line x1="10" y1="14" x2="21" y2="3" />
                                            </svg>
                                            {t('projects.viewLive')}
                                        </a>
                                        <a
                                            href={project.githubUrl}
                                            className="projects__card-link"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                            </svg>
                                            {t('projects.viewCode')}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="projects__card-content">
                                <h3 className="projects__card-title">{project.title}</h3>
                                <p className="projects__card-description">{project.description}</p>
                                <div className="projects__card-tech">
                                    {project.technologies.map((tech) => (
                                        <span key={tech} className="projects__card-tag">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <motion.p
                    className="projects__coming-soon"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    {t('projects.comingSoon')}
                </motion.p>
            </div>
        </section>
    );
}

export default Projects;
