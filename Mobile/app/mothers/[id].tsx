import ErrorComponents from "@/components/ErrorComponent";
import LoadingComponents from "@/components/LoadingComponents";
import MotherDoaList from "@/components/MotherDoaList";
import { useTheme } from "@/context/theme/ThemeContext";
import api from "@/lib/config/axios";
import { AppDispatch, RootState } from "@/store";
import { fetchDoasByMotherId } from "@/store/doasbyMother";
import { fetchMotherById } from "@/store/motherIdSlice";
import { PresetsColors } from "@/types";

import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

const motherImg = require("@/assets/images/doa-banner.png");
const width = Dimensions.get("window").width;

export default function MotherProfile() {
  const { id }: { id: string } = useLocalSearchParams();
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: mother,
    loading: motherLoading,
    error: motherError,
  } = useSelector((state: RootState) => state.motherById);
  const { items: user } = useSelector((state: RootState) => state.user);
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

  const handleFollowMother = async () => {
    try {
      setLoading(true);
      const body = {
        userId: user?.data._id,
      };

      const res = await api.put(`/follow-mother/${id}`, body);
      if (res.status === 201) {
        Toast.show({
          type: "success",
          text1: "Thanks, for follow mother",
          position: "bottom",
          visibilityTime: 2000,
        });
        onRefresh();
      }
    } catch (err) {
      console.error(err);
      Toast.show({
        type: "error",
        text1: "Failed to follow mother",
        position: "bottom",
        visibilityTime: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchMotherById(id));
      dispatch(fetchDoasByMotherId(id));
    }
  }, []);

  if (motherLoading) {
    return <LoadingComponents />;
  }

  if (!motherLoading && !mother?.data && motherError) {
    return <ErrorComponents errorText={motherError} />;
  }

  const loved =
    doas?.data &&
    doas?.data?.length > 0 &&
    doas.data.reduce((prevValue, currentValue) => {
      if (currentValue.favoriteUsers) {
        return currentValue.favoriteUsers?.length + prevValue;
      }
      return prevValue;
    }, 0);

  const isFollowedUser = user?.data._id
    ? mother?.data.followers?.includes(user?.data._id)
    : false;

  const addedKBefore = (total: number) => {
    if (total >= 1000) {
      const newTotal = total / 1000;
      return `${parseInt(newTotal.toString())}k`;
    }
    return total;
  };

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
                <Button
                  title={isFollowedUser ? "Followed" : "Follow Me"}
                  color={colors?.primary}
                  onPress={handleFollowMother}
                  disabled={loading || isFollowedUser}
                />
              </View>
              <View style={styles.followersInfo}>
                <Text style={styles.followingText}>
                  {addedKBefore(mother?.data?.followers?.length!)}
                </Text>
                <Text style={styles.normalText}>Followers</Text>
              </View>
              <View style={styles.followersInfo}>
                <Text style={styles.followingText}>
                  {loved ? addedKBefore(loved) : 0}
                </Text>
                <Text style={styles.normalText}>Loved</Text>
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
