import { SafeAreaView, StyleSheet } from 'react-native';

import { TasteChart } from '~/components/charts';
import { colors } from '~/constants';
import type { TTasteProfile } from '~/types';

const tasteProfile: TTasteProfile = {
  bitter: 9,
  fruity: 1,
  intensity: 2,
  sour: 7,
  sweet: 4,
} as const;

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <TasteChart tasteProfile={tasteProfile} />
      <TasteChart animate tasteProfile={tasteProfile} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    alignItems: 'center',
    backgroundColor: colors.black,
    flex: 1,
    justifyContent: 'center',
  },
});
