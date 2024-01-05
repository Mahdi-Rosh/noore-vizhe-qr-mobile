import { useState } from "react";
import forms from "../forms";
import AppButton from "./AppButton";

export default function DropDown({ onFormChange }: { onFormChange: (formIdx: number) => void }) {
  const [formIdx, setFormIdx] = useState(0);
  const [open, setOpen] = useState(false);
  
  const handleFormChange = (idx: number) => {
    setFormIdx(idx); onFormChange(idx); setOpen(false);
  };
  const renderRest = () => {
    return forms.map((v,i) => {
      if (i === formIdx) return;
      return <AppButton key={v.name} title={v.name} styles={{padding: 12}} onPress={() => handleFormChange(i)} />
    });
  };
  
  return (
    <>
      <AppButton title={forms[formIdx].name} key={forms[formIdx].name} onPress={() => setOpen(true)}
        styles={{backgroundColor: '#d62828', padding: 12}} />
      { open && renderRest() }
    </>
  );
}