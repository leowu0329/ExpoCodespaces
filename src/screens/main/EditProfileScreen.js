import React, { useState, useContext, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  ScrollView, ActivityIndicator, Modal 
} from 'react-native';
import { doc, onSnapshot, setDoc } from 'firebase/firestore'; // 引入 onSnapshot
import { auth, db } from '../../config/firebase';
import { AuthContext } from '../../context/AuthContext';

export default function EditProfileScreen({ navigation }) {
  const { user } = useContext(AuthContext);

  // 表單欄位狀態
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phone, setPhone] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [factory, setFactory] = useState('');
  const [department, setDepartment] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [role, setRole] = useState('訪客');
  const [address, setAddress] = useState('');

  // 載入狀態
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // 自訂 Modal 彈窗狀態
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('success');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  // 即時監聽 Firestore 資料變動
  useEffect(() => {
    if (!user) return;

    const userDocRef = doc(db, 'users', user.uid);

    // 使用 onSnapshot 建立即時監聽器
    const unsubscribe = onSnapshot(
      userDocRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setName(data.name || '');
          setBirthday(data.birthday || '');
          setPhone(data.phone || '');
          setIdNumber(data.idNumber || '');
          setFactory(data.factory || '');
          setDepartment(data.department || '');
          setJobTitle(data.jobTitle || '');
          setRole(data.role || '訪客');
          setAddress(data.address || '');
        }
        setFetching(false);
      },
      (error) => {
        console.error("即時監聽用戶資料失敗：", error);
        setFetching(false);
      }
    );

    // 當元件卸載 (unmount) 時取消監聽，避免記憶體洩漏
    return () => unsubscribe();
  }, [user]);

  // 顯示 Modal 彈窗
  const showModal = (type, title, message) => {
    setModalType(type);
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  // 關閉 Modal 並在成功時跳轉至首頁
  const handleModalConfirm = () => {
    setModalVisible(false);
    if (modalType === 'success') {
      navigation.navigate('Home');
    }
  };

  // 儲存修改資料
  const handleSaveProfile = async () => {
    if (!user) return;

    setLoading(true);

    try {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        name,
        birthday,
        phone,
        idNumber,
        factory,
        department,
        jobTitle,
        role,
        address,
        updatedAt: new Date()
      }, { merge: true });

      showModal('success', '修改成功', '個人資訊已更新完畢！點擊確定返回首頁。');
    } catch (error) {
      showModal('error', '修改失敗', '儲存資料時發生錯誤：' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>修改個人資訊</Text>

      {/* 帳號名稱 */}
      <Text style={styles.label}>帳號名稱</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="請輸入帳號名稱" />

      {/* 生日 */}
      <Text style={styles.label}>生日 (YYYY-MM-DD)</Text>
      <TextInput style={styles.input} value={birthday} onChangeText={setBirthday} placeholder="例：1990-01-01" />

      {/* 手機 */}
      <Text style={styles.label}>手機號碼</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="請輸入手機號碼" />

      {/* 身分證 */}
      <Text style={styles.label}>身分證字號</Text>
      <TextInput style={styles.input} value={idNumber} onChangeText={setIdNumber} autoCapitalize="characters" placeholder="請輸入身分證字號" />

      {/* 廠別 */}
      <Text style={styles.label}>廠別</Text>
      <TextInput style={styles.input} value={factory} onChangeText={setFactory} placeholder="請輸入廠別" />

      {/* 部門 */}
      <Text style={styles.label}>部門</Text>
      <TextInput style={styles.input} value={department} onChangeText={setDepartment} placeholder="請輸入部門" />

      {/* 職務 */}
      <Text style={styles.label}>職務</Text>
      <TextInput style={styles.input} value={jobTitle} onChangeText={setJobTitle} placeholder="請輸入職務" />

      {/* 權限選擇 */}
      <Text style={styles.label}>權限設定</Text>
      <View style={styles.roleContainer}>
        {['訪客', '一般使用者', '管理者'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.roleOption, role === item && styles.roleSelected]}
            onPress={() => setRole(item)}
          >
            <Text style={[styles.roleText, role === item && styles.roleSelectedText]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 住址 */}
      <Text style={styles.label}>住址</Text>
      <TextInput style={[styles.input, styles.addressInput]} value={address} onChangeText={setAddress} multiline placeholder="請輸入聯絡住址" />

      {/* 儲存按鈕 */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleSaveProfile} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.submitText}>儲存修改</Text>}
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

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#FFF' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#111827' },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginTop: 10, marginBottom: 4 },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F9FAFB',
    fontSize: 16,
  },
  addressInput: { height: 80, textAlignVertical: 'top', paddingTop: 10 },
  roleContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 6 },
  roleOption: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 2,
    backgroundColor: '#F3F4F6',
  },
  roleSelected: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  roleText: { color: '#4B5563', fontWeight: 'bold', fontSize: 13 },
  roleSelectedText: { color: '#FFF' },
  submitBtn: {
    backgroundColor: '#2563EB',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  submitText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },

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