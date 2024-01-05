import { StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

export default function AppButton({ title, onPress, styles, txtStyles }:
  { title: string, onPress: () => void, styles: StyleProp<ViewStyle>, txtStyles?: StyleProp<TextStyle> }) {
  const txtStyle: StyleProp<TextStyle> = { textAlign: 'center', color: 'white', fontWeight: '600', fontSize: 16 };
  const touchStyle: StyleProp<ViewStyle> = { backgroundColor: '#f77f00', borderRadius: 2, padding: 8 };
  return (
    <TouchableOpacity activeOpacity={0.9} style={[touchStyle, styles]} onPress={onPress}>
      <Text style={[txtStyle, txtStyles]}>{title}</Text>
    </TouchableOpacity>
  );
}