import React from 'react';
import AppRoutes from './src/Config/AppRoutes';
import { NativeBaseProvider } from 'native-base';


function App() {
  return (
    <NativeBaseProvider>
      <AppRoutes />
    </NativeBaseProvider>
  );
}



export default App;