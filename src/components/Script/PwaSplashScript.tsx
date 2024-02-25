import Script from 'next/script';
const iosPWASplash = require('ios-pwa-splash');

export default function PwaSplashScript() {
  return (
    <Script
      src="https://cdn.jsdelivr.net/npm/ios-pwa-splash@1.0.0/cdn.min.js"
      strategy="afterInteractive"
      onLoad={() => {
        iosPWASplash('/logo.png', '#F7C9C3');
      }}
    />
  );
}
