# MFA Vaults API

MFA vault lifecycle operations. Accessed via `client.interactions.mfa`.

## Methods

### `create(params)`

Create an MFA vault.

```typescript
client.interactions.mfa.create(params: {
  name: string;
  geohash: string;
  radius?: number;
  threshold?: number;
}): Promise<MfaVaultCreateResponse>
```

**Response:**

```typescript
interface MfaVaultCreateResponse {
  vault_uid: string;
  name: string;
  access_token: string;
  instance_id: string;
}
```

### `claim(instanceId)`

Claim an MFA instance.

```typescript
client.interactions.mfa.claim(instanceId: string): Promise<MfaClaimResponse>
```

### `bind(vaultId, accessToken)`

Bind a claimed device to the vault.

```typescript
client.interactions.mfa.bind(vaultId: string, accessToken: string): Promise<MfaBindResponse>
```

### `challenge(vaultId, action?)`

Create a new MFA challenge.

```typescript
client.interactions.mfa.challenge(vaultId: string, action?: string): Promise<MfaChallengeResponse>
```

### `pollChallenge(vaultId, challengeId)`

Check the status of a challenge.

```typescript
client.interactions.mfa.pollChallenge(
  vaultId: string, challengeId: string
): Promise<MfaChallengeResponse>
```

### `respond(vaultId, challengeId, decision, reason?)`

Approve or deny a challenge.

```typescript
client.interactions.mfa.respond(
  vaultId: string,
  challengeId: string,
  decision: 'approve' | 'deny',
  reason?: string
): Promise<MfaChallengeResponse>
```

### `pendingChallenges(vaultId)`

List pending challenges for a vault.

```typescript
client.interactions.mfa.pendingChallenges(vaultId: string): Promise<MfaPendingChallengesResponse>
```

### `status(vaultId)`

Get full MFA vault status.

```typescript
client.interactions.mfa.status(vaultId: string): Promise<MfaStatusResponse>
```
