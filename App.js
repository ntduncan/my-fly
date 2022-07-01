import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Pressable, Modal, SafeAreaView } from "react-native";
import { useState } from "react";
import  Dashboard  from './screens/Dashboard';
import Navigator from "./routes/homeStack";

export default function App() {

  

  return (
    <SafeAreaView style={styles.container}>
      <Navigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
 
 });
