import React, {useState, useEffect} from "react";
import {StyleSheet, View, Text, FlatList, Pressable} from "react-native";
import {DetailCard} from '../components/DetailCard';

export function FishingLogListView({navigation}) {
  const [listToggle, setListToggle] = useState(false);
  const [buttonTitle, setButtonTitle] = useState('View Planned List');
  const [fishingLogs, setFishingLogs] = useState(
        <FlatList
        data={navigation.getParam("trips")}
        renderItem={({item}) => (

                item?.plannedTrip === false && <DetailCard 
                location={item.location}
                img={item.img}
                date={item.date}
                fish={item.fish}
                bait={item.bait}
                />
        )}
      />);

    const toggle = () => {
      if(!listToggle){
        setFishingLogs(
        <FlatList
          data={navigation.getParam("trips")}
          renderItem={({item}) => (
  
                  item?.plannedTrip === false && <DetailCard 
                  location={item.location}
                  img={item.img}
                  date={item.date}
                  fish={item.fish}
                  bait={item.bait}
                  plannedTrip={item.plannedTrip}
                  />
          )}
        />)
        setButtonTitle('View Planned List');

        } else {
          setFishingLogs(
          <FlatList
          data={navigation.getParam("plannedTrips")}
          renderItem={({item}) => (
  
                  item?.plannedTrip === true && <DetailCard 
                  location={item.location}
                  img={item.img}
                  date={item.date}
                  fish={item.fish}
                  bait={item.bait}
                  plannedTrip={item.plannedTrip}
                  />
          )}
          />)

          setButtonTitle('View Fishing Logs');
        }
        setListToggle(!listToggle);
      }

  return (
    <View>
      <Pressable onPress={toggle}>
        <Text style={styles.toggleButton}>{buttonTitle}</Text>
      </Pressable>
      {fishingLogs}
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
  },
  toggleButton: {
    color: "#fff",
    backgroundColor: "#7B61FF",
    fontSize: 20,
    textAlign: "center",
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
})