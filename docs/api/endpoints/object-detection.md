# Object Detection API

Server-side object detection from images. Used by the Camera sensor and available directly.

## Methods

### `detect(imageBase64)`

Detect objects in an image.

```typescript
// Via the camera sensor internally, or via direct API call
const response = await client.http.post<ObjectDetectionResponse>('/object_detection', {
  image: imageBase64,
});
```

**Route:** `POST /object_detection`

## Request

```json
{
  "image": "<base64-encoded image data>"
}
```

## Response

```typescript
interface ObjectDetectionResponse {
  labels: string[];
}
```

The `labels` array contains detected object names (e.g., `['laptop', 'coffee cup', 'person']`).

## Usage with Discovery

Detected objects can be used as vault signals:

```typescript
client.discovery.updateSignals({
  selectedKeys: ['objectDetection'],
  objectDetection: ['laptop', 'coffee cup'],
});
```

## Notes

- No native camera dependency required — the consumer provides the base64 image
- Processing happens server-side
- Detected labels are case-sensitive
