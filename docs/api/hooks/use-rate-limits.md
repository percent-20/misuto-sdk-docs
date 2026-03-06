# useRateLimits

Provides reactive access to current API rate limit state.

## Import

```typescript
import { useRateLimits } from '@percent20/misuto-react-native-sdk';
```

## Signature

```typescript
function useRateLimits(): RateLimits
```

## Returns

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

## Example

```tsx
function ApiUsage() {
  const { monthly, minute, resetAt } = useRateLimits();

  return (
    <View>
      <Text>Monthly: {monthly.remaining ?? '—'} / {monthly.limit ?? '—'}</Text>
      <Text>Per Minute: {minute.remaining ?? '—'} / {minute.limit ?? '—'}</Text>
      {resetAt && <Text>Resets: {new Date(resetAt).toLocaleString()}</Text>}
    </View>
  );
}
```

## Notes

- Polls `client.getRateLimits()` every 5 seconds
- Cleans up interval on unmount
