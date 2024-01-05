import { ScrollView, StyleProp, Text, TextStyle, View } from "react-native";
import ScannedInputRow from "./ScannedInputRow";
import { Form } from "../forms";
import { ReScanBtn } from "./ReScanBtn";

const Rows = ({ form, values }: { form: Form, values: string[] }) => {
  return (
    <ScrollView>
      { form.inputs.map((v,i) => <ScannedInputRow key={v.name} name={v.name} persianName={v.persianName} value={values[i]} />) }
    </ScrollView>
  ); 
};

const InvalidMsg = () => {
  const invalidMsgStyle: StyleProp<TextStyle> = {color: 'red', backgroundColor: '#fcca46', flex: 1, padding: 8, fontWeight: 'bold', fontSize: 16, textAlign: 'center'};
  return <Text style={invalidMsgStyle} >فرمت کد اسکن شده اشتباه میباشد</Text>;
};

export default function ScannedFormDisplay({ form, values, onReScan }: { form: Form | undefined, values: string[] | undefined, onReScan: () => void }) {  
  return (
    <View style={{flex: 1, justifyContent: 'space-between', padding: 8, backgroundColor: '#fcca46'}}>
      { (form && values) ? <Rows form={form} values={values} /> : <InvalidMsg /> }
      <ReScanBtn onPress={onReScan} />
    </View>
  )
}