import React, {useEffect} from "react";
import {Preferences} from "@capacitor/preferences";

export const useDarkMode = () => {

    const [isDark, setIsDark] = React.useState<boolean>(false);
    const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

    useEffect(() => {
        let mounted = true;
        getDarkMode().then(res => {
            if (mounted) {
                setIsDark(res);
                setIsLoaded(true);
            }
        }).catch(() => {
            if (mounted) {
                setIsDark(false);
                setIsLoaded(true);
            }
        });
        return () => { mounted = false; };
    }, []);

    useEffect(() => {
        if (!isLoaded) return;
        document.body.classList.toggle('dark', isDark);
        persistDarkMode().then(
            () => {
                console.log('Dark mode saved to preferences');
            });
    }, [isDark, isLoaded]);


    async function persistDarkMode(): Promise<void> {
        await Preferences.set({
            key: 'darkMode',
            value: isDark ? 'true' : 'false'
        })
    }

    async function getDarkMode(): Promise<boolean> {
        const {value} = await Preferences.get({key: 'darkMode'});
        return value === 'true';
    }

    const toggleDarkMode = () => {
        setIsDark(prev => !prev);
    };

    return { isDark, toggleDarkMode }
}