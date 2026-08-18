import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function DiscoverScreen() {
  return (
    <View style={styles.container}>
      <Link href="/" asChild>
        <Pressable style={styles.back}>
          <Text style={styles.backText}>←  Back</Text>
        </Pressable>
      </Link>

      <View style={styles.header}>
        <Text style={styles.eyebrow}>DISCOVER</Text>
        <Text style={styles.title}>Find something real.</Text>
        <Text style={styles.subtitle}>
          Your camera will become the doorway into Mybreed.
        </Text>
      </View>

      <View style={styles.cameraPlaceholder}>
        <View style={styles.focusFrame}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>
        <Text style={styles.cameraTitle}>Camera coming next</Text>
        <Text style={styles.cameraText}>
          We’ll connect the real camera here and turn your first photo into a Discovery.
        </Text>
      </View>

      <View style={styles.rule}>
        <Text style={styles.ruleTitle}>MYBREED RULE</Text>
        <Text style={styles.ruleText}>
          You can only fuse things you have discovered yourself.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F3EA',
    paddingHorizontal: 24,
    paddingTop: 62,
  },
  back: { alignSelf: 'flex-start', paddingVertical: 8 },
  backText: { color: '#53624A', fontSize: 15, fontWeight: '700' },
  header: { marginTop: 24 },
  eyebrow: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2.5,
    color: '#53624A',
  },
  title: {
    marginTop: 10,
    fontSize: 38,
    lineHeight: 43,
    fontWeight: '800',
    color: '#182018',
  },
  subtitle: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 23,
    color: '#697168',
  },
  cameraPlaceholder: {
    flex: 1,
    minHeight: 300,
    marginTop: 28,
    marginBottom: 20,
    borderRadius: 28,
    backgroundColor: '#DDE1D5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
    overflow: 'hidden',
  },
  focusFrame: { width: 180, height: 180, marginBottom: 28 },
  corner: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderColor: '#53624A',
  },
  topLeft: { top: 0, left: 0, borderTopWidth: 3, borderLeftWidth: 3 },
  topRight: { top: 0, right: 0, borderTopWidth: 3, borderRightWidth: 3 },
  bottomLeft: { bottom: 0, left: 0, borderBottomWidth: 3, borderLeftWidth: 3 },
  bottomRight: { bottom: 0, right: 0, borderBottomWidth: 3, borderRightWidth: 3 },
  cameraTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#182018',
    textAlign: 'center',
  },
  cameraText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: '#697168',
    textAlign: 'center',
    maxWidth: 300,
  },
  rule: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E2D8',
    padding: 18,
    marginBottom: 22,
  },
  ruleTitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    color: '#7A8177',
  },
  ruleText: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: '#384037',
  },
});
