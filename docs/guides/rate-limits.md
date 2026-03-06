# Rate Limits

The API enforces monthly and per-minute rate limits. The SDK tracks these automatically from response headers.

## Checking Rate Limits

### Using the Hook

```tsx
import { useRateLimits } from '@percent20/misuto-react-native-sdk';

function RateLimitDisplay() {
  const rateLimits = useRateLimits();

  return (
    <View>
      <Text>Monthly: {rateLimits.monthly.remaining}/{rateLimits.monthly.limit}</Text>
      <Text>Per Minute: {rateLimits.minute.remaining}/{rateLimits.minute.limit}</Text>
      {rateLimits.resetAt && (
        <Text>Resets: {new Date(rateLimits.resetAt).toLocaleString()}</Text>
      )}
    </View>
  );
}
```

The hook polls every 5 seconds and returns the latest limits from response headers.

### Using the Client

```typescript
const limits = client.getRateLimits();
```

## RateLimits Interface

```typescript
interface RateLimits {
  monthly: {
    limit: number | null;
    remaining: number | null;
  };
  minute: {
    limit: number | null;
    remaining: number | null;
  };
  resetAt: string | null;
}
```

Values are `null` until the first API response is received.

## Response Headers

The SDK reads these headers from every API response:

| Header | Description |
|--------|-------------|
| `x-ratelimit-limit-monthly` | Monthly request limit |
| `x-ratelimit-remaining-monthly` | Monthly requests remaining |
| `x-ratelimit-limit-minute` | Per-minute request limit |
| `x-ratelimit-remaining-minute` | Per-minute requests remaining |
| `x-ratelimit-reset` | When limits reset (ISO timestamp) |

## Handling Rate Limit Errors

When limits are exceeded, the SDK throws `RateLimitError`:

```typescript
import { RateLimitError } from '@percent20/misuto-react-native-sdk';

try {
  await client.vaults.list();
} catch (error) {
  if (error instanceof RateLimitError) {
    const retryMs = error.retryAfterMs || 60000;
    console.log(`Rate limited. Retry in ${retryMs}ms`);

    // Wait and retry
    await new Promise(resolve => setTimeout(resolve, retryMs));
    await client.vaults.list();
  }
}
```

## Usage Statistics

For detailed usage analytics, use the statistics endpoint:

```typescript
const stats = await client.statistics.get();

console.log('This month:', stats.usage.current_month);
console.log('Limit:', stats.usage.limit);
console.log('Remaining:', stats.usage.remaining);
console.log('Usage:', `${stats.usage.percentage_used}%`);
console.log('Trend:', stats.projection.trend);
console.log('Projected month-end:', stats.projection.estimated_month_end);
```
