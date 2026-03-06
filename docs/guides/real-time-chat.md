# Real-Time Chat

CHAT engine vaults provide real-time messaging via ActionCable WebSocket connections.

## Using the Hook

```tsx
import { useVaultChat } from '@percent20/misuto-react-native-sdk';

function ChatRoom({ vaultUid, accessToken }) {
  const { messages, sendMessage, connectionState } = useVaultChat({
    vaultUid,
    accessToken,
  });

  return (
    <View>
      <Text>Status: {connectionState}</Text>
      <FlatList
        data={messages}
        keyExtractor={m => m.id}
        renderItem={({ item }) => (
          <View>
            <Text style={{ fontWeight: 'bold' }}>{item.sender_name}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
      <TextInput
        placeholder="Type a message..."
        onSubmitEditing={e => sendMessage(e.nativeEvent.text)}
      />
    </View>
  );
}
```

### Return Values

| Field | Type | Description |
|-------|------|-------------|
| `messages` | `ChatMessage[]` | All received messages (accumulated) |
| `sendMessage` | `(body, kind?) => void` | Send a message (`kind` defaults to `'text'`) |
| `connectionState` | `ChatConnectionState` | Current WebSocket state |

## Connection States

```
disconnected → connecting → connected → subscribed
                                          ↓
                                       rejected
                                          ↓
                                        error
```

| State | Description |
|-------|-------------|
| `'disconnected'` | Not connected |
| `'connecting'` | WebSocket opening |
| `'connected'` | WebSocket open, subscribing to channel |
| `'subscribed'` | Fully connected and receiving messages |
| `'rejected'` | Server rejected the subscription |
| `'error'` | Connection error |

## Using ChatClient Directly

For more control, use `ChatClient` directly:

```typescript
const client = useMisuto();

const chat = client.interactions.createChat({
  vaultUid: 'vault-uid',
  accessToken: 'access-token',
  onMessage: (msg) => console.log(`${msg.sender_name}: ${msg.body}`),
  onPresence: (event) => console.log(`${event.user_name} ${event.type}ed`),
  onStateChange: (state) => console.log('State:', state),
});

chat.connect();

// Send a message
chat.sendMessage('Hello!');
chat.sendMessage('Check this out', 'attachment');

// Request message history
chat.requestHistory();

// Clean up
chat.destroy();
```

## Message Types

```typescript
interface ChatMessage {
  id: string;
  kind: 'text' | 'attachment' | 'system';
  body: string;
  sender_id: string;
  sender_name: string;
  created_at: string;
}
```

## Presence Events

```typescript
interface PresenceEvent {
  type: 'join' | 'leave';
  user_id: string;
  user_name: string;
  timestamp: string;
}
```

## Getting an Access Token

Before connecting to chat, you need an access token for the vault:

```typescript
const { access_token } = await client.interactions.getAccessToken(vaultUid);
```

If the vault was found via discovery, `DiscoveredVault.access_token` may already be set.
