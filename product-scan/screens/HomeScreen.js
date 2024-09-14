import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Scans</Text>
      </View>
      <Button title="Scan" />
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
  header: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
  },
});
