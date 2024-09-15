import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import React, { useEffect, useState } from "react";
import ScanCell from "../components/ScanCell";

export default function ScanInfoScreen(props) {
  return (
    <View style={styles.container}>
      <ScanCell
        name={props.route.params.name}
        brand={props.route.params.brand}
        time={props.route.params.time}
        img={props.route.params.img}
      />
      <FlatList
        style={styles.list}
        data={props.route.params.ingredients}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <View style={styles.name}>
              <Text style={[styles.text, { fontWeight: "bold" }]}>
                {" "}
                {item.name + ":"}{" "}
              </Text>
            </View>
            <View style={styles.description}>
              <Text style={styles.text}> {item.description} </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#FAFFFD",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  list: {
    flex: 1,
    paddingTop: 10,
  },
  listItem: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  text: {
    fontSize: 18,
  },
  name: {
    flex: 1,
  },
  description: {
    flex: 1,
  },
});
