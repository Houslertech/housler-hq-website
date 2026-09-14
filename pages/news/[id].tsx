'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { NewsPost } from '@/lib/types';
import Link from 'next/link';

interface NewsDetailPageProps {
  params: {
    id: string;
  };
}

const NewsDetailPage = ({ params }: NewsDetailPageProps) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [post, setPost] = useState<NewsPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'news', params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost({
            id: docSnap.id,
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt?.toDate() || new Date(),
            updatedAt: docSnap.data().updatedAt?.toDate() || new Date(),
          } as NewsPost);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (notFound || !post) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-housler-primary mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The news post you're looking for doesn't exist.</p>
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="max-w-3xl mx-auto">
        <Link href="/" className="text-housler-accent hover:text-housler-primary mb-6 inline-block">
          ← Back to News
        </Link>

        {post.imageUrl && (
          <div className="w-full h-96 rounded-lg overflow-hidden mb-8 bg-housler-light">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h1 className="text-5xl font-bold text-housler-primary mb-4">{post.title}</h1>

        <div className="flex gap-4 text-gray-600 mb-8 pb-8 border-b border-gray-200">
          <span>By {post.author}</span>
          <span>{new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</span>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </Layout>
  );
};

export default NewsDetailPage;
