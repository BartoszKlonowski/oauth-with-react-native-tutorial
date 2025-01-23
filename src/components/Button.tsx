import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  onPress: () => void;
  title: string;
}

export const Button = ({onPress, title}: Props) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <View style={styles.buttonContent}>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 100,
    height: 30,
    borderWidth: 1,
    borderColor: "#FFAABB",
    justifyContent: "center",
    alignContent: "center"
  },
  buttonContent: {
    justifyContent: "center",
    alignItems: "center"
  }
})
