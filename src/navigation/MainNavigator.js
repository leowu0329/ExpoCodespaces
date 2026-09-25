import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../screens/main/HomeScreen';
import EditProfileScreen from '../screens/main/EditProfileScreen';
import ChangePasswordScreen from '../screens/main/ChangePasswordScreen';
import SideBar from '../components/SideBar';

const Drawer = createDrawerNavigator();

export default function MainNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <SideBar {...props} />}
      screenOptions={{
        drawerPosition: 'left', // 左側滑開
        headerShown: true,
        headerStyle: { backgroundColor: '#2563EB' },
        headerTintColor: '#FFF',
        drawerActiveTintColor: '#2563EB',
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: '首頁' }} 
      />
      <Drawer.Screen 
        name="EditProfile" 
        component={EditProfileScreen} 
        options={{ title: '修改個人訊息' }} 
      />
      <Drawer.Screen 
        name="ChangePassword" 
        component={ChangePasswordScreen} 
        options={{ title: '變更登入密碼' }} 
      />
    </Drawer.Navigator>
  );
}