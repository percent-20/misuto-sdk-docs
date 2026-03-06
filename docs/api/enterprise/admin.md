# Admin API

Tenant, user, and security event management via `client.enterprise.admin`.

## Tenant Management

### `admin.tenants.list(params?)`

```typescript
client.enterprise.admin.tenants.list(params?: {
  status?: string;
  subscription_tier?: string;
}): Promise<{ tenants: Tenant[] }>
```

### `admin.tenants.get(id)`

```typescript
client.enterprise.admin.tenants.get(id: string): Promise<Tenant>
```

### `admin.tenants.create(params)`

```typescript
client.enterprise.admin.tenants.create(params: TenantCreateParams): Promise<Tenant>
```

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | Yes | Tenant name |
| `subscription_tier` | `string` | No | Subscription tier |

### `admin.tenants.update(id, params)`

```typescript
client.enterprise.admin.tenants.update(
  id: string, params: Partial<TenantCreateParams>
): Promise<Tenant>
```

### `admin.tenants.delete(id)`

```typescript
client.enterprise.admin.tenants.delete(id: string): Promise<void>
```

### `admin.tenants.stats(id)`

```typescript
client.enterprise.admin.tenants.stats(id: string): Promise<TenantStats>
```

## User Management

### `admin.users.list(tenantId)`

```typescript
client.enterprise.admin.users.list(tenantId: string): Promise<{ users: unknown[] }>
```

### `admin.users.get(tenantId, userId)`

```typescript
client.enterprise.admin.users.get(
  tenantId: string, userId: string
): Promise<{ user: unknown; connections: unknown[] }>
```

### `admin.users.update(tenantId, userId, params)`

```typescript
client.enterprise.admin.users.update(
  tenantId: string, userId: string, params: Record<string, unknown>
): Promise<unknown>
```

### `admin.users.delete(tenantId, userId)`

```typescript
client.enterprise.admin.users.delete(tenantId: string, userId: string): Promise<void>
```

## Security Events

### `admin.securityEvents.list(params?)`

```typescript
client.enterprise.admin.securityEvents.list(params?: PaginationParams & {
  tenant_id?: string;
  severity?: string;
  event_type?: string;
}): Promise<{
  events: SecurityEvent[];
  pagination: { page: number; perPage: number; total: number; totalPages: number };
}>
```
