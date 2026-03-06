import React from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import clsx from 'clsx';

const ENGINES = [
  { name: 'STORAGE', icon: '📦', desc: 'Files that only exist in a place — open them there or nowhere' },
  { name: 'CHAT', icon: '💬', desc: 'Conversations that live at a location — walk in to join, walk out to leave' },
  { name: 'MFA', icon: '🔐', desc: 'Approve actions only when you\'re physically where you should be' },
  { name: 'WEBHOOK', icon: '🔗', desc: 'Trigger any backend the moment someone arrives or departs' },
  { name: 'DEADROP', icon: '💀', desc: 'Share a file once — first person to find it gets it, then it\'s gone' },
  { name: 'CRYPTO', icon: '₿', desc: 'Bitcoin wallets that require your physical presence to spend' },
  { name: 'REWARD', icon: '🎁', desc: 'Drop rewards in the real world — first visitors claim them' },
  { name: 'PAYLOAD', icon: '📤', desc: 'Deliver data the instant someone steps into range' },
  { name: 'MESSAGE', icon: '✉️', desc: 'Messages that appear only when you\'re standing in the right spot' },
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
  { industry: 'Gaming', desc: 'Hide loot in real places. Race to find it. First one there wins.', link: '/use-cases/gaming' },
  { industry: 'Healthcare', desc: 'Patient records that can\'t leave the building. Literally.', link: '/use-cases/healthcare' },
  { industry: 'Retail', desc: 'Walk into a store, offers appear. Walk out, they\'re gone.', link: '/use-cases/retail' },
  { industry: 'Real Estate', desc: 'View property docs only at the property. Tour the house, see the data.', link: '/use-cases/real-estate' },
  { industry: 'Logistics', desc: 'Prove chain-of-custody with physics, not paperwork.', link: '/use-cases/logistics' },
  { industry: 'Education', desc: 'Show up to class to join the discussion. Attendance built in.', link: '/use-cases/education' },
  { industry: 'Government', desc: 'Access that requires the right place, device, badge, and time — all at once.', link: '/use-cases/government' },
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
          Turn the real world<br />into app features
        </h1>
        <p className={styles.heroSubtitle}>
          Your users' surroundings become the interface. GPS, Bluetooth, WiFi,
          NFC, barometer, camera — the Misuto SDK reads the environment and
          unlocks features based on where people are and what's around them.
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
        <h2 className={styles.sectionTitle}>9 Ways to Use a Place</h2>
        <p className={styles.sectionSubtitle}>
          Each engine turns a physical location into a different kind of experience.
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
        <h2 className={styles.sectionTitle}>Your Environment Is the Input</h2>
        <p className={styles.sectionSubtitle}>
          The SDK reads 8 types of environmental signals. Stack them to make features
          that require the right place, the right time, and the right surroundings.
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
        <h2 className={styles.sectionTitle}>A Few Lines of Code</h2>
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
        <h2 className={styles.sectionTitle}>What Will You Build?</h2>
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
        <h2 className={styles.ctaTitle}>Make Places Programmable</h2>
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
      title="Turn the real world into app features"
      description="The Misuto SDK lets your React Native app read the environment — GPS, Bluetooth, WiFi, NFC, and more — to unlock features based on where people are and what's around them."
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
