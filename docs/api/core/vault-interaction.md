# VaultInteraction

Provides methods for interacting with discovered vaults — chat, file storage, MFA, and access tokens.

## Import

```typescript
import { VaultInteraction } from '@percent20/misuto-react-native-sdk';
```

## Constructor

```typescript
new VaultInteraction(http: HttpClient)
```

## Properties

### `storage`

File storage operations. See [File Storage guide](/guides/file-storage).

| Method | Signature |
|--------|-----------|
| `listFiles` | `(vaultUid: string) => Promise<FileInfo[]>` |
| `getUploadUrl` | `(vaultUid: string, filename: string) => Promise<UploadLinkResponse>` |
| `getDownloadUrl` | `(vaultUid: string, fileKey: string) => Promise<{ download_url: string }>` |
| `deleteFile` | `(vaultUid: string, fileKey: string) => Promise<void>` |
| `renameFile` | `(vaultUid: string, fileKey: string, newFilename: string) => Promise<FileInfo>` |

### `mfa`

MFA operations. See [MFA guide](/guides/mfa).

| Method | Signature |
|--------|-----------|
| `create` | `(params) => Promise<MfaVaultCreateResponse>` |
| `claim` | `(instanceId: string) => Promise<MfaClaimResponse>` |
| `bind` | `(vaultId: string, accessToken: string) => Promise<MfaBindResponse>` |
| `challenge` | `(vaultId: string, action?: string) => Promise<MfaChallengeResponse>` |
| `pollChallenge` | `(vaultId: string, challengeId: string) => Promise<MfaChallengeResponse>` |
| `respond` | `(vaultId, challengeId, decision, reason?) => Promise<MfaChallengeResponse>` |
| `pendingChallenges` | `(vaultId: string) => Promise<MfaPendingChallengesResponse>` |
| `status` | `(vaultId: string) => Promise<MfaStatusResponse>` |

## Methods

### `getAccessToken(vaultUid)`

Get an access token for a vault.

```typescript
getAccessToken(vaultUid: string): Promise<AccessTokenResponse>
```

### `createChat(config)`

Create a new `ChatClient` instance.

```typescript
createChat(config: ChatConfig): ChatClient
```
