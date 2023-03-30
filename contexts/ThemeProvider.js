import React, {createContext, useContext, useState, useEffect} from "react";
import {View, StyleSheet} from 'react-native';
import { darkTheme, defaultTheme } from "../config/theme/theme";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

const ThemeProvider = ({children}) =>{
        const [theme, setTheme] = useState(defaultTheme);
        const [isLoadingTheme, setIsLoadingTheme] = useState(true);

        const findOldTheme = async () => {
            const themeMode = await AsyncStorage.getItem('themeMode');
            
            if (themeMode !== null){
                themeMode === 'default'? setTheme(defaultTheme): setTheme(darkTheme)
                setIsLoadingTheme(false);
            }
            setIsLoadingTheme(false);
        };

        useEffect(()=>{
            findOldTheme();
        }, []);

        const updateTheme = currentThemeMode =>{
            const newTheme = currentThemeMode === 'default' ? darkTheme : defaultTheme;
            setTheme(newTheme)
            AsyncStorage.setItem('themeMode', newTheme.themeMode)
        }

    return(
        <ThemeContext.Provider value = {{theme, isLoadingTheme, updateTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);


const styles = StyleSheet.create({
    container:{}
})

export default ThemeProvider;