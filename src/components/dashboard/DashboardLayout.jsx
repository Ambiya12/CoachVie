import React from 'react';
import Header from '../Header';

export default function DashboardLayout({ children }) {
  return (
    <div
      className="flex min-h-screen flex-col overflow-x-hidden"
      style={{
        background: `radial-gradient(circle at 12% 0%, rgba(255, 255, 255, 0.96) 0%, transparent 24%),
          radial-gradient(circle at 88% 14%, rgba(237, 242, 249, 0.96) 0%, transparent 20%),
          linear-gradient(180deg, #f4f6fa 0%, var(--dash-page) 100%)`,
      }}
    >
      <Header />

      <main
        className="flex w-full flex-1 flex-col px-4 pb-6 pt-4 md:px-6 md:pb-6 md:pt-4 xl:px-8"
        style={{ maxWidth: '1380px', marginInline: 'auto' }}
      >
        {children}
      </main>
    </div>
  );
}
