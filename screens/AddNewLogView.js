import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
} from "react-native";

import NewLogForm from "../Forms/NewLogForm";

export function AddNewLogView({ navigation }) {
  return (
    <SafeAreaView style={styles.newTripContainer}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <NewLogForm navigation={navigation} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  newTripContainer: {
    backgroundColor: "#7B61FF",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    //   justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    paddingBottom: 20,
    flex: 1,
    justifyContent: "space-around",
  },

});
