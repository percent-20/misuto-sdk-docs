# Enterprise MFA API

Enterprise-level MFA validation via `client.enterprise.mfa`.

## Methods

### `getPendingChallenges(params?)`

Get pending MFA challenges, optionally filtered by tenant.

```typescript
client.enterprise.mfa.getPendingChallenges(params?: {
  tenant_id?: string;
}): Promise<MfaPendingResponse>
```

**Route:** `POST /enterprise/mobile/mfa/pending`

**Response:**

```typescript
interface MfaPendingResponse {
  challenges: MfaChallenge[];
  count: number;
}
```

### `validateChallenge(challengeId, signalHashes)`

Validate an MFA challenge using signal hashes.

```typescript
client.enterprise.mfa.validateChallenge(
  challengeId: string,
  signalHashes: string[]
): Promise<MfaValidateResponse>
```

**Route:** `POST /enterprise/mobile/mfa/validate`

**Response:**

```typescript
interface MfaValidateResponse {
  valid: boolean;
  session_id?: string;
  challenge_id: string;
  message: string;
  errors?: string[];
}
```
