# Your First Vault

This guide walks through the complete lifecycle: create a vault, discover it by location, and interact with it.

## 1. Create a Vault

Use the `client.vaults.create()` method:

```typescript
import { useMisuto, ENGINE, encodeGeohash } from '@percent20/misuto-react-native-sdk';

function CreateVault() {
  const client = useMisuto();

  const handleCreate = async () => {
    const vault = await client.vaults.create({
      name: 'My First Vault',
      engine: ENGINE.CHAT,
      geohash: encodeGeohash(37.7749, -122.4194), // San Francisco
      radius: 100, // meters
      payload: { welcome: 'Hello from my vault!' },
    });

    console.log('Created vault:', vault.uid);
  };

  return <Button title="Create Vault" onPress={handleCreate} />;
}
```

## 2. Discover Vaults

Use the `useVaultDiscovery` hook to scan for nearby vaults:

```tsx
import { useVaultDiscovery } from '@percent20/misuto-react-native-sdk';

function VaultScanner() {
  const { vaults, isPolling, start, stop } = useVaultDiscovery();

  return (
    <View>
      <Button
        title={isPolling ? 'Stop Scanning' : 'Start Scanning'}
        onPress={isPolling ? stop : start}
      />
      <Text>{vaults.length} vaults nearby</Text>
      {vaults.map(vault => (
        <View key={vault.uid}>
          <Text>{vault.name}</Text>
          <Text>Engine: {vault.engine}</Text>
        </View>
      ))}
    </View>
  );
}
```

The discovery system automatically:
1. Reads GPS, BLE, and WiFi sensor data
2. Hashes the signals using SHA-256
3. Sends the hashes to the sentinel endpoint
4. Diffs results to emit `enter` and `exit` events
5. Repeats every 2.5 seconds (configurable)

## 3. Interact with a Vault

Once a vault is discovered, interact with it based on its engine.

### Chat Vault

```tsx
import { useVaultChat } from '@percent20/misuto-react-native-sdk';

function ChatVault({ vault }) {
  const { messages, sendMessage, connectionState } = useVaultChat({
    vaultUid: vault.uid,
    accessToken: vault.access_token,
  });

  return (
    <View>
      <Text>Connection: {connectionState}</Text>
      {messages.map(msg => (
        <Text key={msg.id}>{msg.sender_name}: {msg.body}</Text>
      ))}
      <TextInput
        placeholder="Type a message..."
        onSubmitEditing={e => sendMessage(e.nativeEvent.text)}
      />
    </View>
  );
}
```

### Storage Vault

```typescript
const client = useMisuto();

// Get upload URL
const { upload_url, file_key } = await client.interactions.storage.getUploadUrl(
  vault.uid,
  'document.pdf'
);

// Upload file (use fetch or your preferred HTTP client)
await fetch(upload_url, { method: 'PUT', body: fileData });

// List files
const files = await client.interactions.storage.listFiles(vault.uid);

// Download
const { download_url } = await client.interactions.storage.getDownloadUrl(
  vault.uid,
  file_key
);
```

## 4. Clean Up

The `<MisutoProvider>` handles cleanup automatically. If using direct initialization:

```typescript
client.discovery.stop();
client.destroy();
```

## Complete Example

```tsx
import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import {
  MisutoProvider,
  useVaultDiscovery,
  useMisuto,
  ENGINE,
  encodeGeohash,
} from '@percent20/misuto-react-native-sdk';

function App() {
  return (
    <MisutoProvider
      apiKey="pk_live_abc123"
      config={{ sensors: { gps: true } }}
    >
      <VaultApp />
    </MisutoProvider>
  );
}

function VaultApp() {
  const client = useMisuto();
  const { vaults, isPolling, start, stop } = useVaultDiscovery();

  const createVault = async () => {
    await client.vaults.create({
      name: 'Test Vault',
      engine: ENGINE.MESSAGE,
      geohash: encodeGeohash(37.7749, -122.4194),
      payload: { message: 'You found it!' },
    });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Create Vault" onPress={createVault} />
      <Button
        title={isPolling ? 'Stop' : 'Scan'}
        onPress={isPolling ? stop : start}
      />
      <FlatList
        data={vaults}
        keyExtractor={v => v.uid}
        renderItem={({ item }) => (
          <Text>{item.name} - {item.engine}</Text>
        )}
      />
    </View>
  );
}
```

## Next Steps

- [Vault Discovery](/guides/vault-discovery) — deep dive into the discovery system
- [Sensors](/guides/sensors) — configure all 8 sensor types
- [API Reference](/api/core/misuto-client) — full class documentation
