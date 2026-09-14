'use client';

import Header from '@/components/Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-housler-light">
      <Header />
      <main className="container py-8">
        {children}
      </main>
      <footer className="bg-housler-primary text-white text-center py-6 mt-12">
        <p>&copy; 2024 Housler HQ. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
