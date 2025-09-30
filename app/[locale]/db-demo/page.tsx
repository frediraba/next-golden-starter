'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { listUsers, createUser, type ApiUser } from './actions';

type UiUser = ApiUser; // sama struktuur; allpool vormindame createdAt kuvamiseks

export default function DbDemoPage() {
  const [users, setUsers] = useState<UiUser[]>([]);
  const [isPending, startTransition] = useTransition();
  const didInit = useRef(false);

  async function refresh() {
    const rows = await listUsers(); // ApiUser[]
    setUsers(
      rows.map(
        (u: ApiUser): UiUser => ({
          ...u,
          createdAt: new Date(u.createdAt).toLocaleString(),
        }),
      ),
    );
  }

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    startTransition(refresh);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await createUser(String(fd.get('email') || ''), String(fd.get('name') || '') || undefined);
    e.currentTarget.reset();
    startTransition(refresh);
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">DB demo (Prisma + SQLite)</h1>

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="border rounded px-3 py-2"
          name="email"
          placeholder="email@example.com"
          required
        />
        <input className="border rounded px-3 py-2" name="name" placeholder="Name (optional)" />
        <button
          className="px-3 py-2 bg-black text-white rounded"
          disabled={isPending}
          type="submit"
        >
          {isPending ? 'Saving...' : 'Create user'}
        </button>
      </form>

      <section>
        <h2 className="font-semibold mb-2">Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-[400px] text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 pr-4">ID</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Created</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b">
                  <td className="py-2 pr-4">{u.id}</td>
                  <td className="py-2 pr-4">{u.email}</td>
                  <td className="py-2 pr-4">{u.name ?? '-'}</td>
                  <td className="py-2 pr-4">{u.createdAt}</td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td className="py-2 pr-4" colSpan={4}>
                    (no users yet)
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
