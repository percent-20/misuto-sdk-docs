# API Response Types

## SentinelResponse

```typescript
interface SentinelResponse {
  vaults: DiscoveredVault[];
}
```

## VaultsIndexResponse

```typescript
interface VaultsIndexResponse {
  vaults: Vault[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
  };
}
```

## VaultCreateResponse

```typescript
interface VaultCreateResponse {
  id: string;
  uid: string;
  name: string;
  engine: string;
  location: {
    geohash: string;
    altitude: number | null;
    radius: number;
  };
  is_public: boolean;
  created_at: string;
  updated_at: string;
  payload: Record<string, unknown>;
  webhook_url: string | null;
  track_visitors: boolean;
  created_via: string;
  statistics: {
    beacons_created: number;
  };
}
```

## NearbyResponse

```typescript
interface NearbyResponse {
  vaults: Vault[];
  search: {
    latitude: number;
    longitude: number;
    radius: number;
  };
}
```

## BeaconsIndexResponse

```typescript
interface BeaconsIndexResponse {
  beacons: Beacon[];
  vault: {
    id: string;
    name: string;
    uid: string;
  };
  pagination: {
    page: number;
    per_page: number;
    total: number;
  };
}
```

## AccessTokenResponse

```typescript
interface AccessTokenResponse {
  access_token: string;
  vault_uid: string;
  expires_at: string;
}
```

## UploadLinkResponse

```typescript
interface UploadLinkResponse {
  upload_url: string;
  file_key: string;
}
```

## FileInfo

```typescript
interface FileInfo {
  key: string;
  filename: string;
  size: number;
  content_type: string;
  uploaded_at: string;
  download_url?: string;
}
```

## ObjectDetectionResponse

```typescript
interface ObjectDetectionResponse {
  labels: string[];
}
```

## MFA Response Types

```typescript
interface MfaVaultCreateResponse {
  vault_uid: string;
  name: string;
  access_token: string;
  instance_id: string;
}

interface MfaClaimResponse {
  status: 'claimed' | 'pending';
  vault_uid: string;
  access_token: string;
  instance_id: string;
  instance_name: string;
}

interface MfaBindResponse {
  status: 'bound' | 'already_bound';
  vault_uid: string;
  bound_at: string;
}

interface MfaChallengeResponse {
  challenge_id: string;
  status: string;
  reason?: string;
  decided_at?: string;
}

interface MfaPendingChallengesResponse {
  vault_uid: string;
  pending_count: number;
  challenges: Array<{
    challenge_id: string;
    instance_id: string;
    action: string;
    created_at: string;
    expires_at: string;
    respond_url: string;
  }>;
}

interface MfaStatusResponse {
  vault_uid: string;
  name: string;
  threshold: number;
  bound_instances: Array<{
    instance_id: string;
    instance_name: string;
    bound_at: string;
  }>;
  stats: {
    total_challenges: number;
    approved_count: number;
    denied_count: number;
    expired_count: number;
    last_challenge_at: string | null;
  };
  recent_challenges: Array<{
    challenge_id: string;
    status: string;
    action: string;
    created_at: string;
    decided_at: string | null;
  }>;
}
```
