import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Messages({ type = 'error', message }) {
  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <View style={[styles.container, isSuccess ? styles.successBg : styles.errorBg]}>
      <Text style={[styles.text, isSuccess ? styles.successText : styles.errorText]}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    width: '100%',
  },
  errorBg: {
    backgroundColor: '#FDE8E8',
    borderColor: '#F8B4B4',
    borderWidth: 1,
  },
  successBg: {
    backgroundColor: '#DEF7EC',
    borderColor: '#31C48D',
    borderWidth: 1,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
  errorText: {
    color: '#9B1C1C',
  },
  successText: {
    color: '#03543F',
  },
});