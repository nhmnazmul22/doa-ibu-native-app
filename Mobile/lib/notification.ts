import * as Notifications from "expo-notifications";
import { getNotificationSetting } from "@/lib";

export const scheduleNotification = async (
  message: string,
  hour: number,
  minute: number
) => {
  // Ask for permissions
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    alert("Permission not granted!");
    return;
  }
  // Schedule notification
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "⏰ Reminder",
      body: message,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
      hour: hour,
      minute: minute,
      repeats: true,
    },
  });
};

export const applyNotificationSettings = async () => {
  const settings = await getNotificationSetting();
  if (settings && settings.showNotification) {
    const hour = new Date(settings.notificationTime).getHours();
    const minute = new Date(settings.notificationTime).getMinutes();
    await scheduleNotification(settings.notificationMsg, hour, minute);
  }
};
