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

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Farm</Text>
        <Text style={styles.cardText}>
          Your living discoveries will appear here. Your first Breed is waiting.
        </Text>
      </View>

      <Pressable style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Start discovering</Text>
      </Pressable>
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
  hero: {
    marginBottom: 32,
  },
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
  card: {
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5E2D8',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#182018',
  },
  cardText: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: '#697168',
  },
  button: {
    minHeight: 56,
    borderRadius: 18,
    backgroundColor: '#182018',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
