import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function LargeCard({ children, title, content }) {
  return (
    <View style={styles.largeCardContainer}>
      <Text style={styles.title}>{title}</Text>

      <View>
        <Text style={styles.content}>{content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  largeCardContainer: {
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
    flex: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CFDCEA",
    borderRadius: 20,
    width: 160,
    height: 160,
    paddingTop: 25,
    marginBottom: 40,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#5248CB",
    height: "20%",
  },
  content: {
    fontWeight: "600",
    fontSize: 30,
    color: "#5248CB",
    height: "80%",
    textAlign: "center",
    marginTop: 20,
  },
});
