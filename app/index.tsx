import {KeyboardAvoidingView, Platform } from "react-native"
import App from "./App"

export default function Index() {
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <App />
    </KeyboardAvoidingView>
  );
}
