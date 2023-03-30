import { Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export function DoneButton({ name, size, color, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <MaterialIcons name={name} size={size} color={color} />
    </Pressable>
  );
}

// export default DoneButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
