import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function PasswordInput({ value, onChangeText, placeholder = "請輸入密碼" }) {
  const [isSecure, setIsSecure] = useState(true);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={isSecure}
        autoCapitalize="none"
      />
      <TouchableOpacity 
        style={styles.toggleBtn} 
        onPress={() => setIsSecure(!isSecure)}
        activeOpacity={0.7}
      >
        <Text style={styles.btnText}>{isSecure ? "顯示" : "隱藏"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    marginVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    height: 48,
    width: '100%',
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  toggleBtn: {
    padding: 6,
  },
  btnText: {
    color: '#2563EB',
    fontWeight: '600',
    fontSize: 14,
  },
});