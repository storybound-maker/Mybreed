import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

function toBase64(uri: string): Promise<string> {
  return fetch(uri).then((response) => response.blob()).then((blob) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => { const value = String(reader.result || ''); const comma = value.indexOf(','); resolve(comma >= 0 ? value.slice(comma + 1) : value); };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  }));
}

export default function IdentifyScreen() {
  const { photoUri } = useLocalSearchParams<{ photoUri?: string }>();
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [result, setResult] = useState<{ name: string; category: string; confidence: number; description: string } | null>(null);
  const [error, setError] = useState('');

  const identify = async () => {
    if (!photoUri) return;
    setStatus('loading'); setError('');
    try {
      const imageBase64 = await toBase64(photoUri);
      const response = await fetch(`${API_URL}/api/identify`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imageBase64, mimeType: 'image/jpeg' }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Identification failed.');
      setResult(data); setStatus('done');
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not identify this photo.'); setStatus('error'); }
  };

  return <View style={styles.container}>
    <View style={styles.topBar}><Pressable style={styles.backButton} onPress={() => router.back()}><Text style={styles.backText}>←</Text></Pressable><View><Text style={styles.eyebrow}>MYBREED</Text><Text style={styles.headerTitle}>IDENTIFICATION</Text></View><View style={styles.placeholder} /></View>
    <View style={styles.photoWrap}>{photoUri ? <Image source={{ uri: photoUri }} style={styles.photo} resizeMode="cover" /> : <View style={styles.empty}><Text style={styles.emptyText}>No discovery photo</Text></View>}<View style={styles.photoBadge}><Text style={styles.photoBadgeText}>YOUR PHOTO</Text></View></View>
    <View style={styles.resultPanel}>
      {status === 'loading' ? <><View style={styles.analyzingRow}><View style={styles.dot} /><Text style={styles.analyzingText}>Analyzing your discovery…</Text></View><Text style={styles.resultTitle}>Looking closely.</Text><Text style={styles.resultText}>Checking the photographed subject with Mybreed AI.</Text></> : result ? <><Text style={styles.resultLabel}>AI IDENTIFICATION</Text><Text style={styles.resultTitle}>{result.name}</Text><Text style={styles.category}>{result.category}</Text><Text style={styles.resultText}>{result.description}</Text><View style={styles.confidence}><Text style={styles.confidenceText}>{result.confidence}% confidence</Text></View><Pressable style={styles.addButton} onPress={() => {}}><Text style={styles.addButtonText}>Add Discovery</Text></Pressable></> : <><Text style={styles.resultLabel}>AI IDENTIFICATION</Text><Text style={styles.resultTitle}>What did you find?</Text><Text style={styles.resultText}>Mybreed analyzes your actual photograph. It won't invent a creature you didn't photograph.</Text>{status === 'error' && <View style={styles.errorCard}><Text style={styles.errorText}>{error}</Text></View>}<Pressable style={styles.addButton} onPress={identify}><Text style={styles.addButtonText}>Identify with AI →</Text></Pressable></>}
    </View>
  </View>;
}

const styles = StyleSheet.create({container:{flex:1,backgroundColor:'#111510'},topBar:{paddingTop:58,paddingHorizontal:20,paddingBottom:14,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},backButton:{width:44,height:44,borderRadius:22,backgroundColor:'rgba(255,255,255,0.12)',alignItems:'center',justifyContent:'center'},backText:{color:'#FFF',fontSize:25},placeholder:{width:44,height:44},eyebrow:{textAlign:'center',color:'#BFC7B9',fontSize:9,fontWeight:'800',letterSpacing:2.5},headerTitle:{textAlign:'center',color:'#FFF',fontSize:15,fontWeight:'800',letterSpacing:1},photoWrap:{flex:1,marginHorizontal:12,borderRadius:30,overflow:'hidden',position:'relative'},photo:{width:'100%',height:'100%'},empty:{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#20251F'},emptyText:{color:'#C8CEC5'},photoBadge:{position:'absolute',top:18,left:18,paddingHorizontal:12,paddingVertical:8,borderRadius:16,backgroundColor:'rgba(0,0,0,0.55)'},photoBadgeText:{color:'#FFF',fontSize:10,fontWeight:'800',letterSpacing:1.5},resultPanel:{minHeight:275,paddingHorizontal:24,paddingTop:18,paddingBottom:24},analyzingRow:{flexDirection:'row',alignItems:'center'},dot:{width:9,height:9,borderRadius:5,backgroundColor:'#D9E1D3',marginRight:9},analyzingText:{color:'#D9E1D3',fontSize:13,fontWeight:'700'},resultLabel:{color:'#AAB5A4',fontSize:10,fontWeight:'800',letterSpacing:2},resultTitle:{marginTop:6,color:'#FFF',fontSize:30,lineHeight:36,fontWeight:'800'},category:{marginTop:2,color:'#C8CEC5',fontSize:15,fontWeight:'600'},resultText:{marginTop:8,color:'#C8CEC5',fontSize:13,lineHeight:19},confidence:{marginTop:12},confidenceText:{color:'#D9E1D3',fontSize:13,fontWeight:'700'},errorCard:{marginTop:12,padding:12,borderRadius:15,backgroundColor:'#2A211E'},errorText:{color:'#F0C7BC',fontSize:12,lineHeight:18},addButton:{marginTop:18,minHeight:54,borderRadius:17,backgroundColor:'#FFF',alignItems:'center',justifyContent:'center'},addButtonText:{color:'#182018',fontSize:16,fontWeight:'800'}});
