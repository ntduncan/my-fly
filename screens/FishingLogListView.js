import React, {useState, useEffect} from "react";
import {StyleSheet, View, Text, FlatList, Pressable} from "react-native";
import {DetailCard} from '../components/DetailCard';

export function FishingLogListView({navigation}) {

  return (
    <View style={styles.container}>
      <FlatList
        // refreshing={true}
        // onRefresh={()=>this.forceUpdate()}
        data={navigation.getParam("trips")}
        renderItem={({item}) => (

                <DetailCard 
                location={item.location}
                img={item.img}
                date={item.date}
                fish={item.fish}
                bait={item.bait}
                />
        )}
      />
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
  }
})