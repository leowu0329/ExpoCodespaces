import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../config/firebase';
import PasswordInput from '../../components/PasswordInput';
import Messages from '../../components/Messages';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      setMsg({ type: 'error', text: '請填寫所有欄位' });
      return;
    }
    if (password !== confirmPassword) {
      setMsg({ type: 'error', text: '兩次輸入的密碼不一致' });
      return;
    }

    setLoading(true);
    setMsg({ type: '', text: '' });

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // 發送信箱驗證信
      await sendEmailVerification(userCredential.user);
      navigation.navigate('VerifyEmail');
    } catch (error) {
      setMsg({ type: 'error', text: '註冊失敗：' + error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>註冊帳號</Text>

      <Messages type={msg.type} message={msg.text} />

      <TextInput
        style={styles.input}
        placeholder="電子信箱"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <PasswordInput value={password} onChangeText={setPassword} placeholder="設定密碼" />
      <PasswordInput value={confirmPassword} onChangeText={setConfirmPassword} placeholder="再次確認密碼" />

      <TouchableOpacity style={styles.submitBtn} onPress={handleRegister} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.submitText}>註冊並發送驗證信</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkBtn} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>已有帳號？返回登入</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#F9FAFB' },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 24, color: '#111827' },
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
    backgroundColor: '#059669',
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