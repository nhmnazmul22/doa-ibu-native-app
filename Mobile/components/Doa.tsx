import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";

interface DoaType {
  _id: string;
  thumbnail: string;
  title: string;
  shortDes: string;
}

export default function Doa({ _id, thumbnail, title, shortDes }: DoaType) {
  return (
    <View>
      <View style={styles.thumbnail}>
        <Image source={require("../assets/images/doa-bg.jpg")} />
        <View style={styles.playIcon}>
          <Link href={`/prayers/${_id}`}>
            <MaterialIcons name="play-circle" size={40} color="#D26C7A" />
          </Link>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentTitle}>{title}</Text>
        <Text style={styles.contentDes}>{shortDes}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    position: "relative",
  },
  playIcon: {
    position: "absolute",
    bottom: -10,
    left: 110,
    backgroundColor: "#FFF9F5",
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  content: {
    marginTop: 10,
  },
  contentTitle: {
    fontFamily: "Nunito",
    fontSize: 18,
    fontWeight: 700,
  },
  contentDes: {
    fontFamily: "Nunito",
    fontSize: 16,
    fontWeight: 400,
  },
});
