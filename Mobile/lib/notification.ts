import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import { getNotificationSetting } from "@/lib";

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
  scheduleTime: string
) => {
  // Cancel previous notification if exists
  const existingId = await AsyncStorage.getItem("dailyNotificationId");
  if (existingId) {
    await Notifications.cancelScheduledNotificationAsync(existingId);
  }

  const date = new Date(scheduleTime);
  const hour = date.getHours();
  const minute = date.getMinutes();

  const trigger: Notifications.CalendarTriggerInput = {
    type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
    hour,
    minute,
    repeats: true,
  };

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Reminder",
      body: message,
      sound: true,
    },
    trigger,
  });

  await AsyncStorage.setItem("dailyNotificationId", id);
  await AsyncStorage.setItem(
    "notificationSettings",
    JSON.stringify({ message, scheduleTime })
  );
};
