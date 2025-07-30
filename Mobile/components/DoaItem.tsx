import { useTheme } from "@/context/theme/ThemeContext";
import { useUserInfo } from "@/context/user/userContext";
import { formatTime } from "@/lib";
import api from "@/lib/config/axios";
import { AppDispatch } from "@/store";
import { fetchDoas } from "@/store/doasSlice";
import { PresetsColors } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

interface DoaItemType {
  _id: string;
  thumbnail: string;
  title: string;
  shortDes: string;
  favoriteUsers: [string];
  duration: string;
}

export default function DoaItem({
  _id,
  title,
  shortDes,
  favoriteUsers,
  duration,
}: DoaItemType) {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);
  const userContext = useUserInfo();
  const dispatch = useDispatch<AppDispatch>();

  const handelLoved = async () => {
    try {
      const body = {
        userId: userContext?.user._id,
      };
      const res = await api.put(`/love-doa/${_id}`, body);
      if (res.status === 201) {
        dispatch(fetchDoas("uploaded"));
        Toast.show({
          type: "success",
          text1: "Thanks, for loved this doa",
          position: "bottom",
          visibilityTime: 2000,
        });
        return;
      }
    } catch (err) {
      console.error(err);
      Toast.show({
        type: "error",
        text1: "Loved added filed",
        position: "bottom",
        visibilityTime: 2000,
      });
    } finally {
    }
  };

  const isFavorite = favoriteUsers.includes(userContext?.user._id);

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
      <Text style={styles.doaDes}>{formatTime(Number(duration) * 1000)}</Text>
      <View>
        {isFavorite ? (
          <Pressable>
            <AntDesign name="heart" size={24} color={colors?.primary} />
          </Pressable>
        ) : (
          <Pressable onPress={handelLoved}>
            <AntDesign name="hearto" size={24} color={colors?.primary} />
          </Pressable>
        )}
      </View>
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
