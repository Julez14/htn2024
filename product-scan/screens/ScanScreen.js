import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <View>
        <Text>this is the scan screen</Text>
      </View>
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
