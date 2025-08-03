import { useTheme } from "@/context/theme/ThemeContext";
import { PresetsColors } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { requireNativeModule } from "expo-modules-core";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import LoadingComponents from "./LoadingComponents";

const { AudioPlayer } = requireNativeModule("ExpoAudio");

export default function RecordingList({
  recordings,
  refreshRecordings,
  userId,
}: {
  recordings: string[];
  refreshRecordings: () => void;
  userId: string;
}) {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);
  const [loading, setLoading] = useState(false);
  const [playingFile, setPlayingFile] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<any | null>(null);

  const playbackListenerRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (playbackListenerRef.current && playerRef.current) {
        playerRef.current.removeListener(
          "playbackStatusUpdate",
          playbackListenerRef.current
        );
      }
      if (playerRef.current) {
        playerRef.current.remove();
        playerRef.current = null;
      }
    };
  }, []);

  const playAudio = async (filename: string) => {
    const fileUri = `${FileSystem.documentDirectory}recordings/${userId}/${filename}`;

    try {
      if (playerRef.current) {
        if (playbackListenerRef.current && playerRef.current) {
          playerRef.current.removeListener(
            "playbackStatusUpdate",
            playbackListenerRef.current
          );
        }
        playerRef.current.remove();
        playerRef.current = null;
        setPlayingFile(null);
        setProgress(0);
        setDuration(0);
      }

      const player = new AudioPlayer({ uri: fileUri }, 500);
      playerRef.current = player;

      const onPlaybackStatusUpdate = (status: any) => {
        if (!status.isLoaded) return;

        setProgress(status.currentTime ?? 0);
        setDuration(status.duration ?? 0);

        if (status.didJustFinish) {
          if (playerRef.current) {
            playerRef.current.removeListener(
              "playbackStatusUpdate",
              onPlaybackStatusUpdate
            );
            playerRef.current.remove();
            playerRef.current = null;
          }
          setPlayingFile(null);
          setProgress(0);
          setDuration(0);
        }
      };

      playbackListenerRef.current = onPlaybackStatusUpdate;

      player.addListener("playbackStatusUpdate", onPlaybackStatusUpdate);
      player.play();
      setPlayingFile(filename);
    } catch (error) {
      console.error("Error playing audio:", error);
      Toast.show({
        type: "error",
        text1: "Playback error",
        text2: `${error}`,
        position: "bottom",
      });
    }
  };

  const pauseAudio = () => {
    if (playerRef.current) {
      playerRef.current.pause();
      setPlayingFile(null);
    }
  };

  const togglePlayback = (filename: string) => {
    if (playingFile === filename) {
      pauseAudio();
    } else {
      playAudio(filename);
    }
  };

  const deleteRecording = async (fileName: string) => {
    try {
      setLoading(true);
      const fileUri = `${FileSystem.documentDirectory}recordings/${userId}/${fileName}`;
      console.log(fileUri);
      await FileSystem.deleteAsync(fileUri, { idempotent: true });
      Toast.show({
        type: "success",
        text1: "Record Delete successful",
        position: "bottom",
        visibilityTime: 2000,
      });
      refreshRecordings();

      if (playingFile === fileName) {
        if (playerRef.current) {
          if (playbackListenerRef.current) {
            playerRef.current.removeListener(
              "playbackStatusUpdate",
              playbackListenerRef.current
            );
          }
          playerRef.current.remove();
          playerRef.current = null;
        }
        setPlayingFile(null);
        setProgress(0);
        setDuration(0);
      }
    } catch (error: any) {
      console.log("Failed to delete file:", error);
      Toast.show({
        type: "error",
        text1: error.message || "Recording delete failed",
        position: "bottom",
        visibilityTime: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  if (loading) {
    return (
      <View style={{ marginTop: 50 }}>
        <LoadingComponents />
      </View>
    );
  }

  return (
    <View style={{ width: "100%", padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Saved Recordings
      </Text>
      <View style={{ gap: 10 }}>
        {recordings.length > 0 ? (
          recordings.map((file, idx) => (
            <View key={idx} style={styles.container}>
              <View style={styles.recordBox}>
                <View>
                  <Text style={styles.recordText}>{file}</Text>
                  {playingFile === file && duration > 0 && (
                    <Text style={[styles.recordText, { fontSize: 12 }]}>
                      {formatTime(progress)} / {formatTime(duration)}
                    </Text>
                  )}
                </View>
                <View style={styles.recordBox}>
                  <Pressable onPress={() => togglePlayback(file)}>
                    <FontAwesome
                      name={playingFile === file ? "pause" : "play"}
                      size={24}
                      color={colors?.bodyBackground}
                    />
                  </Pressable>
                  <Pressable onPress={() => deleteRecording(file)}>
                    <FontAwesome
                      name="trash"
                      size={24}
                      color={colors?.bodyBackground}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.recordText}>No Recording data </Text>
        )}
      </View>
    </View>
  );
}

const getStyles = (colors: PresetsColors | undefined) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors?.primary,
      padding: 10,
      borderRadius: 5,
    },
    recordBox: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10,
    },
    recordText: {
      fontSize: 16,
      fontFamily: "Nunito",
      fontWeight: "500",
      color: colors?.bodyBackground,
    },
  });
