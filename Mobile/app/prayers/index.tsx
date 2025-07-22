import DoaList from "@/components/DoaList";
import SliderDoa from "@/components/SliderDoa";
import { useTheme } from "@/context/theme/ThemeContext";
import { PresetsColors } from "@/types";
import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const data = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

const { width } = Dimensions.get("window");

export default function PrayersPage() {
  const theme = useTheme();
  const colors = theme?.colors;

  const styles = getStyles(colors);

  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.slider}>
          <SliderDoa />
        </View>
        <View style={styles.doaList}>
          <View style={styles.doaListHeader}>
            <View>
              <Text style={styles.doaTitle}>All Prayers / Doa Ibu,</Text>
              <View style={styles.horizontalLine}></View>
            </View>
            <View>
              <Dropdown
                style={styles.dropdown}
                data={data}
                labelField="label"
                valueField="value"
                placeholder="Select Ibu"
                value={selectedValue}
                onChange={(item: any) => setSelectedValue(item.value)}
              />
            </View>
          </View>
          <View>
            <DoaList />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const getStyles = (colors: PresetsColors | undefined) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    slider: {
      height: 280,
      width: "100%",
    },
    doaList: {
      width: width * 0.9,
      alignSelf: "center",
      marginTop: 20,
    },
    doaListHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    doaTitle: {
      fontFamily: "Nunito",
      fontSize: 20,
      fontWeight: "700",
      marginBottom: 5,
    },
    horizontalLine: {
      width: width * 0.25,
      marginBottom: 20,
      height: 5,
      backgroundColor: colors?.primary,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
    },
    dropdown: {
      height: 40,
      width: width * 0.3,
      borderColor: colors?.darkText,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      fontFamily: "Nunito",
      fontSize: 14,
      fontWeight: 600,
    },
  });
