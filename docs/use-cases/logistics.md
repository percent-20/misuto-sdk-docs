# Logistics

Location-aware vaults create verifiable chain-of-custody, secure handoffs, and automated dock management.

## Chain-of-Custody (WEBHOOK)

Track cargo movement with webhook-triggered vaults:

```typescript
await client.vaults.create({
  name: 'Warehouse A Checkpoint',
  engine: ENGINE.WEBHOOK,
  geohash: encodeGeohash(33.9425, -118.4081),
  radius: 50,
  webhook_url: 'https://logistics.example/api/custody',
  track_visitors: true,
  payload: {
    checkpoint: 'warehouse-a',
    step: 3,
  },
});
```

**Workflow:** When a driver's device enters the warehouse geofence, the webhook fires with the driver's identity and timestamp — creating an immutable custody record.

## Cargo Handoffs with NFC (MFA)

Two-factor handoffs requiring physical presence AND NFC verification:

```typescript
const handoff = await client.interactions.mfa.create({
  name: 'Container #4521 Handoff',
  geohash: encodeGeohash(33.9425, -118.4081),
  radius: 25,
  threshold: 2, // Both parties must confirm
});

// Driver signals include NFC tag from cargo seal
client.discovery.updateSignals({
  selectedKeys: ['location', 'nfcTags'],
  nfcTags: ['seal-4521'],
});
```

**Process:**
1. Driver arrives at dock with cargo
2. MFA challenge created requiring both driver AND receiver
3. Driver scans NFC seal on container
4. Receiver approves on their device
5. Handoff recorded with location + time + NFC proof

## Self-Destructing Shipping Manifests (DEADROP)

Manifests that can only be viewed once at the delivery point:

```typescript
await client.vaults.create({
  name: 'Manifest - Order #9872',
  engine: ENGINE.DEADROP,
  geohash: encodeGeohash(40.7128, -74.0060),
  radius: 30,
  payload: {
    ttl: 300,
    manifest: {
      items: ['Widget A x 50', 'Widget B x 100'],
      special_handling: 'fragile',
    },
  },
});
```

## Time-of-Day Dock Access

Restrict dock access to scheduled delivery windows:

```typescript
await client.vaults.create({
  name: 'Dock 7 - Morning Window',
  engine: ENGINE.PAYLOAD,
  geohash: encodeGeohash(33.9425, -118.4081),
  radius: 20,
  signals: ['location', 'timeOfDay'],
  payload: {
    dock: 7,
    instructions: 'Back in to bay. Ring bell on arrival.',
  },
});
```

## BLE Beacon for Warehouse Zones

Use BLE beacons to track movement through warehouse zones:

```typescript
// Vault requires being near a specific BLE beacon
await client.vaults.create({
  name: 'Cold Storage Zone',
  engine: ENGINE.WEBHOOK,
  geohash: encodeGeohash(33.9425, -118.4081),
  radius: 15,
  signals: ['location', 'nearbyDevices'],
  constraints: {
    ble_device_names: { contains_all: ['ColdStorage-Beacon-1'] },
  },
  webhook_url: 'https://logistics.example/api/zone-entry',
});
```

## Fleet Tracking Dashboard

Monitor driver locations with the statistics API:

```typescript
const stats = await client.statistics.get();
console.log(`API calls today: ${stats.daily_breakdown[0]?.count}`);
```
