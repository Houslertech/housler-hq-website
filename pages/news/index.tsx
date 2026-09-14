'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import NewsCard from '@/components/NewsCard';
import { NewsPost } from '@/lib/types';
import Link from 'next/link';

const NewsPage = () => {
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

  return (
    <Layout>
      <div className="py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-housler-primary">All News</h1>
          {user && isAdmin && (
            <Link href="/admin" className="btn-primary">
              + Create Post
            </Link>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Loading news...</p>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <NewsCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No news posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default NewsPage;
