// app/callback.js
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/payment-success");
    }, 1000);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Payment Verified. Redirecting...</Text>
    </View>
  );
}
