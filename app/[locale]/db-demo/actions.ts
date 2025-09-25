'use server';

import { db } from '@/lib/db';

/** API-s tagastatav kuju (serialiseeritav) */
export type ApiUser = {
  id: string;
  email: string;
  name: string | null;
  createdAt: string; // ISO
};

export async function createUser(email: string, name?: string): Promise<ApiUser> {
  if (!email) throw new Error('Email required');
  const user = await db.user.create({ data: { email, name } });
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt.toISOString(),
  };
}

export async function listUsers(): Promise<ApiUser[]> {
  const rows = await db.user.findMany({ orderBy: { createdAt: 'desc' } });
  return rows.map(
    (u: (typeof rows)[number]): ApiUser => ({
      id: u.id,
      email: u.email,
      name: u.name,
      createdAt: u.createdAt.toISOString(),
    }),
  );
}
