import React from 'react';
import Header from './Header';

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-gray-100">
      <Header />
      <div className="flex-1">
        <main className="relative overflow-y-auto focus:outline-none">{children}</main>
      </div>
    </div>
  );
};
