import { Link } from "expo-router";
import { Text, View ,StyleSheet} from "react-native";

export default function Index() {
  return (
    <View
      style={styles.view}
    >

      <Text>Hello </Text>
     
    </View>
  );
}

const styles = StyleSheet.create({
  view:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navButton: {
    width: 100,
    height: 20,
    backgroundColor: "coral",
    textAlign: "center",
    borderRadius: 5,
  }

})
