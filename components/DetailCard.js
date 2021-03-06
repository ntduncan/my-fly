import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  SectionList,
  Button,
} from "react-native";


export function DetailCard({
  trip,
  setEditItem,
  setIsEditing,
  handleDeleteRequest,
  setId
}) {
  const [catchHidden, setCatchHidden] = useState(false);
  const [imgProvided, setImgProvided] = useState(
    trip.img !== "Image" ? true : false
  );

  console.log(trip.location, trip["_id"]);

  const deleteTrip = () => {
    console.log("delete trip: ", trip.location, trip["_id"]);
    const url = `https://myfly-fishing-api.herokuapp.com/${trip["_id"]}`
    fetch(url, {
      method: "DELETE",
    })
    .then(() => {
      console.log(url);
      handleDeleteRequest()
    })
    .catch((error) => {
      console.log("oops");
    });
  }

  return (
    <Pressable
      onPress={() => {
        setCatchHidden(!catchHidden);
      }}
    >
      <View style={[styles.detailCardContainer,]}>

        <View style={styles.mainContent}>
          {!trip?.plannedTrip && imgProvided && (
            <Image
              source={{
                uri: trip.img,
              }}
              style={styles.image}
            />
          )}
          {!imgProvided && (
            <Image
              source={require("../assets/images/noImage.png")}
              style={styles.image}
            />
          )}

          <View style={styles.cardCenter}>
            <Text style={styles.headerText}>{trip.location}</Text>
            <Text style={[styles.headerText, styles.lightText]}>{trip.date}</Text>
          </View>
          {!trip?.plannedTrip && (
            <View>
              <Text style={styles.quantity}>{trip.fish.length}</Text>
            </View>
          )}
        </View>

        {catchHidden && !trip?.plannedTrip && (
          <View>
            <View style={styles.catchData}>
              <View>
                <Text style={[styles.headerText, styles.lightText]}>Fish:</Text>
                <FlatList
                  data={trip.fish}
                  keyExtractor={(item, index) => item + index}
                  renderItem={({ item }) => (
                    <Text style={styles.bodyText}>
                      {item.species} - {item.length}"
                    </Text>
                  )}
                  listKey="fishList"
                />
              </View>

              <View>
                <Text style={[styles.headerText, styles.lightText]}>Bait:</Text>
                <FlatList
                  data={trip.bait}
                  keyExtractor={(item, index) => item + index}
                  renderItem={({ item }) => (
                    <Text style={styles.bodyText}>{item},</Text>
                  )}
                  listKey={"fishBait"}
                />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Edit" onPress={() => {
                setEditItem({
                  _id: trip["_id"],
                  location: trip.location,
                  date: trip.date,
                  img: trip.img,
                  bait: trip.bait,
                  fish: trip.fish,
                  plannedTrip: trip.plannedTrip === true ? true : false,
                });
                setIsEditing(true)
              }} />
              <Button title="Delete" onPress={() => {deleteTrip();}} />
            </View>
          </View>
        )}
        {trip?.plannedTrip && (
                      <View style={styles.buttonContainer}>
                      <Button title="Edit" onPress={() => {
                        setEditItem({
                          _id: trip["_id"],
                          location: trip.location,
                          date: trip.date,
                          img: trip.img,
                          bait: trip.bait,
                          fish: trip.fish,
                          plannedTrip: trip.plannedTrip === true ? true : false,
                        });
                        setIsEditing(true)
                      }} />
                      <Button title="Delete" onPress={() => {console.log(trip["_id"]); deleteTrip();}} />
                    </View>
        )}

      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  detailCardContainer: {
    display: "flex",
    flexDirection: "column",
    // width: 400,
    // height: 100,
    overflow: "hidden",
    backgroundColor: "#E0E9F6",
    margin: 10,
    borderRadius: 20,
  },
  mainContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    color: "#7B61FF",
  },
  image: {
    width: 100,
    height: 100,
  },
  cardCenter: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: -10,
    justifyContent: "space-between",
    // alignItems: "center",
  },
  quantity: {
    fontSize: 40,
    fontWeight: "500",
    color: "#7B61FF",
    paddingRight: 30,
  },
  lightText: {
    fontWeight: "200",
  },
  bodyText: {
    fontSize: 20,
  },

  catchData: {
    textAlign: "center",
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  smallPaddig: {
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});
