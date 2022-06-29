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
// import * as Yup from "yup";

export default function NewLogForm() {
  //State for the modal
  const [baitList, setBaitList] = useState([]);
  const [fishlist, setFishlist] = useState([]);
  const [species, setSpecies] = useState("");
  const [length, setLength] = useState("");
  const [bait, setBait] = useState("");

  const addFish = (e) => {
    e.preventDefault();

    const fish = { species: species, length: length };
    if(fish.species !== "" && fish.length !== ""){      
      setFishlist([...fishlist, fish]);
      setSpecies("");
      setLength("");
    }
  };

  const addBait = (e) => {
    e.preventDefault();
    //add bait to list
    setBaitList([...baitList, bait]);
    setBait("");
  };

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
                // bait: ["Bait"],
              }}
              onSubmit={(values) => {
                const fishingLog = {
                  location: values.location,
                  date: values.date,
                  img: values.img,
                  bait: baitList,
                  fish: fishlist,
                };

                fetch("https://myfly-fishing-api.herokuapp.com", {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify(fishingLog),
                })
                  .then(() => {
                    setFishlist([]);
                    setBaitList([]);
                    setSpecies("");
                    setLength("");
                    setBait("");
                  })
                  .catch((err) => console.log(err));

                navigator.navigate("Dashboard"); //TODO: Not working
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

                    <View>
                      {fishlist.length > 0 &&
                        fishlist.map((item, index) => {
                         return <Text key={index}>
                            {"\n"}{item.species} - {item.length}"
                          </Text>;
                        })}
                    </View>

                    <TextInput
                      style={styles.textInput}
                      placeholder="Species"
                      autoCapitalize="words"
                      value={species}
                      onChangeText={(text) => {
                        setSpecies(text);
                        console.log(species);
                      }}
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Length"
                      value={length}
                      onChangeText={(text) => setLength(text)}
                      keyboardType="numeric"
                    />
                    <Button title="Add Fish" onPress={addFish} />

                    {baitList.length > 0 &&
                      baitList.map((item) => {
                        return <Text>{item}</Text>;
                      })}
                    <TextInput
                      style={styles.textInput}
                      placeholder="Bait"
                      value={bait}
                      onChangeText={(text) => setBait(text)}
                    />
                    <Button title="Add Bait" onPress={addBait} />
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
