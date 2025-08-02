import MotherDoaList from "@/components/MotherDoaList";
import { useTheme } from "@/context/theme/ThemeContext";
import { AppDispatch, RootState } from "@/store";
import { fetchDoasByMotherId } from "@/store/doasbyMother";
import { fetchMother } from "@/store/motherSlice";
import { PresetsColors } from "@/types";
import { useSession } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";

const { width } = Dimensions.get("window");

export default function PrayersPage() {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);
  const { session, isSignedIn } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const { items: mother } = useSelector((state: RootState) => state.mother);
  const [refreshing, setRefreshing] = useState(false);

  const {
    items,
    error,
    loading: doasLoading,
  } = useSelector((state: RootState) => state.doasByMother);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (mother?.data._id) {
      dispatch(fetchDoasByMotherId(mother?.data._id));
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (session?.publicUserData.identifier) {
      dispatch(fetchMother(session?.publicUserData.identifier));
      if (mother?.data._id) {
        dispatch(fetchDoasByMotherId(mother?.data._id));
      }
    }
  }, [session?.publicUserData.identifier]);

  if (!isSignedIn && !session) {
    return <Redirect href={"/login-signup"} />;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <View style={styles.doaList}>
          <View style={styles.doaListHeader}>
            <View>
              <Text style={styles.doaTitle}>All Prayers / Doa Ibu,</Text>
              <View style={styles.horizontalLine}></View>
            </View>
          </View>
          <View>
            <MotherDoaList
              doas={items?.data || []}
              loading={doasLoading}
              error={error || ""}
            />
          </View>
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
    },
    slider: {
      height: 280,
      width: "100%",
    },
    doaList: {
      width: width * 0.9,
      alignSelf: "center",
      marginTop: 20,
    },
    doaListHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    doaTitle: {
      fontFamily: "Nunito",
      fontSize: 20,
      fontWeight: "700",
      marginBottom: 5,
    },
    horizontalLine: {
      width: width * 0.25,
      marginBottom: 20,
      height: 5,
      backgroundColor: colors?.primary,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
    },
    dropdown: {
      height: 40,
      width: width * 0.3,
      borderColor: colors?.darkText,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      fontFamily: "Nunito",
      fontSize: 14,
      fontWeight: 600,
    },
  });
