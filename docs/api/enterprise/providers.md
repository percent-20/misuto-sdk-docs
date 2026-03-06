# Providers API

SSO provider management via `client.enterprise.providers`.

## Methods

### `list()`

```typescript
client.enterprise.providers.list(): Promise<{ providers: Provider[] }>
```

**Route:** `GET /enterprise/providers`

### `get(id)`

```typescript
client.enterprise.providers.get(id: string): Promise<Provider>
```

**Route:** `GET /enterprise/providers/:id`

### `create(params)`

```typescript
client.enterprise.providers.create(params: ProviderCreateParams): Promise<Provider>
```

| Param | Type | Description |
|-------|------|-------------|
| `name` | `string` | Provider name |
| `provider_type` | `'azure' \| 'okta' \| 'google' \| 'saml' \| 'oidc'` | Protocol type |
| `configuration` | `Record<string, unknown>` | Provider-specific config |

**Route:** `POST /enterprise/providers`

### `update(id, params)`

```typescript
client.enterprise.providers.update(
  id: string, params: Partial<ProviderCreateParams>
): Promise<Provider>
```

**Route:** `PUT /enterprise/providers/:id`

### `delete(id)`

```typescript
client.enterprise.providers.delete(id: string): Promise<void>
```

**Route:** `DELETE /enterprise/providers/:id`

### `test(id)`

Test provider configuration.

```typescript
client.enterprise.providers.test(id: string): Promise<{
  status: string;
  message: string;
  issues?: string[];
}>
```

**Route:** `POST /enterprise/providers/:id/test`

### `rotateApiKey(id)`

Rotate the provider's API key.

```typescript
client.enterprise.providers.rotateApiKey(id: string): Promise<{
  api_key: string;
  message: string;
}>
```

**Route:** `POST /enterprise/providers/:id/rotate_api_key`
