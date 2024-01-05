import React from "react";
import { TextInput, StyleSheet } from "react-native";
import DatePicker from "./DatePicker";
import { CodeInput } from "./CodeInput";

const styles = StyleSheet.create({
  input: {
    flex: 1,
    padding: 4,
    borderRadius: 2,
    textAlign: 'center',
    backgroundColor: 'white'
  }
});

export type InputType = 'text' | 'number' | 'date' | 'code';

export default function Input({ value, type, onChange }: { value: string, type: InputType, onChange: (text: string) => void }) {
  switch (type) {
    case "text":
      return <TextInput onChangeText={onChange} style={styles.input}>{value}</TextInput>;
    case "number":
      return <TextInput keyboardType="numeric" onChangeText={onChange} style={styles.input}>{value}</TextInput>;
    case "date":
      return <DatePicker onChange={onChange} />;
    case "code":
      return <CodeInput value={value} onChange={onChange} />
    default:
      return <TextInput onChangeText={onChange} style={styles.input}>{value}</TextInput>;
  }
}