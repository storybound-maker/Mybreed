import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>MYBREED</Text>
        <Text style={styles.title}>Discover life.{"\n"}Fuse it.</Text>
        <Text style={styles.subtitle}>
          Find real things. Turn your discoveries into Breeds.
        </Text>
      </View>

      <View style={styles.discoveryCard}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>＋</Text>
        </View>
        <View style={styles.discoveryCopy}>
          <Text style={styles.cardTitle}>Make your first discovery</Text>
          <Text style={styles.cardText}>
            Photograph an animal or plant you find in the real world.
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>MY FARM</Text>
        <Text style={styles.cardTitle}>Nothing living here yet.</Text>
        <Text style={styles.cardText}>
          Your Breeds will appear here after you create your first fusion.
        </Text>
      </View>

      <Link href="/discover" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Start discovering</Text>
          <Text style={styles.arrow}>→</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F3EA',
    paddingHorizontal: 24,
    paddingTop: 72,
  },
  hero: { marginBottom: 30 },
  eyebrow: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 3,
    color: '#53624A',
    marginBottom: 12,
  },
  title: {
    fontSize: 48,
    lineHeight: 52,
    fontWeight: '800',
    color: '#182018',
  },
  subtitle: {
    marginTop: 16,
    fontSize: 17,
    lineHeight: 25,
    color: '#5D665B',
    maxWidth: 330,
  },
  discoveryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: '#E7EBDD',
    padding: 18,
    marginBottom: 16,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#182018',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  icon: { color: '#FFFFFF', fontSize: 26, fontWeight: '300' },
  discoveryCopy: { flex: 1 },
  card: {
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5E2D8',
    marginBottom: 20,
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    color: '#7A8177',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#182018',
  },
  cardText: {
    marginTop: 7,
    fontSize: 15,
    lineHeight: 22,
    color: '#697168',
  },
  button: {
    minHeight: 58,
    borderRadius: 18,
    backgroundColor: '#182018',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  arrow: { color: '#FFFFFF', fontSize: 21, marginLeft: 10 },
});
