import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import ScannedFormDisplay from "./components/ScannedFormDisplay";
import { extractDataFromQR } from "./components/utils";
import { BarCodeScanner } from "expo-barcode-scanner";

const RenderScannedData = ({ data, onReScan }: { data: string, onReScan: () => void }) => {
  const json = extractDataFromQR(data);
  return <ScannedFormDisplay form={!!json ? json.form : null} values={!!json ? json.values : null} onReScan={onReScan} />;
};

const Scanner = ({ onScan }: { onScan: (val: string) => void }) => {
  const types = [BarCodeScanner.Constants.BarCodeType.qr];
  return <BarCodeScanner barCodeTypes={types} onBarCodeScanned={e => onScan(e.data)} style={{ flex: 1 }} />;
};

export default function Reading() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [data, setData] = useState('');
  useEffect(() => { getPermissions() }, []);

  const getPermissions = async () => {
    const { granted } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(granted);
  };

  if (hasPermission === null) return <View style={{flex: 1}}><Text>در حال دسترسی به دوربین...</Text></View>;
  if (!hasPermission) return <View style={{flex: 1}}><Text>دسترسی به دوربین نداریم</Text></View>;

  return data ? <RenderScannedData data={data} onReScan={() => setData('')} /> : <Scanner onScan={v => setData(v)} />
}