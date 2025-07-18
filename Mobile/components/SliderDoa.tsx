import * as React from "react";
import { Dimensions, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import DoaData from "@/data/dao.json";
import Doa from "./Doa";

const data = DoaData;
const width = Dimensions.get("window").width;

function SliderDoa() {
  const COUNT = 2.5;

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop
        autoPlay
        autoPlayInterval={1500}
        vertical={false}
        width={width / COUNT}
        height={400}
        style={{
          width: width,
        }}
        data={data}
        renderItem={({ item, index }) => (
          <Doa
            key={item._id.toString()}
            _id={item._id.toString()}
            title={item.title}
            thumbnail={item.thumbnail}
            shortDes={item.shortDes}
          />
        )}
      />
    </View>
  );
}

export default SliderDoa;
