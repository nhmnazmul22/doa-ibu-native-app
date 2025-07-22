import LoadingComponents from "@/components/LoadingComponents";
import MotherDoaList from "@/components/MotherDoaList";
import { useTheme } from "@/context/theme/ThemeContext";
import mothers from "@/data/mother.json";
import { Mother, PresetsColors } from "@/types";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const motherImg = require("@/assets/images/doa-banner.jpg");
const width = Dimensions.get("window").width;

export default function MotherProfile() {
  const theme = useTheme();
  const { id } = useLocalSearchParams();
  const [mother, setMother] = useState<Mother>();
  const [loading, setLoading] = useState(true);
  
  const colors = theme?.colors;
  const styles = getStyles(colors);

  useEffect(() => {
    setLoading(true);
    if (id) {
      const mother = mothers.find((m) => m._id.toString() === id);
      setMother(mother);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <LoadingComponents />;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.profilePageHeader}>
          <Image source={motherImg} style={styles.profileImg} />
          <Text style={styles.name}>{mother?.name}</Text>
          <Text style={styles.normalText}>{mother?.email}</Text>
          <View style={styles.followersInfoBox}>
            <View style={styles.followersInfo}>
              <Text style={styles.followingText}>{mother?.followers}</Text>
              <Text style={styles.normalText}>Followers</Text>
            </View>
            <View style={styles.followersInfo}>
              <Text style={styles.followingText}>{mother?.following}</Text>
              <Text style={styles.normalText}>Following</Text>
            </View>
          </View>
        </View>
        <View style={styles.motherDoaList}>
          <Text style={styles.motherDoaListTitle}>Ibu all doas,</Text>
          <MotherDoaList doas={mother?.Doas || []} />
        </View>
      </View>
    </ScrollView>
  );
}

const getStyles = (colors: PresetsColors | undefined) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      width: width * 0.9,
    },
    profilePageHeader: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    profileImg: {
      width: 150,
      height: 150,
      borderRadius: 100,
      marginBottom: 10,
    },
    normalText: {
      fontFamily: "Nunito",
      fontSize: 16,
      color: colors?.darkText,
      marginBottom: 10,
    },
    name: {
      fontFamily: "Nunito",
      fontSize: 20,
      color: colors?.primary,
      fontWeight: "bold",
    },
    followersInfoBox: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
      width: width * 0.6,
    },
    followersInfo: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    followingText: {
      fontFamily: "Nunito",
      fontSize: 20,
      color: colors?.primary,
    },
    motherDoaList: {
      marginTop: 20,
    },
    motherDoaListTitle: {
      fontFamily: "Nunito",
      fontSize: 20,
      color: colors?.darkText,
      fontWeight: "bold",
      marginBottom: 10,
    },
  });
