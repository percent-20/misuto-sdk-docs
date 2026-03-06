# Enterprise SSO

The SDK provides enterprise SSO integration with support for Azure AD, Okta, Google Workspace, SAML, and OIDC providers.

## Supported Providers

| Provider | Type | Protocol |
|----------|------|----------|
| Azure AD | `'azure'` | OIDC |
| Okta | `'okta'` | OIDC |
| Google Workspace | `'google'` | OIDC |
| SAML | `'saml'` | SAML 2.0 |
| OIDC | `'oidc'` | OpenID Connect |

## Provider Management

### Create a Provider

```typescript
const client = useMisuto();

const provider = await client.enterprise.providers.create({
  name: 'Corporate Azure AD',
  provider_type: 'azure',
  configuration: {
    tenant_id: 'your-azure-tenant-id',
    client_id: 'your-client-id',
    client_secret: 'your-client-secret',
  },
});
```

### List Providers

```typescript
const { providers } = await client.enterprise.providers.list();
```

### Test a Provider

Verify configuration:

```typescript
const result = await client.enterprise.providers.test(providerId);
console.log('Status:', result.status);
console.log('Message:', result.message);
if (result.issues) {
  console.log('Issues:', result.issues);
}
```

### Rotate API Key

```typescript
const { api_key } = await client.enterprise.providers.rotateApiKey(providerId);
```

## Connections

Connections link users to providers:

```typescript
// Create a connection
const conn = await client.enterprise.connections.create({
  provider_id: providerId,
  user_id: userId,
});

// List connections
const { connections } = await client.enterprise.connections.list({
  provider_id: providerId,
  status: 'active',
});

// Delete a connection
await client.enterprise.connections.delete(connectionId);
```

## Tenant Management

### Create a Tenant

```typescript
const tenant = await client.enterprise.admin.tenants.create({
  name: 'Acme Corp',
  subscription_tier: 'enterprise',
});
```

### Tenant Statistics

```typescript
const stats = await client.enterprise.admin.tenants.stats(tenantId);

console.log('Providers:', stats.providers_count);
console.log('Connections:', stats.connections_count);
console.log('Challenges:', stats.challenges_count);
```

## Enterprise MFA Validation

For enterprise MFA flows (separate from per-vault MFA):

```typescript
// Get pending challenges for a tenant
const { challenges } = await client.enterprise.mfa.getPendingChallenges({
  tenant_id: tenantId,
});

// Validate a challenge with signal hashes
const result = await client.enterprise.mfa.validateChallenge(
  challengeId,
  signalHashes
);

console.log('Valid:', result.valid);
console.log('Session:', result.session_id);
```

## Security Events

Monitor security events across tenants:

```typescript
const { events } = await client.enterprise.admin.securityEvents.list({
  tenant_id: tenantId,
  severity: 'high',
  page: 1,
  per_page: 50,
});

events.forEach(e => {
  console.log(`[${e.severity}] ${e.event_type}: ${JSON.stringify(e.details)}`);
});
```
