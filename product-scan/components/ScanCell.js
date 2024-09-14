import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";

export default function ScanCell(props) {
  return (
    <View style={styles.scanCell}>
      <View style={styles.scanThumbnailContainer}>
        <Image
          style={styles.scanThumbnail}
          source={require("../assets/favicon.png")}
        />
      </View>
      <View style={styles.scanTextContainer}>
        <View style={styles.scanName}>
          <Text style={styles.scanNameText}>{props.name}</Text>
        </View>
        <View style={styles.scanBrand}>
          <Text style={styles.scanBrandText}>{props.brand}</Text>
        </View>
        <View style={styles.scanTime}>
          <Text style={styles.scanTimeText}>{props.time} ago</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scanCell: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  scanThumbnailContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "blue",
  },
  scanTextContainer: {
    flex: 2,
    borderWidth: 1,
    borderColor: "green",
  },
  scanThumbnail: {},
  scanName: {},
  scanBrand: {},
  scanTime: {},
});
