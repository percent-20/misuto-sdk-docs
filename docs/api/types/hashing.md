# Hashing Types

## SignalInput

Input for the signal hashing functions:

```typescript
interface SignalInput {
  salt?: string;
  pepper?: string;
  accountKey?: string;
  geohash?: string;
  altitude?: number | null;
  heading?: number | null;
  useAltitude?: boolean;
  useHeading?: boolean;
  selectedKeys: string[];
  wifiNetworks?: Array<{ SSID: string }>;
  bleDevices?: Array<{ name: string }>;
  objectDetection?: string[];
  freeText?: string;
  nfcTags?: string[];
}
```

## HashConfig

```typescript
interface HashConfig {
  maxPrecision?: number;
}
```
