# Sensors

The SDK supports 8 sensor types, each loaded lazily so you only bundle what you use.

## Sensor Architecture

```
SensorManager
  ├── GpsSensor        → @react-native-community/geolocation
  ├── BleSensor        → react-native-ble-plx
  ├── WifiSensor       → react-native-wifi-reborn
  ├── NfcSensor        → react-native-nfc-manager
  ├── MagnetometerSensor → react-native-sensors
  ├── BarometerSensor    → react-native-sensors
  ├── AccelerometerSensor → react-native-sensors
  └── CameraSensor     → (API-driven, no native dep)
```

Each sensor adapter follows the same interface:
- `isAvailable(): boolean` — checks if the native module is installed
- `start(): Promise<void>` — begin reading
- `stop(): void` — stop reading

## Using the Hook

```tsx
import { useSensors } from '@percent20/misuto-react-native-sdk';

function SensorDisplay() {
  const { location, bleDevices, wifiNetworks, startSensor, stopSensor } = useSensors();

  useEffect(() => {
    startSensor('gps');
    startSensor('ble');
    return () => {
      stopSensor('gps');
      stopSensor('ble');
    };
  }, []);

  return (
    <View>
      {location && <Text>Lat: {location.latitude}, Lng: {location.longitude}</Text>}
      <Text>{bleDevices.length} BLE devices nearby</Text>
      <Text>{wifiNetworks.length} WiFi networks</Text>
    </View>
  );
}
```

## Sensor Types

### GPS

Provides continuous location updates with geohash encoding.

```typescript
interface GpsReading {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number;
  geohash: string;   // 12-character geohash
}
```

- **Native dep:** `@react-native-community/geolocation`
- **Update rate:** 1000ms interval, 0m distance filter
- **Geohash:** Automatically computed at max precision (12 chars)

### BLE (Bluetooth Low Energy)

Scans for nearby Bluetooth devices.

```typescript
interface BleDevice {
  id: string;
  name: string;
  rssi: number;
  manufacturerData: string | null;
}
```

- **Native dep:** `react-native-ble-plx`
- **Behavior:** Scans for 10 seconds, then stops
- **Output:** Array of all discovered devices

### WiFi

Scans nearby WiFi networks.

```typescript
interface WifiNetwork {
  SSID: string;
  BSSID: string;
  level: number;   // Signal strength (dBm)
}
```

- **Native dep:** `react-native-wifi-reborn`
- **Update rate:** Polls every 5 seconds

### NFC

Reads NFC tags on tap.

```typescript
interface NfcTag {
  id: string;
  techTypes: string[];
}
```

- **Native dep:** `react-native-nfc-manager`
- **Behavior:** Event-driven — waits for tag tap

### Magnetometer

Provides compass heading.

```typescript
interface MagnetometerReading {
  heading: number;   // 0-360 degrees
}
```

- **Native dep:** `react-native-sensors`
- **Update rate:** 200ms
- **Computation:** `atan2(y, x)` normalized to 0-360

### Barometer

Measures atmospheric pressure and derived altitude.

```typescript
interface BarometerReading {
  pressure: number;   // hPa
  altitude: number;   // meters (estimated)
}
```

- **Native dep:** `react-native-sensors`
- **Update rate:** 5000ms
- **Altitude formula:** `44330 * (1 - (P / 1013.25)^(1/5.255))`

### Camera (Object Detection)

Server-side object detection from images. No camera native dep required.

- **How it works:** Send a base64-encoded image; the server returns detected labels
- **Requires:** `HttpClient` (automatically set by `SensorManager`)

```typescript
const sensor = client.sensors; // SensorManager
// Object detection is accessed via the CameraSensor adapter
```

### Accelerometer

Measures device acceleration with built-in shake detection.

```typescript
interface AccelerometerReading {
  x: number;
  y: number;
  z: number;
  totalForce: number;   // magnitude in g-force units
}
```

- **Native dep:** `react-native-sensors`
- **Update rate:** 100ms
- **Shake detection:** 3 readings above 2.5g within 800ms

## Sensor Events

The `SensorManager` extends `EventEmitter` with three events:

```typescript
client.sensors.on('reading', (reading: SensorReading) => {
  // Discriminated union — switch on reading.type
});

client.sensors.on('statusChange', (status: SensorStatus) => {
  console.log(`${status.type}: enabled=${status.enabled}`);
});

client.sensors.on('error', ({ sensor, error }) => {
  console.error(`Sensor ${sensor} failed:`, error);
});
```

## Checking Availability

```typescript
const statuses = client.sensors.getAllStatuses();
statuses.forEach(s => {
  console.log(`${s.type}: available=${s.available}, enabled=${s.enabled}`);
});
```
