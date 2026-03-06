# ChatClient

ActionCable WebSocket client for real-time chat in CHAT engine vaults. Extends `EventEmitter`.

## Import

```typescript
import { ChatClient } from '@percent20/misuto-react-native-sdk';
```

## Constructor

```typescript
new ChatClient(http: HttpClient, config: ChatConfig)
```

If `config.onMessage` or `config.onStateChange` are provided, they are registered as event listeners.

Connects to `wss://<host>/cable?authorization=<accessToken>` using the `actioncable-v1-json` subprotocol.

## Methods

### `connect()`

Open the WebSocket connection. Auto-subscribes to `ConversationChannel`, requests message history, and starts a 30-second heartbeat.

```typescript
connect(): void
```

### `disconnect()`

Send unsubscribe command and close the WebSocket.

```typescript
disconnect(): void
```

### `sendMessage(body, kind?)`

Send a chat message.

```typescript
sendMessage(body: string, kind?: string): void
```

| Param | Default | Description |
|-------|---------|-------------|
| `body` | — | Message content |
| `kind` | `'text'` | Message type: `'text'`, `'attachment'` |

### `requestHistory()`

Request message history from the server.

```typescript
requestHistory(): void
```

### `sendHeartbeat()`

Send a heartbeat to keep the connection alive.

```typescript
sendHeartbeat(): void
```

### `leave()`

Leave the conversation channel.

```typescript
leave(): void
```

### `getState()`

Get the current connection state.

```typescript
getState(): ChatConnectionState
```

### `destroy()`

Disconnect and remove all event listeners.

```typescript
destroy(): void
```

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `'message'` | `ChatMessage` | New message received |
| `'stateChange'` | `ChatConnectionState` | Connection state changed |
| `'error'` | `Error` | Connection or protocol error |

## Connection States

`'disconnected'` | `'connecting'` | `'connected'` | `'subscribed'` | `'rejected'` | `'error'`
