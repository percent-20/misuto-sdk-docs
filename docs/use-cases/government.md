# Government

Location-aware vaults provide multi-signal security, emergency protocols, and classified access control for government applications.

## Multi-Signal Classified Access

Require multiple simultaneous signals for classified document access:

```typescript
await client.vaults.create({
  name: 'Classified Briefing Room',
  engine: ENGINE.STORAGE,
  geohash: encodeGeohash(38.8977, -77.0365),
  radius: 10,
  signals: ['location', 'nearbyDevices', 'nfcTags', 'timeOfDay'],
  constraints: {
    wifi_ssids: { contains_all: ['SCIF-Network'] },
    ble_device_names: { contains_all: ['Badge-Reader-A'] },
    nfc_tag_ids: ['clearance-badge-001'],
  },
});
```

**Security layers:**
1. GPS — Must be at the correct facility
2. WiFi — Must be on the SCIF network
3. BLE — Must be near the badge reader
4. NFC — Must tap clearance badge
5. Time — Must be during authorized hours

## Emergency Exit: Shake-to-Wipe

The ultimate panic button for classified scenarios:

```typescript
const { isArmed, disarm } = useShakeDetector();

useEffect(() => {
  if (isArmed) {
    // Zero ALL search signals immediately
    client.discovery.updateSignals({
      selectedKeys: [],
      freeText: '',
      objectDetection: [],
      nfcTags: [],
    });
    client.discovery.stop();
    client.sensors.destroy();

    // Navigate to clean screen
    navigation.reset({ routes: [{ name: 'Home' }] });
  }
}, [isArmed]);
```

**Protocol:** Shake phone 3 times to arm. Lock phone to execute. All vault access zeroed — device becomes invisible to all vaults.

## Intelligence Dead Drops (DEADROP)

Self-destructing intelligence drops:

```typescript
await client.vaults.create({
  name: 'Drop Point Alpha',
  engine: ENGINE.DEADROP,
  geohash: encodeGeohash(38.8977, -77.0365),
  radius: 5,
  payload: {
    ttl: 120, // 2-minute viewing window
  },
});
```

**Workflow:** Handler places intelligence at a location. Field agent walks to the location, discovers the vault, views the file. After first open, the vault is gone forever.

## Device-Specific Keys

Bind vault access to specific devices:

```typescript
// Each device has unique salt/pepper values
const client = MisutoClient.init({
  apiKey: 'pk_classified_xxx',
  discovery: {
    salt: deviceSpecificSalt,    // Unique per device
    pepper: deviceSpecificPepper, // Unique per device
  },
});
```

**Implication:** Even with the correct location and signals, a different device produces different hashes. Access is cryptographically bound to the assigned device.

## Facility Access Control (MFA)

Multi-party authorization for sensitive areas:

```typescript
const facilityAccess = await client.interactions.mfa.create({
  name: 'Server Room Access',
  geohash: encodeGeohash(38.8977, -77.0365),
  radius: 5,
  threshold: 2, // Requires supervisor + technician
});

// Supervisor approves remotely
await client.interactions.mfa.respond(
  vaultId,
  challengeId,
  'approve',
  'Authorized maintenance window'
);
```

## Audit Trail via Webhooks

Comprehensive logging of all facility movements:

```typescript
await client.vaults.create({
  name: 'Building Entry Log',
  engine: ENGINE.WEBHOOK,
  geohash: encodeGeohash(38.8977, -77.0365),
  radius: 20,
  webhook_url: 'https://internal.gov/api/audit',
  track_visitors: true,
});
```

## Security Event Monitoring

Monitor security events across tenants:

```typescript
const { events } = await client.enterprise.admin.securityEvents.list({
  severity: 'critical',
  event_type: 'unauthorized_access',
});

events.forEach(event => {
  console.log(`[${event.severity}] ${event.event_type} at ${event.created_at}`);
  // Alert security team
});
```
