# Geohash Utilities

## Import

```typescript
import { encodeGeohash, Geohash } from '@percent20/misuto-react-native-sdk';
```

---

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

```typescript
const hash = encodeGeohash(37.7749, -122.4194);
// '9q8yyk8yuv2m' (12-character precision)

const coarse = encodeGeohash(37.7749, -122.4194, 6);
// '9q8yyk'
```

---

## Geohash Class

Full-featured geohash class used internally by `buildVaultHashes()` for radius-based geohash expansion. Also available for direct use.

### Constructor

```typescript
new Geohash({ geohash: string })
new Geohash({ location: [lat, lon], precision?: number })
```

```typescript
const gh = new Geohash({ geohash: '9q8yyk' });
const gh2 = new Geohash({ location: [37.7749, -122.4194], precision: 6 });
```

### Instance Properties

| Property | Type | Description |
|----------|------|-------------|
| `geohash` | `string` | The geohash string |
| `latitude` | `number` | Decoded center latitude |
| `longitude` | `number` | Decoded center longitude |
| `precision` | `number` | Geohash precision (string length) |

### Instance Methods

#### `bounds()`

Returns the bounding box of the geohash cell.

```typescript
gh.bounds(): { sw: { lat, lon }, ne: { lat, lon } }
```

#### `corners()`

Returns the four corner coordinates.

```typescript
gh.corners(): [number, number][]
```

#### `adjacent(direction)`

Returns the neighboring geohash in a given direction.

```typescript
gh.adjacent('n' | 's' | 'e' | 'w'): Geohash
```

#### `neighbours()`

Returns all 8 surrounding geohashes plus center.

```typescript
gh.neighbours(): Record<'c'|'n'|'ne'|'e'|'se'|'s'|'sw'|'w'|'nw', Geohash>
```

#### `containedGeohashes()`

Returns the 32 child geohashes at one precision level deeper.

```typescript
gh.containedGeohashes(): Geohash[]
```

#### `distanceTo(other)`

Haversine distance in meters to another geohash.

```typescript
gh.distanceTo(other: Geohash): number
```

#### `isCompletelyInRadius(center, radius)`

True if all four corners are within `radius` meters of `center`.

```typescript
gh.isCompletelyInRadius(center: Geohash, radius: number): boolean
```

#### `intersectsRadius(center, radius)`

True if some (but not all) corners are within `radius` meters.

```typescript
gh.intersectsRadius(center: Geohash, radius: number): boolean
```

### Static Methods

#### `Geohash.encode(lat, lon, precision)`

```typescript
Geohash.encode(37.7749, -122.4194, 9): string
```

#### `Geohash.decodeGeohash(geohash)`

```typescript
Geohash.decodeGeohash('9q8yyk'): { lat: number, lon: number }
```

#### `Geohash.distanceBetween(lat1, lon1, lat2, lon2)`

Haversine distance in meters between two coordinates.

```typescript
Geohash.distanceBetween(37.77, -122.42, 37.78, -122.41): number
```

#### `Geohash.precisionForRadius(radius)`

Returns the optimal geohash precision for a given radius in meters.

```typescript
Geohash.precisionForRadius(100)  // 7
Geohash.precisionForRadius(1000) // 5
```

#### `Geohash.generateOptimizedGeohashes(centerGeohash, radius)`

Generates all geohash cells that cover the given radius around a center point. Used internally by `buildVaultHashes()`.

```typescript
Geohash.generateOptimizedGeohashes('sv8wrqpg5', 100): string[]
```

Returns an array of geohash strings at varying precisions that fully cover the circular area. The algorithm:

1. Finds the largest geohash completely contained in the radius
2. Expands outward checking neighbors
3. Refines the outer rim by subdividing intersecting cells

---

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

## Encoding Algorithm

Uses the standard base32 interleaving algorithm with the character set:

```
0123456789bcdefghjkmnpqrstuvwxyz
```

Alternates between longitude and latitude bits, encoding 5 bits per character.
