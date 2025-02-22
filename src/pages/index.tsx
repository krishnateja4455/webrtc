import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const router = useRouter();

  const createChannel = () => {
    const channelId = uuidv4(); // Generate unique channel ID
    router.push(`/channel/${channelId}`);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <button onClick={createChannel} style={{ padding: '10px 20px', fontSize: '18px', cursor: 'pointer' }}>
        Create Channel
      </button>
    </div>
  );
}