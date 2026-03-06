# Uploads API

File upload and download operations for STORAGE engine vaults. Accessed via `client.interactions.storage`.

## Methods

### `getUploadUrl(vaultUid, filename)`

Get a signed URL for uploading a file.

```typescript
client.interactions.storage.getUploadUrl(vaultUid: string, filename: string): Promise<UploadLinkResponse>
```

**Response:**

```typescript
interface UploadLinkResponse {
  upload_url: string;
  file_key: string;
}
```

### `listFiles(vaultUid)`

List all files in a vault.

```typescript
client.interactions.storage.listFiles(vaultUid: string): Promise<FileInfo[]>
```

**Response:**

```typescript
interface FileInfo {
  key: string;
  filename: string;
  size: number;
  content_type: string;
  uploaded_at: string;
  download_url?: string;
}
```

### `getDownloadUrl(vaultUid, fileKey)`

Get a signed download URL.

```typescript
client.interactions.storage.getDownloadUrl(
  vaultUid: string, fileKey: string
): Promise<{ download_url: string }>
```

### `deleteFile(vaultUid, fileKey)`

Delete a file.

```typescript
client.interactions.storage.deleteFile(vaultUid: string, fileKey: string): Promise<void>
```

### `renameFile(vaultUid, fileKey, newFilename)`

Rename a file.

```typescript
client.interactions.storage.renameFile(
  vaultUid: string, fileKey: string, newFilename: string
): Promise<FileInfo>
```
