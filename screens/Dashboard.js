import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  Modal,
  SafeAreaView,
} from "react-native";
import DropdownAlert from 'react-native-dropdownalert';
import { useState, useEffect, useRef } from "react";
import { LargeCard } from "../components/LargeCard";
import { NewTripForm } from "../Forms/NewTripForm";

export function Dashboard({ navigation }) {
  const [trips, setTrips] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [nextTrips, setNextTrips] = useState([]);
  const loadingWheel = 0;
  let dropDownAlertRef = useRef();

  //Set Trips on Initial Render
useEffect(() => {
    fetch("https://myfly-fishing-api.herokuapp.com/")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setTrips(data);
      setNextTrips(trips.filter((trip) => trip?.plannedTrip));
      dropDownAlertRef.alertWithType('success', 'Success', 'Trips Loaded');
    })
    .catch((err) => {
      console.log(err);
    });

  }, []);

  const getTotalFish = () => {
    if (trips?.length > 0) {
      let count = 0;
      trips.forEach((trip) => {
        count += trip.fish.length;
      });
      return count;
    }
  };

  return (
    <View style={styles.container}>
      <DropdownAlert
        ref={(ref) => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <NewTripForm setModalVisible={setModalVisible} dropDownAlertRef={dropDownAlertRef}/>
      </Modal>

      <Text style={styles.headerText}>MyFly Dashboard</Text>

      <View style={styles.dashboardBody}>
        <View style={styles.main}>
          <Pressable onPress={() => navigation.navigate("FishingLogListView", {trips: trips})}>
            <LargeCard title="Total Trips" content={trips?.length} />
          </Pressable>
          <LargeCard title="Total Fish" content={getTotalFish()} />
          <LargeCard title="Next Trip" content="Other content body" />
          <LargeCard title="Last Trip" content="Apr 8th" />

          <Pressable onPress={() => navigation.navigate("AddNewLogView")}>
            <View style={styles.footer}>
              <Text style={[styles.headerText, styles.textLight]}>Log a Trip</Text>
            </View>
          </Pressable>

          <Pressable onPress={() => setModalVisible(true)}>
            <View style={[styles.footer] }>
              <Text style={[styles.headerText, styles.textLight]}>Plan a Trip</Text>
            </View>
          </Pressable>

        </View>
      </View>
    </View>
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
    flex: 0,
    flexDirection: "column-reverse",
    backgroundColor: "#5248CB",
  },

  headerText: {
    marginTop: 20,
    color: "#5248CB",
    fontSize: 35,
    textAlign: "center",
  },

  dashboardBody: {
    width: "100%",
    height: 300,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
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
    backgroundColor: "#5248CB",
    borderRadius: 25,
    height: 100,
    width: 360,
    padding: 10,
    marginBottom: 30,
  },

    textLight: {
        color: "#CFDCEA",
    }
});
