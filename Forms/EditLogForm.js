import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Button,
  Pressable,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import { Formik } from "formik";
import UpdateContext from "../contexts/update-context";

export default function EditLogForm({ fishLog, setIsEditing, navigation }) {
  //State for the modal
  const  [location, setLocation] = useState(fishLog.location);
  const [date, setDate] = useState(fishLog.date);
  const [img, setImg] = useState(fishLog.img);
  const [baitList, setBaitList] = useState(fishLog.bait);
  const [fishlist, setFishlist] = useState(fishLog.fish);
  const [species, setSpecies] = useState("");
  const [length, setLength] = useState("");
  const [bait, setBait] = useState("");
  const ctx = useContext(UpdateContext);

  const addFish = (e) => {
    e.preventDefault();
    const fish = { species: species, length: length ? length : "-" };
    if (fish.species !== "" && fish.species !== "") {
      setFishlist([...fishlist, fish]);
      setSpecies("");
      setLength("");
    }
  };

  const addBait = (e) => {
    e.preventDefault();
    if(bait !== "" && bait !== " "){
    setBaitList([...baitList, bait]);
    setBait("");
    }
  };

  return (
    <SafeAreaView  style={styles.newTripContainer} >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss;
        }}
      >
        <View style={styles.inner}>
          <Text style={styles.pageTitle}>Edit Fishing Log</Text>
          <Formik
            initialValues={{
              location: location,
              date: date,
              img: img,
              
            }}
            onSubmit={(values) => {
              const fishingLog = {
                location: location,
                date: date,
                img: img,
                bait: baitList,
                fish: fishlist,
                plannedTrip:
                  Date(new Date(date)) > Date(new Date()) ? true : false,
              };

              fetch(`https://myfly-fishing-api.herokuapp.com/${fishLog["_id"]}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(fishingLog),
              })
              .then(() => {
                ctx.updated = true;
                navigation.getParam("loadApp")();
                navigation.goBack();
                
              })
              .catch((err) => console.log(err));

              setIsEditing(false);
            }}
          >
            {(props) => {
              return (
                <View style={styles.formInputs}>
                  <View style={styles.formGroup}>
                    <Text style={styles.smallHeader}>{"\n"}Trip Details</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Location"
                      onChangeText={(text) => setLocation(text)}
                      value={location}
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Date"
                      onChangeText={(text) => setDate(text)}
                      multiline={true}
                      editable={true}
                      dataDetectorTypes="calendarEvent"
                      value={date}
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Image"
                      onChangeText={(text) => setImg(text)}
                      value={img}
                    />
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.smallHeader}>{"\n"}Add a fish</Text>
                    <View>
                      {fishlist?.length > 0 &&
                        fishlist.map((item, index) => {
                          return (
                            <View key={index} style={styles.formListItem}>
                              <Text key={index}>
                                {item.species} - {item.length}"
                              </Text>
                              <Button
                                title="Remove"
                                onPress={() => {
                                  setFishlist(
                                    fishlist.filter((fish) => fish !== item)
                                  );
                                }}
                              />
                            </View>
                          );
                        })}
                    </View>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Species"
                      autoCapitalize="words"
                      value={species}
                      onChangeText={(text) => {setSpecies(text);}}
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Length"
                      value={length}
                      onChangeText={(text) => setLength(text)}
                      keyboardType="numeric"
                    />
                    <Button title="Add Fish" onPress={addFish} />
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.smallHeader}>{"\n"}Add your bait</Text>
                    {baitList?.length > 0 &&
                      baitList.map((item, index) => {
                        return (
                          <View key={index} style={styles.formListItem}>
                            <Text>{item}</Text>
                            <Button
                              title="Remove"
                              onPress={() => {
                                setBaitList(
                                  baitList.filter((bait) => bait !== item)
                                );
                              }}
                            />
                          </View>
                        );
                      })}
                    <TextInput
                      style={styles.textInput}
                      placeholder="Bait"
                      value={bait}
                      onChangeText={(text) => setBait(text)}
                    />
                    <Button title="Add Bait" onPress={addBait} />
                  </View>
                  <View style={styles.ButtonGroup}>
                    <Pressable
                      style={styles.submitButton}
                      onPress={() => {
                        props.handleSubmit();
                      }}
                    >
                      <Text>Submit</Text>
                    </Pressable>
                    <Pressable
                      style={styles.submitButton}
                      onPress={() => {
                        setIsEditing(false);
                      }}
                    >
                      <Text>Cancel</Text>
                    </Pressable>
                  </View>
                </View>
              );
            }}
            
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inner: {
    paddingBottom: 40,
    flex: 1,
    justifyContent: "center",
  },
  formInputs: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  smallHeader: {
    fontSize: 20,
    color: "#fff",
    marginLeft: 10,
    // margin: 10,
  },
  formGroup: {
    backgroundColor: "#d4d4d4",
    borderRadius: 20,
    margin: 10,
  },
  pageTitle: {
    margin: 20,
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  formListItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    padding: 5,
    paddingLeft: 20,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
  },
  newTripContainer: {
    display: "flex",
    // flex: 1,
    flexDirection: "column",
    //   justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7B61FF",
    margin: 20,
    marginTop: 140,
    borderRadius: 20,
    height: "80%",
    padding: 20,
    paddingBottom: 40,
  },
  ButtonGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }
});
