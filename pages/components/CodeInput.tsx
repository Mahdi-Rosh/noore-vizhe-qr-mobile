import { useState } from "react";
import { StyleProp, TextInput, TextStyle, View, ViewStyle } from "react-native";

interface TextCodeProps {
  value: string,
  onChange: (val: string) => void
}; 

const style: StyleProp<TextStyle> = { textAlign: 'center', padding: 8, borderRadius: 2, backgroundColor: 'lightgray' };
const containerStyle: StyleProp<ViewStyle> = {
  flexDirection: 'row', flex: 1, justifyContent: 'space-between', backgroundColor: 'white', padding: 4, borderRadius: 2
};

const TextCodeInput = ({ value, onChange }: TextCodeProps) => <TextInput value={value} onChangeText={onChange} maxLength={2} style={style} />;
const NumCodeInput = ({ value, onChange }: TextCodeProps) => <TextInput value={value} onChangeText={onChange} maxLength={3} style={style} keyboardType="numeric" />;

export function CodeInput({ value, onChange }: { value: string, onChange: (value: string) => void }) {
  const values = value ? value.split('-') : new Array(4).fill('');
  const handleChange = (value: string, idx: number) => onChange(values.map((v,i) => i === idx ? value : v).join('-'))

  return <View style={containerStyle}>
    <TextCodeInput value={values[0]} onChange={v => handleChange(v, 0)} />
    <TextCodeInput value={values[1]} onChange={v => handleChange(v, 1)} />
    <TextCodeInput value={values[2]} onChange={v => handleChange(v, 2)} />
    <NumCodeInput  value={values[3]} onChange={v => handleChange(v, 3)} />
  </View>
};