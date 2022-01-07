import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import AppRoutes from './src/Config/AppRoutes';
import { NativeBaseProvider, Box } from 'native-base';
import QRCode from 'react-native-qrcode-svg';


function App() {
  return (
    <NativeBaseProvider>
          <AppRoutes />
    </NativeBaseProvider>
  );
}



export default App;