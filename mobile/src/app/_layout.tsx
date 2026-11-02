import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import SplashOverlay from '@/components/SplashOverlay';
import { colors } from '@/theme';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const isReady = true; // for now, since nothing really loads yet
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bgApp } }} />
      <SplashOverlay ready={isReady} />
    </>
  );
}
