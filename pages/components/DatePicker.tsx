import DateTimePicker from "@react-native-community/datetimepicker";
import AppButton from "./AppButton";
import { useState } from "react";

export default function DatePicker({ onChange }: { onChange: (value: string) => void }) {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const handleChange = (newVal: string) => {
    setOpen(false); setValue(newVal); onChange(newVal);
  };
  return (
    <>
      { open && <DateTimePicker value={new Date()} onChange={(e, date) => handleChange(date.toLocaleDateString())} /> }
      <AppButton title={value ? value : 'ثبت تاریخ'} onPress={() => setOpen(true)} styles={{flex: 1, paddingHorizontal: 4}} />  
    </>
  );
}