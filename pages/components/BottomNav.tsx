import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import AppButton from "./AppButton";
import pages from "../pages";

export default function BottomNav({ pageIdx, onPageChange }: { pageIdx: number, onPageChange: (pageIdx: number) => void }) {
  const getAdditionalStyle = (idx: number): StyleProp<ViewStyle> => pageIdx === idx ? { backgroundColor: '#d62828' } : {};
  const style = { flex: 1, borderRadius: 0, padding: 12 };
  const getStyle = (idx: number) => [style, getAdditionalStyle(idx)];
  const getTxtStyle = (idx: number): StyleProp<TextStyle> => pageIdx === idx ? { fontWeight: '900' } : {};
  return (
    <View style={{flexDirection: 'row', zIndex: 5}}>
      { pages.map((v,i) => <AppButton key={v.name} title={v.name} styles={getStyle(i)} txtStyles={getTxtStyle(i)} onPress={() => onPageChange(i)} />) }
    </View>
  );
}