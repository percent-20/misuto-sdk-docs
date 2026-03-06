# Installation

## Prerequisites

- React Native 0.72+
- Node.js 18+
- iOS 14+ / Android API 26+

## Install the SDK

```bash
yarn add @percent20/misuto-react-native-sdk
```

## Optional Peer Dependencies

The SDK lazily loads native sensor modules. Install only the ones you need:

| Sensor | Package | Install |
|--------|---------|---------|
| GPS | `@react-native-community/geolocation` | `yarn add @react-native-community/geolocation` |
| BLE | `react-native-ble-plx` | `yarn add react-native-ble-plx` |
| WiFi | `react-native-wifi-reborn` | `yarn add react-native-wifi-reborn` |
| NFC | `react-native-nfc-manager` | `yarn add react-native-nfc-manager` |
| Magnetometer | `react-native-sensors` | `yarn add react-native-sensors` |
| Barometer | `react-native-sensors` | (same package) |
| Accelerometer | `react-native-sensors` | (same package) |
| Hashing | `crypto-js` | `yarn add crypto-js` |

## iOS Permissions

Add to your `Info.plist`:

```xml
<!-- GPS -->
<key>NSLocationWhenInUseUsageDescription</key>
<string>Required for vault discovery</string>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>Required for background vault discovery</string>

<!-- BLE -->
<key>NSBluetoothAlwaysUsageDescription</key>
<string>Required for Bluetooth vault signals</string>

<!-- NFC -->
<key>NFCReaderUsageDescription</key>
<string>Required for NFC vault signals</string>

<!-- Camera (object detection) -->
<key>NSCameraUsageDescription</key>
<string>Required for object detection vault signals</string>
```

After installing native deps, run:

```bash
cd ios && pod install
```

## Android Permissions

Add to `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.BLUETOOTH_SCAN" />
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.NFC" />
<uses-permission android:name="android.permission.CAMERA" />
```

## Verify Installation

```tsx
import { MisutoClient } from '@percent20/misuto-react-native-sdk';

const client = MisutoClient.init({ apiKey: 'your-api-key' });
console.log('SDK initialized:', !!client);
```

## Next Steps

- [Configuration](/getting-started/configuration) — customize the SDK
- [Provider Setup](/getting-started/provider-setup) — wrap your app with `<MisutoProvider>`
