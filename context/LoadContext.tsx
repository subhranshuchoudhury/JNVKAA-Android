import React, {createContext, useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {BASE_URL} from '../constants/URL';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
BASE_URL;
export const LoadContext = createContext({});

export const LoadProvider = ({children}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const changeNavigationBarColorAsync = async (color: string) => {
    console.log('Change Color', color);
    try {
      const response = await changeNavigationBarColor('#FFFFFF');
    } catch (e) {
      console.log('changeNavigationBarColorAsync', e); // {success: false}
    }
  };

  const handleChangeLoading = (value: boolean) => setIsLoading(value);
  const handleChangeError = (value: boolean) => setIsError(value);
  const handleChangeErrorMessage = (value: string) => setErrorMessage(value);

  useEffect(() => {
    changeNavigationBarColorAsync('#FFFFFF');
    SplashScreen.hide();
  }, []);

  return (
    <LoadContext.Provider
      value={{
        isLoading,
        isError,
        errorMessage,
        handleChangeError,
        handleChangeLoading,
        handleChangeErrorMessage,
        changeNavigationBarColorAsync,
      }}>
      {children}
    </LoadContext.Provider>
  );
};
