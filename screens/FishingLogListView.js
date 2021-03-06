import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
} from "react-native";
import { DetailCard } from "../components/DetailCard";
import { NewLogForm } from "../Forms/NewLogForm";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import EditLogForm from "../Forms/EditLogForm";
import UpdateContext from "../contexts/update-context";

export function FishingLogListView({ navigation }) {
  const ctx = useContext(UpdateContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState({});
  const [listToggle, setListToggle] = useState(false);
  const [buttonTitle, setButtonTitle] = useState("View Planned List");
  const [id, setId] = useState(0);

  const handleDeleteRequest = () => {
    // fetch(`https://myfly-fishing-api.herokuapp.com/${id}`, {
    //   method: "DELETE",
    // })
    // .then(() => {
    //   setId(0);
    // })
    // .catch((error) => {
    //   console.log("oops");
    // });
    navigation.getParam("loadApp")();
    navigation.goBack();
  };

  const [fishingLogs, setFishingLogs] = useState(
    <FlatList
      data={navigation.getParam("trips")}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) =>
        item?.plannedTrip === false && (
          <DetailCard
            trip={item}
            setEditItem={setEditItem}
            setIsEditing={setIsEditing}
            handleDeleteRequest={handleDeleteRequest}
            setId={setId}
          />
        )
      }
      listKey={(item, index) => item + index}
    />
  );

  const toggle = () => {
    if (!listToggle) {
      setFishingLogs(
        <FlatList
          data={navigation.getParam("trips")}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) =>
            item?.plannedTrip === false && (
              <DetailCard
                trip={item}
                setEditItem={setEditItem}
                setIsEditing={setIsEditing}
                handleDeleteRequest={handleDeleteRequest}
                setId={setId}
              />
            )
          }
          listKey={(item, index) => item + index}
        />
      );
      setButtonTitle("View Planned List");
    } else {
      setFishingLogs(
        <FlatList
          data={navigation.getParam("plannedTrips")}
          renderItem={({ item }) =>
          item?.plannedTrip === true && (
            <DetailCard
            trip={item}
            setEditItem={setEditItem}
            setIsEditing={setIsEditing}
            handleDeleteRequest={handleDeleteRequest}
            setId={setId}
            />
            )
          }
          listKey={(item, index) => item + index}
        />
      );

      setButtonTitle("View Fishing Logs");
    }
    setListToggle(!listToggle);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditing}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setIsEditing(false);
        }}
      >
        <ScrollView>
          <EditLogForm
            setIsEditing={setIsEditing}
            fishLog={editItem}
            navigation={navigation}
          />
        </ScrollView>
      </Modal>
      
        <View>
          <Pressable onPress={() => {navigation.navigate("AddNewLogView")}}>
            <Text style={[styles.toggleButton, styles.addButton]}>
              Add New Log
            </Text>
          </Pressable>
          <Pressable onPress={toggle}>
            <Text style={styles.toggleButton}>{buttonTitle}</Text>
          </Pressable>
        </View>
        <ScrollView>
          {fishingLogs}
          <View style={styles.buffer}></View>
        </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5248CB",
    width: "100%",
    height: "100%",
    padding: (20, 10, 10, 10),
    opacity: 67,
    marginBottom: 50,
  },
  toggleButton: {
    color: "#333",
    backgroundColor: "#D4D4D4",
    fontSize: 20,
    textAlign: "center",
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
  addButton: {
    color: "#fff",
    backgroundColor: "#7B61FF",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  // listView: {
  //   height: 300,
  // },
  buffer: {
    height: 120,
  },
});
