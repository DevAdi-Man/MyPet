import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';

export default function App() {
  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={triggerHaptic}>
        <Text style={styles.text}>Press for Haptic</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8 },
  text: { color: '#fff', fontWeight: 'bold' }
});
