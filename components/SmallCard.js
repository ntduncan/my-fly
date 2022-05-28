import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export function SmallCard({ children, title, content }) {
    return (
        <View style={styles.smallCardContainer}>
                  <View style={styles.title}>
        <Text>{title}</Text>
      </View>
      <View style={styles.content}>
        <Text>{content}</Text>
      </View>
        </View>
    )
}

const styles = StyleSheet.create({
    smallCardContainer: {
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
        flex: 0,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#CFDCEA", 
        borderRadius: 20,
        width:160,
        height: 100
    },
    title: {
        fontWeight: 600,
        color: "#5248CB",
        height: "20%"
    
      },
      content: {
        fontWeight: 900,
        fontSize: "2em",
        color: "#5248CB",
        height: "80%"
      },
})