import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../../context/LanguageContext';
import './Contact.css';

// EmailJS configuration - to be filled in by user
const EMAILJS_SERVICE_ID = 'service_rzitatr';
const EMAILJS_TEMPLATE_ID = 'template_oo4qijl';
const EMAILJS_PUBLIC_KEY = 'sbuylDoXo-YRrsYly';

// Social links - to be filled in by user
const socialLinks = [
    {
        name: 'GitHub',
        url: 'https://github.com/tibco87',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
        ),
    },
    {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/tibor-kutik-715b14160',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        ),
    },
    {
        name: 'Facebook',
        url: 'https://www.facebook.com/tibor.kutik',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
        ),
    },
    {
        name: 'WhatsApp',
        url: 'https://wa.me/421919487774',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
        ),
    },
];

function Contact() {
    const { t } = useLanguage();
    const formRef = useRef(null);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [status, setStatus] = useState({
        sending: false,
        success: false,
        error: false,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ sending: true, success: false, error: false });

        try {
            await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formRef.current,
                EMAILJS_PUBLIC_KEY
            );

            setStatus({ sending: false, success: true, error: false });
            setFormData({ name: '', email: '', subject: '', message: '' });

            setTimeout(() => {
                setStatus({ sending: false, success: false, error: false });
            }, 5000);
        } catch (error) {
            console.error('EmailJS Error:', error);
            setStatus({ sending: false, success: false, error: true });

            setTimeout(() => {
                setStatus({ sending: false, success: false, error: false });
            }, 5000);
        }
    };

    const phoneNumber = '+421 919 487 774';
    const phoneLink = 'tel:+421919487774';

    return (
        <section id="contact" className="contact section" ref={sectionRef}>
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    {t('contact.title')}
                </motion.h2>

                <motion.p
                    className="contact__subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {t('contact.subtitle')}
                </motion.p>

                <div className="contact__content">
                    <motion.form
                        ref={formRef}
                        className="contact__form"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="contact__form-group">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder={t('contact.form.name')}
                                required
                                className="contact__input"
                            />
                        </div>

                        <div className="contact__form-group">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder={t('contact.form.email')}
                                required
                                className="contact__input"
                            />
                        </div>

                        <div className="contact__form-group">
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder={t('contact.form.subject')}
                                required
                                className="contact__input"
                            />
                        </div>

                        <div className="contact__form-group">
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder={t('contact.form.message')}
                                required
                                rows="5"
                                className="contact__input contact__textarea"
                            />
                        </div>

                        <button
                            type="submit"
                            className="contact__submit btn btn--primary"
                            disabled={status.sending}
                        >
                            {status.sending ? t('contact.form.sending') : t('contact.form.send')}
                            {!status.sending && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            )}
                        </button>

                        {status.success && (
                            <p className="contact__message contact__message--success">
                                {t('contact.form.success')}
                            </p>
                        )}

                        {status.error && (
                            <p className="contact__message contact__message--error">
                                {t('contact.form.error')}
                            </p>
                        )}
                    </motion.form>

                    <motion.div
                        className="contact__info"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="contact__info-card">
                            <h3 className="contact__info-title">{t('contact.info.title')}</h3>

                            <div className="contact__info-items">
                                <div className="contact__info-item">
                                    <a href={phoneLink} className="contact__info-icon contact__info-icon--phone" aria-label="Call phone number">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                        </svg>
                                    </a>
                                    <div className="contact__info-text">
                                        <span className="contact__info-label">{t('contact.info.phone')}</span>
                                        <span className="contact__info-value">{phoneNumber}</span>
                                    </div>
                                </div>

                                <div className="contact__info-item">
                                    <div className="contact__info-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                    </div>
                                    <div className="contact__info-text">
                                        <span className="contact__info-label">{t('contact.info.location')}</span>
                                        <span className="contact__info-value">{t('contact.info.locationValue')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="contact__social">
                            <h3 className="contact__social-title">{t('contact.social.title')}</h3>
                            <div className="contact__social-links">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        className="contact__social-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.name}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
