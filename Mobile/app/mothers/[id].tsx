import ErrorComponents from "@/components/ErrorComponent";
import LoadingComponents from "@/components/LoadingComponents";
import MotherDoaList from "@/components/MotherDoaList";
import { useTheme } from "@/context/theme/ThemeContext";
import { AppDispatch, RootState } from "@/store";
import { fetchDoasByMotherId } from "@/store/doasbyMother";
import { fetchMotherById } from "@/store/motherIdSlice";
import { Mother, PresetsColors } from "@/types";

import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const motherImg = require("@/assets/images/doa-banner.jpg");
const width = Dimensions.get("window").width;

export default function MotherProfile() {
  const theme = useTheme();
  const { id }: { id: string } = useLocalSearchParams();
  const colors = theme?.colors;
  const styles = getStyles(colors);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: mother,
    loading: motherLoading,
    error: motherError,
  } = useSelector((state: RootState) => state.motherById);

  const {
    items: doas,
    loading: doasLoading,
    error: doasError,
  } = useSelector((state: RootState) => state.doasByMother);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchMotherById(id));
    dispatch(fetchDoasByMotherId(id));
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(fetchMotherById(id));
      dispatch(fetchDoasByMotherId(id));
    }
  }, [id]);

  if (motherLoading) {
    return <LoadingComponents />;
  }

  if (!motherLoading && !mother?.data && motherError) {
    return <ErrorComponents errorText={motherError} />;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {!motherLoading && mother?.data && (
        <View style={styles.container}>
          <View style={styles.profilePageHeader}>
            <Image source={motherImg} style={styles.profileImg} />
            <Text style={styles.name}>{mother?.data?.fullName}</Text>
            <Text style={styles.normalText}>{mother?.data?.email}</Text>
            <View style={styles.followersInfoBox}>
              <View>
                <Button title="Follow Me" color={colors?.primary} />
              </View>
              <View style={styles.followersInfo}>
                <Text style={styles.followingText}>
                  {mother?.data?.followers}
                </Text>
                <Text style={styles.normalText}>Followers</Text>
              </View>
              <View style={styles.followersInfo}>
                <Text style={styles.followingText}>
                  {mother?.data?.following}
                </Text>
                <Text style={styles.normalText}>Following</Text>
              </View>
            </View>
          </View>
          <View style={styles.motherDoaList}>
            <Text style={styles.motherDoaListTitle}>Ibu all doas,</Text>
            <MotherDoaList doas={doas?.data || []} />
          </View>
        </View>
      )}
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
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 10,
      width: width * 0.8,
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
