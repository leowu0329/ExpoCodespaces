import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../../config/firebase';
import Messages from '../../components/Messages';

export default function VerifyEmailScreen({ navigation }) {
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    if (!auth.currentUser) return;

    setLoading(true);
    try {
      await sendEmailVerification(auth.currentUser);
      setMsg({ type: 'success', text: '驗證信已重新發送！' });
    } catch (error) {
      setMsg({ type: 'error', text: '發送失敗：' + error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>請驗證您的電子信箱</Text>
      <Text style={styles.desc}>
        我們已寄出一封驗證信至您的 Email。請點擊郵件中的連結以完成帳號驗證。
      </Text>

      <Messages type={msg.type} message={msg.text} />

      <TouchableOpacity style={styles.btn} onPress={handleResend} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.btnText}>重新發送驗證信</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkBtn} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>完成驗證後返回登入</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9FAFB' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: '#111827' },
  desc: { fontSize: 14, color: '#4B5563', textAlign: 'center', marginBottom: 20, lineHeight: 20 },
  btn: { backgroundColor: '#2563EB', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, width: '100%', alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  linkBtn: { marginTop: 20 },
  linkText: { color: '#4B5563', fontSize: 14 },
});