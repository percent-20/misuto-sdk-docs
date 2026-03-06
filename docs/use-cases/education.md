# Education

Location-aware vaults enable new classroom experiences — from attendance verification to location-locked exams.

## Lecture Hall Discussions (CHAT)

Chat rooms that only exist in the lecture hall:

```typescript
await client.vaults.create({
  name: 'CS 101 - Live Q&A',
  engine: ENGINE.CHAT,
  geohash: encodeGeohash(37.4275, -122.1697), // Stanford campus
  radius: 30,
  signals: ['location'],
  payload: {
    course: 'CS 101',
    professor: 'Dr. Smith',
  },
});
```

**Benefit:** Students must be physically present to participate. No remote trolling. The chat room disappears when you leave.

## Attendance Gamification (REWARD)

Reward students for showing up:

```typescript
await client.vaults.create({
  name: 'Attendance Bonus - Week 5',
  engine: ENGINE.REWARD,
  geohash: encodeGeohash(37.4275, -122.1697),
  radius: 25,
  signals: ['location', 'timeOfDay'],
  payload: {
    points: 10,
    badge: 'consistent-attendee',
    max_visitors: 200,
  },
});
```

**Mechanic:** Students who arrive during class time automatically earn points. First 200 students get the reward — creates incentive for early arrival.

## Location-Locked Exam Materials (STORAGE)

Exam materials only accessible in the testing center:

```typescript
await client.vaults.create({
  name: 'Final Exam - CS 101',
  engine: ENGINE.STORAGE,
  geohash: encodeGeohash(37.4275, -122.1697),
  radius: 20,
  signals: ['location', 'nearbyDevices', 'timeOfDay'],
  constraints: {
    wifi_ssids: { contains_all: ['ExamCenter-WiFi'] },
  },
});

// Upload exam PDF
await client.interactions.storage.getUploadUrl(vault.uid, 'final-exam.pdf');
```

**Security:** Exam files can only be downloaded while in the exam room, connected to the exam center WiFi, during the scheduled time.

## Lab Equipment Access (MFA)

Control access to expensive lab equipment:

```typescript
const labAccess = await client.interactions.mfa.create({
  name: 'Chemistry Lab - Fume Hood',
  geohash: encodeGeohash(37.4275, -122.1697),
  radius: 5,
  threshold: 1,
});
```

**Process:**
1. Student checks in at the lab
2. MFA challenge requires physical presence + device approval
3. Lab instructor can approve/deny remotely
4. Access logged for safety compliance

## Study Group Rooms

Time-limited beacons for study group access:

```typescript
const beacon = await client.beacons.create(libraryVaultId, {
  name: 'Study Group - Room 204',
  type: 'conversation',
  policy: {
    required_signals: ['location'],
    constraints: {
      time: { mode: 'within_minutes_from_now', minutes: 120 },
    },
  },
});

// Share beacon token with group members
```

## Campus Scavenger Hunts

Combine multiple engines for orientation events:

```typescript
// Step 1: Find the library (MESSAGE)
await client.vaults.create({
  name: 'Orientation - Find the Library',
  engine: ENGINE.MESSAGE,
  geohash: libraryGeohash,
  radius: 20,
  payload: { message: 'You found the library! Next: find the student center.' },
});

// Step 2: Check in at student center (REWARD)
await client.vaults.create({
  name: 'Orientation - Student Center',
  engine: ENGINE.REWARD,
  geohash: studentCenterGeohash,
  radius: 20,
  payload: { points: 50, badge: 'explorer' },
});
```
