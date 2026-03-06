# Real Estate

Location-aware vaults create new workflows for property viewings, document access, and agent communication.

## Property Documents at Location (STORAGE)

Make property documents accessible only at the property:

```typescript
await client.vaults.create({
  name: '123 Main St - Documents',
  engine: ENGINE.STORAGE,
  geohash: encodeGeohash(37.7749, -122.4194),
  radius: 30,
  signals: ['location'],
  payload: { property_id: 'prop-123' },
});

// Upload inspection report, floor plans, disclosures
const { upload_url } = await client.interactions.storage.getUploadUrl(
  vault.uid,
  'inspection-report.pdf'
);
```

**Benefit:** Buyers can only view documents while physically at the property — no accidental leaks of sensitive inspection reports.

## Open-House Chat Rooms (CHAT)

Chat rooms that activate during open houses:

```typescript
await client.vaults.create({
  name: 'Open House Q&A',
  engine: ENGINE.CHAT,
  geohash: encodeGeohash(37.7749, -122.4194),
  radius: 50,
  signals: ['location', 'timeOfDay'],
  payload: { agent: 'Jane Smith' },
});
```

**Workflow:** Visitors at the open house can ask questions in a shared chat. Agent responds in real-time. Chat only exists at the property during the scheduled hours.

## Exclusive Offers (DEADROP)

One-time exclusive offers for the first serious buyer:

```typescript
await client.vaults.create({
  name: 'Pre-Market Price',
  engine: ENGINE.DEADROP,
  geohash: encodeGeohash(37.7749, -122.4194),
  radius: 25,
  payload: {
    ttl: 600, // 10-minute viewing window
    offer: 'Pre-market: $1.2M (below asking)',
  },
});
```

**Mechanic:** First person to discover the vault sees the exclusive pre-market price. After that, it's gone.

## Floor Detection with Barometer

Distinguish between units in multi-story buildings:

```typescript
// Different vaults for different floors
await client.vaults.create({
  name: 'Unit 3B - Details',
  engine: ENGINE.STORAGE,
  geohash: encodeGeohash(37.7749, -122.4194),
  radius: 15,
  signals: ['location'],
  payload: { unit: '3B', floor: 3 },
});

// Enable altitude for floor-level precision
client.discovery.updateSignals({
  selectedKeys: ['location'],
  useAltitude: true,
});
```

## Beacon-Based Property Tours

Create guided tours with time-limited beacons:

```typescript
const { beacons } = await client.beacons.bulkCreate(vaultId, {
  count: 20,
  type: 'wormhole',
  policy: {
    required_signals: ['location'],
    constraints: {
      time: { mode: 'within_minutes_from_now', minutes: 120 },
    },
  },
});

// Share beacon tokens with scheduled visitors
beacons.forEach(b => console.log(`Tour access: ${b.token}`));
```
