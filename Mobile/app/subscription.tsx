import LoadingComponents from "@/components/LoadingComponents";
import SubscriptionModal from "@/components/SubscriptionModal";
import { useTheme } from "@/context/theme/ThemeContext";
import { AppDispatch, RootState } from "@/store";
import { fetchPricing } from "@/store/PricingSlice";
import { fetchUser } from "@/store/userSlice";
import { PresetsColors } from "@/types";
import { useSession } from "@clerk/clerk-expo";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const width = Dimensions.get("window").width;

export default function SubscriptionPage() {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);
  const [tab, setTab] = useState<string>("free");
  const { session } = useSession();
  const [price, setPrice] = useState<string>("25000");
  const [visibleModal, setVisibleModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.pricing
  );
  const [isPremiumMember, setIsPremiumMember] = useState(false);
  const { items: user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchPricing());
  }, []);

  useEffect(() => {
    if (session?.publicUserData.identifier) {
      dispatch(fetchUser(session?.publicUserData.identifier));
      setIsPremiumMember(user?.data.subscriptionType !== "premium");
    }
  }, [session?.publicUserData.identifier]);

  const customBtn =
    price !== "20000" && price !== "50000" && price !== "100000";

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      keyboardVerticalOffset={40}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.pageHeader}>
              <Text style={styles.pageTitle}>Support Doa Ibu</Text>
              <Text style={styles.pageDes}>
                “Keep the prayers flowing and support this app to stay alive.
                Every little help brings more peace to more hearts.”{" "}
              </Text>
            </View>
            <View style={styles.tabsList}>
              {items?.data.map((value, index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.tabBtnPrimary,
                    tab === value.type && styles.activeBtn,
                  ]}
                  onPress={() => setTab(value.type)}
                >
                  <Text
                    style={[
                      styles.tabBtnText,
                      tab === value.type && styles.activeBtnText,
                    ]}
                  >
                    {value.type[0].toUpperCase() + value.type.slice(1)}
                  </Text>
                </Pressable>
              ))}
              <Pressable
                style={[
                  styles.tabBtnPrimary,
                  tab === "donate" && styles.activeBtn,
                ]}
                onPress={() => setTab("donate")}
              >
                <Text
                  style={[
                    styles.tabBtnText,
                    tab === "donate" && styles.activeBtnText,
                  ]}
                >
                  Donate
                </Text>
              </Pressable>
            </View>
            {items?.data && items?.data.length > 0 ? (
              <View style={{ marginTop: 30 }}>
                {items.data.map(
                  (price, index) =>
                    tab === price.type && (
                      <View style={styles.tabContents}>
                        <View style={styles.contentHeader}>
                          <Text style={styles.tabTitle}>{price.title}</Text>
                          <Text style={styles.tabTitle}>{price.price} Rp</Text>
                        </View>
                        <Text style={styles.tabDes}>{price.shortDes}</Text>
                        <View style={styles.featureContents}>
                          <Text style={styles.featureTitle}>Features:</Text>
                          <View style={styles.features}>
                            {price.features.map((feature, index) => (
                              <View key={index} style={styles.featureBox}>
                                {feature.available ? (
                                  <AntDesign
                                    name="checkcircle"
                                    size={24}
                                    color={colors?.success}
                                  />
                                ) : (
                                  <AntDesign
                                    name="closecircle"
                                    size={24}
                                    color={colors?.primary}
                                  />
                                )}
                                <Text style={styles.featureText}>
                                  {feature.text}
                                </Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                    )
                )}
                {tab === "donate" && (
                  <View style={styles.tabContents}>
                    <View>
                      <Text
                        style={{
                          ...styles.tabTitle,
                          textAlign: "center",
                          marginBottom: 10,
                        }}
                      >
                        🎁 Donasi (Pendukung) – 🧡
                      </Text>
                      <Text
                        style={{
                          ...styles.tabDes,
                          textAlign: "center",
                          marginBottom: 5,
                        }}
                      >
                        🧡️ “Dukung Aplikasi Ini” dengan Midtrans
                      </Text>
                      <Text style={{ ...styles.tabDes, textAlign: "center" }}>
                        Dukunglah jiwa aplikasi ini dengan kebaikan Anda. Setiap
                        donasi membantu doa-doa tetap hidup — dan Anda akan
                        mendapatkan lencana "Pendukung Doa" khusus dengan cinta
                        dan rasa syukur.
                      </Text>
                      <View style={{ ...styles.featureBox, marginVertical: 5 }}>
                        <AntDesign
                          name="checkcircle"
                          size={24}
                          color={colors?.success}
                        />
                        <Text style={styles.featureText}>
                          Dapatkan lencana "Pendukung Doa" di profil Anda
                        </Text>
                      </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <View>
                        <Text style={styles.donationText}>
                          Dukung Aplikasi Ini,
                        </Text>
                        <View style={{ ...styles.tabsList, gap: 5 }}>
                          <Pressable
                            style={[
                              styles.tabBtnPrimary,
                              price === "20000" && styles.activeBtn,
                              { paddingHorizontal: 10 },
                            ]}
                            onPress={() => setPrice("20000")}
                          >
                            <Text
                              style={[
                                styles.tabBtnText,
                                price === "20000" && styles.activeBtnText,
                                { fontSize: 12 },
                              ]}
                            >
                              Rp. 20,000
                            </Text>
                          </Pressable>
                          <Pressable
                            style={[
                              styles.tabBtnPrimary,
                              price === "50000" && styles.activeBtn,
                              { paddingHorizontal: 10 },
                            ]}
                            onPress={() => setPrice("50000")}
                          >
                            <Text
                              style={[
                                styles.tabBtnText,
                                price === "50000" && styles.activeBtnText,
                                { fontSize: 12 },
                              ]}
                            >
                              Rp. 50,000
                            </Text>
                          </Pressable>
                          <Pressable
                            style={[
                              styles.tabBtnPrimary,
                              price === "100000" && styles.activeBtn,
                              { paddingHorizontal: 10 },
                            ]}
                            onPress={() => setPrice("100000")}
                          >
                            <Text
                              style={[
                                styles.tabBtnText,
                                price === "100000" && styles.activeBtnText,
                                { fontSize: 12 },
                              ]}
                            >
                              Rp. 100,000
                            </Text>
                          </Pressable>
                          <Pressable
                            style={[
                              styles.tabBtnPrimary,
                              customBtn && styles.activeBtn,
                              { paddingHorizontal: 10 },
                            ]}
                            onPress={() => setPrice("")}
                          >
                            <Text
                              style={[
                                styles.tabBtnText,
                                customBtn && styles.activeBtnText,
                                { fontSize: 12 },
                              ]}
                            >
                              Custome
                            </Text>
                          </Pressable>
                        </View>
                      </View>
                      <Text style={styles.orText}>Or</Text>
                      <TextInput
                        style={styles.input}
                        value={price}
                        onChangeText={(text) => setPrice(text)}
                        placeholder="Enter donation price"
                        placeholderTextColor="#000000c1"
                      />
                    </View>
                    <View style={styles.btnBox}>
                      <Pressable
                        style={[styles.buyBtn]}
                        onPress={() => setVisibleModal(true)}
                      >
                        <Text style={styles.btnText}>Dukung Aplikasi Ini</Text>
                      </Pressable>
                    </View>
                  </View>
                )}
              </View>
            ) : (
              <LoadingComponents />
            )}
          </View>

          <SubscriptionModal
            visibleModal={visibleModal}
            setVisibleModal={setVisibleModal}
            price={tab === "donate" ? price : ""}
            type={tab === "donate" ? "donate" : "premium"}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const getStyles = (colors: PresetsColors | undefined) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      width: width * 0.9,
      paddingBottom: 20,
    },
    pageHeader: {
      paddingTop: 20,
      paddingBottom: 20,
      width: "80%",
      marginHorizontal: "auto",
    },
    pageTitle: {
      fontFamily: "Nunito",
      fontSize: 24,
      fontWeight: 700,
      textAlign: "center",
      color: colors?.darkText,
    },
    pageDes: {
      fontFamily: "Nunito",
      fontSize: 14,
      textAlign: "center",
      color: colors?.darkText,
      marginTop: 5,
    },
    tabsList: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    tabBtnPrimary: {
      backgroundColor: colors?.bodyBackground,
      borderWidth: 1,
      borderColor: colors?.primary,
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderRadius: 10,
    },
    activeBtn: {
      backgroundColor: colors?.primary,
      borderWidth: 0,
    },
    tabBtnText: {
      fontFamily: "Nunito",
      fontSize: 14,
      textAlign: "center",
      color: colors?.darkText,
      fontWeight: "700",
    },
    activeBtnText: {
      color: colors?.bodyBackground,
    },
    tabContents: {
      width: width * 0.9,
      backgroundColor: "#ffffff",
      shadowColor: colors?.darkText,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.25,
      shadowRadius: 20,
      elevation: 3,
      padding: 20,
      borderRadius: 20,
    },
    contentHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    tabTitle: {
      fontFamily: "Nunito",
      fontSize: 22,
      color: colors?.darkText,
      fontWeight: "700",
    },
    tabDes: {
      fontFamily: "Nunito",
      fontSize: 14,
      color: colors?.darkText,
      fontWeight: "400",
      fontStyle: "italic",
    },
    featureContents: {
      marginTop: 10,
    },
    featureTitle: {
      fontFamily: "Nunito",
      fontSize: 18,
      color: colors?.darkText,
      fontWeight: "700",
    },
    features: {
      gap: 10,
      marginTop: 10,
    },
    featureBox: {
      flexDirection: "row",
      gap: 10,
    },
    featureText: {
      fontFamily: "Nunito",
      fontSize: 14,
      color: colors?.darkText,
      fontWeight: "400",
      fontStyle: "italic",
      width: "80%",
    },
    btnBox: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      marginTop: 30,
      gap: 10,
    },
    btnLink: {
      fontFamily: "Nunito",
      fontSize: 14,
      color: colors?.darkText,
      fontWeight: "400",
      textDecorationLine: "underline",
    },
    buyBtn: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: colors?.primary,
    },
    btnText: {
      fontFamily: "Nunito",
      fontSize: 14,
      color: colors?.bodyBackground,
      fontWeight: "700",
    },
    input: {
      fontFamily: "Nunito",
      fontSize: 16,
      height: 40,
      marginTop: 5,
      borderWidth: 1,
      padding: 10,
      borderColor: colors?.primary,
      borderRadius: 5,
    },
    donationText: {
      fontFamily: "Nunito",
      fontSize: 16,
      color: colors?.darkText,
      fontWeight: "700",
      marginBottom: 10,
    },
    orText: {
      fontFamily: "Nunito",
      fontSize: 16,
      textAlign: "center",
      marginVertical: 10,
    },
  });
