// App.js
import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider, MD3LightTheme, configureFonts } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';

// 1. 匯入要求的字型 Hook 與字型檔案
import { 
  useFonts, 
  NotoSansTC_400Regular, 
  NotoSansTC_700Bold 
} from '@expo-google-fonts/noto-sans-tc';
import { 
  Roboto_400Regular, 
  Roboto_700Bold 
} from '@expo-google-fonts/roboto';

import HomeScreen from './src/screens/HomeScreen';

// 防止自動隱藏 Splash 畫面，直到字型載入完畢
SplashScreen.preventAutoHideAsync();

export default function App() {
  // 2. 載入字型
  const [fontsLoaded] = useFonts({
    'NotoSansTC-Regular': NotoSansTC_400Regular,
    'NotoSansTC-Bold': NotoSansTC_700Bold,
    'Roboto-Regular': Roboto_400Regular,
    'Roboto-Bold': Roboto_700Bold,
  });

  // 3. 當字型載入完畢後，隱藏 Splash 畫面
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // 字型載入中，維持空白/Splash畫面
  }

  // 4. 設定 React Native Paper 的全域預設字型家族
  const fontConfig = {
    fontFamily: 'NotoSansTC-Regular',
  };

  const theme = {
    ...MD3LightTheme,
    fonts: configureFonts({ config: fontConfig }),
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <StatusBar style="auto" />
        <HomeScreen />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});