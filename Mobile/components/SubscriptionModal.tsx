import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTheme } from "@/context/theme/ThemeContext";
import { PresetsColors } from "@/types";
import Checkbox from "expo-checkbox";
import api from "@/lib/config/axios";
import { useUserInfo } from "@/context/user/userContext";
import Toast from "react-native-toast-message";

interface SubscriptionModalType {
  visibleModal: boolean;
  setVisibleModal: Dispatch<SetStateAction<boolean>>;
}

const width = Dimensions.get("window").width;
export default function SubscriptionModal({
  visibleModal,
  setVisibleModal,
}: SubscriptionModalType) {
  const theme = useTheme();
  const userContext = useUserInfo();
  const colors = theme?.colors;
  const styles = getStyles(colors);
  const [paymentMethod, setPaymentMethod] = useState<"qris" | "gopay">("qris");
  const [amount, setAmount] = useState("25000");
  const [loading, setLoading] = useState(false);
  const [qrUrl, setQrUrl] = useState<string>("");

  const handlePayNow = async () => {
    try {
      setLoading(true);
      const paymentInfo = {
        amount: amount,
        method: paymentMethod,
        userId: userContext?.user?._id,
      };
      if (!paymentInfo.amount || !paymentInfo.method || !paymentInfo.userId) {
        Toast.show({
          type: "error",
          text1: "Some required field missing",
          position: "bottom",
          visibilityTime: 2000,
        });
        return;
      }
      const res = await api.post("/subscription-payment", paymentInfo);
      if (res.status === 201) {
        console.log(res.data.data.redirect_url);
        setQrUrl(res.data.data.redirect_url);
        Toast.show({
          type: "info",
          text1:
            res.data.message ||
            "Subscription payment initiated, awaiting payment",
          position: "bottom",
          visibilityTime: 2000,
        });
      }
    } catch (err: any) {
      console.log("Error", err);
      Toast.show({
        type: "error",
        text1: err.message || "Subscription payment initiated failed",
        position: "bottom",
        visibilityTime: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (paymentMethod === "qris") {
      setAmount("15000");
      return;
    } else {
      setAmount("25000");
      return;
    }
  }, [paymentMethod]);

  return (
    <Modal
      animationType="slide"
      
      visible={visibleModal}
      onRequestClose={() => {
        setVisibleModal(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {qrUrl && (
            <View>
              <Image source={{ uri: qrUrl }} />
            </View>
          )}
          {!qrUrl && (
            <>
              <View style={styles.checkboxContainer}>
                <Text style={styles.checkBoxTitle}>Select Payment Method:</Text>
                <View style={styles.checkBoxs}>
                  <Pressable
                    style={styles.check}
                    onPress={() => setPaymentMethod("qris")}
                  >
                    <Checkbox
                      value={paymentMethod === "qris"}
                      onValueChange={(value) =>
                        value && setPaymentMethod("qris")
                      }
                      color={
                        paymentMethod === "qris" ? colors?.primary : undefined
                      }
                    />
                    <Text style={styles.checkTitle}>QRIS</Text>
                  </Pressable>
                  <Pressable
                    style={styles.check}
                    onPress={() => setPaymentMethod("gopay")}
                  >
                    <Checkbox
                      value={paymentMethod === "gopay"}
                      onValueChange={(value) =>
                        value && setPaymentMethod("gopay")
                      }
                      color={
                        paymentMethod === "gopay" ? colors?.primary : undefined
                      }
                    />
                    <Text style={styles.checkTitle}>GoPay</Text>
                  </Pressable>
                </View>
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.inputLabelText}>
                  Amount will be charge:
                </Text>
                <TextInput
                  readOnly
                  style={styles.input}
                  inputMode="text"
                  value={amount}
                />
              </View>
              <View style={styles.btnBox}>
                <Pressable
                  style={{
                    ...styles.button,
                    backgroundColor: colors?.darkText,
                  }}
                  onPress={() => setVisibleModal(false)}
                >
                  <Text
                    style={{
                      ...styles.textStyle,
                      color: colors?.bodyBackground,
                    }}
                  >
                    Close
                  </Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handlePayNow}>
                  {loading && (
                    <ActivityIndicator
                      size="small"
                      color={colors?.bodyBackground}
                    />
                  )}
                  {!loading && <Text style={styles.textStyle}>Pay Now</Text>}
                </Pressable>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const getStyles = (colors: PresetsColors | undefined) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      margin: 20,
      backgroundColor: colors?.bodyBackground,
      borderRadius: 20,
      padding: 20,
      width: width * 0.8,
      alignItems: "center",
      shadowColor: colors?.darkText,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      paddingHorizontal: 30,
      paddingVertical: 10,
      elevation: 2,
      marginTop: 10,
      backgroundColor: colors?.primary,
    },
    textStyle: {
      color: colors?.bodyBackground,
      fontWeight: "bold",
      textAlign: "center",
      fontFamily: "Nunito",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontFamily: "Nunito",
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
      borderColor: colors?.primary,
      borderRadius: 5,
    },
    inputLabelText: {
      fontFamily: "Nunito",
      fontSize: 16,
      fontWeight: 700,
    },
    checkboxContainer: {
      marginTop: 10,
    },
    checkBoxTitle: {
      fontSize: 16,
      fontWeight: 700,
      marginBottom: 10,
      fontFamily: "Nunito",
      color: colors?.darkText,
    },
    checkBoxs: {
      flexDirection: "row",
      gap: 10,
    },
    check: {
      flexDirection: "row",
      gap: 10,
    },
    checkTitle: {
      fontFamily: "Nunito",
      color: colors?.darkText,
      fontSize: 14,
    },
    btnBox: {
      flexDirection: "row",
      gap: 10,
      marginTop: 10,
    },
  });
