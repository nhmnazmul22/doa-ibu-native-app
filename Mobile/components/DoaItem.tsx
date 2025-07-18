import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
interface DoaItemType {
  _id: string;
  thumbnail: string;
  title: string;
  shortDes: string;
  favorite: boolean;
  duration: string;
}

export default function DoaItem({
  _id,
  title,
  shortDes,
  favorite,
  duration,
}: DoaItemType) {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.playIcon}>
          <Link href={`/prayers/${_id}`}>
            <MaterialIcons name="play-circle" size={48} color="#D26C7A" />
          </Link>
        </View>
        <View>
          <Text style={styles.doaTitle}>{title}</Text>
          <Text style={styles.doaDes}>{shortDes}</Text>
        </View>
      </View>
      <Text style={styles.doaDes}>{duration}</Text>
      <Pressable>
        {favorite ? (
          <Text>
            <AntDesign name="heart" size={24} color="#D26C7A" />
          </Text>
        ) : (
          <Text>
            <AntDesign name="hearto" size={24} color="#D26C7A" />
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 70,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  playIcon: {
    backgroundColor: "#FFF9F5",
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  doaTitle: {
    fontFamily: "Nunito",
    fontSize: 16,
    fontWeight: 700,
  },
  doaDes: {
    fontFamily: "Nunito",
    fontSize: 14,
  },
});
