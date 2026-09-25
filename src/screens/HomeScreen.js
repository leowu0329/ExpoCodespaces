// src/screens/HomeScreen.js
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { 
  Card, 
  Text, 
  Button, 
  Portal, 
  Dialog,
  IconButton,
  MD3Colors 
} from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card} mode="elevated">
        <Card.Title
          title="圖示與按鈕樣式展示"
          subtitle="React Native Paper & Icons"
          left={(props) => (
            <View style={styles.avatarBg}>
              <Ionicons name="sparkles" size={24} color="#6366f1" />
            </View>
          )}
          right={(props) => (
            <IconButton
              icon="dots-vertical"
              onPress={() => {}}
            />
          )}
        />

        <Card.Content>
          {/* 圖示組合標題 */}
          <View style={styles.sectionHeaderContainer}>
            <MaterialCommunityIcons name="gesture-tap-button" size={20} color="#6366f1" />
            <Text style={styles.sectionTitle}>按鈕樣式 (Button Modes)</Text>
          </View>

          {/* 按鈕樣式展示區塊 */}
          <View style={styles.buttonGroup}>
            {/* 1. 主要實心按鈕 (Contained Button) */}
            <Button 
              mode="contained" 
              onPress={showModal}
              icon="rocket-launch"
              style={styles.primaryBtn}
              labelStyle={styles.btnLabel}
            >
              主要行動按鈕 (Contained)
            </Button>

            {/* 2. 提升式按鈕 (Elevated Button) */}
            <Button 
              mode="elevated" 
              onPress={showModal}
              icon="star"
              buttonColor="#e0e7ff"
              textColor="#4338ca"
              style={styles.elevatedBtn}
            >
              提升感按鈕 (Elevated)
            </Button>

            {/* 3. 外框型按鈕 (Outlined Button) */}
            <Button 
              mode="outlined" 
              onPress={() => {}}
              icon="compass-outline"
              borderColor="#6366f1"
              textColor="#6366f1"
              style={styles.outlinedBtn}
            >
              外框按鈕 (Outlined)
            </Button>

            {/* 4. 文字與圓角圖示按鈕 (Text Button) */}
            <Button 
              mode="text" 
              onPress={() => {}}
              icon="arrow-right"
              contentStyle={{ flexDirection: 'row-reverse' }} // 圖示在右側
              textColor="#4b5563"
            >
              圖示在右側 (Text Button)
            </Button>
          </View>

          <View style={styles.divider} />

          {/* 獨立圓形圖示按鈕列 (Icon Buttons) */}
          <Text style={styles.sectionTitle}>圓形圖示按鈕 (IconButtons)</Text>
          <View style={styles.iconRow}>
            <IconButton
              icon="heart"
              mode="contained-tonal"
              containerColor="#ffe4e6"
              iconColor="#e11d48"
              size={24}
              onPress={() => {}}
            />
            <IconButton
              icon="bookmark"
              mode="contained-tonal"
              containerColor="#fef3c7"
              iconColor="#d97706"
              size={24}
              onPress={() => {}}
            />
            <IconButton
              icon="share-variant"
              mode="contained-tonal"
              containerColor="#e0f2fe"
              iconColor="#0284c7"
              size={24}
              onPress={() => {}}
            />
            <IconButton
              icon="cog"
              mode="contained-tonal"
              containerColor="#f3f4f6"
              iconColor="#4b5563"
              size={24}
              onPress={() => {}}
            />
          </View>
        </Card.Content>
      </Card>

      {/* Modal 彈窗 */}
      <Portal>
        <Dialog visible={visible} onDismiss={hideModal} style={styles.dialog}>
          <Dialog.Icon icon="check-decagram" color="#10b981" size={40} />
          <Dialog.Title style={styles.dialogTitle}>樣式設定成功</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium" style={styles.dialogContent}>
              您已成功套用自訂的按鈕圓角、色彩與圖示樣式！
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode="contained" onPress={hideModal} style={{ borderRadius: 8 }}>
              確定
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    backgroundColor: '#ffffff',
  },
  avatarBg: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'NotoSansTC-Bold',
    fontSize: 16,
    color: '#1e293b',
    marginVertical: 4,
  },
  buttonGroup: {
    gap: 12,
    marginVertical: 8,
  },
  // 自訂按鈕樣式
  primaryBtn: {
    borderRadius: 12,
    backgroundColor: '#6366f1',
    paddingVertical: 4,
  },
  btnLabel: {
    fontFamily: 'NotoSansTC-Bold',
    fontSize: 15,
  },
  elevatedBtn: {
    borderRadius: 12,
    paddingVertical: 2,
  },
  outlinedBtn: {
    borderRadius: 12,
    borderWidth: 1.5,
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 16,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  dialog: {
    borderRadius: 20,
  },
  dialogTitle: {
    textAlign: 'center',
    fontFamily: 'NotoSansTC-Bold',
  },
  dialogContent: {
    textAlign: 'center',
    fontFamily: 'NotoSansTC-Regular',
    color: '#64748b',
  },
});