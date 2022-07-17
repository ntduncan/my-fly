import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useRef, useState } from "react";
import UpdateContext from "./contexts/update-context";
import Navigator from "./routes/homeStack";
import DropdownAlert from "react-native-dropdownalert";

export default function App() {
  let dropDownAlertRef = useRef();
  const [updated, setUpdated] = useState(false);

  return (
    <UpdateContext.Provider value={{updated: updated}}>
      <SafeAreaView style={styles.container}>
        <Navigator dropDownAlertRef={dropDownAlertRef} />
      </SafeAreaView>
    </UpdateContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
});
