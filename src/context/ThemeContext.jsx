import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    AUTO: 'auto',
};

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved || THEMES.AUTO;
    });

    const [resolvedTheme, setResolvedTheme] = useState(THEMES.LIGHT);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const updateResolvedTheme = () => {
            if (theme === THEMES.AUTO) {
                setResolvedTheme(mediaQuery.matches ? THEMES.DARK : THEMES.LIGHT);
            } else {
                setResolvedTheme(theme);
            }
        };

        updateResolvedTheme();

        if (theme === THEMES.AUTO) {
            mediaQuery.addEventListener('change', updateResolvedTheme);
            return () => mediaQuery.removeEventListener('change', updateResolvedTheme);
        }
    }, [theme]);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', resolvedTheme);
        localStorage.setItem('theme', theme);
    }, [theme, resolvedTheme]);

    const cycleTheme = () => {
        const themeOrder = [THEMES.LIGHT, THEMES.DARK, THEMES.AUTO];
        const currentIndex = themeOrder.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themeOrder.length;
        setTheme(themeOrder[nextIndex]);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme, cycleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

export default ThemeContext;
