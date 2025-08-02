import RecordingList from "@/components/RecordingList";
import { useTheme } from "@/context/theme/ThemeContext";
import { formatTime } from "@/lib";
import { AppDispatch, RootState } from "@/store";
import { fetchUser } from "@/store/userSlice";
import { PresetsColors } from "@/types";
import { useSession } from "@clerk/clerk-expo";
import { Entypo } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import * as FileSystem from "expo-file-system";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const width = Dimensions.get("window").width;

export default function RecordingPage() {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);
  const [barHeights, setBarHeights] = useState(
    new Array(20).fill(0).map(() => Math.floor(Math.random() * 200) + 20)
  );
  const [recordings, setRecordings] = useState<string[]>([]);
  const intervalRef = React.useRef<number | null>(null);
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);
  const [isPremiumMember, setIsPremiumMember] = useState(false);
  const { session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.user);

  const record = async () => {
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
  };

  const stopRecording = async () => {
    await audioRecorder.stop();

    if (audioRecorder.uri) {
      const userId = items?.data._id; // Your current user's ID
      const userDir = `${FileSystem.documentDirectory}recordings/${userId}/`;
      const fileName = `recording_${Date.now()}.m4a`;
      const newPath = `${userDir}${fileName}`;

      try {
        // Create user-specific directory if it doesn't exist
        const dirInfo = await FileSystem.getInfoAsync(userDir);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(userDir, { intermediates: true });
        }

        // Move the recorded file to the user directory
        await FileSystem.moveAsync({
          from: audioRecorder.uri,
          to: newPath,
        });

        console.log("Recording saved to:", newPath);
        await listFiles(); // Refresh UI or state with new files
      } catch (error) {
        console.error("Failed to save recording:", error);
      }
    }
  };

  const listFiles = async () => {
    const userId = items?.data._id;
    const userDir = `${FileSystem.documentDirectory}recordings/${userId}/`;
    try {
      const getInfo = await FileSystem.getInfoAsync(userDir);
      if (getInfo.exists) {
        const files = await FileSystem.readDirectoryAsync(userDir);
        const filteredFile = files.filter((file) => file.includes(".m4a"));
        setRecordings(filteredFile);
      }
    } catch (err) {
      console.error("Failed to list files:", err);
    }
  };

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert("Permission to access microphone was denied");
      }

      setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });

      await listFiles();
    })();
  }, []);

  useEffect(() => {
    if (recorderState.isRecording) {
      intervalRef.current = setInterval(() => {
        setBarHeights(
          barHeights.map(() => Math.floor(Math.random() * 200) + 20)
        );
      }, 300);
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setBarHeights(new Array(20).fill(150));
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [recorderState.isRecording]);

  useEffect(() => {
    if (session?.publicUserData.identifier) {
      dispatch(fetchUser(session?.publicUserData.identifier));
    }
  }, [session?.publicUserData.identifier]);

  useEffect(() => {
    if (items?.data.subscriptionType) {
      setIsPremiumMember(items?.data.subscriptionType === "premium");
    }
  }, [items?.data.subscriptionType]);

  const canRecord = isPremiumMember ? 30 : 2;
  return (
    <ScrollView>
      <View style={styles.container}>
        {recordings.length >= canRecord && (
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
                  If you need access this feature, You need to become a premium
                  member
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
              <Pressable
                style={{
                  ...styles.btnMember,
                  backgroundColor: colors?.darkText,
                }}
              >
                <Text
                  style={{
                    ...styles.blockMessage,
                    color: colors?.bodyBackground,
                  }}
                  onPress={() => router.push("/subscription")}
                >
                  🎁 Donate Something 🧡
                </Text>
              </Pressable>
            </View>
          </View>
        )}
        <View style={styles.stateLineContainer}>
          <View style={styles.stateLineBox}>
            {barHeights.map((height, index) => (
              <View
                key={index}
                style={{
                  width: 3,
                  height: height,
                  backgroundColor: "#000",
                  borderRadius: 50,
                }}
              />
            ))}
          </View>
        </View>

        <View style={styles.recordActions}>
          <Text style={styles.timingText}>
            {formatTime(recorderState.durationMillis)}
          </Text>

          <View style={styles.iconsBox}>
            <Pressable
              onPress={recorderState.isRecording ? stopRecording : record}
            >
              {recorderState.isRecording ? (
                <AntDesign name="pause" size={70} color={colors?.darkText} />
              ) : (
                <MaterialCommunityIcons
                  name="record-circle"
                  size={80}
                  color={colors?.primary}
                />
              )}
            </Pressable>
          </View>
        </View>
      </View>
      <RecordingList
        recordings={recordings}
        refreshRecordings={listFiles}
        userId={items?.data._id!}
      />
    </ScrollView>
  );
}

const getStyles = (colors: PresetsColors | undefined) =>
  StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    stateLineContainer: {
      width: width * 1,
      borderTopWidth: 2,
      borderBottomWidth: 2,
      paddingVertical: 20,
      borderColor: colors?.primary,
      marginTop: 50,
    },
    stateLineBox: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: width * 0.9,
      marginHorizontal: "auto",
      height: 220,
    },
    recordActions: {
      width: width * 0.9,
      marginHorizontal: "auto",
      marginTop: 20,
    },
    timingText: {
      fontFamily: "Nunito",
      textAlign: "center",
      fontSize: 54,
      fontWeight: "500",
      color: colors?.darkText,
    },
    iconsBox: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      marginHorizontal: "auto",
      gap: 30,
      marginTop: 120,
      paddingBottom: 30,
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
