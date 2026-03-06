# Chat Types

## ChatMessage

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

## PresenceEvent

```typescript
interface PresenceEvent {
  type: 'join' | 'leave';
  user_id: string;
  user_name: string;
  timestamp: string;
}
```

## ChatConnectionState

```typescript
type ChatConnectionState =
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'subscribed'
  | 'rejected'
  | 'error';
```

## ChatConfig

```typescript
interface ChatConfig {
  vaultUid: string;
  accessToken: string;
  onMessage?: (message: ChatMessage) => void;
  onPresence?: (event: PresenceEvent) => void;
  onStateChange?: (state: ChatConnectionState) => void;
}
```
