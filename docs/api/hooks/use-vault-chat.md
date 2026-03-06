# useVaultChat

Manages a real-time chat connection to a CHAT engine vault.

## Import

```typescript
import { useVaultChat } from '@percent20/misuto-react-native-sdk';
```

## Signature

```typescript
function useVaultChat(params: UseVaultChatParams): {
  messages: ChatMessage[];
  sendMessage: (body: string, kind?: string) => void;
  connectionState: ChatConnectionState;
}
```

### Parameters

```typescript
interface UseVaultChatParams {
  vaultUid: string;
  accessToken: string;
}
```

## Returns

| Field | Type | Description |
|-------|------|-------------|
| `messages` | `ChatMessage[]` | All received messages (accumulated) |
| `sendMessage` | `(body, kind?) => void` | Send a message |
| `connectionState` | `ChatConnectionState` | Current WebSocket state |

## Example

```tsx
function Chat({ vault }) {
  const { messages, sendMessage, connectionState } = useVaultChat({
    vaultUid: vault.uid,
    accessToken: vault.access_token,
  });

  if (connectionState !== 'subscribed') {
    return <Text>Connecting... ({connectionState})</Text>;
  }

  return (
    <View>
      {messages.map(m => (
        <Text key={m.id}>{m.sender_name}: {m.body}</Text>
      ))}
      <TextInput
        onSubmitEditing={e => sendMessage(e.nativeEvent.text)}
      />
    </View>
  );
}
```

## Notes

- Creates a `ChatClient` via `client.interactions.createChat()`
- Connects automatically on mount
- Disconnects and cleans up on unmount
- Re-creates the connection when `vaultUid` or `accessToken` changes
- Messages accumulate in state — they are not cleared between renders
