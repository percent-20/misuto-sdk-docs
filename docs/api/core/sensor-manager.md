# SensorManager

Manages all 8 sensor adapters with lazy loading. Extends `EventEmitter`.

## Import

```typescript
import { SensorManager } from '@percent20/misuto-react-native-sdk';
```

## Constructor

```typescript
new SensorManager(config?: SensorConfig)
```

Eagerly loads adapters for any sensor type set to `true` in config. Other sensors are loaded lazily on first `startSensor()` call.

## Methods

### `startSensor(type)`

Start a specific sensor.

```typescript
startSensor(type: SensorTypeName): Promise<void>
```

Emits `'statusChange'` on success. Throws `SensorError` on failure.

### `stopSensor(type)`

Stop a specific sensor.

```typescript
stopSensor(type: SensorTypeName): void
```

### `getStatus(type)`

Get the status of a specific sensor.

```typescript
getStatus(type: SensorTypeName): SensorStatus
```

### `getAllStatuses()`

Get status for all 8 sensor types.

```typescript
getAllStatuses(): SensorStatus[]
```

### `destroy()`

Stop all active sensors, clear adapters, remove all listeners.

```typescript
destroy(): void
```

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `'reading'` | `SensorReading` | New sensor data (discriminated union by `type`) |
| `'statusChange'` | `SensorStatus` | Sensor enabled/disabled/error state changed |
| `'error'` | `{ sensor: SensorTypeName; error: Error }` | Sensor error |

## Sensor Types

| Type | Native Dependency | Update Rate |
|------|-------------------|-------------|
| `'gps'` | `@react-native-community/geolocation` | 1000ms |
| `'ble'` | `react-native-ble-plx` | 10s scan |
| `'wifi'` | `react-native-wifi-reborn` | 5000ms |
| `'nfc'` | `react-native-nfc-manager` | Event-driven |
| `'magnetometer'` | `react-native-sensors` | 200ms |
| `'barometer'` | `react-native-sensors` | 5000ms |
| `'camera'` | None (API-driven) | Event-driven |
| `'accelerometer'` | `react-native-sensors` | 100ms |
