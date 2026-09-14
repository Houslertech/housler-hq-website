'use client';

import { NewsPost } from '@/lib/types';
import Link from 'next/link';

interface NewsCardProps {
  post: NewsPost;
}

const NewsCard = ({ post }: NewsCardProps) => {
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      {post.imageUrl && (
        <div className="w-full h-48 bg-housler-light overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition"
          />
        </div>
      )}
      <div className="p-6">
        {post.featured && (
          <span className="inline-block bg-housler-accent text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
            Featured
          </span>
        )}
        <h2 className="text-xl font-bold text-housler-primary mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>By {post.author}</span>
          <span>{formattedDate}</span>
        </div>
        <Link
          href={`/news/${post.id}`}
          className="inline-block mt-4 btn-primary text-sm"
        >
          Read More
        </Link>
      </div>
    </article>
  );
};

export default NewsCard;
