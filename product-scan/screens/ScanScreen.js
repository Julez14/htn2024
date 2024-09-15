import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import React, { useEffect, useState } from "react";
import Camera from "../components/Camera";

export default function ScanScreen(props) {
  return (
    <View style={styles.container}>
      <Camera navigation={props.navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#342E37",
  },
});
