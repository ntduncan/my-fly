import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Pressable, Modal, SafeAreaView } from "react-native";
import { useState } from "react";
import { LargeCard } from "./components/LargeCard";
import { SmallCard } from "./components/SmallCard";
import {NewTripForm} from "./Forms/NewTripForm";
import axios from "axios";

export default function App() {
  const [trips, setTrips] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const loadingWheel = 0;

  const getTrips = () => {
    fetch("https://myfly-fishing-api.herokuapp.com/")
      .then((response) => {
        return response.json();
      })
      .then(data => {
        setTrips(data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTotalFish = () => {
    if(trips?.length > 0){
      let count = 0;
      trips.forEach(trip => { count += trip.fish.length})
      return count;
    }
  }

  getTrips(); 

  return (
    <SafeAreaView style={styles.container}>
       <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <NewTripForm setModalVisible={setModalVisible}/>
      </Modal>
      
      <Text style={styles.headerText}>MyFly Dashboard</Text>

      <View style={styles.dashboardBody}>
        <View style={styles.main}>
          <LargeCard title="Total Trips" content={trips?.length} />
          <LargeCard title="Total Fish" content={getTotalFish()} />
          <LargeCard title="Next Trip" content="Other content body" />
          <LargeCard title="Last Trip" content="Apr 8th" />

        <Pressable onPress={() => setModalVisible(true)}>
          <View style={styles.footer}>
            <Text style={styles.headerText}>Plan a Trip</Text>
          </View>
        </Pressable>
        </View>
      </View>
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

  block: {
    width: "100%",
    height: 150,
    // borderRadius: 50,
    // marginLeft: 15,
    // marginTop: -50,
    flex: 0,
    flexDirection: "column-reverse",
    backgroundColor: "#5248CB",
  },
  
  headerText: {
    marginTop: 20,
    color: "#5248CB",
    fontSize: 35,
    textAlign: "center"
  },

  dashboardBody: {
    width: "100%",
    height: 300,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
  },

  main: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingTop: 40,
    height: "50%",
  },

  side: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "cener",
    alignItems: "center",
  },

  bottom: {
    marginTop: 40,
  },

  footer: {
    backgroundColor: "#CFDCEA",
    borderRadius: 25,
    height: 100,
    width: 360,
    padding: 10,
    

  },
});
