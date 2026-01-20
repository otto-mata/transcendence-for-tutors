import NotificationsListClient from '@/components/NotificationsListClient';

type Notification = {
  id: number;
  title?: string;
  message: string;
  type?: string;
  meta?: Record<string, unknown> | null;
  read: boolean;
  createdAt: string;
};

async function fetchNotifications(): Promise<Notification[]> {
  try {
  const base = 'http://localhost:8080';
  /* const res = await fetch(`${base}/api/notifications`);
    if (!res.ok) return [];
    const data = await res.json(); */
    return null;//data as Notification[];
  } catch (e) {
    console.error("Failed to fetch notifications:", e);
    return [];
  }
}

export default async function NotificationsPage() {
  const notifs = await fetchNotifications();

  return (
    <main className="flex-1 p-8">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Notifications</h2>
        </header>

        {notifs.length === 0 && <p className="text-gray-600">No notifications.</p>}

        <NotificationsListClient initialNotifs={notifs} />
      </div>
    </main>
  );
}
