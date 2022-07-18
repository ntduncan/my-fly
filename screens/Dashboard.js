import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  Modal,
} from "react-native";
import { useState, useEffect, useRef, useCallback, useContext } from "react";
import { LargeCard } from "../components/LargeCard";
import { NewTripForm } from "../Forms/NewTripForm";
import DropdownAlert from 'react-native-dropdownalert';
import UpdateContext from "../contexts/update-context";

export function Dashboard({ navigation, dropDownAlertRef }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [trips, setTrips] = useState();
  const [nextTrips, setNextTrips] = useState([]);
  const ctx = useContext(UpdateContext);

  //Set Trips on Initial Render
  useEffect(() => {
    const initTrips = () => {
      loadApp();
    }
    initTrips();
  }, [setTrips]);
  
  const loadApp = useCallback(() => {
    fetch("https://myfly-fishing-api.herokuapp.com/")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dropDownAlertRef.alertWithType('success', 'Success', 'Trips Loaded');
      
      setNextTrips(data.filter((trip) => trip?.plannedTrip));
      setTrips(data.filter((trip) => !trip?.plannedTrip));
      
    }).catch((error) => {
      console.log(error);
    });
  })

  // if(ctx.udpated){ loadApp(); }

  const getDataFromDatabase = () => {

  }

  const getTotalFish = () => {
    if (trips?.length > 0) {
      let count = 0;
      trips.forEach((trip) => {
        count += trip.fish.length;
      });
      return count;
    } else {
      return 0;
    }
  };

  const getNextTripDate = () => {
    if (nextTrips?.length > 0) {      
      var ndate = new Date(nextTrips[0]?.date);
      ndate = ndate.toDateString().split(" ");
      
      return`${ndate[1]} ${ndate[2]}`;

    } 
    return "No Plans";
  }

  const getLastTripDate = () => {
    if (trips?.length > 0) {
      var ldate = new Date(trips[0]?.date);
      ldate = ldate.toDateString().split(" ");
      return`${ldate[1]} ${ldate[2]}`;
    }
    return "No Logs";
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
          loadApp();
        }}
      >
        <NewTripForm setModalVisible={setModalVisible} dropDownAlertRef={dropDownAlertRef}/>
      </Modal>

      <Text style={styles.headerText}>MyFly Dashboard</Text>
      <DropdownAlert
        ref={(ref) => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
      />

      <View style={styles.dashboardBody}>
        <View style={styles.main}>
          <Pressable onPress={() => navigation.navigate("FishingLogListView", {trips: trips, plannedTrips: nextTrips, loadApp: loadApp})}>
            <LargeCard title="Total Trips" content={trips?.length} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("FishingLogListView", {trips: trips, plannedTrips: nextTrips, loadApp: loadApp})}>
            <LargeCard title="Total Fish" content={getTotalFish()} />
          </Pressable>
          <LargeCard title="Next Trip" content={getNextTripDate()} />  
          <LargeCard title="Last Trip" content={getLastTripDate()} />

          <Pressable onPress={() => navigation.navigate("AddNewLogView", {loadApp: loadApp})}>
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
    marginBottom: 10,
  },

    textLight: {
        color: "#CFDCEA",
    }
});
