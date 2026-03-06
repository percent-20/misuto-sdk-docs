# File Storage

STORAGE engine vaults provide geo-fenced file storage with upload and download via signed URLs.

## Upload a File

```typescript
const client = useMisuto();

// 1. Get a signed upload URL
const { upload_url, file_key } = await client.interactions.storage.getUploadUrl(
  vaultUid,
  'photo.jpg'
);

// 2. Upload the file using fetch
await fetch(upload_url, {
  method: 'PUT',
  body: fileBlob,
  headers: { 'Content-Type': 'image/jpeg' },
});

console.log('Uploaded with key:', file_key);
```

## List Files

```typescript
const files = await client.interactions.storage.listFiles(vaultUid);

files.forEach(file => {
  console.log(`${file.filename} (${file.size} bytes) - ${file.content_type}`);
});
```

### FileInfo

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

## Download a File

```typescript
const { download_url } = await client.interactions.storage.getDownloadUrl(
  vaultUid,
  fileKey
);

// Use download_url with fetch, Image component, or Linking.openURL
```

## Rename a File

```typescript
const updated = await client.interactions.storage.renameFile(
  vaultUid,
  fileKey,
  'new-name.jpg'
);
```

## Delete a File

```typescript
await client.interactions.storage.deleteFile(vaultUid, fileKey);
```

## Storage API Summary

| Method | Description |
|--------|-------------|
| `getUploadUrl(vaultUid, filename)` | Get a signed upload URL |
| `listFiles(vaultUid)` | List all files in the vault |
| `getDownloadUrl(vaultUid, fileKey)` | Get a signed download URL |
| `deleteFile(vaultUid, fileKey)` | Delete a file |
| `renameFile(vaultUid, fileKey, newFilename)` | Rename a file |
