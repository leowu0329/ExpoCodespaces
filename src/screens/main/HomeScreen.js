import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { user, token, refreshToken } = useContext(AuthContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcomeText}>歡迎回來！</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>個人帳號狀態</Text>
        <Text style={styles.infoText}>Email: {user?.email}</Text>
        <Text style={styles.infoText}>
          信箱驗證狀態: {user?.emailVerified ? '已驗證 ✅' : '未驗證 ❌'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Token 資訊 (Firebase ID Token)</Text>
        <Text style={styles.tokenText} numberOfLines={4} selectTextOnPress>
          {token || '載入 Token 中...'}
        </Text>
        <TouchableOpacity style={styles.refreshBtn} onPress={refreshToken}>
          <Text style={styles.refreshBtnText}>刷新 Token</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.drawerTriggerBtn} 
        onPress={() => navigation.openDrawer()}
      >
        <Text style={styles.drawerTriggerText}>👈 滑開或點擊打開側邊欄選單</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#F3F4F6' },
  welcomeText: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#1F2937' },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#374151', marginBottom: 8 },
  infoText: { fontSize: 14, color: '#4B5563', marginVertical: 4 },
  tokenText: { fontSize: 12, color: '#6B7280', backgroundColor: '#F9FAFB', padding: 8, borderRadius: 6, fontFamily: 'monospace' },
  refreshBtn: { marginTop: 10, alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#E0E7FF', borderRadius: 6 },
  refreshBtnText: { color: '#4338CA', fontSize: 12, fontWeight: 'bold' },
  drawerTriggerBtn: { marginTop: 10, padding: 16, backgroundColor: '#2563EB', borderRadius: 8, alignItems: 'center' },
  drawerTriggerText: { color: '#FFF', fontWeight: 'bold' },
});