import React from 'react';

export type HomeViewProps = {
  title: string;
  cta: string;
};

export default function HomeView({ title, cta }: HomeViewProps) {
  return (
    <main className="p-6 space-y-3">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-gray-600">{cta}</p>
    </main>
  );
}
