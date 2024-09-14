import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ScanCell from "../components/ScanCell";

export default function ScanInfoScreen(props) {
  return (
    <View style={styles.container}>
      <ScanCell
        name={props.route.params.name}
        brand={props.route.params.brand}
        time={props.route.params.time}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#FAF9F6",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});
