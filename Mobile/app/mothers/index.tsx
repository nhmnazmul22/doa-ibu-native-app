import mothers from "@/data/mother.json";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
const motherImg = require("@/assets/images/doa-banner.jpg");
const width = Dimensions.get("window").width;




export default function MOtherList() {
 
 
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Favorite Ibu/Mother’s,</Text>
        <View style={styles.mothersList}>
          {mothers.map((mother, index) => (
            <Pressable
              key={mother._id}
              onPress={() => router.push(`/mothers/${mother._id}`)}
            >
              <View style={styles.motherBox}>
                <Image source={motherImg} style={styles.motherProfileImg} />
                <Text style={styles.mothertitle}>{mother.name}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: width * 0.9,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Nunito",
  },
  mothersList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    paddingVertical: 20,
  },
  motherBox: {
    width: width * 0.4,
    height: "auto",
    display: "flex",
    alignItems: "center",
  },
  motherProfileImg: {
    width: 160,
    height: 160,
    borderRadius: 20,
  },
  mothertitle: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Nunito",
    textAlign: "center",
    marginTop: 5,
  },
});
