import { useTheme } from "@/context/theme/ThemeContext";
import { PresetsColors } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import Slider from "@react-native-community/slider";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const audioTracks = [
  require("../../assets/audio/doa-ibu.mp3"),
  require("../../assets/audio/doa-ibu-2.mp3"),
  require("../../assets/audio/doa-ibu-3.mp3"),
];

export default function MotherDoa() {
  const theme = useTheme();
  const { id } = useLocalSearchParams();
  const [trackIndex, setTrackIndex] = useState(0);
  const player = useAudioPlayer(audioTracks[trackIndex]);
  const playerStatus = useAudioPlayerStatus(player);
  const [isLooping, setIsLooping] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const favorite = true;
  const colors = theme?.colors;

  const styles = getStyles(colors);

  const formatTime = (sec: number): string => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const reset = () => {
    setIsLooping(false);
    setIsRepeat(false);
  };

  const handleNextTrack = () => {
    if (trackIndex < audioTracks.length - 1) {
      reset();
      player.seekTo(0);
      setTrackIndex(trackIndex + 1);
    } else {
      reset();
      player.seekTo(0);
      setTrackIndex(0);
    }
  };

  const handlePrevTrack = () => {
    if (trackIndex > 0) {
      reset();
      setTrackIndex(trackIndex - 1);
    } else {
      reset();
      setTrackIndex(audioTracks.length - 1);
    }
  };

  useEffect(() => {
    if (playerStatus.didJustFinish && isLooping) {
      player.seekTo(0);
      player.play();
    }
    if (playerStatus.didJustFinish && !isLooping) {
      handleNextTrack();
    }
  }, [playerStatus.didJustFinish]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/doa-banner.jpg")}
        style={styles.doaImgBox}
        resizeMode="cover"
      />

      <View style={styles.doaInfo}>
        <View>
          <Text style={styles.doaInfoTitle}>Track {trackIndex + 1}</Text>
          <Text style={styles.doaInfoDes}>Doa Track Description</Text>
        </View>
        <Pressable>
          {favorite ? (
            <AntDesign name="heart" size={24} color={colors?.primary} />
          ) : (
            <AntDesign name="hearto" size={24} color={colors?.darkText} />
          )}
        </Pressable>
      </View>

      <View>
        <View style={styles.timeStamp}>
          <Text>{formatTime(playerStatus.currentTime || 0)}</Text>
          <Text>{formatTime(playerStatus.duration || 0)}</Text>
        </View>

        <Slider
          style={{ width: width * 0.9, height: 20 }}
          minimumValue={0}
          maximumValue={playerStatus.duration || 1}
          value={playerStatus.currentTime}
          minimumTrackTintColor={colors?.primary}
          maximumTrackTintColor={colors?.darkText}
          thumbTintColor={colors?.primary}
        />
      </View>

      <View style={styles.controls}>
        <Pressable
          onPress={() => {
            player.seekTo(0);
            player.play();
            setIsRepeat(!isRepeat);
          }}
        >
          <Feather
            name="repeat"
            size={34}
            color={isRepeat ? colors?.primary : colors?.darkText}
          />
        </Pressable>

        <Pressable onPress={handlePrevTrack}>
          <Ionicons
            name="play-skip-back-sharp"
            size={34}
            color={colors?.darkText}
          />
        </Pressable>

        {playerStatus.playing ? (
          <Pressable style={styles.playPause} onPress={() => player.pause()}>
            <AntDesign name="pause" size={28} color={colors?.bodyBackground} />
          </Pressable>
        ) : (
          <Pressable style={styles.playPause} onPress={() => player.play()}>
            <AntDesign name="play" size={28} color={colors?.bodyBackground} />
          </Pressable>
        )}

        <Pressable onPress={handleNextTrack}>
          <Ionicons
            name="play-skip-forward"
            size={34}
            color={colors?.darkText}
          />
        </Pressable>

        <Pressable>
          <Ionicons
            name="shuffle"
            size={34}
            color={isLooping ? colors?.primary : colors?.darkText}
            onPress={() => setIsLooping(!isLooping)}
          />
        </Pressable>
      </View>
    </View>
  );
}

const getStyles = (colors: PresetsColors | undefined) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      width: width * 0.9,
      marginHorizontal: "auto",
    },
    doaImgBox: {
      width: width * 0.9,
      height: 400,
      borderRadius: 20,
    },
    doaInfo: {
      width: width * 0.9,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginTop: 20,
    },
    doaInfoTitle: {
      fontFamily: "Nunito",
      fontSize: 20,
      fontWeight: "700",
      color: colors?.darkText,
    },
    doaInfoDes: {
      fontFamily: "Nunito",
      fontSize: 16,
      color: colors?.darkText,
    },
    timeStamp: {
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 5,
      marginTop: 10,
    },
    controls: {
      width: width * 0.9,
      gap: 30,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 180,
    },
    playPause: {
      width: 60,
      height: 60,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors?.primary,
    },
  });
