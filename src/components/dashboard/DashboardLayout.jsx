import React from 'react';
import Header from '../Header';

export default function DashboardLayout({ children }) {
  return (
    <div
      className="flex min-h-screen flex-col overflow-x-hidden md:h-screen"
      style={{
        background: `radial-gradient(circle at 12% 0%, #fefefe 0%, transparent 24%),
          radial-gradient(circle at 88% 14%, #f9f9fa 0%, transparent 20%),
          linear-gradient(180deg, #f4f4f5 0%, #ffffff 100%)`,
      }}
    >
      <Header />

      <main
        className="flex min-h-0 flex-1 flex-col w-full overflow-hidden px-4 pb-6 pt-4 md:px-6 md:pb-6 md:pt-4 xl:px-8"
        style={{ maxWidth: '1380px', marginInline: 'auto' }}
      >
        {children}
      </main>
    </div>
  );
}
