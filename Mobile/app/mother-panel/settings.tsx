import { ThemePresets } from "@/context/theme/presets";
import { StatusBar as RNStatusBar } from "react-native";
import { useTheme } from "@/context/theme/ThemeContext";
import { useUserInfo } from "@/context/user/userContext";
import { AppDispatch } from "@/store";
import { fetchUser } from "@/store/userSlice";
import { PresetsColors } from "@/types";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { router } from "expo-router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  RefreshControl,
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
import * as ImagePicker from "expo-image-picker";
import { useSession } from "@clerk/clerk-expo";

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
  const user = userContext?.mother;
  const { session } = useSession();
  const [name, setName] = useState<string>(user.fullName || "");
  const [phone, setPhone] = useState<string>(user.phone || "");
  const [email, setEmail] = useState<string>(user.email || "");
  const [gender, setGender] = useState<string>(user.gender || "");
  const [image, setImage] = useState<string | null>(
    user.profilePicture || null
  );
  const [imageFile, setImageFile] = useState<ImagePicker.ImagePickerAsset>();
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const [motherLoading, setMotherLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const themeData = Object.keys(ThemePresets).map((value) => {
    return {
      label: value[0].toUpperCase() + value.slice(1),
      value,
    };
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageFile(result.assets[0]);
      setImage(result.assets[0].uri);
    }
  };

  const handleChangeTheme = (value: string) => {
    if (value && setColor) {
      setColor(value);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("fullName", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("gender", gender);
      // Add the image
      if (imageFile?.uri) {
        formData.append("image", {
          uri: imageFile.uri,
          name: imageFile.fileName?.split(" ").join("-") || "upload.jpg",
          type: imageFile.mimeType || "image/jpeg",
        } as any);
      }

      if (!user._id) {
        Toast.show({
          type: "error",
          text1: "User Id not found",
          position: "bottom",
          visibilityTime: 2000,
        });
        return;
      }

      const response = await fetch(
        `http://appdoaibu.my.id/api/update-mother/${user._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (response.status === 201) {
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchUser(user.email));
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const handleUserPanel = async () => {
    try {
      setMotherLoading(true);
      Toast.show({
        type: "success",
        text1: "User panel access successful",
        position: "bottom",
        visibilityTime: 2000,
      });
      router.replace("/");
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: err.message || "User panel access failed",
        position: "bottom",
        visibilityTime: 2000,
      });
    } finally {
      setMotherLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={"padding"}
      keyboardVerticalOffset={0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.container}>
            <View>
              <Pressable
                style={[styles.btnPrimary, { marginBottom: 30, elevation: 3 }]}
                onPress={() => handleUserPanel()}
              >
                {motherLoading && (
                  <ActivityIndicator size="small" color="#ffffff" />
                )}
                {!motherLoading && (
                  <Text style={{ ...styles.btnText, ...styles.primaryBtnText }}>
                    User Panel
                  </Text>
                )}
              </Pressable>

              <Text style={styles.secTitle}>Profile Settings,</Text>
              <Pressable onPress={pickImage} style={{ width: 160 }}>
                <View style={styles.imageBox}>
                  {image && (
                    <Image
                      source={{ uri: image }}
                      style={styles.profileImage}
                    />
                  )}
                  {!image && (
                    <Image
                      source={{ uri: session?.publicUserData.imageUrl }}
                      style={styles.profileImage}
                    />
                  )}
                  {user.isDonated && (
                    <View style={{ ...styles.badgeImgBox }}>
                      <SimpleLineIcons
                        name="badge"
                        size={20}
                        color={colors?.bodyBackground}
                      />
                    </View>
                  )}
                </View>
              </Pressable>
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
      paddingBottom: 20,
    },
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 100,
      marginBottom: 20,
      borderWidth: 2,
      borderColor: colors?.darkText,
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
      gap: 10,
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
      fontSize: 14,
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
      marginVertical: 20,
    },
  });
