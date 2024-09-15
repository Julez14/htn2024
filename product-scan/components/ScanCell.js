import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";

export default function ScanCell(props) {
  const handleImageError = (error) => {
    console.error("Error loading image:", error.nativeEvent.error);
  };

  return (
    <View style={styles.scanCell}>
      <View style={styles.scanThumbnailContainer}>
        <Image
          style={styles.scanThumbnail}
          source={{ uri: props.img }}
          onError={handleImageError}
        />
      </View>
      <View style={styles.scanTextContainer}>
        <View style={styles.scanName}>
          <Text style={styles.text}>{props.name}</Text>
        </View>
        <View style={styles.scanBrand}>
          <Text style={styles.text}>{props.brand}</Text>
        </View>
        <View style={styles.scanTime}>
          <Text style={styles.text}>{props.time}</Text>
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
  },
  scanTextContainer: {
    flex: 2,
  },
  scanThumbnail: {
    width: 100,
    height: 100,
    resizeMode: "cover", // adjusts how the image scales
  },
  text: {
    fontSize: 16,
  },
  scanName: {},
  scanBrand: {},
  scanTime: {},
});
