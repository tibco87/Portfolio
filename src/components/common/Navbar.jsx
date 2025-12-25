import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import './Navbar.css';

function Navbar() {
    const { t } = useLanguage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    const navItems = [
        { key: 'home', href: '#home' },
        { key: 'about', href: '#about' },
        { key: 'skills', href: '#skills' },
        { key: 'projects', href: '#projects' },
        { key: 'contact', href: '#contact' },
    ];

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__container">
                <a href="#home" className="navbar__logo" onClick={(e) => handleNavClick(e, '#home')}>
                    <span className="navbar__logo-text">TK</span>
                </a>

                {/* Desktop Navigation */}
                <ul className="navbar__menu">
                    {navItems.map(({ key, href }) => (
                        <li key={key}>
                            <a
                                href={href}
                                className="navbar__link"
                                onClick={(e) => handleNavClick(e, href)}
                            >
                                {t(`nav.${key}`)}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Desktop Actions */}
                <div className="navbar__actions">
                    <ThemeToggle />
                    <LanguageToggle />
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`navbar__hamburger ${isMobileMenuOpen ? 'navbar__hamburger--active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            className="navbar__mobile-menu"
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                        >
                            <ul className="navbar__mobile-links">
                                {navItems.map(({ key, href }, index) => (
                                    <motion.li
                                        key={key}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <a
                                            href={href}
                                            className="navbar__mobile-link"
                                            onClick={(e) => handleNavClick(e, href)}
                                        >
                                            {t(`nav.${key}`)}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                            <div className="navbar__mobile-actions">
                                <ThemeToggle />
                                <LanguageToggle />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}

export default Navbar;
