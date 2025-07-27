// app/payment-success.js
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function PaymentSuccess() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 22, marginBottom: 10 }}>
        ✅ Payment Successful!
      </Text>
      <Button title="Go Home" onPress={() => router.replace("/")} />
    </View>
  );
}
