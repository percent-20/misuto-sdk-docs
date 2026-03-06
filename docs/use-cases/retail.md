# Retail

Transform in-store experiences with location-triggered rewards, NFC product scanning, and contextual messaging.

## In-Store Coupons (REWARD)

Drop REWARD vaults at specific store locations:

```typescript
await client.vaults.create({
  name: '20% Off Spring Collection',
  engine: ENGINE.REWARD,
  geohash: encodeGeohash(34.0522, -118.2437),
  radius: 30,
  payload: {
    coupon_code: 'SPRING20',
    discount_percent: 20,
    max_visitors: 100,
  },
});
```

**Mechanic:** First 100 customers who physically visit the store discover the coupon. No QR codes or app push notifications needed — the vault appears automatically.

## Contextual Notifications (MESSAGE)

Location-triggered product information:

```typescript
await client.vaults.create({
  name: 'New Arrivals Notification',
  engine: ENGINE.MESSAGE,
  geohash: encodeGeohash(34.0522, -118.2437),
  radius: 10,
  payload: {
    message: 'Check out our new arrivals in aisle 3!',
    category: 'promotion',
  },
});
```

## NFC Product Scanning

Tap NFC tags on product displays for instant information:

```typescript
// Start NFC sensor
await client.sensors.startSensor('nfc');

// Listen for tag scans
client.sensors.on('reading', (reading) => {
  if (reading.type === 'nfc') {
    // Use tag ID as a signal for discovery
    client.discovery.updateSignals({
      selectedKeys: ['location', 'nfcTags'],
      nfcTags: [reading.data.id],
    });
  }
});
```

**Setup:** Place NFC stickers on product displays. When customers tap, the vault matching that NFC tag + location reveals product details, reviews, or exclusive offers.

## Object Detection for Products

Use camera-based object detection as signals:

```typescript
// Customer points camera at a product
const labels = await cameraSensor.detectObjects(imageBase64);
// ['sneakers', 'nike', 'running_shoe']

client.discovery.updateSignals({
  selectedKeys: ['location', 'objectDetection'],
  objectDetection: labels,
});
```

## WiFi-Verified In-Store Presence

Ensure customers are actually in the store, not just nearby:

```typescript
// Vault requires store WiFi connection
await client.vaults.create({
  name: 'In-Store Exclusive',
  engine: ENGINE.REWARD,
  geohash: encodeGeohash(34.0522, -118.2437),
  radius: 50,
  signals: ['location', 'nearbyDevices'],
  constraints: {
    wifi_ssids: { contains_all: ['StoreWiFi-Guest'] },
  },
  payload: { offer: 'free-sample' },
});
```

## Real-Time Customer Support (CHAT)

Location-bound help desks:

```typescript
await client.vaults.create({
  name: 'Electronics Help Desk',
  engine: ENGINE.CHAT,
  geohash: encodeGeohash(34.0522, -118.2437),
  radius: 20,
  signals: ['location'],
});
```

Customers discover a chat room when they're in the electronics section. Staff monitors the room for questions.
