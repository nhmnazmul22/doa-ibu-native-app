import DoaList from "@/components/DoaList";
import SliderDoa from "@/components/SliderDoa";
import { useTheme } from "@/context/theme/ThemeContext";
import { useUserInfo } from "@/context/user/userContext";
import { checkTokenValidity } from "@/lib/token";
import { PresetsColors } from "@/types";
import { Link, Redirect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getFormattedTimeAndGreeting } from "@/lib";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { fetchUser } from "@/store/userSlice";
import * as Notifications from "expo-notifications";
import { setupNotificationPermissions } from "@/lib/notification";
import { fetchDoas } from "@/store/doasSlice";
import { useSession } from "@clerk/clerk-expo";

// 🔔 Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const { width } = Dimensions.get("window");

export default function HomePage() {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);
  const { isSignedIn, isLoaded, session } = useSession();
  const userContext = useUserInfo();
  const { dateTime, greeting } = getFormattedTimeAndGreeting();
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchUser(userContext?.user.email));
    dispatch(fetchDoas("uploaded"));
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  useEffect(() => {
    setupNotificationPermissions();
  }, []);

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href={"/login-signup"} />;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <View style={styles.greeting}>
          <Text style={styles.greetingTitle}>
            {greeting}, {userContext?.user?.fullName}
          </Text>
          <Text style={styles.greetingDes}>{dateTime}</Text>
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
    subscriptionCountDown: {
      paddingHorizontal: 30,
      paddingVertical: 10,
      width: "100%",
    },
    countDownBox: {
      width: "100%",
      marginHorizontal: "auto",
      marginTop: 10,
      backgroundColor: colors?.primary,
      padding: 10,
      borderRadius: 20,
    },
    countDownTitle: {
      fontFamily: "Nunito",
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 5,
      textAlign: "center",
      color: colors?.bodyBackground,
    },
    countDownTime: {
      fontFamily: "Nunito",
      fontSize: 20,
      fontWeight: "700",
      textAlign: "center",
      color: colors?.bodyBackground,
    },
    greeting: {
      display: "flex",
      flexDirection: "column",
      gap: 5,
      paddingHorizontal: 30,
    },
    greetingTitle: {
      fontFamily: "Nunito",
      fontSize: 16,
      fontWeight: 900,
      color: colors?.darkText,
    },
    greetingDes: {
      fontFamily: "Nunito",
      fontSize: 14,
      color: colors?.darkText,
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
      color: colors?.darkText,
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
      color: colors?.darkText,
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
