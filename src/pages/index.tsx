import React from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import clsx from 'clsx';

const ENGINES = [
  { name: 'STORAGE', icon: '📦', desc: 'Geo-fenced file vaults with upload/download' },
  { name: 'CHAT', icon: '💬', desc: 'Real-time ActionCable conversations' },
  { name: 'MFA', icon: '🔐', desc: 'Spatial multi-factor authentication' },
  { name: 'WEBHOOK', icon: '🔗', desc: 'Fire payloads on enter/exit events' },
  { name: 'DEADROP', icon: '💀', desc: 'Self-destructing single-use file drops' },
  { name: 'CRYPTO', icon: '₿', desc: '2-of-2 multisig Bitcoin wallets' },
  { name: 'REWARD', icon: '🎁', desc: 'First-N-visitor reward distribution' },
  { name: 'PAYLOAD', icon: '📤', desc: 'Deliver preset data on vault entry' },
  { name: 'MESSAGE', icon: '✉️', desc: 'Push messages on proximity triggers' },
];

const SENSORS = [
  { name: 'GPS', color: '#06b6d4' },
  { name: 'BLE', color: '#8b5cf6' },
  { name: 'WiFi', color: '#10b981' },
  { name: 'NFC', color: '#f59e0b' },
  { name: 'Magnetometer', color: '#ef4444' },
  { name: 'Barometer', color: '#6366f1' },
  { name: 'Camera', color: '#ec4899' },
  { name: 'Accelerometer', color: '#14b8a6' },
];

const USE_CASES = [
  { industry: 'Gaming', desc: 'Loot boxes, treasure hunts, guild halls', link: '/use-cases/gaming' },
  { industry: 'Healthcare', desc: 'Spatial compliance, geo-fenced records', link: '/use-cases/healthcare' },
  { industry: 'Retail', desc: 'In-store coupons, NFC product scanning', link: '/use-cases/retail' },
  { industry: 'Real Estate', desc: 'Property docs at location, open-house chat', link: '/use-cases/real-estate' },
  { industry: 'Logistics', desc: 'Chain-of-custody, cargo handoffs', link: '/use-cases/logistics' },
  { industry: 'Education', desc: 'Lecture discussions, attendance gamification', link: '/use-cases/education' },
  { industry: 'Government', desc: 'Multi-signal classified access', link: '/use-cases/government' },
];

const CODE_TABS = [
  {
    label: 'Discover',
    code: `import { MisutoProvider, useVaultDiscovery } from
  '@percent20/misuto-react-native-sdk';

function App() {
  return (
    <MisutoProvider apiKey="your-api-key">
      <VaultScanner />
    </MisutoProvider>
  );
}

function VaultScanner() {
  const { vaults, isPolling, start, stop } = useVaultDiscovery();

  return (
    <View>
      <Button title={isPolling ? 'Stop' : 'Scan'}
              onPress={isPolling ? stop : start} />
      {vaults.map(v => (
        <Text key={v.uid}>{v.name} ({v.engine})</Text>
      ))}
    </View>
  );
}`,
  },
  {
    label: 'Chat',
    code: `import { useVaultChat } from
  '@percent20/misuto-react-native-sdk';

function ChatRoom({ vaultUid, accessToken }) {
  const { messages, sendMessage, connectionState } =
    useVaultChat({ vaultUid, accessToken });

  return (
    <View>
      <Text>Status: {connectionState}</Text>
      {messages.map(msg => (
        <Text key={msg.id}>
          {msg.sender_name}: {msg.body}
        </Text>
      ))}
      <TextInput onSubmitEditing={e =>
        sendMessage(e.nativeEvent.text)} />
    </View>
  );
}`,
  },
  {
    label: 'Secure',
    code: `import { useShakeDetector, useSensors } from
  '@percent20/misuto-react-native-sdk';

function SecureScreen() {
  const { isArmed, disarm } = useShakeDetector();
  const { location, startSensor } = useSensors();

  useEffect(() => {
    startSensor('gps');
  }, []);

  useEffect(() => {
    if (isArmed) {
      // Emergency exit: wipe all signals
      Alert.alert('Panic mode armed',
        'Lock phone to zero all signals');
    }
  }, [isArmed]);

  return (
    <View>
      <Text>Lat: {location?.latitude}</Text>
      <Text>Lng: {location?.longitude}</Text>
      {isArmed && <Text style={{color:'red'}}>
        ARMED - Lock to wipe</Text>}
    </View>
  );
}`,
  },
];

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <h1 className={styles.heroTitle}>
          Location-aware vaults<br />for React Native
        </h1>
        <p className={styles.heroSubtitle}>
          Build apps that create, discover, and interact with encrypted vaults
          tied to physical locations. 9 vault engines, 8 sensor types,
          real-time chat, and enterprise MFA — in one SDK.
        </p>
        <div className={styles.heroCtas}>
          <a href="/misuto-sdk-docs/getting-started/installation" className={styles.ctaPrimary}>
            Get Started
          </a>
          <a href="/misuto-sdk-docs/api/core/misuto-client" className={styles.ctaSecondary}>
            API Reference
          </a>
        </div>
        <div className={styles.heroCode}>
          <pre>
            <code>{`import { MisutoProvider, useVaultDiscovery } from '@percent20/misuto-react-native-sdk';

function App() {
  return (
    <MisutoProvider apiKey="your-api-key"
      config={{ sensors: { gps: true, ble: true } }}>
      <VaultScanner />
    </MisutoProvider>
  );
}`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}

function EnginesGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>9 Vault Engines</h2>
        <p className={styles.sectionSubtitle}>
          Each engine defines how a vault behaves when discovered.
        </p>
        <div className={styles.enginesGrid}>
          {ENGINES.map((engine) => (
            <div key={engine.name} className={styles.engineCard}>
              <span className={styles.engineIcon}>{engine.icon}</span>
              <h3 className={styles.engineName}>{engine.name}</h3>
              <p className={styles.engineDesc}>{engine.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SensorStrip() {
  return (
    <section className={clsx(styles.section, styles.sensorSection)}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>8 Sensor Types</h2>
        <p className={styles.sectionSubtitle}>
          Combine multiple signals to create multi-factor vault access requirements.
        </p>
        <div className={styles.sensorStrip}>
          {SENSORS.map((sensor) => (
            <span
              key={sensor.name}
              className={styles.sensorBadge}
              style={{ borderColor: sensor.color, color: sensor.color }}
            >
              {sensor.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function CodePreview() {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>See It in Action</h2>
        <div className={styles.codeTabs}>
          {CODE_TABS.map((tab, i) => (
            <button
              key={tab.label}
              className={clsx(styles.codeTab, i === activeTab && styles.codeTabActive)}
              onClick={() => setActiveTab(i)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className={styles.codeBlock}>
          <pre>
            <code>{CODE_TABS[activeTab].code}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  return (
    <section className={clsx(styles.section, styles.useCasesSection)}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Built for Every Industry</h2>
        <div className={styles.useCasesGrid}>
          {USE_CASES.map((uc) => (
            <a key={uc.industry} href={`/misuto-sdk-docs${uc.link}`} className={styles.useCaseCard}>
              <h3>{uc.industry}</h3>
              <p>{uc.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function BottomCta() {
  return (
    <section className={styles.bottomCta}>
      <div className={styles.container}>
        <h2 className={styles.ctaTitle}>Start Building</h2>
        <div className={styles.installCommand}>
          <code>yarn add @percent20/misuto-react-native-sdk</code>
        </div>
        <a href="/misuto-sdk-docs/getting-started/installation" className={styles.ctaPrimary}>
          Read the Docs
        </a>
      </div>
    </section>
  );
}

export default function Home(): React.JSX.Element {
  return (
    <Layout
      title="Location-aware vaults for React Native"
      description="Build apps that create, discover, and interact with encrypted vaults tied to physical locations."
    >
      <Hero />
      <EnginesGrid />
      <SensorStrip />
      <CodePreview />
      <UseCases />
      <BottomCta />
    </Layout>
  );
}
