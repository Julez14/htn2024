import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Pressable,
} from "react-native";

export default function HomeScreen(props) {
  const data = require("../testData.json");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Scans</Text>
      </View>

      <FlatList
        style={styles.scanList}
        data={data}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              props.navigation.navigate("Scan Info", {
                name: item.name,
                brand: item.brand,
                time: item.time,
                ingredients: item.ingredients,
              })
            }
          >
            <ScanCell name={item.name} brand={item.brand} time={item.time} />
          </Pressable>
        )}
      />

      <Button title="Scan" onPress={() => props.navigation.navigate("Scan")} />
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
