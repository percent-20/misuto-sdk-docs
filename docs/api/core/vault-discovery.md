# VaultDiscovery

Manages the polling loop for discovering nearby vaults via signal hashing. Extends `EventEmitter`.

## Import

```typescript
import { VaultDiscovery } from '@percent20/misuto-react-native-sdk';
```

## Constructor

```typescript
new VaultDiscovery(http: HttpClient, config?: DiscoveryConfig)
```

If `config.onVaultEnter` or `config.onVaultExit` are provided, they are registered as event listeners automatically.

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `isPolling` | `boolean` | Whether the polling loop is active |

## Methods

### `start()`

Begin the polling loop. Fires the first poll immediately, then repeats at `pollingIntervalMs`.

```typescript
start(): void
```

### `stop()`

Stop the polling loop.

```typescript
stop(): void
```

### `poll()`

Execute a single poll without starting the loop.

```typescript
poll(): Promise<DiscoveredVault[]>
```

### `getCurrentVaults()`

Get the current set of discovered vaults.

```typescript
getCurrentVaults(): DiscoveredVault[]
```

### `updateSignals(signals)`

Update the signal state used for hash generation.

```typescript
updateSignals(signals: Partial<SignalState>): void
```

### `updateGps(reading)`

Update GPS data. Called automatically when GPS sensor emits.

```typescript
updateGps(reading: GpsReading): void
```

### `updateBleDevices(devices)`

Update BLE device list.

```typescript
updateBleDevices(devices: BleDevice[]): void
```

### `updateWifiNetworks(networks)`

Update WiFi network list.

```typescript
updateWifiNetworks(networks: WifiNetwork[]): void
```

### `onVaultEnter(callback)`

Convenience wrapper for `.on('enter', callback)`. Returns an unsubscribe function.

```typescript
onVaultEnter(callback: (vault: DiscoveredVault) => void): () => void
```

### `onVaultExit(callback)`

Convenience wrapper for `.on('exit', callback)`.

```typescript
onVaultExit(callback: (vault: DiscoveredVault) => void): () => void
```

### `destroy()`

Stop polling, remove all listeners, clear current vault map.

```typescript
destroy(): void
```

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `'enter'` | `DiscoveredVault` | A vault appeared in the scan |
| `'exit'` | `DiscoveredVault` | A vault disappeared from the scan |
| `'poll'` | `DiscoveredVault[]` | All current vaults after each poll |
| `'error'` | `Error` | A poll failed |
