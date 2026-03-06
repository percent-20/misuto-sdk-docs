# Error Handling

The SDK provides a typed error hierarchy so you can handle specific failure modes.

## Error Hierarchy

```
Error
  └── MisutoError
        ├── ConfigError
        ├── SensorError
        └── ApiError
              └── RateLimitError
```

## Error Types

### MisutoError

Base class for all SDK errors:

```typescript
try {
  // any SDK operation
} catch (error) {
  if (error instanceof MisutoError) {
    console.log('SDK error:', error.message);
  }
}
```

### ConfigError

Thrown when the SDK is misconfigured:

```typescript
import { ConfigError } from '@percent20/misuto-react-native-sdk';

try {
  MisutoClient.init({ apiKey: '' }); // empty key
} catch (error) {
  if (error instanceof ConfigError) {
    console.log('Config issue:', error.message);
    // "apiKey is required"
  }
}
```

### ApiError

Thrown on HTTP errors:

```typescript
import { ApiError } from '@percent20/misuto-react-native-sdk';

try {
  await client.vaults.get('nonexistent');
} catch (error) {
  if (error instanceof ApiError) {
    console.log('Status:', error.statusCode);     // 404
    console.log('Body:', error.responseBody);      // parsed response
    console.log('Message:', error.message);        // human-readable
  }
}
```

### SensorError

Thrown when a sensor operation fails:

```typescript
import { SensorError } from '@percent20/misuto-react-native-sdk';

try {
  await client.sensors.startSensor('ble');
} catch (error) {
  if (error instanceof SensorError) {
    console.log('Sensor:', error.sensorType);   // 'ble'
    console.log('Reason:', error.message);
  }
}
```

### RateLimitError

Thrown on HTTP 429 responses:

```typescript
import { RateLimitError } from '@percent20/misuto-react-native-sdk';

try {
  await client.vaults.list();
} catch (error) {
  if (error instanceof RateLimitError) {
    console.log('Rate limited!');
    console.log('Retry after:', error.retryAfterMs, 'ms');
    console.log('Status:', error.statusCode); // 429
  }
}
```

## Handling Discovery Errors

The discovery system emits errors instead of throwing:

```typescript
client.discovery.on('error', (error) => {
  if (error instanceof RateLimitError) {
    // Back off polling
    client.discovery.stop();
    setTimeout(() => client.discovery.start(), error.retryAfterMs || 60000);
  } else {
    console.error('Discovery error:', error.message);
  }
});
```

## Handling Sensor Errors

```typescript
client.sensors.on('error', ({ sensor, error }) => {
  console.error(`Sensor ${sensor} failed:`, error.message);
  // Optionally restart
  await client.sensors.startSensor(sensor);
});
```

## Pattern: Catch-All with Discrimination

```typescript
import {
  MisutoError, ApiError, SensorError,
  ConfigError, RateLimitError,
} from '@percent20/misuto-react-native-sdk';

try {
  await someOperation();
} catch (error) {
  if (error instanceof RateLimitError) {
    // Retry after delay
  } else if (error instanceof ApiError) {
    // Server error
  } else if (error instanceof SensorError) {
    // Sensor failure
  } else if (error instanceof ConfigError) {
    // Misconfiguration
  } else if (error instanceof MisutoError) {
    // Other SDK error
  } else {
    // Unknown error
    throw error;
  }
}
```
