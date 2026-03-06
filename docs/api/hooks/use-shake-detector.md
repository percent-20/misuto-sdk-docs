# useShakeDetector

Detects phone shakes for emergency exit / panic mode functionality.

## Import

```typescript
import { useShakeDetector } from '@percent20/misuto-react-native-sdk';
```

## Signature

```typescript
function useShakeDetector(params?: UseShakeDetectorParams): {
  isArmed: boolean;
  disarm: () => void;
}
```

### Parameters

```typescript
interface UseShakeDetectorParams {
  enabled?: boolean;  // Default: true
}
```

## Returns

| Field | Type | Description |
|-------|------|-------------|
| `isArmed` | `boolean` | Whether panic mode has been armed by shaking |
| `disarm` | `() => void` | Reset armed state and clear shake buffer |

## Detection Parameters

| Constant | Value | Description |
|----------|-------|-------------|
| `SHAKE_THRESHOLD` | `2.5` | Minimum g-force to register |
| `SHAKE_COUNT_REQUIRED` | `3` | Shakes needed to arm |
| `SHAKE_WINDOW_MS` | `800` | Time window (ms) |

## Example

```tsx
function SecureView() {
  const { isArmed, disarm } = useShakeDetector();

  useEffect(() => {
    if (isArmed) {
      Alert.alert('Panic Mode', 'Lock phone to wipe signals', [
        { text: 'Cancel', onPress: disarm },
      ]);
    }
  }, [isArmed]);

  return isArmed ? <Text style={{ color: 'red' }}>ARMED</Text> : null;
}
```

## Requirements

- Requires `react-native-sensors` for accelerometer access
- Subscribes at 100ms intervals
- Cleans up on unmount or when `enabled` changes to `false`
