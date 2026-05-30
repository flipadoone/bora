import { Pressable, Text, StyleSheet } from "react-native";

type BoraButtonProps = {
  title: string;
  onPress: () => void;
};

export default function BoraButton({ title, onPress }: BoraButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
    width: "100%",
    paddingVertical: 18,
    borderRadius: 999,
    backgroundColor: "rgba(182, 221, 195, 0.18)",
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.75)",
    alignItems: "center",
    shadowColor: "#22C55E",
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
  },
  text: {
    color: "#D8FFE8",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 1,
  },
});