import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  SectionList,
} from "react-native";

export function DetailCard({ location, fish, img, bait, date, plannedTrip }) {
  const [catchHidden, setCatchHidden] = useState(false);
  const [imgProvided, setImgProvided] = useState(img !== "Image" ? true : false);

  return (
    <Pressable
      onPress={() => {
        setCatchHidden(!catchHidden);
        console.log(catchHidden);
      }}
    >
      <View style={[styles.detailCardContainer, plannedTrip?styles.smallPaddig:null]}>
        <View style={styles.mainContent}>
          {!plannedTrip && imgProvided && <Image
            source={{
              uri: img ,
            }}
            style={styles.image}
          />}
          {!imgProvided && <Image 
          source={require("../assets/images/noImage.png")}
          style={styles.image}
          />}

          <View style={styles.cardCenter}>
            <Text style={styles.headerText}>{location}</Text>
            <Text style={[styles.headerText, styles.lightText]}>{date}</Text>
          </View>
          {!plannedTrip && <View>
            <Text style={styles.quantity}>{fish.length}</Text>
          </View>}
        </View>
        {catchHidden && !plannedTrip &&  (
          <View style={styles.catchData}>
            <View>
              <Text style={[styles.headerText, styles.lightText]}>Fish:</Text>
              <FlatList
                data={fish}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                  <Text style={styles.bodyText}>
                    {item.species} - {item.length}"
                  </Text>
                )}
              />
            </View>

            <View>
              <Text style={[styles.headerText, styles.lightText]}>Bait:</Text>
              <FlatList
                data={bait}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                  <Text style={styles.bodyText}>{item},</Text>
                )}
              />
            </View>
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
  }
});
