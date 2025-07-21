import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
const profileImage = require("@/assets/images/doa-banner.jpg");
const badgeImg = require("@/assets/images/badge.png");
const width = Dimensions.get("window").width;

const data = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export default function SettingPage() {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.secTitle}>Profile Settings,</Text>
          <View style={styles.imageBox}>
            <Image source={profileImage} style={styles.profileImage} />
            <View style={{ ...styles.badgeImgBox, display: "none" }}>
              <SimpleLineIcons name="badge" size={20} color="#FFF9F5" />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabelText}>Name:</Text>
              <TextInput
                style={styles.input}
                inputMode="text"
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="Enter your name"
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabelText}>Phone:</Text>
              <TextInput
                style={styles.input}
                inputMode="tel"
                value={phone}
                onChangeText={(text) => setPhone(text)}
                placeholder="Enter your phone number"
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabelText}>Email:</Text>
              <TextInput
                style={styles.input}
                inputMode="email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Enter your email"
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabelText}>Gender:</Text>
              <Dropdown
                style={styles.dropdown}
                data={data}
                labelField="label"
                valueField="value"
                placeholder="Select gender"
                value={gender}
                onChange={(item: any) => setGender(item.value)}
              />
            </View>
            <View style={styles.btnBox}>
              <Pressable style={styles.outlineBtn}>
                <Text style={styles.btnText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.btnPrimary}>
                <Text style={{ ...styles.btnText, ...styles.primaryBtnText }}>
                  Save
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    // width: width * 0.9,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 20,
  },
  secTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: "Nunito",
    color: "#2E2E2E",
  },
  imageBox: {
    position: "relative",
    width: 150,
  },
  badgeImgBox: {
    position: "absolute",
    bottom: 18,
    right: 10,
    transform: "rotate(-20deg)",
    backgroundColor: "#A8C3A0",
    padding: 8,
    borderRadius: 50,
  },
  inputContainer: {
    width: width * 0.9,
  },
  inputBox: {
    marginTop: 10,
  },
  input: {
    fontFamily: "Nunito",
    fontSize: 16,
    height: 40,
    marginTop: 5,
    borderWidth: 1,
    padding: 10,
    borderColor: "#D26C7A",
    borderRadius: 5,
  },
  inputLabelText: {
    fontFamily: "Nunito",
    fontSize: 16,
    fontWeight: 700,
  },
  dropdown: {
    height: 40,
    borderColor: "#D26C7A",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontFamily: "Nunito",
    fontSize: 16,
    fontWeight: 600,
  },
  btnBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 30,
    gap: 20,
  },
  outlineBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#D26C7A",
    borderRadius: 10,
  },
  btnPrimary: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#D26C7A",
    borderRadius: 10,
  },
  btnText: {
    fontFamily: "Nunito",
    fontSize: 16,
    fontWeight: 700,
  },
  primaryBtnText: {
    color: "#ffffff",
  },
});
