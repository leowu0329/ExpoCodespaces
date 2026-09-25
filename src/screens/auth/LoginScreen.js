import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import PasswordInput from '../../components/PasswordInput';
import Messages from '../../components/Messages';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setMsg({ type: 'error', text: '請輸入 Email 與密碼' });
      return;
    }

    setLoading(true);
    setMsg({ type: '', text: '' });

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setMsg({ type: 'error', text: '登入失敗：' + error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>會員登入</Text>
      
      <Messages type={msg.type} message={msg.text} />

      <TextInput
        style={styles.input}
        placeholder="電子信箱"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <PasswordInput
        value={password}
        onChangeText={setPassword}
        placeholder="密碼"
      />

      <TouchableOpacity 
        style={styles.forgotBtn} 
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        <Text style={styles.forgotText}>忘記密碼？</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.submitBtn} 
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.submitText}>登入</Text>}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.linkBtn} 
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.linkText}>尚未擁有帳號？前往註冊</Text>
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
  forgotBtn: { alignSelf: 'flex-end', marginVertical: 4 },
  forgotText: { color: '#2563EB', fontSize: 14 },
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