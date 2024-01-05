import forms from "./forms";
import { useState } from "react";
import FormDisplay from "./components/FormDisplay";
import DropDown from "./components/DropDown";

export default function Reading() {
  const [formIdx, setFormIdx] = useState(0);

  return (
    <>
      <DropDown onFormChange={idx => setFormIdx(idx)} />
      <FormDisplay form={forms[formIdx]} />
    </>
  );
}