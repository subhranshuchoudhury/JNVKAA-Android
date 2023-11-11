import React, {useEffect, useState} from 'react';
Navigation;
import {LoadProvider} from './context/LoadContext';
import NetInfo from '@react-native-community/netinfo';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import Navigation from './navigation/Navigation';

const App = () => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);

      if (!state.isConnected) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'No Internet Connection',
          autoClose: 60000,
        });
      } else {
        Toast.hide();
      }
    });

    // Unsubscribe
  }, []);

  return (
    <LoadProvider>
      <AlertNotificationRoot theme="light">
        <Navigation />
      </AlertNotificationRoot>
    </LoadProvider>
  );
};

export default App;
