import ErrorComponents from "@/components/ErrorComponent";
import LoadingComponents from "@/components/LoadingComponents";
import { useTheme } from "@/context/theme/ThemeContext";
import { AppDispatch, RootState } from "@/store";
import { fetchMothers } from "@/store/mothersSlice";
import { PresetsColors } from "@/types";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const motherImg = require("@/assets/images/doa-banner.png");
const width = Dimensions.get("window").width;

export default function MOtherList() {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);
  const dispatch = useDispatch<AppDispatch>();
  const [refreshing, setRefreshing] = useState(false);

  const { items, loading, error } = useSelector(
    (state: RootState) => state.mothers
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchMothers());
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  useEffect(() => {
    dispatch(fetchMothers());
  }, []);

  if (loading) {
    return <LoadingComponents />;
  }

  if (!loading && !items?.data && error) {
    return <ErrorComponents errorText={error} />;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Favorite Ibu/Mother’s,</Text>

        <View style={styles.mothersList}>
          {!loading &&
            items?.data.map((mother, index) => (
              <Pressable
                key={mother._id}
                onPress={() => router.push(`/mothers/${mother._id}`)}
              >
                <View style={styles.motherBox}>
                  <Image source={motherImg} style={styles.motherProfileImg} />
                  <Text style={styles.mothertitle}>{mother.fullName}</Text>
                </View>
              </Pressable>
            ))}
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
    pageTitle: {
      fontSize: 20,
      fontWeight: "700",
      fontFamily: "Nunito",
      color: colors?.darkText,
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
      color: colors?.darkText,
    },
  });
