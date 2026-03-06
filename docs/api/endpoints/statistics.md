# Statistics API

Usage statistics for the authenticated API client. Accessed via `client.statistics`.

## Methods

### `get()`

Get comprehensive usage statistics.

```typescript
client.statistics.get(): Promise<ApiClientStatistics>
```

**Route:** `GET /api_clients/statistics`

## Response

```typescript
interface ApiClientStatistics {
  client: {
    name: string;
    organization: string;
    created_at: string;
  };
  usage: {
    current_month: number;
    limit: number;
    remaining: number;
    percentage_used: number;
    overage_allowed: boolean;
    is_overage: boolean;
    overage_amount: number;
  };
  rate_limits: {
    monthly: {
      limit: number;
      used: number;
      remaining: number;
      reset_at: string;
    };
    per_minute: {
      limit: number;
      used: number;
      remaining: number;
    };
  };
  daily_breakdown: Array<{
    date: string;
    count: number;
  }>;
  projection: {
    estimated_month_end: number;
    trend: string;
  };
}
```

## Example

```typescript
const stats = await client.statistics.get();

console.log(`Organization: ${stats.client.organization}`);
console.log(`Usage: ${stats.usage.current_month} / ${stats.usage.limit}`);
console.log(`Trend: ${stats.projection.trend}`);

// Daily breakdown
stats.daily_breakdown.forEach(day => {
  console.log(`${day.date}: ${day.count} requests`);
});
```
