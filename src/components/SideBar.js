import React, { useState, useContext } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, Modal 
} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { AuthContext } from '../context/AuthContext';

export default function SideBar(props) {
  const { user } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  // 1. 點擊登出按鈕：開啟 Modal
  const handleOpenLogoutModal = () => {
    setModalVisible(true);
  };

  // 2. 選擇「是」：執行登出，AppNavigator 會自動引導回登入頁面
  const handleLogoutConfirm = async () => {
    setModalVisible(false);
    try {
      await signOut(auth);
    } catch (error) {
      console.error("登出失敗:", error);
    }
  };

  // 3. 選擇「否」：關閉 Modal，關閉側邊欄並跳轉至首頁畫面
  const handleLogoutCancel = () => {
    setModalVisible(false);
    props.navigation.closeDrawer(); // 關閉側邊欄
    props.navigation.navigate('Home'); // 跳轉回首頁
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* 側邊欄 Header */}
      <View style={styles.header}>
        <Text style={styles.title}>會員專區</Text>
        <Text style={styles.userEmail}>{user?.email || '使用者'}</Text>
      </View>

      {/* 導向選單 */}
      <View style={styles.menuList}>
        <DrawerItemList {...props} />
      </View>

      {/* 登出按鈕 */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleOpenLogoutModal}>
        <Text style={styles.logoutText}>登出系統</Text>
      </TouchableOpacity>

      {/* 自訂登出確認 Modal 彈跳視窗 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleLogoutCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>登出確認</Text>
            <Text style={styles.modalMessage}>您確定要登出系統嗎？</Text>

            <View style={styles.modalBtnRow}>
              {/* 按鈕：否 */}
              <TouchableOpacity 
                style={[styles.modalBtn, styles.cancelBtn]} 
                onPress={handleLogoutCancel}
              >
                <Text style={styles.cancelBtnText}>否 (返回首頁)</Text>
              </TouchableOpacity>

              {/* 按鈕：是 */}
              <TouchableOpacity 
                style={[styles.modalBtn, styles.confirmBtn]} 
                onPress={handleLogoutConfirm}
              >
                <Text style={styles.confirmBtnText}>是 (登出)</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: 20,
    backgroundColor: '#EFF6FF',
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1E3A8A', marginBottom: 4 },
  userEmail: { fontSize: 14, color: '#374151' },
  menuList: { flex: 1, paddingTop: 10 },
  logoutBtn: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FEF2F2',
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: { color: '#DC2626', fontWeight: 'bold', fontSize: 16 },

  /* Modal 樣式 */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#111827' },
  modalMessage: { fontSize: 14, color: '#4B5563', textAlign: 'center', marginBottom: 20 },
  modalBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalBtn: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cancelBtn: { backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#D1D5DB' },
  confirmBtn: { backgroundColor: '#DC2626' },
  cancelBtnText: { color: '#374151', fontWeight: 'bold', fontSize: 13 },
  confirmBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 13 },
});