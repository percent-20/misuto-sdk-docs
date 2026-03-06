# useMisuto

Returns the `MisutoClient` instance from React Context.

## Import

```typescript
import { useMisuto } from '@percent20/misuto-react-native-sdk';
```

## Signature

```typescript
function useMisuto(): MisutoClient
```

## Returns

The `MisutoClient` singleton provided by `<MisutoProvider>`.

## Throws

Throws `Error` if called outside of a `<MisutoProvider>`.

## Example

```tsx
function MyComponent() {
  const client = useMisuto();

  const loadVaults = async () => {
    const response = await client.vaults.list();
    console.log(response.vaults);
  };

  return <Button title="Load Vaults" onPress={loadVaults} />;
}
```

## Accessing Subsystems

```typescript
const client = useMisuto();

client.http           // HttpClient
client.sensors        // SensorManager
client.discovery      // VaultDiscovery
client.interactions   // VaultInteraction
client.vaults         // Vaults API
client.beacons        // Beacons API
client.statistics     // Statistics API
client.enterprise     // Enterprise APIs
```
