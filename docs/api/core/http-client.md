# HttpClient

Low-level HTTP client wrapping Axios. Injects authentication, parses rate-limit headers, and throws typed errors.

## Import

```typescript
import { HttpClient } from '@percent20/misuto-react-native-sdk';
```

## Constructor

```typescript
new HttpClient(apiKey: string, baseUrl?: string)
```

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `apiKey` | `string` | — | API key for Authorization header |
| `baseUrl` | `string` | `'https://api.percent-20.com/api/v2'` | Base URL for requests |

Timeout: 30 seconds.

## Methods

### `get<T>(path, params?)`

```typescript
get<T>(path: string, params?: Record<string, unknown>): Promise<T>
```

### `post<T>(path, data?)`

```typescript
post<T>(path: string, data?: unknown): Promise<T>
```

### `put<T>(path, data?)`

```typescript
put<T>(path: string, data?: unknown): Promise<T>
```

### `patch<T>(path, data?)`

```typescript
patch<T>(path: string, data?: unknown): Promise<T>
```

### `delete<T>(path)`

```typescript
delete<T>(path: string): Promise<T>
```

### `getRateLimits()`

```typescript
getRateLimits(): RateLimits
```

Returns the latest rate limit values parsed from response headers.

### `getBaseUrl()`

```typescript
getBaseUrl(): string
```

## Error Handling

| HTTP Status | Error Thrown |
|-------------|-------------|
| 429 | `RateLimitError` (parses `retry-after` header) |
| Other 4xx/5xx | `ApiError` with `statusCode` and parsed message |
| Network error | `ApiError` with `statusCode: 0` |

## Example

```typescript
const http = new HttpClient('pk_live_abc123');

const vaults = await http.get<{ vaults: Vault[] }>('/clients/vaults');
const vault = await http.post<Vault>('/clients/vaults', { name: 'Test', engine: 'chat', geohash: 'abc' });
```
