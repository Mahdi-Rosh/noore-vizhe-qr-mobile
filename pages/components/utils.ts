import * as FS from "expo-file-system";
import * as MediaLib from "expo-media-library";
import { ToastAndroid } from "react-native";
import forms, { Form } from "../forms";

export const saveImage = async (base64: string) => {
  const uri = `${FS.documentDirectory}QR.png`;
  await FS.writeAsStringAsync(uri, base64, { encoding: FS.EncodingType.Base64 });
  
  const { granted } = await MediaLib.requestPermissionsAsync(true);
  if (!granted) ToastAndroid.show('دسترسی داده نشد', ToastAndroid.SHORT);
  const asset = await MediaLib.createAssetAsync(uri);
  await MediaLib.createAlbumAsync('QR Codes', asset, false);
  ToastAndroid.show('ذخیره شد', ToastAndroid.SHORT);
};

export const QR_SIZE = 275;
export const TXT_EXTRA_HEIGHT = 30;
export const NUM_EXTRA_HEIGHT = 30;
export const QR_HEIGHT = QR_SIZE + TXT_EXTRA_HEIGHT + NUM_EXTRA_HEIGHT;
export const FONT_SIZE = 30;

export const objectToQrJsonString = (v: any) => JSON.stringify(v, undefined, 2);

export const dataToQrForm = (formName: string, vals: string[], names: string[]) => {
  const obj: Record<string, string> = { formName };  
  vals.forEach((v,i) => {
    obj[names[i]] = v;
  });
  return obj;
};

export const QRCodeDataValid = (txt: string) => {
  try {
    const json = JSON.parse(txt);
    if (typeof json !== "object") return false;
    if (!json.formName) return false;
    const form = forms.find(v => v.name === json.formName);
    if (!form) return false;

    const entries = Object.entries(json).filter(v => v[0] !== 'formName');
    if (entries.length !== form.inputs.length) return false;
  } catch (error) {
    return false;
  }
  return true;
};

export const extractDataFromQR = (txt: string): undefined | { form: Form, values: string[] } => {
  if (!QRCodeDataValid(txt)) return undefined;
  const json = JSON.parse(txt);
  const form = forms.find(v => v.name === json.formName);
  const entries = Object.entries(json).filter(v => v[0] !== 'formName');
  const values = entries.map(v => v[1] as string);
  return { form, values };
};

export const getBase64FromImgDataURI = (uri: string) => uri.replace("data:image/png;base64,", "");
export const base64ToDataURI = (base64: string) => `data:image/png;base64,${base64}`;

export const arrayMatch = (v1: string[], v2: string[]) => {
  if (v1.length !== v2.length) return false;
  for (let i = 0; i < v1.length; i++)
    if (v1[i] !== v2[i]) return false;
  return true;
};