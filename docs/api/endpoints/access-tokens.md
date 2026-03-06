# Access Tokens API

Create access tokens for vault interactions.

## Overview

Access tokens are required for interacting with discovered vaults (e.g., joining a chat, uploading files). Used internally by `VaultInteraction`.

## Method

### `create(vaultUid)`

```typescript
client.interactions.getAccessToken(vaultUid: string): Promise<AccessTokenResponse>
```

**Route:** `POST /bubbles/:uid/access_tokens`

## Response

```typescript
interface AccessTokenResponse {
  access_token: string;
  vault_uid: string;
  expires_at: string;
}
```

## Usage

```typescript
const client = useMisuto();

const { access_token, expires_at } = await client.interactions.getAccessToken('vault-uid');

// Use the token for chat, storage, etc.
const chat = client.interactions.createChat({
  vaultUid: 'vault-uid',
  accessToken: access_token,
});
```

## Notes

- Tokens are short-lived (see `expires_at`)
- Discovered vaults may already include an `access_token` in the sentinel response
- Tokens are vault-specific — each vault requires its own token
