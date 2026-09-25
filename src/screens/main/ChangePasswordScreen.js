import React, { useState } from 'react';
import { 
  View, Text, TouchableOpacity, StyleSheet, 
  ActivityIndicator, Modal 
} from 'react-native';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import PasswordInput from '../../components/PasswordInput';

export default function ChangePasswordScreen() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);

  // 自訂 Modal 狀態管理
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('success'); // 'success' 或 'error'
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  // 顯示 Modal 的輔助函式
  const showModal = (type, title, message) => {
    setModalType(type);
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  // 關閉 Modal 並在成功時執行登出跳轉
  const handleModalConfirm = async () => {
    setModalVisible(false);
    if (modalType === 'success') {
      // 登出後 AppNavigator 會自動切換回 AuthNavigator (登入頁面)
      await signOut(auth);
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      showModal('error', '提示', '請填寫所有密碼欄位');
      return;
    }
    if (newPassword !== confirmPassword) {
      showModal('error', '提示', '新密碼與確認密碼不一致');
      return;
    }

    const currentUser = auth.currentUser;
    if (!currentUser || !currentUser.email) return;

    setLoading(true);

    try {
      // 1. 使用原先密碼建立憑證進行二次驗證 (Re-authentication)
      const credential = EmailAuthProvider.credential(currentUser.email, oldPassword);
      await reauthenticateWithCredential(currentUser, credential);

      // 2. 驗證成功後更新密碼
      await updatePassword(currentUser, newPassword);

      // 3. 修改成功跳出成功 Modal
      showModal('success', '變更成功', '密碼已成功修改！點擊確定將登出並返回登入頁面。');
      
      // 清空欄位
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      let errorMsg = '變更密碼失敗：' + error.message;
      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMsg = '原先密碼輸入錯誤，請重新確認。';
      }
      // 失敗跳出錯誤 Modal
      showModal('error', '變更失敗', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>變更登入密碼</Text>

      <Text style={styles.label}>原先密碼</Text>
      <PasswordInput value={oldPassword} onChangeText={setOldPassword} placeholder="請輸入原先密碼" />

      <Text style={styles.label}>新密碼</Text>
      <PasswordInput value={newPassword} onChangeText={setNewPassword} placeholder="請輸入新密碼" />

      <Text style={styles.label}>確認新密碼</Text>
      <PasswordInput value={confirmPassword} onChangeText={setConfirmPassword} placeholder="請再次輸入新密碼" />

      <TouchableOpacity style={styles.btn} onPress={handleChangePassword} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.btnText}>確認修改密碼</Text>}
      </TouchableOpacity>

      {/* 自訂提示 Modal 彈窗 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalConfirm}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={[
              styles.modalTitle, 
              modalType === 'success' ? styles.successTitle : styles.errorTitle
            ]}>
              {modalTitle}
            </Text>
            
            <Text style={styles.modalMessage}>{modalMessage}</Text>

            <TouchableOpacity 
              style={[
                styles.modalBtn, 
                modalType === 'success' ? styles.successBtn : styles.errorBtn
              ]} 
              onPress={handleModalConfirm}
            >
              <Text style={styles.modalBtnText}>確定</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#111827' },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginTop: 10, marginBottom: 2 },
  btn: { 
    backgroundColor: '#2563EB', 
    height: 48, 
    borderRadius: 8, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 24 
  },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },

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
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  successTitle: { color: '#059669' },
  errorTitle: { color: '#DC2626' },
  modalMessage: { fontSize: 14, color: '#4B5563', textAlign: 'center', marginBottom: 20, lineHeight: 20 },
  modalBtn: {
    width: '100%',
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successBtn: { backgroundColor: '#2563EB' },
  errorBtn: { backgroundColor: '#DC2626' },
  modalBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});