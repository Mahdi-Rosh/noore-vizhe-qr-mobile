import { useState } from "react";
import { View, StatusBar } from "react-native";
import pages from "./pages/pages";
import BottomNav from "./pages/components/BottomNav";

export default function App() {
  const [pageIdx, setPageIdx] = useState(0);

  return (
    <View style={{direction: 'rtl', flex: 1, justifyContent: "space-between", backgroundColor: '#edf2f4'}}>
      <StatusBar  />
      { pages[pageIdx].element }
      <BottomNav pageIdx={pageIdx} onPageChange={idx => setPageIdx(idx)} />
    </View>
  );
}