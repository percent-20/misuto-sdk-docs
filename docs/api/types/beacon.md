# Beacon Types

## Beacon

```typescript
interface Beacon {
  id: string;
  token: string;
  name: string;
  type: 'wormhole' | 'conversation';
  status: 'unredeemed' | 'redeemed' | 'expired';
  redeemed_at: string | null;
  transferable: boolean;
  snapshot: Record<string, unknown> | null;
  created_via: string;
  created_at: string;
  source_vault?: {
    id: string;
    name: string;
    uid: string;
  };
}
```

## BeaconCreateParams

```typescript
interface BeaconCreateParams {
  name?: string;
  type?: 'wormhole' | 'conversation';
  policy?: BeaconPolicy;
  send_to?: {
    method: 'sms' | 'email';
    destination: string;
  };
}
```

## BulkBeaconCreateParams

```typescript
interface BulkBeaconCreateParams {
  count: number;
  type?: 'wormhole' | 'conversation';
  policy?: BeaconPolicy;
}
```

## BulkBeaconResponse

```typescript
interface BulkBeaconResponse {
  created: number;
  failed: number;
  beacons: Beacon[];
  errors: string[];
  download_url: string | null;
}
```

## BeaconPolicy

```typescript
interface BeaconPolicy {
  required_signals?: string[];
  constraints?: {
    time?: TimeConstraint;
    wifi_ssids?: DeviceConstraint;
    ble_device_names?: DeviceConstraint;
    free_text?: string;
    nfc_tag_ids?: string[];
    object_detection?: string[];
  };
}
```

## TimeConstraint

```typescript
interface TimeConstraint {
  mode: 'within_minutes_from_now' | 'range';
  minutes?: number;
  start?: string;
  end?: string;
}
```

## DeviceConstraint

```typescript
interface DeviceConstraint {
  contains_all?: string[];
}
```

## BeaconPreview

```typescript
interface BeaconPreview {
  token: string;
  vault: {
    uid: string;
    name: string;
    engine: string;
  };
  policy: BeaconPolicy | null;
  status: string;
}
```
