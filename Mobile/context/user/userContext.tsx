import { AppDispatch, RootState } from "@/store";
import { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { fetchUser } from "@/store/userSlice";
import { useSession } from "@clerk/clerk-expo";

interface UserContextType {
  user: any;
  mother: any;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { session } = useSession();
  const userInfo = useSelector((state: RootState) => state.user.items?.data);
  const motherInfo = useSelector(
    (state: RootState) => state.mother.items?.data
  );

  useEffect(() => {
    if (session?.publicUserData.identifier) {
      dispatch(fetchUser(session?.publicUserData.identifier));
      dispatch(fetchUser(session.publicUserData.identifier));
    }
  }, [session]);

  return (
    <UserContext value={{ user: userInfo, mother: motherInfo }}>
      {children}
    </UserContext>
  );
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
