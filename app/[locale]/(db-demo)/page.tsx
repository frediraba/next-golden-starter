import { listUsers, createUser } from './actions';
export const dynamic = 'force-dynamic';

export default async function DbDemoPage() {
  const users = await listUsers();

  async function action(formData: FormData) {
    'use server';
    const email = String(formData.get('email') || '');
    const name = String(formData.get('name') || '');
    await createUser(email, name || undefined);
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">DB demo (Prisma + SQLite)</h1>

      <form action={action} className="space-y-3">
        <input
          className="border rounded px-3 py-2"
          name="email"
          placeholder="email@example.com"
          required
        />
        <input className="border rounded px-3 py-2" name="name" placeholder="Name (optional)" />
        <button className="px-3 py-2 bg-black text-white rounded" type="submit">
          Create user
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
                  <td className="py-2 pr-4">{new Date(u.createdAt).toLocaleString()}</td>
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
