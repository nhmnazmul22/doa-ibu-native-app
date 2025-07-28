import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";

// Ask permission on startup
export const setupNotificationPermissions = async () => {
  if (Device.isDevice) {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission for notifications not granted!");
    }
  } else {
    alert("Must use a physical device for notifications");
  }
};

// Schedule daily notification
export const scheduleDailyNotification = async (
  message: string,
  scheduleTime: string // ISO string e.g. "2025-07-28T10:50:00.000Z"
) => {
  const existingId = await AsyncStorage.getItem("dailyNotificationId");
  if (existingId) {
    await Notifications.cancelScheduledNotificationAsync(existingId);
  }

  const date = new Date(scheduleTime);

  await AsyncStorage.setItem(
    "notificationSettings",
    JSON.stringify({ message, scheduleTime })
  );

  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Reminder",
        body: message,
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: date.getHours(),
        minute: date.getMinutes(),
      },
    });

    await AsyncStorage.setItem("dailyNotificationId", notificationId);
    console.log(
      "Scheduled notification with calendar trigger:",
      notificationId
    );
  } catch (err) {
    console.error("Failed to schedule notification:", err);
  }
};
