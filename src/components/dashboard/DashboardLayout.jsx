import React from 'react';
import Header from '../Header';

export default function DashboardLayout({ children }) {
  return (
    <div
      className="flex h-screen overflow-hidden flex-col"
      style={{
        background: `radial-gradient(circle at 12% 0%, #fefefe 0%, transparent 24%),
          radial-gradient(circle at 88% 14%, #f9f9fa 0%, transparent 20%),
          linear-gradient(180deg, #f4f4f5 0%, #ffffff 100%)`,
      }}
    >
      <Header />

      <main
        className="flex-1 w-full px-4 pb-6 pt-4 md:px-6 md:pb-8 md:pt-5 xl:px-8 h-full overflow-hidden flex flex-col"
        style={{ maxWidth: '1380px', marginInline: 'auto' }}
      >
        {children}
      </main>
    </div>
  );
}
