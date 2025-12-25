import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
    SiReact, SiVuedotjs, SiJavascript, SiTypescript, SiCss3, SiSass, SiTailwindcss,
    SiNodedotjs, SiPhp, SiPython,
    SiFlutter, SiVite,
    SiSupabase, SiFirebase, SiPostgresql, SiDocker,
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc'; // For Cursor/Windsurf/VS Code generic code icons
import { BsRocketTakeoff } from 'react-icons/bs'; // For Antigravity
import { TbApi } from 'react-icons/tb'; // For REST API
import './Skills.css';

const skillsData = {
    frontend: [
        { name: 'React', icon: <SiReact color="#61DAFB" /> },
        { name: 'Vue', icon: <SiVuedotjs color="#4FC08D" /> },
        { name: 'JavaScript', icon: <SiJavascript color="#F7DF1E" /> },
        { name: 'TypeScript', icon: <SiTypescript color="#3178C6" /> },
        { name: 'CSS', icon: <SiCss3 color="#1572B6" /> },
        { name: 'SASS', icon: <SiSass color="#CC6699" /> },
        { name: 'Tailwind', icon: <SiTailwindcss color="#06B6D4" /> },
    ],
    backend: [
        { name: 'Node.js', icon: <SiNodedotjs color="#339933" /> },
        { name: 'PHP', icon: <SiPhp color="#777BB4" /> },
        { name: 'Python', icon: <SiPython color="#3776AB" /> },
        { name: 'REST API', icon: <TbApi color="#000000" style={{ color: 'var(--text-primary)' }} /> },
    ],
    mobile: [
        { name: 'Flutter', icon: <SiFlutter color="#02569B" /> },
    ],
    databases: [
        { name: 'Supabase', icon: <SiSupabase color="#3ECF8E" /> },
        { name: 'Firebase', icon: <SiFirebase color="#FFCA28" /> },
        { name: 'PostgreSQL', icon: <SiPostgresql color="#336791" /> },
    ],
    tools: [
        { name: 'Vite', icon: <SiVite color="#646CFF" /> },
        { name: 'Docker', icon: <SiDocker color="#2496ED" /> },
        { name: 'VS Code', icon: <VscCode color="#007ACC" /> },
        { name: 'Cursor', icon: <VscCode color="currentColor" /> },
        { name: 'Antigravity', icon: <BsRocketTakeoff color="#6366f1" /> },
        { name: 'Windsurf', icon: <VscCode color="#2b5af6" /> },
    ],
};

function Skills() {
    const { t } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const categories = [
        { key: 'frontend', data: skillsData.frontend },
        { key: 'backend', data: skillsData.backend },
        { key: 'mobile', data: skillsData.mobile },
        { key: 'databases', data: skillsData.databases },
        { key: 'tools', data: skillsData.tools },
    ];

    return (
        <section id="skills" className="skills section" ref={ref}>
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    {t('skills.title')}
                </motion.h2>

                <motion.p
                    className="skills__subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {t('skills.subtitle')}
                </motion.p>

                <div className="skills__grid">
                    {categories.map(({ key, data }, categoryIndex) => (
                        <motion.div
                            key={key}
                            className="skills__category"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 + categoryIndex * 0.1 }}
                        >
                            <h3 className="skills__category-title">{t(`skills.${key}`)}</h3>
                            <div className="skills__list">
                                {data.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skill.name}
                                        className="skills__item"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{
                                            duration: 0.3,
                                            delay: 0.3 + categoryIndex * 0.1 + skillIndex * 0.05
                                        }}
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow: '0 10px 30px rgba(99, 102, 241, 0.2)'
                                        }}
                                    >
                                        <span className="skills__item-icon">{skill.icon}</span>
                                        <span className="skills__item-name">{skill.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Skills;
