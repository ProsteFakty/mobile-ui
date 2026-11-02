import { Image } from 'expo-image';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/theme';

const FADE_MS = 300;

interface Props {
  ready: boolean;
}

const SplashOverlay = ({ ready }: Props) => {
  const insets = useSafeAreaInsets();
  const [opacity] = useState(() => new Animated.Value(1));
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!ready) return;
    Animated.timing(opacity, { toValue: 0, duration: FADE_MS, useNativeDriver: true }).start(() =>
      setVisible(false),
    );
  }, [ready, opacity]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[styles.screen, { opacity, paddingTop: insets.top }]}
      onLayout={() => SplashScreen.hide()}>
      <StatusBar style="light" />
      <View style={styles.logo}>
        <View style={styles.mark}>
          <Image source={require('@assets/icons/scale.svg')} style={styles.markIcon} />
        </View>
        <Text style={styles.title}>Proste Fakty</Text>
        <Text style={styles.subtitle}>Prawo i Sejm</Text>
      </View>
      <Text style={[styles.footer, { marginBottom: insets.bottom + 48 }]}>UPOST</Text>
    </Animated.View>
  );
};

export default SplashOverlay;

const styles = StyleSheet.create({
  screen: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    backgroundColor: colors.brandPrimary,
  },
  logo: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  mark: {
    width: 88,
    height: 88,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgSurface,
  },
  markIcon: { width: 44, height: 44 },
  title: { fontSize: 28, lineHeight: 34, fontWeight: '700', color: colors.textOnBrand },
  subtitle: { fontSize: 15, lineHeight: 22, color: colors.textOnBrand, opacity: 0.8 },
  footer: { fontSize: 13, lineHeight: 18, color: colors.textOnBrand, opacity: 0.7 },
});
