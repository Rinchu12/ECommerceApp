import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from '../../screens/localization/i18n';

type LanguageContextType = {
  language: string;
  changeLanguage: (lang: 'en' | 'ar') => void;
  isLoading: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
const LANGUAGE_KEY = 'APP_LANGUAGE';

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [isLoading, setIsLoading] = useState(true);

  // Initialize language from AsyncStorage or device locale
  useEffect(() => {
    const initLanguage = async () => {
      try {
        const storedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
        const defaultLang =
          (storedLang as 'en' | 'ar') ||
          (Localization.getLocales()[0]?.languageCode === 'ar' ? 'ar' : 'en');

        setLanguage(defaultLang);
        await i18n.changeLanguage(defaultLang);
      } catch (e) {
        console.error('Failed to load language:', e);
      } finally {
        setIsLoading(false);
      }
    };

    initLanguage();
  }, []);

  // Function to change language dynamically
  const changeLanguage = async (lang: 'en' | 'ar') => {
    try {
      await i18n.changeLanguage(lang);
      setLanguage(lang);
      await AsyncStorage.setItem(LANGUAGE_KEY, lang);
    } catch (e) {
      console.error('Failed to change language:', e);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
