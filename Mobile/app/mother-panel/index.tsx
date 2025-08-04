import { useTheme } from "@/context/theme/ThemeContext";
import { AppDispatch, RootState } from "@/store";
import { fetchMother } from "@/store/motherSlice";
import { PresetsColors } from "@/types";
import { useSession } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

const { width } = Dimensions.get("window");
const demoImg = require("@/assets/images/doa-banner.png");

export default function MotherHomePage() {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<ImagePicker.ImagePickerAsset>();
  const [audioFile, setAudioFile] =
    useState<DocumentPicker.DocumentPickerAsset>();
  const [title, setTitle] = useState<string>("");
  const [shortDes, setShortDec] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { session, isSignedIn } = useSession();
  const { items: mother } = useSelector((state: RootState) => state.mother);

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

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "audio/*",
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      console.log("Selected file:", result.assets[0]);
      setAudioFile(result.assets[0]);
    }
  };

  const reset = () => {
    setImageFile(undefined);
    setAudioFile(undefined);
    setTitle("");
    setShortDec("");
  };

  const handleDoaCreate = async () => {
    try {
      setLoading(true);

      if (!title || !shortDes || !audioFile) {
        Toast.show({
          type: "error",
          text1: "Title, ShortDes and Audio is required",
          position: "bottom",
          visibilityTime: 2000,
        });
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("shortDes", shortDes);
      if (mother?.data._id) {
        formData.append("motherId", mother?.data._id);
      }
      if (imageFile?.uri) {
        formData.append("image", {
          uri: imageFile.uri,
          name: imageFile.fileName?.split(" ").join("-") || "upload.jpg",
          type: imageFile.mimeType || "image/jpeg",
        } as any);
      }

      if (audioFile?.uri) {
        formData.append("audio", {
          uri: audioFile.uri,
          name: audioFile.name.split(" ").join("-") || "dao.mp3",
          type: audioFile.mimeType || "audio/mpeg",
        } as any);
      }
      const response = await fetch(`https://appdoaibu.my.id/api/create-doa`, {
        method: "POST",
        body: formData,
      });

      if (response.status === 201) {
        Toast.show({
          type: "success",
          text1: "Doa Create Successful",
          position: "bottom",
          visibilityTime: 2000,
        });
      }
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: err.message || "Something went wrong!!",
        position: "bottom",
        visibilityTime: 2000,
      });
    } finally {
      reset();
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.publicUserData.identifier) {
      dispatch(fetchMother(session?.publicUserData.identifier));
    }
  }, [session?.publicUserData.identifier]);

  if (!isSignedIn && !session) {
    return <Redirect href={"/login-signup"} />;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={"padding"}
      keyboardVerticalOffset={40}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.doaCarouselBox}>
              <Pressable onPress={pickImage} style={{ width: 160 }}>
                <View style={styles.imageBox}>
                  {image && (
                    <Image
                      source={{ uri: image }}
                      style={styles.profileImage}
                    />
                  )}
                  {!image && (
                    <Image source={demoImg} style={styles.profileImage} />
                  )}
                </View>
              </Pressable>
              <View style={styles.inputContainer}>
                <Pressable
                  onPress={pickDocument}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 15,
                    backgroundColor: "#e7e7e7ff",
                    borderRadius: 8,
                  }}
                >
                  <Feather
                    name="file"
                    size={20}
                    color="black"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.inputLabelText}>
                    {audioFile?.name !== undefined
                      ? `${audioFile?.name.slice(0, 30)}...`
                      : "Select Audio"}
                  </Text>
                </Pressable>
                <View style={styles.inputBox}>
                  <Text style={styles.inputLabelText}>Doa Title:</Text>
                  <TextInput
                    style={styles.input}
                    inputMode="text"
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                    placeholder="Doa Title"
                    placeholderTextColor="#000000c1"
                  />
                </View>
                <View style={styles.inputBox}>
                  <Text style={styles.inputLabelText}>Short Description:</Text>
                  <TextInput
                    style={styles.input}
                    inputMode="text"
                    value={shortDes}
                    onChangeText={(text) => setShortDec(text)}
                    placeholder="Short Description"
                    placeholderTextColor="#000000c1"
                  />
                </View>
                <View style={styles.btnBox}>
                  <Pressable
                    style={styles.btnPrimary}
                    onPress={handleDoaCreate}
                  >
                    {loading && (
                      <ActivityIndicator size="small" color="#ffffff" />
                    )}
                    {!loading && (
                      <Text
                        style={{ ...styles.btnText, ...styles.primaryBtnText }}
                      >
                        Create
                      </Text>
                    )}
                  </Pressable>
                </View>
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
      justifyContent: "flex-start",
      alignItems: "flex-start",
      width: width * 1,
    },
    doaCarouselBox: {
      marginTop: 30,
      width: width * 0.9,
      marginHorizontal: "auto",
      marginBottom: 20,
    },
    profileImage: {
      width: 220,
      height: 180,
      borderRadius: 10,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: "#b1b1b1ff",
    },
    imageBox: {
      width: 150,
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
    btnText: {
      fontFamily: "Nunito",
      fontSize: 16,
      fontWeight: 700,
      textAlign: "center",
    },
    btnPrimary: {
      paddingHorizontal: 20,
      paddingVertical: 8,
      backgroundColor: colors?.primary,
      borderRadius: 10,
    },
    primaryBtnText: {
      color: colors?.bodyBackground,
      fontSize: 14,
    },
    inputLabelText: {
      fontFamily: "Nunito",
      fontSize: 16,
      fontWeight: 700,
    },
    btnBox: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      marginTop: 30,
      gap: 10,
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
