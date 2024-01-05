import AppButton from "./AppButton";

export function ReScanBtn({ onPress }: { onPress: () => void }) {
  return <AppButton title="اسکن دوباره" onPress={onPress} styles={{ padding: 12, backgroundColor: '#003049' }} />;
};