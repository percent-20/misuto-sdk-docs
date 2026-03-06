# useVaultDiscovery

Provides reactive access to the vault discovery system with start/stop controls.

## Import

```typescript
import { useVaultDiscovery } from '@percent20/misuto-react-native-sdk';
```

## Signature

```typescript
function useVaultDiscovery(): {
  vaults: DiscoveredVault[];
  isPolling: boolean;
  start: () => void;
  stop: () => void;
}
```

## Returns

| Field | Type | Description |
|-------|------|-------------|
| `vaults` | `DiscoveredVault[]` | Currently discovered vaults |
| `isPolling` | `boolean` | Whether discovery is polling |
| `start` | `() => void` | Begin polling |
| `stop` | `() => void` | Stop polling |

## Example

```tsx
function VaultList() {
  const { vaults, isPolling, start, stop } = useVaultDiscovery();

  return (
    <View>
      <Button
        title={isPolling ? 'Stop' : 'Scan'}
        onPress={isPolling ? stop : start}
      />
      <FlatList
        data={vaults}
        keyExtractor={v => v.uid}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.engine}</Text>
          </View>
        )}
      />
    </View>
  );
}
```

## Notes

- Subscribes to `VaultDiscovery` `'enter'`, `'exit'`, and `'poll'` events
- `vaults` array is refreshed from `discovery.getCurrentVaults()` on each event
- `start` and `stop` are stable callbacks
- Cleans up event subscriptions on unmount
