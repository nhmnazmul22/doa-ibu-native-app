import LoadingComponents from "@/components/LoadingComponents";
import { useTheme } from "@/context/theme/ThemeContext";
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

export default function MotherDoa() {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);
  const { id }: { id: string } = useLocalSearchParams();

  const [trackIndex, setTrackIndex] = useState(0);
  const [audioTracks, setAudioTracks] = useState<AudioSource[]>([]);
  const [isLooping, setIsLooping] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const currentTrack = audioTracks[trackIndex];
  const player = useAudioPlayer(currentTrack);
  const playerStatus = useAudioPlayerStatus(player);
  const dispatch = useDispatch<AppDispatch>();
  const { items: user } = useSelector((state: RootState) => state.user);

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
    if (audioTracks.length === 0) return;

    reset();
    player.seekTo(0);

    if (trackIndex < audioTracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  const handlePrevTrack = () => {
    if (audioTracks.length === 0) return;

    reset();

    if (trackIndex > 0) {
      setTrackIndex(trackIndex - 1);
    } else {
      setTrackIndex(audioTracks.length - 1);
    }
  };

  const handelLoved = async () => {
    try {
      const body = {
        userId: user?.data._id,
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
      }
    } catch (err) {
      console.error(err);
      Toast.show({
        type: "error",
        text1: "Loved added failed",
        position: "bottom",
        visibilityTime: 2000,
      });
    }
  };

  useEffect(() => {
    if (playerStatus.didJustFinish && isLooping) {
      player.seekTo(0);
      player.play();
    } else if (playerStatus.didJustFinish && !isLooping) {
      handleNextTrack();
    }
  }, [playerStatus.didJustFinish]);

  useEffect(() => {
    dispatch(fetchDoas("uploaded"));
  }, []);

  useEffect(() => {
    if (doas?.data) {
      const tracks = doas.data
        .filter((item) => item.audioLink && item._id)
        .map((item, index) => ({
          uri: item.audioLink,
          assetId: index,
        }));
      setAudioTracks(tracks);

      // ✅ Sync the track index to the ID from route
      const foundIndex = doas.data.findIndex((item) => item._id === id);
      if (foundIndex !== -1) {
        setTrackIndex(foundIndex);
      }
    }
  }, [doas]);

  useEffect(() => {
    if (
      audioTracks.length > 0 &&
      trackIndex >= 0 &&
      trackIndex < audioTracks.length
    ) {
      const doaId = doas?.data?.[trackIndex]?._id;
      if (doaId) {
        console.log("track:", trackIndex);
        dispatch(fetchDoa(doaId));
      }
    }
  }, [trackIndex, audioTracks]);

  useEffect(() => {
    if (id) {
      dispatch(fetchDoa(id));
    }
  }, []);

  if (doaLoading || doasLoading) {
    return <LoadingComponents />;
  }

  const isFavorite =
    Doa?.data && Doa.data.favoriteUsers && user?.data._id
      ? Doa.data.favoriteUsers.includes(user.data._id)
      : false;

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

        <Pressable onPress={() => setIsLooping(!isLooping)}>
          <Ionicons
            name="shuffle"
            size={34}
            color={isLooping ? colors?.primary : colors?.darkText}
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
      height: "40%",
      borderRadius: 20,
      elevation: 2,
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
