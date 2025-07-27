import SubscriptionModal from "@/components/SubscriptionModal";
import { useTheme } from "@/context/theme/ThemeContext";
import { useUserInfo } from "@/context/user/userContext";
import { PresetsColors } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
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

const width = Dimensions.get("window").width;

const freeFeatures = [
  { label: "Dengarkan doa bawaan sistem (offline).", available: true },
  { label: "Simpan hingga 2 rekaman pribadi.", available: true },
  { label: "Simple daily reminder", available: true },
  { label: "Koleksi audio eksklusif dan musik latar.", available: false },
  { label: "Simpan hingga 30 pesan suara pribadi.", available: false },
  { label: "Notifikasi personal dan tema visual premium.", available: false },
];

const premiumFeatures = [
  { label: "Dengarkan doa bawaan sistem (offline).", available: true },
  { label: "Simple daily reminder", available: true },
  { label: "Koleksi audio eksklusif dan musik latar.", available: true },
  { label: "Simpan hingga 30 pesan suara pribadi.", available: true },
  { label: "Notifikasi personal dan tema visual premium.", available: true },
];

export default function SubscriptionPage() {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);
  const userContext = useUserInfo();
  const [tab, setTab] = useState<"free" | "premium" | "donate">("free");
  const [price, setPrice] = useState<string>("5000");
  const [visibleModal, setVisibleModal] = useState(false);



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
              <Pressable
                style={[
                  styles.tabBtnPrimary,
                  tab === "free" && styles.activeBtn,
                ]}
                onPress={() => setTab("free")}
              >
                <Text
                  style={[
                    styles.tabBtnText,
                    tab === "free" && styles.activeBtnText,
                  ]}
                >
                  Gratis
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.tabBtnPrimary,
                  tab === "premium" && styles.activeBtn,
                ]}
                onPress={() => setTab("premium")}
              >
                <Text
                  style={[
                    styles.tabBtnText,
                    tab === "premium" && styles.activeBtnText,
                  ]}
                >
                  Premium
                </Text>
              </Pressable>
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
            <View style={{ marginTop: 30 }}>
              {tab === "free" && (
                <View style={styles.tabContents}>
                  <View style={styles.contentHeader}>
                    <Text style={styles.tabTitle}>Gratis</Text>
                    <Text style={styles.tabTitle}>0.0 Rp</Text>
                  </View>
                  <Text style={styles.tabDes}>
                    Enjoy a simple connection with your loved ones through
                    preloaded prayers. Record up to 2 personal voice messages
                    and receive gentle daily reminders.
                  </Text>
                  <View style={styles.featureContents}>
                    <Text style={styles.featureTitle}>Features:</Text>
                    <View style={styles.features}>
                      {freeFeatures.map((feature, index) => (
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
                            {feature.label}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  <View style={styles.btnBox}>
                    <Pressable>
                      <Text style={styles.btnLink}>Dapatkan semua fitur.</Text>
                    </Pressable>
                  </View>
                </View>
              )}
              {tab === "premium" && (
                <View style={styles.tabContents}>
                  <View style={styles.contentHeader}>
                    <Text style={styles.tabTitle}>Premium</Text>
                    <Text style={styles.tabTitle}>
                      Rp 15rb–25rb/
                      <Text style={{ fontSize: 14, fontWeight: "400" }}>
                        bulan
                      </Text>
                    </Text>
                  </View>
                  <Text style={styles.tabDes}>
                    Unlock deeper moments with 30 personal voice messages,
                    exclusive prayers, calming background music, and beautiful
                    visual themes. For a more personal, heartfelt experience
                    every day.
                  </Text>
                  <View style={styles.featureContents}>
                    <Text style={styles.featureTitle}>Features:</Text>
                    <View style={styles.features}>
                      {premiumFeatures.map((feature, index) => (
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
                            {feature.label}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  <View style={styles.btnBox}>
                    <Pressable
                      style={[styles.buyBtn]}
                      onPress={() => setVisibleModal(true)}
                    >
                      <Text style={styles.btnText}>Pembelian</Text>
                    </Pressable>
                  </View>
                </View>
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
                            price === "5000" && styles.activeBtn,
                            { paddingHorizontal: 10 },
                          ]}
                          onPress={() => setPrice("5000")}
                        >
                          <Text
                            style={[
                              styles.tabBtnText,
                              price === "5000" && styles.activeBtnText,
                              { fontSize: 12 },
                            ]}
                          >
                            5k/Rp
                          </Text>
                        </Pressable>
                        <Pressable
                          style={[
                            styles.tabBtnPrimary,
                            price === "10000" && styles.activeBtn,
                            { paddingHorizontal: 10 },
                          ]}
                          onPress={() => setPrice("10000")}
                        >
                          <Text
                            style={[
                              styles.tabBtnText,
                              price === "10000" && styles.activeBtnText,
                              { fontSize: 12 },
                            ]}
                          >
                            10k/Rp
                          </Text>
                        </Pressable>
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
                            20k/Rp
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
                            50k/Rp
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
                            100k/Rp
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
                    />
                  </View>
                  <View style={styles.btnBox}>
                    <Pressable>
                      <Text style={styles.btnLink}>Dapatkan semua fitur.</Text>
                    </Pressable>
                    <Pressable disabled={true} style={[styles.buyBtn]}>
                      <Text style={styles.btnText}>Dukung Aplikasi Ini</Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </View>
          </View>

          <SubscriptionModal
            visibleModal={visibleModal}
            setVisibleModal={setVisibleModal}
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
