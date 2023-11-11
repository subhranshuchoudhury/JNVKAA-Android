import {
  View,
  Text,
  StatusBar,
  BackHandler,
  Platform,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import {LoadContext} from '../../context/LoadContext';
import {WebView} from 'react-native-webview';
import {BASE_URL} from '../../constants/URL';
import Spinner from 'react-native-loading-spinner-overlay';

const Home = () => {
  const {isLoading, handleChangeLoading}: any = useContext(LoadContext);
  const [canGoBack, setCanGoBack] = useState<any>(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  const webviewRef: any = React.useRef(null);
  let currentDataURL = 'https://jnvkaa.netlify.app/';
  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onAndroidBackPress,
        );
      };
    }
  }, []);

  const onAndroidBackPress = () => {
    console.log(currentDataURL, BASE_URL, canGoBack);
    if (webviewRef.current) {
      // if (!canGoBack) BackHandler.exitApp();
      webviewRef.current.goBack();
      return true; // prevent default behavior (exit app)
    }
    return false;
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" animated backgroundColor="#FFFFFF" />
      <Spinner
        children={
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/logo.jpeg')}
              style={{
                width: 250,
                height: 250,
                marginBottom: 20,
              }}
            />
            <ActivityIndicator color={'#FA7070'} size={'large'} />
            <Text
              style={{
                color: 'black',
                marginTop: 20,
              }}>
              {Math.round(currentProgress * 100)}%{' '}
            </Text>
          </View>
        }
        visible={isLoading}
        overlayColor="#FFFFFF"
      />
      <WebView
        domStorageEnabled={true}
        onNavigationStateChange={data => {
          currentDataURL = data.url;
          console.log('Current URL', currentDataURL);
        }}
        allowFileAccess={true}
        allowsFullscreenVideo
        allowFileAccessFromFileURLs
        allowUniversalAccessFromFileURLs
        cacheEnabled={true}
        javaScriptEnabled={true}
        cacheMode="LOAD_CACHE_ELSE_NETWORK"
        ref={webviewRef}
        onLoadProgress={e => {
          console.log('LOAD DATA', e.nativeEvent.progress);
          setCurrentProgress(e.nativeEvent.progress);
          setCanGoBack(e.nativeEvent.canGoBack);
        }}
        onLoadEnd={() => handleChangeLoading(false)}
        onError={e => {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Loading Error',
            textBody: `Error: ${e.nativeEvent.description}`,
            button: 'close',
          });
        }}
        source={{uri: `${BASE_URL}`}}
        style={{flex: 1}}
      />
    </View>
  );
};

export default Home;
