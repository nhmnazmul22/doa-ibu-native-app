import { useTheme } from "@/context/theme/ThemeContext";
import { PresetsColors } from "@/types";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import DoaItem from "./DoaItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchDoas } from "@/store/doasSlice";
import LoadingComponents from "./LoadingComponents";
const { width } = Dimensions.get("window");

export default function DoaList() {
  const theme = useTheme();
  const colors = theme?.colors;
  const styles = getStyles(colors);
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.doas
  );

  const { items: DoasRes } = useSelector(
    (state: RootState) => state.doasByMother
  );

  useEffect(() => {
    dispatch(fetchDoas("uploaded"));
  }, []);

  if (loading) {
    return (
      <View
        style={{
          height: 100,
          justifyContent: "center",
          alignItems: "center",
          width: width * 0.8,
          marginHorizontal: "auto",
          marginLeft: 30,
        }}
      >
        <LoadingComponents />
      </View>
    );
  }


  return (
    <View style={styles.container}>
      {items?.data && items?.data.length > 0 ? (
        items?.data.map((item, index) => (
          <DoaItem
            key={item?._id?.toString()}
            _id={item?._id?.toString()!}
            thumbnail={item.thumbnail || ""}
            title={item.title}
            shortDes={item.shortDes}
            favoriteUsers={item.favoriteUsers!}
            duration={item.duration || ""}
          />
        ))
      ) : (
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Nunito",
            fontSize: 16,
            fontStyle: "italic",
            color: colors?.darkText,
          }}
        >
          No Data Found
        </Text>
      )}
    </View>
  );
}

const getStyles = (colors: PresetsColors | undefined) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 20,
      width: width * 0.9,
      marginHorizontal: "auto",
    },
  });
