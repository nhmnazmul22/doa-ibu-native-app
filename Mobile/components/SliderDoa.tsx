import * as React from "react";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Doa from "./Doa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchDoas } from "@/store/doasSlice";
import LoadingComponents from "./LoadingComponents";

const width = Dimensions.get("window").width;

function SliderDoa() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.doas
  );
  const COUNT = 2.5;

  React.useEffect(() => {
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
    <View style={{ flex: 1 }}>
      {items?.data && items?.data.length > 0 ? (
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
          data={items?.data}
          renderItem={({ item, index }) => (
            <Doa
              key={item?._id?.toString()}
              _id={item?._id?.toString()!}
              title={item.title}
              thumbnail={item.thumbnail ? item.thumbnail : ""}
              shortDes={item.shortDes}
            />
          )}
        />
      ) : (
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Nunito",
            fontSize: 16,
            fontStyle: "italic",
            color: "#000000",
            width: width * 0.9,
          }}
        >
          No Data Found
        </Text>
      )}
    </View>
  );
}

export default SliderDoa;
