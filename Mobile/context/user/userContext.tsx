import { AppDispatch, RootState } from "@/store";
import { User } from "@/types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decodedToken } from "@/lib/token";
import Toast from "react-native-toast-message";
import { fetchUser } from "@/store/userSlice";

interface UserContextType {
  user: any;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [email, setEmail] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.user.items?.data);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      const obj = decodedToken(token);
      setEmail(obj.email);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (email) {
      dispatch(fetchUser(email));
    }
  }, [email]);

  return <UserContext value={{ user: userInfo }}>{children}</UserContext>;
}

export const useUserInfo = () => {
  const context = useContext(UserContext);
  if (!context) {
    Toast.show({
      type: "info",
      text1: `useUserInfo must be used within ThemeProvider`,
      position: "bottom",
      visibilityTime: 2000,
    });
    return;
  }
  return context;
};
