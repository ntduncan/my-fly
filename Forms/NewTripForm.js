import React, {useState} from "react";
import {
  StyleSheet,
  View,
  Button,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  
} from "react-native";

export function NewTripForm({ setModalVisible, dropDownAlertRef}) {
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = () => {

      const newTrip = {
        location: location,
        date: date,
        plannedTrip: true,
      };

      if(location !== "" && date !== ""){
        fetch("https://myfly-fishing-api.herokuapp.com", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newTrip),
        })
          .then((response) => {
            setLocation("");
            setDate("");
            dropDownAlertRef.alertWithType('success', 'Success', response.json());
            setModalVisible(false);
          })
          .catch((err) => dropDownAlertRef.alertWithType('error', 'Error', err));
        }
    }
    
  return (
    <SafeAreaView style={styles.newTripContainer}>
        <Text style={styles.newTripHeader}>New Trip</Text>
      <View>
        <TextInput 
        style={styles.textInput} 
        placeholder="Location"
        value={location}
        onChangeText={(text) => setLocation(text)}
        />
        <TextInput 
        style={styles.textInput} 
        placeholder="Date"
        value={date}
        onChangeText={(text) => setDate(text)}
        />
      </View>
      <Pressable style={styles.submitButton} onPress={() => handleSubmit()}>
        <Text>Submit</Text>
      </Pressable>
      <Button
        title="CANCEL"
        color="#fff"
        onPress={() => {
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  newTripContainer: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
    //   justifyContent: "center",
      alignItems: "center",
    backgroundColor: "#7B61FF",
    margin: 20,
    marginTop: 140,
    borderRadius: 20,
    height: "80%",
    padding: 20,
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
      justifyContent: "center"

  }
});
