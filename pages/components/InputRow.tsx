import { View, Text } from "react-native";
import { InputTemplate } from "../forms";
import Input from "./Input";
export default function InputRow({ value, data, onChange }: { value: string, data: InputTemplate, onChange: (text: string) => void }) {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5}}>
      <Text style={{flex: 1, textAlign: 'center', fontSize: 12, fontWeight: 'bold'}}>{`${data.name.toUpperCase()} (${data.persianName})`}</Text>
      <Input value={value} type={data.type} onChange={onChange} />
    </View>
  );
}