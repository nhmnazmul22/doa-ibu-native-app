import { Doa } from "@/types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link, router } from "expo-router";
import { default as React } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
interface MotherDoaProps {
  doa: Doa;
}

const doaImg = require("@/assets/images/doa-banner.jpg");

export default function MotherDoa({ doa }: MotherDoaProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push(`/prayers/${doa._id}`)}>
        <View style={styles.infoContainer}>
          <Image source={doaImg} style={styles.doaImg} />
          <View>
            <Text style={styles.doaTitle}>{doa.title}</Text>
            <Text style={styles.doaDes}>{doa.shortDes}</Text>
          </View>
        </View>
      </Pressable>
      <Text style={styles.doaDes}>{doa.duration}</Text>
      <View style={styles.playIcon}>
        <Link href={`/prayers/${doa._id}`}>
          <MaterialIcons name="play-circle" size={48} color="#D26C7A" />
        </Link>
      </View>
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
  doaImg: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
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
