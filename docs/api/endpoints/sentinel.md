# Sentinel API

The sentinel endpoint is the core of vault discovery. It accepts a "stomp" (concatenated signal hashes) and returns matching vaults.

## Overview

This endpoint is used internally by `VaultDiscovery` — you typically don't call it directly.

## Request

```typescript
POST /sentinal
```

```json
{
  "stomp": "<concatenated SHA-256 hashes>"
}
```

## Response

```typescript
interface SentinelResponse {
  vaults: DiscoveredVault[];
}
```

Each `DiscoveredVault` contains:

```typescript
interface DiscoveredVault {
  uid: string;
  name: string;
  engine: EngineName;
  payload: Record<string, unknown>;
  access_token?: string;
  created_at: string;
}
```

## How It Works

1. Client builds hashes from sensor data using `buildStomp()`
2. Hashes are concatenated into a single string
3. Server matches hash substrings against vault shard hashes
4. Matching vaults are returned with their payloads

## Internal Usage

```typescript
// This is what VaultDiscovery does internally:
const stomp = buildStomp(signalInput);
const response = await sentinelApi.poll(stomp);
// response.vaults contains matching DiscoveredVault[]
```

## Notes

- The endpoint is spelled `/sentinal` (not `/sentinel`) for historical reasons
- Always-visible vaults (e.g., CRYPTO engine) are returned without hash matching
- Rate limits apply to sentinel requests
