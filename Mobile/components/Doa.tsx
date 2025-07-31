import { useTheme } from "@/context/theme/ThemeContext";
import { PresetsColors } from "@/types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface DoaType {
  _id: string;
  thumbnail: string;
  title: string;
  shortDes: string;
}

export default function Doa({ _id, thumbnail, title, shortDes }: DoaType) {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);
  return (
    <View>
      <View style={styles.thumbnail}>
        {!thumbnail ? (
          <Image source={require("../assets/images/doa-bg.jpg")} />
        ) : (
          <Image source={{ uri: thumbnail }} width={140} height={180} />
        )}

        <View style={styles.playIcon}>
          <Link href={`/prayers/${_id}`}>
            <MaterialIcons
              name="play-circle"
              size={40}
              color={colors?.primary}
            />
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

const getStyles = (colors: PresetsColors | undefined) =>
  StyleSheet.create({
    thumbnail: {
      position: "relative",
      height: 185,
    },
    playIcon: {
      position: "absolute",
      bottom: -10,
      left: 110,
      backgroundColor: colors?.bodyBackground,
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
      color: colors?.darkText,
    },
    contentDes: {
      fontFamily: "Nunito",
      fontSize: 16,
      fontWeight: 400,
      color: colors?.darkText,
    },
  });
