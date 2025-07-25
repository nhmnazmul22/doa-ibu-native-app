import { ThemePresets } from "@/context/theme/presets";
import { useTheme } from "@/context/theme/ThemeContext";
import { useUserInfo } from "@/context/user/userContext";
import api from "@/lib/config/axios";
import { AppDispatch } from "@/store";
import { fetchUser } from "@/store/userSlice";
import { PresetsColors } from "@/types";
import Entypo from "@expo/vector-icons/Entypo";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
const profileImage = require("@/assets/images/doa-banner.jpg");
const width = Dimensions.get("window").width;

const data = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export default function SettingPage() {
  const theme = useTheme();
  const colors = theme?.colors;
  const setColor = theme?.applyPreset;
  const currentTheme = theme?.currentTheme;
  const styles = getStyles(colors);
  const userContext = useUserInfo();
  const user = userContext?.user;

  const [name, setName] = useState<string>(user.fullName || "");
  const [phone, setPhone] = useState<string>(user.phone || "");
  const [email, setEmail] = useState<string>(user.email || "");
  const [gender, setGender] = useState<string>(user.gender || "");
  const [loading, setLoading] = useState<boolean>(false);
  const [notificationText, setNotificationText] = useState<string>(
    "Have you listened to your Mother’s prayer today?"
  );
  const [isEnabled, setIsEnabled] = useState(true);
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [premiumMember, setPremiumMember] = useState(
    user.subscriptionType === "premium" || false
  );
  const dispatch = useDispatch<AppDispatch>();

  const themeData = Object.keys(ThemePresets).map((value) => {
    return {
      label: value[0].toUpperCase() + value.slice(1),
      value,
    };
  });

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    Toast.show({
      type: "success",
      text1: `Notification ${isEnabled ? "Disabled" : "Enabled"}!`,
      position: "bottom",
      visibilityTime: 2000,
    });
  };

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = () => {
    setShow(true);
  };

  const handleChangeTheme = (value: string) => {
    if (value && setColor) {
      setColor(value);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const fromData = new FormData();

      fromData.set("fullName", name);
      fromData.set("email", email);
      fromData.set("phone", phone);
      fromData.set("gender", gender);
      fromData.set("image", "");

      if (!user._id) {
        Toast.show({
          type: "error",
          text1: "User Id not found",
          position: "bottom",
          visibilityTime: 2000,
        });
        return;
      }
      const res = await api.put(`/update-user/${user._id}`, fromData);

      if (res.status === 201) {
        Toast.show({
          type: "success",
          text1: "Profile Info update successful",
          position: "bottom",
          visibilityTime: 2000,
        });
        dispatch(fetchUser(user._id));
        return;
      }
    } catch (err: any) {
      console.log("Error", err);
      Toast.show({
        type: "error",
        text1: err.message || "Profile info update failed",
        position: "bottom",
        visibilityTime: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  console.log(user);
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
            <View>
              <Text style={styles.secTitle}>Profile Settings,</Text>
              <View style={styles.imageBox}>
                <Image source={profileImage} style={styles.profileImage} />
                <View style={{ ...styles.badgeImgBox, display: "none" }}>
                  <SimpleLineIcons
                    name="badge"
                    size={20}
                    color={colors?.bodyBackground}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.inputBox}>
                  <Text style={styles.inputLabelText}>Name:</Text>
                  <TextInput
                    style={styles.input}
                    inputMode="text"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    placeholder="Enter your name"
                  />
                </View>
                <View style={styles.inputBox}>
                  <Text style={styles.inputLabelText}>Phone:</Text>
                  <TextInput
                    style={styles.input}
                    inputMode="tel"
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                    placeholder="Enter your phone number"
                  />
                </View>
                <View style={styles.inputBox}>
                  <Text style={styles.inputLabelText}>Email:</Text>
                  <TextInput
                    style={styles.input}
                    inputMode="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Enter your email"
                  />
                </View>
                <View style={styles.inputBox}>
                  <Text style={styles.inputLabelText}>Gender:</Text>
                  <Dropdown
                    style={styles.dropdown}
                    data={data}
                    labelField="label"
                    valueField="value"
                    placeholder="Select gender"
                    value={gender}
                    onChange={(item: any) => setGender(item.value)}
                  />
                </View>
                <View style={styles.btnBox}>
                  <Pressable style={styles.btnPrimary} onPress={handleUpdate}>
                    {loading && (
                      <ActivityIndicator size="small" color="#ffffff" />
                    )}
                    {!loading && (
                      <Text
                        style={{ ...styles.btnText, ...styles.primaryBtnText }}
                      >
                        Save
                      </Text>
                    )}
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={styles.afterSubscription}>
              {user.subscriptionType !== "premium" && (
                <View style={styles.blockBox}>
                  <View style={styles.blockContent}>
                    <Pressable>
                      <Entypo
                        name="block"
                        size={54}
                        color="red"
                        style={{ marginHorizontal: "auto" }}
                      />
                    </Pressable>
                    <Pressable onPress={() => router.push("/subscription")}>
                      <Text style={styles.blockMessage}>
                        If you need access this feature, You need to become a
                        premium member
                      </Text>
                    </Pressable>
                    <Pressable style={styles.btnMember}>
                      <Text
                        style={{
                          ...styles.blockMessage,
                          color: colors?.bodyBackground,
                        }}
                        onPress={() => router.push("/subscription")}
                      >
                        Become a Premium Member
                      </Text>
                    </Pressable>
                  </View>
                </View>
              )}
              <View style={styles.notificationContainer}>
                <Text style={styles.secTitle}>Notifikasi Settings,</Text>
                <View style={styles.inputContainer}>
                  <View
                    style={{
                      ...styles.inputSec,
                      justifyContent: "flex-start",
                      gap: 10,
                      marginBottom: 5,
                    }}
                  >
                    <Text style={styles.inputLabelText}>
                      Show Notifications:
                    </Text>
                    <Switch
                      trackColor={{
                        false: colors?.darkText,
                        true: colors?.secondary,
                      }}
                      thumbColor={
                        isEnabled ? colors?.primary : colors?.bodyBackground
                      }
                      ios_backgroundColor={colors?.darkText}
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </View>
                  <View style={styles.inputSec}>
                    <View style={{ width: "60%" }}>
                      <TextInput
                        style={{ ...styles.input, marginTop: 0 }}
                        inputMode="text"
                        value={notificationText}
                        onChangeText={(text) => setNotificationText(text)}
                      />
                    </View>
                    <View style={{ width: "35%" }}>
                      <Pressable style={styles.btnPrimary}>
                        <Text
                          style={{
                            ...styles.btnText,
                            ...styles.primaryBtnText,
                          }}
                        >
                          Update
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                  <View style={styles.inputSec}>
                    <View style={{ width: "60%" }}>
                      <TextInput
                        style={{ ...styles.input, marginTop: 0 }}
                        inputMode="text"
                        value={date.toLocaleTimeString()}
                        editable={false}
                      />
                      {show && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={date}
                          mode={"time"}
                          is24Hour={false}
                          onChange={onChange}
                        />
                      )}
                    </View>
                    <View style={{ width: "35%" }}>
                      <Pressable style={styles.btnPrimary} onPress={showMode}>
                        <Text
                          style={{
                            ...styles.btnText,
                            ...styles.primaryBtnText,
                          }}
                        >
                          Select Time
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
              <View>
                <Text style={styles.secTitle}>Customize Theme,</Text>
                <Dropdown
                  dropdownPosition="top"
                  style={{ ...styles.dropdown, width: width * 0.9 }}
                  data={themeData}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Theme"
                  value={currentTheme}
                  onChange={(item: any) => handleChangeTheme(item.value)}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const getStyles = (colors: PresetsColors | undefined) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      paddingTop: 20,
    },
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 100,
      marginBottom: 20,
    },
    secTitle: {
      fontSize: 20,
      marginBottom: 10,
      fontFamily: "Nunito",
      color: colors?.darkText,
    },
    imageBox: {
      position: "relative",
      width: 150,
    },
    badgeImgBox: {
      position: "absolute",
      bottom: 18,
      right: 10,
      transform: "rotate(-20deg)",
      backgroundColor: colors?.success,
      padding: 8,
      borderRadius: 50,
    },
    inputContainer: {
      width: width * 0.9,
    },
    inputBox: {
      marginTop: 10,
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
    inputLabelText: {
      fontFamily: "Nunito",
      fontSize: 16,
      fontWeight: 700,
    },
    dropdown: {
      height: 40,
      borderColor: colors?.primary,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      fontFamily: "Nunito",
      fontSize: 14,
      fontWeight: 600,
    },
    btnBox: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      marginTop: 30,
      gap: 20,
    },
    outlineBtn: {
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: colors?.primary,
      borderRadius: 10,
    },
    btnPrimary: {
      paddingHorizontal: 20,
      paddingVertical: 8,
      backgroundColor: colors?.primary,
      borderRadius: 10,
    },
    btnText: {
      fontFamily: "Nunito",
      fontSize: 16,
      fontWeight: 700,
      textAlign: "center",
    },
    primaryBtnText: {
      color: colors?.bodyBackground,
    },
    notificationContainer: {
      marginTop: 10,
    },
    inputSec: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    afterSubscription: {
      paddingVertical: 10,
      position: "relative",
      width: width * 0.9,
      height: 380,
      marginTop: 20,
    },
    blockBox: {
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: "#ffffffd2",
      borderWidth: 3,
      borderColor: colors?.primary,
      borderRadius: 10,
      zIndex: 10,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    blockContent: {
      width: "80%",
      marginHorizontal: "auto",
      gap: 10,
    },
    blockMessage: {
      fontFamily: "Nunito",
      fontSize: 16,
      fontWeight: 700,
      textAlign: "center",
    },
    btnMember: {
      width: "100%",
      paddingVertical: 20,
      paddingHorizontal: 10,
      borderRadius: 50,
      backgroundColor: colors?.primary,
    },
  });
