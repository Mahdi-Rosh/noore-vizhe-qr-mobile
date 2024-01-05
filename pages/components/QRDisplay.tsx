import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import AppButton from "./AppButton";
import QRCode from "react-native-qrcode-svg";
import AppCanvas from "./AppCanvas";
import { QR_SIZE, getBase64FromImgDataURI, saveImage } from "./utils";

export default function QRDisplay({ text, bottomText }: { text: string, bottomText: string }) {
  const QRRef = useRef(null);
  const [base64, setBase64] = useState('');

  useEffect(() => setBase64(''), [bottomText, text]);

  const handleSave = async (base64: string) => {
    if (bottomText) return setBase64(base64);    
    saveImage(base64);
  };

  const handleCanvasSave = (uri: string) => {
    setBase64('');
    saveImage(getBase64FromImgDataURI(uri));
  };

  return (
    <View style={{paddingTop: 8, paddingBottom: 12, alignItems: 'center', backgroundColor: 'transparent'}}>
      { base64 && <AppCanvas base64={base64} bottomTxt={bottomText} onData={handleCanvasSave} /> }

      <QRCode value={text} size={QR_SIZE} quietZone={25} ecl="L" getRef={c => QRRef.current = c} />
      
      <AppButton title="ذخیره" onPress={() => QRRef.current.toDataURL(handleSave)}
        styles={{width: QR_SIZE, backgroundColor: '#003049', borderTopLeftRadius: 0, borderTopRightRadius: 0}} />
    </View>
  );
}