import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import doa from "@/data/dao.json";
import DoaItem from "./DoaItem";

const { width } = Dimensions.get("window");

export default function DoaList() {
  const data = doa;

  return (
    <View style={styles.container}>
      {data ? (
        data.map((item, index) => (
          <DoaItem
            key={item._id.toString()}
            _id={item._id.toString()}
            thumbnail={item.thumbnail}
            title={item.title}
            shortDes={item.shortDes}
            favorite={item.favorite}
            duration={item.duration}
          />
        ))
      ) : (
        <Text>No Data Found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    width: width * 0.9,
    marginHorizontal: "auto",
  },
});
