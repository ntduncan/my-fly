import React, {useState} from "react";
import {
  StyleSheet,
  View,
  Button,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  ActivityIndicator,
  
} from "react-native";

export function NewTripForm({ setModalVisible, dropDownAlertRef}) {
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [checked, setChecked] = useState(false);
    const [search, setSearch] = useState("");
    const [recommendation, setRecommendation] = useState();
    const [isLoading, setIsLoading] = useState(false);

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

    const handleSearch = () => {
      if(search !== ""){
        setIsLoading(true);
        fetch(`https://myfly-fishing-api.herokuapp.com/search/${search.toLowerCase()}`)
          .then((response) => response?.json())
          .then((data) => {
            console.log(data);
            setIsLoading(false);
            if(!data?.message){
              setRecommendation("Recommendation: " + data.location);
            } else {
              setRecommendation(data.message);
            }
          }
        ).catch((err) => console.log(err));
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

        <View style={styles.checkboxContainer}>
          <Text style={styles.paragraphText}>&nbsp;&nbsp;Traget Fish?&nbsp;&nbsp;</Text>
          <Pressable style={styles.checkBox} onPress={() => setChecked(!checked)}>
            {!checked && <Text>&nbsp;</Text>}
            {checked && 
            <Text>&#x2713;</Text>}
          </Pressable>
        </View>
        {checked && <View style={styles.recommendation}>
          <Text style={styles.paragraphText} >What do you want to catch?</Text>
                  <TextInput 
                  style={styles.textInput} 
                  placeholder="Search"
                  value={search}
                  onChangeText={(text) => setSearch(text)}
                  />
                  <Button 
                  title="Search"
                  onPress={()=>handleSearch()}/>

                  { <Text style={styles.paragraphText} >{recommendation}</Text> }
                  {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

          </View>}
        
      </View>
      <Text></Text>
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

  },
  checkBox: {
    backgroundColor: "#fff",
    width: 20,
    height: 20,
    padding: 3,
    borderRadius: 2,
    textAlign: "center",
  },
  checkboxContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  recommendation: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    marginTop: 20,
    backgroundColor: "#d4d4d4",
    borderRadius: 10,
  },
  paragraphText: {
    fontSize: 20,
    color: "#fff",
    margin: 10,
  },
});
