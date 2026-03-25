"use client"; // To jest komponent interaktywny
import Link from 'next/link';

const suppliers = [
  { id: 'eurorama', name: 'Eurorama', logo: '/logos/eurorama.png' },
  { id: 'intakt', name: 'Intakt', logo: '/logos/intakt.png' },
  { id: 'dart', name: 'Dart', logo: '/logos/dart.png' },
  { id: 'savex', name: 'Savex', logo: '/logos/savex.png' },
];

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-red-600 text-center mb-10">
        ANTYRAMY PRO <span className="text-gray-400 text-lg">v2026</span>
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suppliers.map((s) => (
          <Link href={`/wycena/${s.id}`} key={s.id}>
            <div className="bg-white border-2 border-transparent hover:border-red-500 rounded-2xl shadow-lg p-8 flex flex-col items-center transition-all cursor-pointer group">
              <img src={s.logo} alt={s.name} className="h-20 object-contain mb-4 grayscale group-hover:grayscale-0 transition-all" />
              <span className="text-xl font-bold text-gray-700">{s.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}