# Vault Discovery

The discovery system continuously scans for nearby vaults by hashing sensor signals and querying the sentinel endpoint.

## How It Works

1. **Collect signals** — GPS coordinates, BLE devices, WiFi networks
2. **Hash signals** — SHA-256 hashes with salt/pepper for privacy
3. **Query sentinel** — POST hashed "stomp" to `/sentinal`
4. **Diff results** — Compare current vs previous vault set
5. **Emit events** — `enter` for new vaults, `exit` for departed ones
6. **Repeat** — Poll every 2.5 seconds (configurable)

## Using the Hook

```tsx
import { useVaultDiscovery } from '@percent20/misuto-react-native-sdk';

function Scanner() {
  const { vaults, isPolling, start, stop } = useVaultDiscovery();

  return (
    <View>
      <Button title={isPolling ? 'Stop' : 'Scan'} onPress={isPolling ? stop : start} />
      {vaults.map(v => <Text key={v.uid}>{v.name}</Text>)}
    </View>
  );
}
```

### Return Values

| Field | Type | Description |
|-------|------|-------------|
| `vaults` | `DiscoveredVault[]` | Currently visible vaults |
| `isPolling` | `boolean` | Whether discovery is active |
| `start` | `() => void` | Begin polling |
| `stop` | `() => void` | Stop polling |

## Using the Class Directly

```typescript
const client = MisutoClient.init({ apiKey: '...' });

client.discovery.onVaultEnter((vault) => {
  console.log('Entered vault:', vault.name, vault.engine);
});

client.discovery.onVaultExit((vault) => {
  console.log('Left vault:', vault.uid);
});

client.discovery.start();
```

## Updating Signals

The discovery system automatically receives GPS, BLE, and WiFi data from the sensor manager. You can also manually update signals:

```typescript
// Update selected keys (what signals to include in the hash)
client.discovery.updateSignals({
  selectedKeys: ['location', 'timeOfDay', 'nearbyDevices'],
  freeText: 'secret-password',
  nfcTags: ['tag-id-123'],
  objectDetection: ['laptop', 'coffee-cup'],
  useAltitude: true,
  useHeading: false,
});
```

### SignalState

```typescript
interface SignalState {
  selectedKeys: string[];       // Which signal types to hash
  freeText?: string;            // Free-text password
  objectDetection?: string[];   // Detected object labels
  nfcTags?: string[];           // Scanned NFC tag IDs
  useAltitude?: boolean;        // Include altitude in hash
  useHeading?: boolean;         // Include compass heading in hash
}
```

### Available Signal Keys

| Key | Source | Description |
|-----|--------|-------------|
| `'location'` | GPS sensor | Geohash of current position |
| `'timeOfDay'` | System clock | Current hour (UTC) |
| `'nearbyDevices'` | BLE + WiFi | Nearby Bluetooth and WiFi signals |
| `'objectDetection'` | Camera sensor | Object labels from image recognition |
| `'freeText'` | User input | Arbitrary text password |
| `'nfcTags'` | NFC sensor | Scanned NFC tag IDs |

## Enter/Exit Events

The discovery system tracks which vaults are currently visible. When the set changes:

- **Enter** — A vault appears that wasn't in the previous poll
- **Exit** — A vault disappears that was in the previous poll

```typescript
// Event-based
client.discovery.on('enter', (vault) => { /* ... */ });
client.discovery.on('exit', (vault) => { /* ... */ });
client.discovery.on('poll', (vaults) => { /* all current vaults */ });
client.discovery.on('error', (error) => { /* poll failed */ });

// Convenience methods (return unsubscribe function)
const unsub = client.discovery.onVaultEnter((vault) => { /* ... */ });
unsub(); // stop listening
```

## Manual Polling

Trigger a single poll without starting the polling loop:

```typescript
const vaults = await client.discovery.poll();
console.log(`Found ${vaults.length} vaults`);
```

## Current Vaults

Get the current vault set without waiting for the next poll:

```typescript
const current = client.discovery.getCurrentVaults();
```
