import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';
import Messages from '../../components/Messages';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      setMsg({ type: 'error', text: '請輸入電子信箱' });
      return;
    }

    setLoading(true);
    setMsg({ type: '', text: '' });

    try {
      await sendPasswordResetEmail(auth, email);
      setMsg({ type: 'success', text: '重設密碼連結已發送至您的信箱，請查收' });
    } catch (error) {
      setMsg({ type: 'error', text: '發送失敗：' + error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>忘記密碼</Text>
      <Text style={styles.subtitle}>請輸入您註冊的 Email，系統將寄送重設密碼連結給您。</Text>

      <Messages type={msg.type} message={msg.text} />

      <TextInput
        style={styles.input}
        placeholder="電子信箱"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.submitBtn} onPress={handleResetPassword} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.submitText}>發送重設信</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkBtn} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>返回登入</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#F9FAFB' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#111827', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#6B7280', textAlign: 'center', marginBottom: 20 },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 8,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  submitBtn: {
    backgroundColor: '#2563EB',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  submitText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  linkBtn: { marginTop: 20, alignItems: 'center' },
  linkText: { color: '#4B5563', fontSize: 14 },
});