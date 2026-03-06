# Emergency Exit

The emergency exit system allows users to zero all search signals by shaking their device. This is the SDK's implementation of the "shake-to-lock" panic mode.

## How It Works

1. User shakes phone 3 times (above 2.5g force within 800ms)
2. System arms panic mode (`isArmed = true`)
3. User locks phone to trigger signal wipe
4. All search signals are zeroed — device becomes invisible to vaults

## Using the Hook

```tsx
import { useShakeDetector } from '@percent20/misuto-react-native-sdk';

function SecureScreen() {
  const { isArmed, disarm } = useShakeDetector();

  useEffect(() => {
    if (isArmed) {
      // Show panic banner
      Alert.alert(
        'Panic Mode Armed',
        'Lock your phone to wipe all signals',
        [{ text: 'Cancel', onPress: disarm }]
      );
    }
  }, [isArmed]);

  return (
    <View>
      {isArmed && (
        <View style={{ backgroundColor: 'red', padding: 10 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>
            ARMED - Lock phone to wipe signals
          </Text>
        </View>
      )}
    </View>
  );
}
```

### Parameters

```typescript
interface UseShakeDetectorParams {
  enabled?: boolean;  // Default: true
}
```

### Return Values

| Field | Type | Description |
|-------|------|-------------|
| `isArmed` | `boolean` | Whether panic mode is armed |
| `disarm` | `() => void` | Cancel panic mode |

## Detection Parameters

These constants control shake sensitivity:

| Constant | Value | Description |
|----------|-------|-------------|
| `SHAKE_THRESHOLD` | `2.5` | Minimum g-force to register a shake |
| `SHAKE_COUNT_REQUIRED` | `3` | Number of shakes needed |
| `SHAKE_WINDOW_MS` | `800` | Time window for shake count |

## Signal Reset Chain

When panic mode triggers, your app should zero all signals:

```typescript
// Clear discovery signals
client.discovery.updateSignals({
  selectedKeys: [],
  freeText: '',
  objectDetection: [],
  nfcTags: [],
});

// Stop all sensors
client.sensors.destroy();

// Stop discovery
client.discovery.stop();
```

## Requirements

- **Native dep:** `react-native-sensors` (for accelerometer data)
- The hook subscribes to accelerometer at 100ms intervals
- Automatically cleans up subscription on unmount
