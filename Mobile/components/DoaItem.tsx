import { useTheme } from "@/context/theme/ThemeContext";
import { formatTime } from "@/lib";
import { PresetsColors } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.playIcon}>
          <Link href={`/prayers/${_id}`}>
            <MaterialIcons
              name="play-circle"
              size={48}
              color={colors?.primary}
            />
          </Link>
        </View>
        <View>
          <Text style={styles.doaTitle}>{title}</Text>
          <Text style={styles.doaDes}>{shortDes}</Text>
        </View>
      </View>
      <Text style={styles.doaDes}>{formatTime(Number(duration))}</Text>
      <Pressable>
        {favorite ? (
          <Text>
            <AntDesign name="heart" size={24} color={colors?.primary} />
          </Text>
        ) : (
          <Text>
            <AntDesign name="hearto" size={24} color={colors?.primary} />
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const getStyles = (colors: PresetsColors | undefined) =>
  StyleSheet.create({
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
      backgroundColor: colors?.bodyBackground,
      borderRadius: 50,
      width: 50,
      height: 50,
    },
    doaTitle: {
      fontFamily: "Nunito",
      fontSize: 16,
      fontWeight: 700,
      color: colors?.darkText,
    },
    doaDes: {
      fontFamily: "Nunito",
      fontSize: 14,
      color: colors?.darkText,
    },
  });
