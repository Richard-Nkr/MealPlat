import { createContext } from 'react';

export const themes = {
    dark: {
        background: '#512DA8'
        
    },
    light: {
        background: '#43A047'
    },
};

export const ThemeContext = createContext(themes.light);