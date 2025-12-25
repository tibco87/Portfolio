import { useLanguage } from '../../context/LanguageContext';
import './Footer.css';

function Footer() {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__content">
                    <div className="footer__brand">
                        <a href="#home" className="footer__logo">
                            <span className="footer__logo-text">TK</span>
                        </a>
                        <p className="footer__tagline">Full-Stack Developer & Mobile App Developer</p>
                    </div>

                    <p className="footer__copyright">
                        © {currentYear} Tibor Kútik. {t('footer.rights')}
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
