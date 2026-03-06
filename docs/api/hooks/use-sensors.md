# useSensors

Provides reactive access to sensor data and control over sensor lifecycle.

## Import

```typescript
import { useSensors } from '@percent20/misuto-react-native-sdk';
```

## Signature

```typescript
function useSensors(): {
  location: GpsReading | null;
  bleDevices: BleDevice[];
  wifiNetworks: WifiNetwork[];
  startSensor: (type: SensorTypeName) => Promise<void>;
  stopSensor: (type: SensorTypeName) => void;
}
```

## Returns

| Field | Type | Description |
|-------|------|-------------|
| `location` | `GpsReading \| null` | Latest GPS reading, or `null` if not yet available |
| `bleDevices` | `BleDevice[]` | Currently discovered BLE devices |
| `wifiNetworks` | `WifiNetwork[]` | Currently visible WiFi networks |
| `startSensor` | `(type) => Promise<void>` | Start a sensor by type |
| `stopSensor` | `(type) => void` | Stop a sensor by type |

## Example

```tsx
function LocationDisplay() {
  const { location, bleDevices, startSensor, stopSensor } = useSensors();

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
      {location && (
        <Text>
          {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
          (geohash: {location.geohash})
        </Text>
      )}
      <Text>{bleDevices.length} BLE devices nearby</Text>
    </View>
  );
}
```

## Notes

- Subscribes to `SensorManager`'s `'reading'` event for GPS, BLE, and WiFi data
- `startSensor` and `stopSensor` are stable callbacks (wrapped in `useCallback`)
- For other sensor types (magnetometer, barometer, etc.), use `client.sensors.on('reading', ...)` directly
