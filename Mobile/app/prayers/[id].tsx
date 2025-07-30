import LoadingComponents from "@/components/LoadingComponents";
import { useTheme } from "@/context/theme/ThemeContext";
import { useUserInfo } from "@/context/user/userContext";
import api from "@/lib/config/axios";
import { AppDispatch, RootState } from "@/store";
import { fetchDoa } from "@/store/doaSlice";
import { fetchDoas } from "@/store/doasSlice";
import { PresetsColors } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import Slider from "@react-native-community/slider";
import { AudioSource, useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
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
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

const { width } = Dimensions.get("window");

let audioTracks: (AudioSource | undefined)[] = [];

export default function MotherDoa() {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);
  const { id }: { id: string } = useLocalSearchParams();
  const [trackIndex, setTrackIndex] = useState(0);
  const player = useAudioPlayer(audioTracks[trackIndex]);
  const playerStatus = useAudioPlayerStatus(player);
  const [isLooping, setIsLooping] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const userContext = useUserInfo();
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: Doa,
    loading: doaLoading,
    error: doaError,
  } = useSelector((state: RootState) => state.doa);

  const {
    items: doas,
    loading: doasLoading,
    error: doasError,
  } = useSelector((state: RootState) => state.doas);

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
      // dispatch(fetchDoa(doas?.data[trackIndex]._id!));
      reset();
      player.seekTo(0);
      setTrackIndex(trackIndex + 1);
    } else {
      // dispatch(fetchDoa(doas?.data[trackIndex]._id!));
      reset();
      player.seekTo(0);
      setTrackIndex(0);
    }
  };

  const handlePrevTrack = () => {
    if (trackIndex > 0) {
      dispatch(fetchDoa(doas?.data[trackIndex]._id!));
      reset();
      setTrackIndex(trackIndex - 1);
    } else {
      dispatch(fetchDoa(doas?.data[trackIndex]._id!));
      reset();
      setTrackIndex(audioTracks.length - 1);
    }
  };

  const handelLoved = async () => {
    try {
      const body = {
        userId: userContext?.user._id,
      };
      const res = await api.put(`/love-doa/${id}`, body);
      if (res.status === 201) {
        dispatch(fetchDoa(id));
        Toast.show({
          type: "success",
          text1: "Thanks, for loved this doa",
          position: "bottom",
          visibilityTime: 2000,
        });
        return;
      }
    } catch (err) {
      console.error(err);
      Toast.show({
        type: "error",
        text1: "Loved added filed",
        position: "bottom",
        visibilityTime: 2000,
      });
    } finally {
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

  useEffect(() => {
    if (id) {
      dispatch(fetchDoa(id));
    }
  }, []);

  useEffect(() => {
    if (trackIndex < audioTracks.length && trackIndex >= 0) {
      dispatch(fetchDoa(doas?.data[trackIndex]._id!));
    }
  }, [trackIndex]);

  useEffect(() => {
    dispatch(fetchDoas("uploaded"));
  }, []);

  useEffect(() => {
    if (doas?.data) {
      doas.data.map((item, index) => {
        if (item.audioLink && item._id) {
          audioTracks.push({
            uri: item.audioLink,
            assetId: index,
          });
        }
      });
    }
  }, []);

  if (doaLoading) {
    return <LoadingComponents />;
  }

  const isFavorite =
    Doa?.data &&
    Doa.data.favoriteUsers &&
    Doa?.data.favoriteUsers.includes(userContext?.user._id);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: Doa?.data.thumbnail }}
        style={styles.doaImgBox}
        resizeMode="cover"
      />

      <View style={styles.doaInfo}>
        <View>
          <Text style={styles.doaInfoTitle}>{Doa?.data.title}</Text>
          <Text style={styles.doaInfoDes}>{Doa?.data.shortDes}</Text>
        </View>
        <View>
          {isFavorite ? (
            <Pressable>
              <AntDesign name="heart" size={24} color={colors?.primary} />
            </Pressable>
          ) : (
            <Pressable onPress={handelLoved}>
              <AntDesign name="hearto" size={24} color={colors?.darkText} />
            </Pressable>
          )}
        </View>
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
