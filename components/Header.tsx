'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [user] = useAuthState(auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <header className="bg-housler-primary text-white shadow-lg">
      <div className="container flex justify-between items-center py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
          <div className="w-10 h-10 bg-housler-accent rounded-lg flex items-center justify-center">
            🏢
          </div>
          Housler HQ
        </Link>

        {/* Navigation Menu */}
        <nav className="hidden md:flex gap-8 items-center">
          <Link href="/" className="hover:text-housler-accent transition">
            Home
          </Link>
          <Link href="/news" className="hover:text-housler-accent transition">
            News
          </Link>
          {isAdmin && (
            <Link href="/admin" className="hover:text-housler-accent transition font-semibold">
              Admin Panel
            </Link>
          )}
        </nav>

        {/* User Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="text-sm hidden sm:inline">{user.displayName}</span>
              <button
                onClick={handleSignOut}
                className="btn-secondary text-sm"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/auth/login" className="btn-secondary">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-housler-primary border-t border-housler-accent">
          <nav className="flex flex-col p-4 gap-3">
            <Link href="/" className="hover:text-housler-accent transition py-2">
              Home
            </Link>
            <Link href="/news" className="hover:text-housler-accent transition py-2">
              News
            </Link>
            {isAdmin && (
              <Link href="/admin" className="hover:text-housler-accent transition py-2 font-semibold">
                Admin Panel
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
