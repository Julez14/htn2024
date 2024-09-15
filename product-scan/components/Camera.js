import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import axios from "axios";
import { OPENAI_API_KEY } from "@env";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useMutation } from "convex/react";

export default function Camera({ navigation }) {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const existingData = useQuery(api.dataGet.get); // Retrieve the existing data
  const addDataMutation = useMutation(api.dataPut.addData); // Mutation hook for adding data

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleCapture = async () => {
    setIsLoading(true);
    try {
      const data = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.5,
        exif: false,
      });
      setImage(data);
      const imageText = await extractText(data);
      getDescriptions(imageText, data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDescriptions = async (text, imageData) => {
    const chatGptResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Describe what each of the following ingredients do. ${text}
              Provide me a response in the following format without any other text.
              INGREDIENT: DESCRIPTION. Place each ingredient on a new line. Do not
              insert an empty line after each new ingredient.`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const descriptions = chatGptResponse.data.choices[0].message.content;
    const ingedientsJSON = organizeResponse(descriptions);
    console.log(ingedientsJSON);
    updateData(ingedientsJSON, imageData);
  };

  function organizeResponse(text) {
    console.log("Text: \n" + text);
    const ingredientsArray = text
      .trim()
      .split("\n")
      .map((line) => {
        const [name, ...description] = line.split(": ");
        return {
          name: name.trim(),
          description: description.join(": ").trim(),
        };
      });

    return ingredientsArray.filter(
      (item) => item.name !== "" && item.description !== ""
    );
  }

  const extractText = async (file) => {
    try {
      console.log("uploading image...");
      const chatGptResponse = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Extract the text from this image. Only respond with the extracted text.",
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:image/jpg;base64,${file.base64}`,
                  },
                },
              ],
            },
          ],
          max_tokens: 300,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Extracted Text: ");
      console.log(chatGptResponse.data.choices[0].message.content);
      return chatGptResponse.data.choices[0].message.content;
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const updateData = async (newIngredients, imageData) => {
    // Ensure image is not null before proceeding
    if (!imageData) {
      console.error("Image is not available.");
      return;
    }

    try {
      console.log("Existing Data:", existingData);
      // If existingData is not null or undefined, use it directly; otherwise, initialize with an empty structure
      const updatedData = existingData ? existingData : [];

      // Create the new entry
      const now = new Date();
      const formattedDateTime = now
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      const newEntry = {
        key: updatedData.length, // Increment the key based on the length of the data array
        name: "",
        brand: "",
        time: formattedDateTime,
        ingredients: newIngredients, // This is passed as an argument
        img: imageData.uri,
      };

      // Call the mutation to insert the new data
      await addDataMutation(newEntry); // Use the mutation hook to add data
      console.log("Data added to Convex!");

      // Navigate to Scan Info page
      navigation.navigate("Scan Info", {
        name: newEntry.name,
        brand: newEntry.brand,
        time: newEntry.time,
        ingredients: newEntry.ingredients,
        img: newEntry.img,
      });
    } catch (error) {
      console.error("Error appending data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        {image && (
          <Image style={styles.imageOverlay} source={{ uri: image.uri }} />
        )}
      </CameraView>
      <View style={styles.buttonContainer}>
        <Button
          title={"Flip Camera"}
          style={styles.button}
          onPress={toggleCameraFacing}
        />
        <Button
          title={"Capture"}
          style={styles.button}
          onPress={handleCapture}
        />
      </View>

      {/* Loading Screen */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{ color: "white" }}>Loading...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: semi-transparent background
    zIndex: 1, // Ensure the loading container is above other elements
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 3,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 64,
    justifyContent: "space-evenly",
  },
  button: {},
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
});
