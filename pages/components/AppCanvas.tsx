import WebView from "react-native-webview";
import { FONT_SIZE, NUM_EXTRA_HEIGHT, QR_HEIGHT, QR_SIZE, TXT_EXTRA_HEIGHT, base64ToDataURI } from "./utils";
import { useRef } from "react";

export default function AppCanvas({ base64, bottomTxt, onData }: { base64: string, bottomTxt: string, onData: (dataUri: string) => void }) {
  const view = useRef<null | WebView>(null);
  const html = `
    <html>
    <head></head>
    <body>
      <canvas id="canvas" width="${QR_SIZE}" height="${QR_HEIGHT}"></canvas>
      <script>
        document.addEventListener("message", function(e) {
          const QR_SIZE = ${QR_SIZE};
          const TXT_EXTRA_HEIGHT = ${TXT_EXTRA_HEIGHT};
          const NUM_EXTRA_HEIGHT = ${NUM_EXTRA_HEIGHT};
          
          const data = JSON.parse(e.data);
          const url = data.uri;
          const bottomTxt = data.bottomTxt;

          const canvas = document.querySelector('#canvas');
          const ctx = canvas.getContext('2d');

          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          const img = new Image();
          img.src = url;
          img.onload = () => {
            ctx.drawImage(img, 0, 0, QR_SIZE, QR_SIZE);

            ctx.fillStyle = 'black';
            ctx.font = '${FONT_SIZE}px Arial';
            ctx.textAlign = 'center';
            
            ctx.textBaseline = 'bottom';
            ctx.fillText('شرکت نور ویژه', canvas.width / 2, QR_SIZE + TXT_EXTRA_HEIGHT / 2);
            ctx.textBaseline = 'middle'
            ctx.fillText(bottomTxt, canvas.width / 2, QR_SIZE + TXT_EXTRA_HEIGHT + NUM_EXTRA_HEIGHT / 2);

            ReactNativeWebView.postMessage(canvas.toDataURL('image/png'));
          }
        }, false);
      </script>
    </body>
    </html>
  `;

  return <WebView 
    style={{width: QR_SIZE, height: QR_HEIGHT}}
    source={{ html }}
    onMessage={e => onData(e.nativeEvent.data)}
    ref={ref => view.current = ref}
    onLoadEnd={() => view.current.postMessage(JSON.stringify({ uri: base64ToDataURI(base64), bottomTxt }))}
    javaScriptEnabled={true}
    originWhitelist={['*']}
  />
};