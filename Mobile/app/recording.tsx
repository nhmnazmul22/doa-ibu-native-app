import { useTheme } from "@/context/theme/ThemeContext";
import { formatTime } from "@/lib";
import { PresetsColors } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import * as FileSystem from "expo-file-system";
import React, { useEffect } from "react";
import {
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const width = Dimensions.get("window").width;

export default function RecordingPage() {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);

  const [barHeights, setBarHeights] = React.useState(
    new Array(25).fill(0).map(() => Math.floor(Math.random() * 200) + 20)
  );

  const intervalRef = React.useRef<number | null>(null);
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);

  const record = async () => {
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
  };

  const listFiles = async () => {
    if (FileSystem.documentDirectory === null) {
      // Handle the case if documentDirectory is null
      console.error("documentDirectory is null!");
      return;
    }
    const files = await FileSystem.readDirectoryAsync(
      FileSystem.documentDirectory
    );
    console.log("Files:", files);
  };

  const stopRecording = async () => {
    // The recording will be available on `audioRecorder.uri`.
    await audioRecorder.stop();
    if (audioRecorder.uri) {
      const fileName = `recording_${Date.now()}.m4a`;
      const newPath = FileSystem.documentDirectory + fileName;

      try {
        await FileSystem.moveAsync({
          from: audioRecorder.uri,
          to: newPath,
        });

        console.log("Recording saved to:", newPath);
        listFiles();
        // Here, you can also update a list or database with this newPath
      } catch (error) {
        console.error("Failed to save recording:", error);
      }
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
      setBarHeights(new Array(25).fill(220));
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [recorderState.isRecording]);

  return (
    <View style={styles.container}>
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
          <Pressable>
            <Feather name="trash-2" size={40} color={colors?.darkText} />
          </Pressable>
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
          <Pressable>
            <Fontisto name="save" size={32} color={colors?.darkText} />
          </Pressable>
        </View>
      </View>
    </View>
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
      paddingVertical: 80,
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
    stateLine: {
      width: 3,
      height: 220,
      backgroundColor: colors?.darkText,
      borderRadius: 50,
    },
    stateLine2: {
      width: 3,
      height: 110,
      backgroundColor: colors?.darkText,
      borderRadius: 50,
    },
    stateLine3: {
      width: 3,
      height: 55,
      backgroundColor: colors?.darkText,
      borderRadius: 50,
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
      marginTop: 150,
    },
  });
