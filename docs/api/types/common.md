# Common Types

## PaginationParams

```typescript
interface PaginationParams {
  page?: number;
  per_page?: number;
}
```

## PaginatedResponse

```typescript
interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
  };
}
```

## ApiErrorResponse

```typescript
interface ApiErrorResponse {
  error?: string;
  errors?: string[];
  message?: string;
}
```

## RateLimits

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
