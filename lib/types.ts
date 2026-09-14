export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  isAdmin: boolean;
}

export interface NewsPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
  featured?: boolean;
}
