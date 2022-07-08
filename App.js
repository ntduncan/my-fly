import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Pressable, Modal, SafeAreaView } from "react-native";
import { useState, useRef } from "react";
import  Dashboard  from './screens/Dashboard';
import Navigator from "./routes/homeStack";
import DropdownAlert from 'react-native-dropdownalert';

export default function App() {

  let dropDownAlertRef = useRef();

  return (
    <SafeAreaView style={styles.container}>

      <Navigator dropDownAlertRef={dropDownAlertRef}/>
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
