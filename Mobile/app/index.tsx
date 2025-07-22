import DoaList from "@/components/DoaList";
import SliderDoa from "@/components/SliderDoa";
import { useTheme } from "@/context/theme/ThemeContext";
import { PresetsColors } from "@/types";
import { Link } from "expo-router";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

export default function HomePage() {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.greeting}>
          <Text style={styles.greetingTitle}>Good Morning, Mr. Man</Text>
          <Text style={styles.greetingDes}>07/15/2025, 8:00AM</Text>
        </View>
        <View style={styles.quote}>
          <Text style={styles.quoteText}>
            “Anakku, semoga hari ini penuh berkah, sehat, dan selalu dalam
            lindungan Allah.”
          </Text>
        </View>
        <View style={styles.doaCarouselBox}>
          <Text style={styles.doaCarouselTitle}>Favorite Doa Ibu,</Text>
          <View style={styles.horizontalLine}></View>
          <SliderDoa />
        </View>
        <View>
          <View style={styles.doaListsHeader}>
            <View>
              <Text style={styles.doaCarouselTitle}>Playlist,</Text>
              <View style={styles.horizontalLine}></View>
            </View>
            <Link style={styles.seeMoreBtn} href="/prayers">
              See More
            </Link>
          </View>
          <DoaList />
        </View>
      </View>
    </ScrollView>
  );
}

const getStyles = (colors: PresetsColors | undefined) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      width: width * 1,
    },
    greeting: {
      display: "flex",
      flexDirection: "column",
      gap: 5,
      paddingHorizontal: 30,
    },
    greetingTitle: {
      fontFamily: "NunitoBold",
      fontSize: 16,
      fontWeight: 900,
    },
    greetingDes: {
      fontFamily: "Nunito",
      fontSize: 14,
    },
    quote: {
      backgroundColor: colors?.secondary,
      width: width * 0.9,
      marginHorizontal: "auto",
      marginTop: 20,
      borderRadius: 5,
      padding: 10,
    },
    quoteText: {
      textAlign: "center",
      fontFamily: "Nunito",
      fontSize: 16,
    },
    doaCarouselBox: {
      marginTop: 30,
      height: 320,
    },
    doaCarouselTitle: {
      fontFamily: "Nunito",
      fontSize: 20,
      fontWeight: 700,
      paddingHorizontal: 30,
      marginBottom: 5,
    },
    horizontalLine: {
      width: width * 0.25,
      marginBottom: 20,
      height: 5,
      backgroundColor: colors?.primary,
      marginHorizontal: 30,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
    },
    doaListsHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      width: width * 1,
      paddingRight: 30,
    },
    seeMoreBtn: {
      fontFamily: "Nunito",
      fontSize: 14,
      fontWeight: 500,
      textDecorationLine: "underline",
    },
  });
