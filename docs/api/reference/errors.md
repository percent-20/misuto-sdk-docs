# Errors

## Hierarchy

```
Error
  └── MisutoError
        ├── ConfigError
        ├── SensorError
        └── ApiError
              └── RateLimitError
```

## MisutoError

Base error for all SDK errors.

```typescript
class MisutoError extends Error {
  constructor(message: string)
}
```

## ConfigError

Configuration errors (e.g., missing API key).

```typescript
class ConfigError extends MisutoError {
  constructor(message: string)
}
```

## SensorError

Sensor initialization or runtime errors.

```typescript
class SensorError extends MisutoError {
  public readonly sensorType: string;
  constructor(message: string, sensorType: string)
}
```

## ApiError

HTTP API errors.

```typescript
class ApiError extends MisutoError {
  public readonly statusCode: number;
  public readonly responseBody: unknown;
  constructor(message: string, statusCode: number, responseBody?: unknown)
}
```

## RateLimitError

HTTP 429 rate limit exceeded.

```typescript
class RateLimitError extends ApiError {
  public readonly retryAfterMs: number | null;
  constructor(message: string, statusCode: number, retryAfterMs: number | null)
}
```

## Import

```typescript
import {
  MisutoError,
  ApiError,
  SensorError,
  ConfigError,
  RateLimitError,
} from '@percent20/misuto-react-native-sdk';
```
