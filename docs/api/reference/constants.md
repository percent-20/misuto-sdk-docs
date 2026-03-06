# Constants

## ENGINE

Vault engine type constants:

```typescript
import { ENGINE } from '@percent20/misuto-react-native-sdk';

ENGINE.STORAGE   // 'storage'
ENGINE.WEBHOOK   // 'webhook'
ENGINE.PAYLOAD   // 'payload'
ENGINE.MESSAGE   // 'message'
ENGINE.CHAT      // 'chat'
ENGINE.REWARD    // 'reward'
ENGINE.MFA       // 'mfa'
ENGINE.DEADROP   // 'deadrop'
ENGINE.CRYPTO    // 'crypto'
```

```typescript
type EngineName = typeof ENGINE[keyof typeof ENGINE];
// 'storage' | 'webhook' | 'payload' | 'message' | 'chat' | 'reward' | 'mfa' | 'deadrop' | 'crypto'
```

## SENSOR_TYPE

Sensor type constants:

```typescript
import { SENSOR_TYPE } from '@percent20/misuto-react-native-sdk';

SENSOR_TYPE.GPS            // 'gps'
SENSOR_TYPE.BLE            // 'ble'
SENSOR_TYPE.WIFI           // 'wifi'
SENSOR_TYPE.NFC            // 'nfc'
SENSOR_TYPE.MAGNETOMETER   // 'magnetometer'
SENSOR_TYPE.BAROMETER      // 'barometer'
SENSOR_TYPE.CAMERA         // 'camera'
SENSOR_TYPE.ACCELEROMETER  // 'accelerometer'
```

```typescript
type SensorTypeName = typeof SENSOR_TYPE[keyof typeof SENSOR_TYPE];
```

## Geohash Constants

```typescript
GEOHASH_BASE32 = '0123456789bcdefghjkmnpqrstuvwxyz'
GEOHASH_MAX_PRECISION = 12
```

## Hashing Constants

```typescript
HASH_LENGTH = 64
EMPTY_HASH = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
```

## Timing Constants

```typescript
DEFAULT_POLLING_INTERVAL_MS = 2500
DEFAULT_BASE_URL = 'https://api.percent-20.com/api/v2'
DEFAULT_SENSOR_INTERVAL_MS = 1000
BLE_SCAN_TIMEOUT_MS = 10000
```

## Shake Detection

```typescript
SHAKE_THRESHOLD = 2.5        // g-force
SHAKE_COUNT_REQUIRED = 3
SHAKE_WINDOW_MS = 800
```

## Rate Limit Headers

```typescript
RATE_LIMIT_HEADERS = {
  MONTHLY_LIMIT: 'x-ratelimit-limit-monthly',
  MONTHLY_REMAINING: 'x-ratelimit-remaining-monthly',
  MINUTE_LIMIT: 'x-ratelimit-limit-minute',
  MINUTE_REMAINING: 'x-ratelimit-remaining-minute',
  RESET: 'x-ratelimit-reset',
}
```
