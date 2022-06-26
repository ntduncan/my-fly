import React, { useState } from "react";

import {
  StyleSheet,
  View,
  Button,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import axios from "axios";
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";
// import { KeyboardAvoidingView } from "react-native-web";

export default function NewLogForm() {
  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss;
        }}
      >
        <SafeAreaView style={styles.newTripContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
          >
            <Formik
              initialValues={{
                location: "Location",
                date: "Date",
                img: "Image",
                bait: ["Bait"],
              }}
              onSubmit={(values) => {

                  const fishingLog = {
                      "location": values.location,  
                      "date": values.date,
                      "img": values.img,
                      "bait": [values.bait],
                      "fish": [{"species": values.fish.species, "length": values.fish.length}],
                    }
                    
                    fetch("https://myfly-fishing-api.herokuapp.com", {
                        method: "POST",
                        headers: {"content-type": "application/json"},
                        body: JSON.stringify(fishingLog),
                    })
                    .catch(err => console.log(err))
                    
                    navigator.navigate("Dashboard");
              }}

            >
              {(props) => {
                return (
                  <View>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Location"
                      onChangeText={props.handleChange("location")}
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Date"
                      onChangeText={props.handleChange("date")}
                      multiline={true}
                      editable={true}
                      dataDetectorTypes="calendarEvent"
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Image"
                      onChangeText={props.handleChange("img")}
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Species"
                      onChangeText={props.handleChange("fish.species")}
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Length"
                      onChangeText={props.handleChange("fish.length")}
                      keyboardType="numeric"
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Bait"
                      onChangeText={props.handleChange("bait")}
                    />

                    <Pressable
                      style={styles.submitButton}
                      onPress={() => {
                        props.handleSubmit();
                      }}
                    >
                      <Text>Submit</Text>
                    </Pressable>
                  </View>
                );
              }}
            </Formik>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7B61FF",
  },
  newTripContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    //   justifyContent: "center",
    alignItems: "center",
    margin: 20,
    marginTop: 140,
    borderRadius: 20,
    height: "80%",
    padding: 40,
  },
  textInput: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 5,
    height: 40,
    width: 300,
    borderRadius: 10,
  },
  newTripHeader: {
    fontSize: 30,
    color: "#fff",
    margin: 20,
  },
  submitButton: {
    backgroundColor: "#FFF",
    width: 100,
    height: 40,
    borderRadius: 20,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
