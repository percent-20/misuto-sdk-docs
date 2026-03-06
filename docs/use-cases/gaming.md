# Gaming

Location-aware vaults transform mobile gaming with real-world exploration mechanics.

## Location-Based Loot Boxes (REWARD)

Drop REWARD vaults at real-world locations. First N players to discover them get the loot.

```typescript
await client.vaults.create({
  name: 'Legendary Sword Drop',
  engine: ENGINE.REWARD,
  geohash: encodeGeohash(40.7128, -74.0060), // Times Square
  radius: 50,
  payload: {
    reward: { item: 'legendary_sword', rarity: 'epic' },
    max_visitors: 5, // First 5 players
  },
});
```

**Why it works:** Players must physically walk to the location. No GPS spoofing protection needed — the hash-based system makes it cryptographically difficult to fake.

## Self-Destructing Treasure (DEADROP)

One-time treasures that disappear after the first player opens them.

```typescript
await client.vaults.create({
  name: 'Ancient Map Fragment',
  engine: ENGINE.DEADROP,
  geohash: encodeGeohash(51.5074, -0.1278),
  radius: 25,
  payload: { ttl: 300 }, // 5-minute viewing window
});
```

**Game mechanic:** Place 10 DEADROP vaults with map fragments. Players race to collect all pieces. Each fragment vanishes after first discovery.

## Guild Halls (CHAT)

Location-bound chat rooms for guilds and clans.

```typescript
const hall = await client.vaults.create({
  name: 'Dragon Slayers Guild Hall',
  engine: ENGINE.CHAT,
  geohash: encodeGeohash(35.6762, 139.6503),
  radius: 100,
  signals: ['location'],
});
```

Players can only join guild chat when physically at the guild hall location. Creates real-world meetup spots for gaming communities.

## Signal Puzzles

Combine multiple signals to create puzzle mechanics:

```typescript
// Vault requires: correct location + correct time + password
await client.vaults.create({
  name: 'Midnight Challenge',
  engine: ENGINE.REWARD,
  geohash: encodeGeohash(48.8566, 2.3522),
  radius: 30,
  signals: ['location', 'timeOfDay', 'freeText'],
  constraints: {
    free_text: 'the-secret-word',
  },
  payload: {
    reward: { xp: 5000, title: 'Night Owl' },
    max_visitors: 1,
  },
});
```

## NFC Quest Items

Physical NFC tags as quest items:

```typescript
// Player must scan an NFC tag AND be at the location
client.discovery.updateSignals({
  selectedKeys: ['location', 'nfcTags'],
  nfcTags: ['quest-item-42'],
});
```

**Implementation:** Place NFC stickers at real-world quest checkpoints. Players must physically tap and be at the location.

## AR Integration with Object Detection

Use the camera sensor for object-based challenges:

```typescript
// "Find a red door" challenge
client.discovery.updateSignals({
  selectedKeys: ['location', 'objectDetection'],
  objectDetection: ['door'],
});
```
