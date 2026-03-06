# EventEmitter

Generic, type-safe event emitter used as the base class for `SensorManager`, `VaultDiscovery`, and `ChatClient`.

## Import

```typescript
import { EventEmitter } from '@percent20/misuto-react-native-sdk';
```

## Type Parameter

```typescript
class EventEmitter<Events extends Record<string, any>>
```

The `Events` generic maps event names to their payload types.

## Methods

### `on(event, listener)`

Subscribe to an event. Returns an unsubscribe function.

```typescript
on<K extends keyof Events>(event: K, listener: (data: Events[K]) => void): () => void
```

### `off(event, listener)`

Remove a specific listener.

```typescript
off<K extends keyof Events>(event: K, listener: (data: Events[K]) => void): void
```

### `emit(event, data)`

Emit an event to all registered listeners.

```typescript
emit<K extends keyof Events>(event: K, data: Events[K]): void
```

### `removeAllListeners(event?)`

Remove all listeners, optionally for a specific event.

```typescript
removeAllListeners(event?: keyof Events): void
```

## Example

```typescript
// Type-safe events
type MyEvents = {
  data: { value: number };
  error: Error;
};

const emitter = new EventEmitter<MyEvents>();

const unsub = emitter.on('data', (payload) => {
  console.log(payload.value); // typed as number
});

emitter.emit('data', { value: 42 });
unsub(); // stop listening
```

## Used By

| Class | Events |
|-------|--------|
| `SensorManager` | `reading`, `statusChange`, `error` |
| `VaultDiscovery` | `enter`, `exit`, `poll`, `error` |
| `ChatClient` | `message`, `stateChange`, `error` |
