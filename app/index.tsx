import React from "react";
import { SafeAreaView } from "react-native";
import InventoryList from "./components/InventoryList";

export default function App() {
  return (
    <SafeAreaView>
      <InventoryList items={[]}/>
    </SafeAreaView>
  );
}
