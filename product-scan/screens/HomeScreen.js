import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Pressable,
} from "react-native";
import ScanCell from "../components/ScanCell";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function HomeScreen(props) {
  // Fetch data directly using useQuery
  const data = useQuery(api.dataGet.get);

  //loading state to handle loading
  const [isFocused, setIsFocused] = useState(false);

  // React to component focus changes
  useFocusEffect(
    React.useCallback(() => {
      setIsFocused(true);
      return () => setIsFocused(false);
    }, [])
  );

  // If the data is still loading or not available, handle that scenario
  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Loading...</Text>
      </View>
    );
  }

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
            onPress={() => {
              props.navigation.navigate("Scan Info", {
                name: item.name,
                brand: item.brand,
                time: item.time,
                ingredients: item.ingredients,
                img: item.img,
              });
            }}
          >
            <ScanCell
              name={item.name}
              brand={item.brand}
              time={item.time}
              img={item.img}
            />
          </Pressable>
        )}
        keyExtractor={(item) => item.key.toString()}
      />

      <Button
        title="Scan"
        onPress={() => props.navigation.navigate("Scan")}
        color={"#3C91E6"}
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
