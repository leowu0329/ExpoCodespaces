import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, getIdToken } from 'firebase/auth';
import { auth } from '../config/firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 監聽 Firebase 身份驗證狀態變更
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // 取得 JWT Auth Token
        const userToken = await getIdToken(currentUser, true);
        setToken(userToken);
      } else {
        setUser(null);
        setToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 手動更新/重新拉取 Token 的方法
  const refreshToken = async () => {
    if (auth.currentUser) {
      const newToken = await getIdToken(auth.currentUser, true);
      setToken(newToken);
      return newToken;
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};