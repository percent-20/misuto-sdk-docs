# Sensor Types

## SensorConfig

```typescript
interface SensorConfig {
  gps?: boolean;
  ble?: boolean;
  wifi?: boolean;
  nfc?: boolean;
  magnetometer?: boolean;
  barometer?: boolean;
  camera?: boolean;
  accelerometer?: boolean;
}
```

## SensorStatus

```typescript
interface SensorStatus {
  type: SensorTypeName;
  enabled: boolean;
  available: boolean;
  error: string | null;
}
```

## GpsReading

```typescript
interface GpsReading {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number;
  geohash: string;
}
```

## BleDevice

```typescript
interface BleDevice {
  id: string;
  name: string;
  rssi: number;
  manufacturerData: string | null;
}
```

## WifiNetwork

```typescript
interface WifiNetwork {
  SSID: string;
  BSSID: string;
  level: number;
}
```

## NfcTag

```typescript
interface NfcTag {
  id: string;
  techTypes: string[];
}
```

## MagnetometerReading

```typescript
interface MagnetometerReading {
  heading: number;
}
```

## BarometerReading

```typescript
interface BarometerReading {
  pressure: number;
  altitude: number;
}
```

## AccelerometerReading

```typescript
interface AccelerometerReading {
  x: number;
  y: number;
  z: number;
  totalForce: number;
}
```

## SensorReading

Discriminated union of all sensor data types:

```typescript
type SensorReading =
  | { type: 'gps'; data: GpsReading }
  | { type: 'ble'; data: BleDevice[] }
  | { type: 'wifi'; data: WifiNetwork[] }
  | { type: 'nfc'; data: NfcTag }
  | { type: 'magnetometer'; data: MagnetometerReading }
  | { type: 'barometer'; data: BarometerReading }
  | { type: 'accelerometer'; data: AccelerometerReading };
```
