# Connections API

User-provider connection management via `client.enterprise.connections`.

## Methods

### `list(params?)`

```typescript
client.enterprise.connections.list(params?: {
  provider_id?: string;
  status?: string;
}): Promise<{ connections: Connection[] }>
```

**Route:** `GET /enterprise/connections`

### `get(id)`

```typescript
client.enterprise.connections.get(id: string): Promise<Connection>
```

**Route:** `GET /enterprise/connections/:id`

### `create(params)`

```typescript
client.enterprise.connections.create(params: ConnectionCreateParams): Promise<Connection>
```

| Param | Type | Description |
|-------|------|-------------|
| `provider_id` | `string` | Provider ID |
| `user_id` | `string` | User ID |

**Route:** `POST /enterprise/connections`

### `delete(id)`

```typescript
client.enterprise.connections.delete(id: string): Promise<void>
```

**Route:** `DELETE /enterprise/connections/:id`

## Connection Type

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
