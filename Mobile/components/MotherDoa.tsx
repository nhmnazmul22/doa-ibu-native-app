import { useTheme } from "@/context/theme/ThemeContext";
import { formatTime } from "@/lib";
import { Doa, PresetsColors } from "@/types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link, router, usePathname } from "expo-router";
import { default as React, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import api from "@/lib/config/axios";
import Toast from "react-native-toast-message";
interface MotherDoaProps {
  doa: Doa;
}

const doaImg = require("@/assets/images/doa-banner.jpg");

export default function MotherDoa({ doa }: MotherDoaProps) {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const handleDeleteDoa = async () => {
    try {
      setLoading(true);
      const res = await api.delete(`/delete-doa/${doa._id}`);
      if (res.status === 200) {
        Toast.show({
          type: "success",
          text1: "Doa Delete Successful",
          position: "bottom",
          visibilityTime: 2000,
        });
        router.push("/mother-panel/prayers");
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Failed to delete Doa",
        text2: "Please try again later",
        position: "bottom",
        visibilityTime: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() =>
          pathname.includes("/mother-panel")
            ? {}
            : router.push(`/prayers/${doa._id}`)
        }
      >
        <View style={styles.infoContainer}>
          {!doa.thumbnail && <Image source={doaImg} style={styles.doaImg} />}
          {doa.thumbnail && (
            <Image source={{ uri: doa.thumbnail }} style={styles.doaImg} />
          )}
          <View>
            <Text style={styles.doaTitle}>
              {doa.title.length > 30
                ? doa.title.slice(0, 30) + "..."
                : doa.title}
            </Text>
            <Text style={styles.doaDes}>
              {doa.shortDes.length > 30
                ? doa.shortDes.slice(0, 30) + "..."
                : doa.shortDes}
            </Text>
          </View>
        </View>
      </Pressable>
      <Text style={styles.doaDes}>
        {formatTime(Number(doa.duration) * 1000)}
      </Text>
      {pathname.includes("/mother-panel") && (
        <Pressable onPress={handleDeleteDoa}>
          {loading && <ActivityIndicator size="small" color={"#000000"} />}
          {!loading && <FontAwesome name="trash" size={28} color="black" />}
        </Pressable>
      )}
      {!pathname.includes("/mother-panel") && (
        <View style={styles.playIcon}>
          <Link href={`/prayers/${doa._id}`}>
            <MaterialIcons
              name="play-circle"
              size={48}
              color={colors?.primary}
            />
          </Link>
        </View>
      )}
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
