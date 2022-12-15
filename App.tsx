import 'react-native-gesture-handler';
import React from 'react';
import Navgation from './src/utils/navigation';
import { AppProvider } from './src/context/AppContext';

export default function App() {

  return (
    <>
      <AppProvider>
        <Navgation />
      </AppProvider>
    </>
  );
};