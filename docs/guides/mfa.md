# Multi-Factor Authentication (MFA)

MFA vaults provide location-based multi-factor authentication. They support TOTP codes and agent-based approval flows.

## MFA Lifecycle

```
Create → Claim → Bind → Challenge → Respond
```

### 1. Create an MFA Vault

```typescript
const client = useMisuto();

const mfaVault = await client.interactions.mfa.create({
  name: 'Office Access',
  geohash: encodeGeohash(37.7749, -122.4194),
  radius: 50,
  threshold: 2, // Number of bound devices required
});

console.log('Vault UID:', mfaVault.vault_uid);
console.log('Instance ID:', mfaVault.instance_id);
```

### 2. Claim an Instance

A device claims an MFA instance to register itself:

```typescript
const claim = await client.interactions.mfa.claim(instanceId);

console.log('Status:', claim.status); // 'claimed' or 'pending'
console.log('Access Token:', claim.access_token);
```

### 3. Bind to the Vault

After claiming, bind the device to the vault:

```typescript
const bind = await client.interactions.mfa.bind(vaultId, accessToken);

console.log('Bound:', bind.status); // 'bound' or 'already_bound'
```

### 4. Create a Challenge

When authentication is needed, create a challenge:

```typescript
const challenge = await client.interactions.mfa.challenge(
  vaultId,
  'login-attempt' // optional action description
);

console.log('Challenge ID:', challenge.challenge_id);
console.log('Status:', challenge.status);
```

### 5. Respond to a Challenge

Bound devices can approve or deny challenges:

```typescript
await client.interactions.mfa.respond(
  vaultId,
  challengeId,
  'approve', // or 'deny'
  'User confirmed via fingerprint' // optional reason
);
```

### 6. Poll Challenge Status

Check if a challenge has been resolved:

```typescript
const result = await client.interactions.mfa.pollChallenge(vaultId, challengeId);

console.log('Status:', result.status); // 'pending', 'approved', 'denied', 'expired'
```

## Listing Pending Challenges

```typescript
const pending = await client.interactions.mfa.pendingChallenges(vaultId);

console.log(`${pending.pending_count} challenges waiting`);
pending.challenges.forEach(c => {
  console.log(`${c.challenge_id}: ${c.action} (expires ${c.expires_at})`);
});
```

## MFA Vault Status

Get the full status of an MFA vault:

```typescript
const status = await client.interactions.mfa.status(vaultId);

console.log('Threshold:', status.threshold);
console.log('Bound instances:', status.bound_instances.length);
console.log('Total challenges:', status.stats.total_challenges);
console.log('Approved:', status.stats.approved_count);
console.log('Denied:', status.stats.denied_count);
```

## Listing MFA Vaults

```typescript
const vaults = await client.vaults.list({ engine: 'mfa' });
```
