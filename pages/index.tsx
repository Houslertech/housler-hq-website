'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import NewsCard from '@/components/NewsCard';
import { NewsPost } from '@/lib/types';
import Link from 'next/link';

const HomePage = () => {
  const [user] = useAuthState(auth);
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  useEffect(() => {
    const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as NewsPost[];
      setPosts(newPosts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const featuredPost = posts.find((p) => p.featured);
  const otherPosts = posts.filter((p) => !p.featured);

  return (
    <Layout>
      <div className="py-12">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-housler-primary mb-4">Welcome to Housler HQ</h1>
          <p className="text-xl text-gray-600 mb-8">
            Stay updated with the latest news and announcements from our team
          </p>
          {user && isAdmin && (
            <Link href="/admin" className="btn-primary inline-block">
              Create News Post
            </Link>
          )}
          {!user && (
            <Link href="/auth/login" className="btn-primary inline-block">
              Sign In to Continue
            </Link>
          )}
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-housler-primary mb-6">Featured</h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {featuredPost.imageUrl && (
                <div className="w-full h-96 bg-housler-light overflow-hidden">
                  <img
                    src={featuredPost.imageUrl}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-8">
                <h2 className="text-4xl font-bold text-housler-primary mb-4">{featuredPost.title}</h2>
                <p className="text-lg text-gray-600 mb-6">{featuredPost.excerpt}</p>
                <div className="flex gap-4 text-sm text-gray-500 mb-6">
                  <span>By {featuredPost.author}</span>
                  <span>{new Date(featuredPost.createdAt).toLocaleDateString()}</span>
                </div>
                <Link href={`/news/${featuredPost.id}`} className="btn-primary">
                  Read Full Article
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* News Posts Grid */}
        <section>
          <h2 className="text-3xl font-bold text-housler-primary mb-6">Latest News</h2>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Loading news...</p>
            </div>
          ) : otherPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPosts.map((post) => (
                <NewsCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No news posts yet. Check back soon!</p>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
