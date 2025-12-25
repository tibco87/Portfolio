import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './SplitscreenIntro.css';

function SplitscreenIntro({ onComplete }) {
    const [phase, setPhase] = useState('split'); // split -> typing -> reveal
    const [displayText, setDisplayText] = useState('');
    const fullName = 'Tibor Kútik';

    useEffect(() => {
        // Start typing after initial animation
        const startTyping = setTimeout(() => {
            setPhase('typing');
        }, 800);

        return () => clearTimeout(startTyping);
    }, []);

    useEffect(() => {
        if (phase !== 'typing') return;

        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= fullName.length) {
                setDisplayText(fullName.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
                // Wait a bit then start reveal animation
                setTimeout(() => {
                    setPhase('reveal');
                }, 600);
            }
        }, 100);

        return () => clearInterval(typingInterval);
    }, [phase]);

    // Call onComplete after reveal animation finishes
    useEffect(() => {
        if (phase === 'reveal') {
            const timer = setTimeout(onComplete, 900);
            return () => clearTimeout(timer);
        }
    }, [phase, onComplete]);

    return (
        <motion.div
            className="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Left Panel */}
            <motion.div
                className="intro__panel intro__panel--left"
                initial={{ x: 0 }}
                animate={phase === 'reveal' ? { x: '-100%' } : { x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
                <div className="intro__pattern">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="intro__pattern-line"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: i * 0.05, duration: 0.5 }}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Right Panel */}
            <motion.div
                className="intro__panel intro__panel--right"
                initial={{ x: 0 }}
                animate={phase === 'reveal' ? { x: '100%' } : { x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
                <div className="intro__pattern intro__pattern--reverse">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="intro__pattern-line"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: i * 0.05, duration: 0.5 }}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Center Content */}
            <motion.div
                className="intro__content"
                animate={phase === 'reveal' ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="intro__logo"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
                >
                    <span className="intro__logo-text">TK</span>
                </motion.div>

                <motion.h1
                    className="intro__name"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {displayText}
                    <motion.span
                        className="intro__cursor"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                    >
                        |
                    </motion.span>
                </motion.h1>

                <motion.p
                    className="intro__tagline"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: phase === 'typing' || phase === 'reveal' ? 1 : 0, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                >
                    Full-Stack Developer
                </motion.p>
            </motion.div>
        </motion.div>
    );
}

export default SplitscreenIntro;
