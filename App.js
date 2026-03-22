import React from "react";
import { Provider } from "react-redux";
import { SafeAreaView } from "react-native";

import { store } from "./src/redux/store"; // ✅ make sure file name is store.js
import Navigation from "./src/navigation/AppNavigator";   // ✅ make sure navigation.js exists

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <Navigation />
      </SafeAreaView>
    </Provider>
  );
}