import { CameraView, useCameraPermissions } from 'expo-camera';
import { Link } from 'expo-router';
import { useRef, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function DiscoverScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<'back' | 'front'>('back');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View style={styles.loading}><Text>Preparing camera…</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Link href="/" asChild>
          <Pressable style={styles.back}><Text style={styles.backText}>←  Back</Text></Pressable>
        </Link>
        <View style={styles.permissionContent}>
          <Text style={styles.eyebrow}>DISCOVER</Text>
          <Text style={styles.title}>Let’s find something real.</Text>
          <Text style={styles.subtitle}>
            Mybreed needs camera access so you can photograph your own discoveries.
          </Text>
          <Pressable style={styles.button} onPress={requestPermission}>
            <Text style={styles.buttonText}>Allow camera</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const takePhoto = async () => {
    const photo = await cameraRef.current?.takePictureAsync({ quality: 0.8 });
    if (photo?.uri) setPhotoUri(photo.uri);
  };

  const retakePhoto = () => setPhotoUri(null);

  if (photoUri) {
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Pressable style={styles.backButton} onPress={retakePhoto}>
            <Text style={styles.backTextLight}>←</Text>
          </Pressable>
          <View>
            <Text style={styles.cameraEyebrow}>MYBREED</Text>
            <Text style={styles.cameraTitle}>NEW DISCOVERY</Text>
          </View>
          <View style={styles.placeholderButton} />
        </View>

        <View style={styles.previewWrap}>
          <Image source={{ uri: photoUri }} style={styles.preview} resizeMode="cover" />
          <View style={styles.previewBadge}>
            <Text style={styles.previewBadgeText}>YOUR DISCOVERY</Text>
          </View>
        </View>

        <View style={styles.previewControls}>
          <Text style={styles.previewTitle}>Nice find.</Text>
          <Text style={styles.previewText}>
            This photo is ready to become a discovery. Identification and saving are next.
          </Text>
          <View style={styles.actionRow}>
            <Pressable style={styles.secondaryButton} onPress={retakePhoto}>
              <Text style={styles.secondaryButtonText}>Retake</Text>
            </Pressable>
            <Pressable style={styles.primaryButton} onPress={() => {}}>
              <Text style={styles.primaryButtonText}>Identify</Text>
              <Text style={styles.primaryArrow}>→</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Link href="/" asChild>
          <Pressable style={styles.backButton}><Text style={styles.backTextLight}>←</Text></Pressable>
        </Link>
        <View>
          <Text style={styles.cameraEyebrow}>MYBREED</Text>
          <Text style={styles.cameraTitle}>DISCOVER</Text>
        </View>
        <Pressable
          style={styles.flipButton}
          onPress={() => setFacing((current) => current === 'back' ? 'front' : 'back')}
        >
          <Text style={styles.flipText}>↻</Text>
        </Pressable>
      </View>

      <View style={styles.cameraWrap}>
        <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
        <View style={styles.overlay} pointerEvents="none">
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
          <Text style={styles.hint}>Find an animal or plant</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <Text style={styles.instruction}>Photograph something you have discovered.</Text>
        <Pressable style={styles.shutter} onPress={takePhoto} accessibilityLabel="Take discovery photo">
          <View style={styles.shutterInner} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F6F3EA' },
  permissionContainer: { flex: 1, backgroundColor: '#F6F3EA', paddingHorizontal: 24, paddingTop: 62 },
  permissionContent: { flex: 1, justifyContent: 'center', paddingBottom: 80 },
  container: { flex: 1, backgroundColor: '#111510' },
  topBar: { paddingTop: 58, paddingHorizontal: 20, paddingBottom: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },
  placeholderButton: { width: 44, height: 44 },
  back: { alignSelf: 'flex-start', paddingVertical: 8 },
  backText: { color: '#53624A', fontSize: 15, fontWeight: '700' },
  backTextLight: { color: '#FFFFFF', fontSize: 25 },
  cameraEyebrow: { textAlign: 'center', color: '#BFC7B9', fontSize: 9, fontWeight: '800', letterSpacing: 2.5 },
  cameraTitle: { textAlign: 'center', color: '#FFFFFF', fontSize: 15, fontWeight: '800', letterSpacing: 1 },
  flipButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },
  flipText: { color: '#FFFFFF', fontSize: 24 },
  cameraWrap: { flex: 1, marginHorizontal: 12, borderRadius: 30, overflow: 'hidden' },
  camera: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  corner: { position: 'absolute', width: 34, height: 34, borderColor: '#FFFFFF' },
  topLeft: { top: 35, left: 35, borderTopWidth: 3, borderLeftWidth: 3 },
  topRight: { top: 35, right: 35, borderTopWidth: 3, borderRightWidth: 3 },
  bottomLeft: { bottom: 35, left: 35, borderBottomWidth: 3, borderLeftWidth: 3 },
  bottomRight: { bottom: 35, right: 35, borderBottomWidth: 3, borderRightWidth: 3 },
  hint: { marginTop: 250, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16, overflow: 'hidden', backgroundColor: 'rgba(0,0,0,0.45)', color: '#FFFFFF', fontSize: 13, fontWeight: '600' },
  controls: { minHeight: 150, alignItems: 'center', paddingTop: 12 },
  instruction: { color: '#C8CEC5', fontSize: 13, textAlign: 'center', paddingHorizontal: 30, minHeight: 38 },
  shutter: { width: 76, height: 76, borderRadius: 38, borderWidth: 4, borderColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  shutterInner: { width: 62, height: 62, borderRadius: 31, backgroundColor: '#FFFFFF' },
  previewWrap: { flex: 1, marginHorizontal: 12, borderRadius: 30, overflow: 'hidden', position: 'relative' },
  preview: { width: '100%', height: '100%' },
  previewBadge: { position: 'absolute', top: 18, left: 18, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, backgroundColor: 'rgba(0,0,0,0.55)' },
  previewBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800', letterSpacing: 1.5 },
  previewControls: { minHeight: 190, paddingHorizontal: 22, paddingTop: 14, paddingBottom: 18 },
  previewTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: '800' },
  previewText: { marginTop: 5, color: '#C8CEC5', fontSize: 13, lineHeight: 19 },
  actionRow: { flexDirection: 'row', gap: 10, marginTop: 14 },
  secondaryButton: { flex: 1, minHeight: 52, borderRadius: 16, borderWidth: 1, borderColor: '#596056', alignItems: 'center', justifyContent: 'center' },
  secondaryButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  primaryButton: { flex: 1.35, minHeight: 52, borderRadius: 16, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  primaryButtonText: { color: '#182018', fontSize: 15, fontWeight: '800' },
  primaryArrow: { color: '#182018', fontSize: 19, marginLeft: 8 },
  eyebrow: { fontSize: 12, fontWeight: '800', letterSpacing: 2.5, color: '#53624A' },
  title: { marginTop: 10, fontSize: 38, lineHeight: 43, fontWeight: '800', color: '#182018' },
  subtitle: { marginTop: 12, fontSize: 16, lineHeight: 23, color: '#697168' },
  button: { marginTop: 28, minHeight: 56, borderRadius: 18, backgroundColor: '#182018', alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});
