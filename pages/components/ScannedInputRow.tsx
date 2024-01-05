import { View, Text } from "react-native";

export default function ScannedInputRow({ value, name, persianName }: { value: string, name: string, persianName: string }) {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8}}>
      <Text style={{flex: 1, textAlign: 'center', fontSize: 12, fontWeight: 'bold'}}>{`${name.toUpperCase()} (${persianName})`}</Text>
      <Text style={{flex: 1, textAlign: 'center', backgroundColor: 'white', borderRadius: 2, paddingVertical: 8}}>{value}</Text>
    </View>
  );
}