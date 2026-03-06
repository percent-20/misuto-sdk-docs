# Enterprise Types

## Provider

```typescript
interface Provider {
  id: string;
  name: string;
  provider_type: 'azure' | 'okta' | 'google' | 'saml' | 'oidc';
  status: string;
  configuration: Record<string, unknown>;
  api_key?: string;
  created_at: string;
  updated_at: string;
}
```

## Connection

```typescript
interface Connection {
  id: string;
  provider_id: string;
  user_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}
```

## Tenant

```typescript
interface Tenant {
  id: string;
  name: string;
  status: string;
  subscription_tier: string;
  usage_stats: Record<string, unknown>;
  resource_limits: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}
```

## TenantStats

```typescript
interface TenantStats {
  tenant_id: string;
  usage_stats: Record<string, unknown>;
  resource_limits: Record<string, unknown>;
  providers_count: number;
  connections_count: number;
  challenges_count: number;
  recent_events: SecurityEvent[];
}
```

## SecurityEvent

```typescript
interface SecurityEvent {
  id: string;
  tenant_id: string;
  event_type: string;
  severity: string;
  details: Record<string, unknown>;
  created_at: string;
}
```

## MfaChallenge

```typescript
interface MfaChallenge {
  challenge_id: string;
  instance_id: string;
  action: string;
  status: string;
  created_at: string;
  expires_at: string;
  respond_url?: string;
}
```

## MfaPendingResponse

```typescript
interface MfaPendingResponse {
  challenges: MfaChallenge[];
  count: number;
}
```

## MfaValidateResponse

```typescript
interface MfaValidateResponse {
  valid: boolean;
  session_id?: string;
  challenge_id: string;
  message: string;
  errors?: string[];
}
```

## ProviderCreateParams

```typescript
interface ProviderCreateParams {
  name: string;
  provider_type: Provider['provider_type'];
  configuration: Record<string, unknown>;
}
```

## ConnectionCreateParams

```typescript
interface ConnectionCreateParams {
  provider_id: string;
  user_id: string;
}
```

## TenantCreateParams

```typescript
interface TenantCreateParams {
  name: string;
  subscription_tier?: string;
}
```
