import AsyncStorage from "@react-native-async-storage/async-storage";

// Convert Milliseconds to a formatted time string
export function formatTime(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const format = (num: number) => String(num).padStart(2, "0");
  return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
}

export function validateEmail(email: string) {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string) {
  const minLength = 8;
  const hasUppercase = /[A-Z]/;
  const hasLowercase = /[a-z]/;
  const hasNumber = /[0-9]/;
  const hasSpecialChar = /[!@#$%^&*]/;

  if (password.length < minLength) {
    return {
      success: false,
      message: "Password must be at least " + minLength + " characters long.",
    };
  }
  if (!hasUppercase.test(password)) {
    return {
      success: false,
      message: "Password must contain at least one uppercase letter.",
    };
  }
  if (!hasLowercase.test(password)) {
    return {
      success: false,
      message: "Password must contain at least one lowercase letter.",
    };
  }
  if (!hasNumber.test(password)) {
    return {
      success: false,
      message: "Password must contain at least one number.",
    };
  }
  if (!hasSpecialChar.test(password)) {
    return {
      success: false,
      message:
        "Password must contain at least one special character (!@#$%^&*).",
    };
  }
  return {
    success: true,
    message: "Password is good",
  };
}

export const getFormattedTimeAndGreeting = () => {
  const now = new Date();

  // Format date: MM/DD/YYYY
  const date = now.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  // Format time: h:mmAM/PM
  const time = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // Greeting logic
  const hour = now.getHours();
  let greeting = "Hello";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  return {
    dateTime: `${date}, ${time}`,
    greeting,
  };
};

export const getNotificationSetting = async () => {
  try {
    const settings = await AsyncStorage.getItem("notificationSettings");
    if (settings) {
      return JSON.parse(settings);
    }
    return null;
  } catch (err) {
    console.error("Failed to load notification settings", err);
    return null;
  }
};
