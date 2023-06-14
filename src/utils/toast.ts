import { ToastAndroid } from "react-native";

export function showToast(Message: string) {
  ToastAndroid.show(Message, 3000);
}
