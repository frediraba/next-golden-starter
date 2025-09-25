'use server';
import { db } from '@/lib/db';

export async function createUser(email: string, name?: string) {
  if (!email) throw new Error('Email required');
  const user = await db.user.create({ data: { email, name } });
  return user;
}

export async function listUsers() {
  return db.user.findMany({ orderBy: { createdAt: 'desc' } });
}
