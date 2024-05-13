import { useState } from 'react';

export function useDarkModePreference(): [boolean, () => void] {
    const [isDark, setIsDark] = useState<boolean>(false);

    const toggleDarkMode = () => {
        setIsDark((prevIsDark) => !prevIsDark);
    };

    return [isDark, toggleDarkMode];
}
