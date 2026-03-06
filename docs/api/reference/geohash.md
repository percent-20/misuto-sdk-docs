# Geohash Utility

## Import

```typescript
import { encodeGeohash } from '@percent20/misuto-react-native-sdk';
```

## encodeGeohash

Encode latitude/longitude coordinates to a geohash string.

```typescript
function encodeGeohash(latitude: number, longitude: number, precision?: number): string
```

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `latitude` | `number` | — | Latitude (-90 to 90) |
| `longitude` | `number` | — | Longitude (-180 to 180) |
| `precision` | `number` | `12` | Geohash precision (1-12) |

## Precision Levels

| Precision | Approximate Area |
|-----------|-----------------|
| 1 | 5,000 km x 5,000 km |
| 2 | 1,250 km x 625 km |
| 3 | 156 km x 156 km |
| 4 | 39.1 km x 19.5 km |
| 5 | 4.89 km x 4.89 km |
| 6 | 1.22 km x 0.61 km |
| 7 | 153 m x 153 m |
| 8 | 38.2 m x 19.1 m |
| 9 | 4.77 m x 4.77 m |
| 10 | 1.19 m x 0.596 m |
| 11 | 149 mm x 149 mm |
| 12 | 37.2 mm x 18.6 mm |

## Example

```typescript
const hash = encodeGeohash(37.7749, -122.4194);
// '9q8yyk8yuv2m' (12-character precision)

const coarse = encodeGeohash(37.7749, -122.4194, 6);
// '9q8yyk'
```

## Algorithm

Uses the standard base32 interleaving algorithm with the character set:

```
0123456789bcdefghjkmnpqrstuvwxyz
```

Alternates between longitude and latitude bits, encoding 5 bits per character.
