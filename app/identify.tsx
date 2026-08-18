import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function IdentifyScreen() {
  const { photoUri } = useLocalSearchParams<{ photoUri?: string }>();
  const router = useRouter();
  const [analyzing, setAnalyzing] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnalyzing(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!photoUri) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>No discovery photo</Text>
        <Text style={styles.emptyText}>Take a photo first, then identify it.</Text>
        <Pressable style={styles.darkButton} onPress={() => router.replace('/discover')}>
          <Text style={styles.darkButtonText}>Back to Discover</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <View>
          <Text style={styles.eyebrow}>MYBREED</Text>
          <Text style={styles.headerTitle}>IDENTIFICATION</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.photoWrap}>
        <Image source={{ uri: photoUri }} style={styles.photo} resizeMode="cover" />
        <View style={styles.photoBadge}><Text style={styles.photoBadgeText}>YOUR PHOTO</Text></View>
      </View>

      <View style={styles.resultPanel}>
        {analyzing ? (
          <>
            <View style={styles.analyzingRow}>
              <View style={styles.dot} />
              <Text style={styles.analyzingText}>Analyzing your discovery…</Text>
            </View>
            <Text style={styles.resultTitle}>Looking closely.</Text>
            <Text style={styles.resultText}>Checking the photographed subject. Real AI vision will replace this preview next.</Text>
          </>
        ) : (
          <>
            <Text style={styles.resultLabel}>DEMO IDENTIFICATION</Text>
            <Text style={styles.resultTitle}>🐇 Rabbit</Text>
            <Text style={styles.category}>Animal</Text>
            <Text style={styles.resultText}>This is a temporary local result. Your photograph remains the source of the discovery.</Text>
            <Pressable style={[styles.addButton, added && styles.addedButton]} onPress={() => setAdded(true)} disabled={added}>
              <Text style={[styles.addButtonText, added && styles.addedButtonText]}>{added ? 'Discovery Added ✓' : 'Add Discovery'}</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111510' },
  topBar: { paddingTop: 58, paddingHorizontal: 20, paddingBottom: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },
  backText: { color: '#FFFFFF', fontSize: 25 },
  placeholder: { width: 44, height: 44 },
  eyebrow: { textAlign: 'center', color: '#BFC7B9', fontSize: 9, fontWeight: '800', letterSpacing: 2.5 },
  headerTitle: { textAlign: 'center', color: '#FFFFFF', fontSize: 15, fontWeight: '800', letterSpacing: 1 },
  photoWrap: { flex: 1, marginHorizontal: 12, borderRadius: 30, overflow: 'hidden', position: 'relative' },
  photo: { width: '100%', height: '100%' },
  photoBadge: { position: 'absolute', top: 18, left: 18, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, backgroundColor: 'rgba(0,0,0,0.55)' },
  photoBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800', letterSpacing: 1.5 },
  resultPanel: { minHeight: 275, paddingHorizontal: 24, paddingTop: 18, paddingBottom: 24 },
  analyzingRow: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 9, height: 9, borderRadius: 5, backgroundColor: '#D9E1D3', marginRight: 9 },
  analyzingText: { color: '#D9E1D3', fontSize: 13, fontWeight: '700' },
  resultLabel: { color: '#AAB5A4', fontSize: 10, fontWeight: '800', letterSpacing: 2 },
  resultTitle: { marginTop: 6, color: '#FFFFFF', fontSize: 30, lineHeight: 36, fontWeight: '800' },
  category: { marginTop: 2, color: '#C8CEC5', fontSize: 15, fontWeight: '600' },
  resultText: { marginTop: 8, color: '#C8CEC5', fontSize: 13, lineHeight: 19 },
  addButton: { marginTop: 18, minHeight: 54, borderRadius: 17, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  addButtonText: { color: '#182018', fontSize: 16, fontWeight: '800' },
  addedButton: { backgroundColor: '#D9E1D3' },
  addedButtonText: { color: '#30402E' },
  emptyState: { flex: 1, backgroundColor: '#F6F3EA', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28 },
  emptyTitle: { color: '#182018', fontSize: 28, fontWeight: '800' },
  emptyText: { marginTop: 8, color: '#697168', fontSize: 15, textAlign: 'center' },
  darkButton: { marginTop: 24, minHeight: 54, paddingHorizontal: 24, borderRadius: 17, backgroundColor: '#182018', alignItems: 'center', justifyContent: 'center' },
  darkButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
});
