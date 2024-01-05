import { useState, useEffect } from "react";
import { Form } from "../forms";
import { ScrollView, View } from "react-native";
import InputRow from "./InputRow";
import { dataToQrForm, objectToQrJsonString } from "./utils";
import QRDisplay from "./QRDisplay";

export default function FormDisplay({ form }: { form: Form }) {
  const [values, setValues] = useState(form.inputs.map(v => ''));
  const getDataString = () => objectToQrJsonString(dataToQrForm(form.name, values, form.inputs.map(v => v.name)));
  const getBottomTextIdx = () => form.inputs.findIndex(v => v.isQrBottomNum);
  const getBottomText = () => !form.hasBottomNumber ? '' : values[getBottomTextIdx()];

  useEffect(() => setValues(form.inputs.map(v => '')), [form]);
  const handleChange = (val: string, idx: Number) => setValues(values.map((v, i) => idx === i ? val : v));

  return (
    <ScrollView style={{paddingTop: 4}}>
      <View>
        { form.inputs.map((v,i) => <InputRow key={v.name} data={v} value={values[i]} onChange={(text) => handleChange(text,i)} /> ) }
      </View>
      <QRDisplay text={getDataString()} bottomText={getBottomText()} />
    </ScrollView>
  );
}