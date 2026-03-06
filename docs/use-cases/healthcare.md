# Healthcare

Location-aware vaults address healthcare's unique challenges around spatial compliance, record access, and facility security.

## Spatial Compliance (MFA)

Ensure sensitive operations only happen in authorized areas:

```typescript
// MFA vault at the hospital pharmacy
const mfaVault = await client.interactions.mfa.create({
  name: 'Pharmacy Access',
  geohash: encodeGeohash(42.3601, -71.0589),
  radius: 10, // 10-meter radius
  threshold: 2, // Requires 2 bound devices
});
```

**Use case:** Pharmacists must be physically in the pharmacy AND have their authorized device to approve medication dispensing.

## Geo-Fenced Patient Records (STORAGE)

Medical records accessible only within facility boundaries:

```typescript
await client.vaults.create({
  name: 'Patient Records - Wing B',
  engine: ENGINE.STORAGE,
  geohash: encodeGeohash(42.3601, -71.0589),
  radius: 50,
  signals: ['location', 'nearbyDevices'],
  payload: { department: 'cardiology' },
});
```

**Compliance benefit:** Records literally cannot be accessed outside the facility. The vault hash won't match from home.

## Visit Logging (WEBHOOK)

Automatic visit tracking for staff compliance:

```typescript
await client.vaults.create({
  name: 'ICU Check-In',
  engine: ENGINE.WEBHOOK,
  geohash: encodeGeohash(42.3601, -71.0589),
  radius: 15,
  webhook_url: 'https://hospital.example/api/visits',
  track_visitors: true,
  payload: {
    area: 'icu',
    require_gown: true,
  },
});
```

**Workflow:** When a nurse enters the ICU, the webhook fires to the hospital system, logging the visit with timestamp and duration.

## Enterprise SSO for Hospitals

Connect existing hospital identity systems:

```typescript
const provider = await client.enterprise.providers.create({
  name: 'Hospital Azure AD',
  provider_type: 'azure',
  configuration: {
    tenant_id: 'hospital-tenant-id',
    client_id: 'client-id',
    client_secret: 'secret',
  },
});
```

## Floor-Specific Access with Barometer

Use barometric pressure to determine floor level:

```typescript
// Enable barometer for floor detection
client.sensors.startSensor('barometer');

// Altitude data feeds into discovery hashing
client.discovery.updateSignals({
  selectedKeys: ['location'],
  useAltitude: true,
});
```

**Use case:** Different departments on different floors of a hospital — cardiology on floor 3 has different record access than oncology on floor 5.

## Emergency Protocol

Shake-to-wipe for emergency scenarios:

```typescript
const { isArmed } = useShakeDetector();

if (isArmed) {
  // Zero all access — no patient data visible
  client.discovery.stop();
  client.sensors.destroy();
}
```
