# Housler HQ Website

A modern web application for Housler HQ with Google OAuth authentication, user management, and admin news post capabilities.

## Features

✨ **Core Features:**
- 🔐 Google OAuth Authentication
- 📱 Responsive Design with Tailwind CSS
- 📰 News Feed with Admin Management
- 👤 User Profiles & Sign Out
- 🎯 Featured News Posts
- 🛠️ Admin Dashboard

## Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Firebase (Firestore, Authentication)
- **Auth:** Google OAuth, Firebase Auth

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase Project
- Google OAuth Credentials

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Houslertech/housler-hq-website.git
   cd housler-hq-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup Firebase & Google OAuth:**
   - Copy `.env.local.example` to `.env.local`
   - Add your Firebase credentials
   - Add your Google OAuth Client ID
   - Set the admin email

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   ```
   http://localhost:3000
   ```

## Project Structure

```
.
├── pages/
│   ├── auth/login.tsx          # Google OAuth login page
│   ├── admin/index.tsx         # Admin dashboard
│   ├── news/
│   │   ├── index.tsx          # All news posts
│   │   └── [id].tsx           # Single news post detail
│   ├── _app.tsx               # App wrapper with providers
│   ├── _document.tsx          # Document setup
│   └── index.tsx              # Home page
├── components/
│   ├── Header.tsx             # Navigation header
│   ├── Layout.tsx             # Page layout wrapper
│   ├── NewsCard.tsx           # News post card component
│   └── NewsForm.tsx           # Create news post form
├── lib/
│   ├── firebase.ts            # Firebase configuration
│   └── types.ts               # TypeScript type definitions
├── styles/
│   └── globals.css            # Global styles
└── public/                     # Static assets
```

## Features Explained

### 🔐 Authentication
- Users sign in using their Google account
- Sign-out functionality available in header
- Protected admin routes (only admin email can access)

### 📰 News Management
- Admin can create, read news posts
- Support for featured posts
- Image uploads
- Rich text content

### 👥 User Display
- User profile picture in header
- User name display
- Sign out button

## Firebase Setup

1. Create a Firebase project
2. Enable Firestore Database
3. Set up Firebase Authentication with Google provider
4. Add security rules for Firestore:

```firebase
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /news/{document=**} {
      allow read: if request.auth != null;
      allow create, update: if request.auth.token.email == env.FIREBASE_ADMIN_EMAIL;
      allow delete: if request.auth.token.email == env.FIREBASE_ADMIN_EMAIL;
    }
  }
}
```

## Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_ADMIN_EMAIL=admin@housler.com
```

## Building for Production

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## Pages

- **/** - Home page with featured news
- **/auth/login** - Google OAuth login
- **/news** - All news posts
- **/news/[id]** - Single news post detail
- **/admin** - Admin dashboard (create posts)

## License

MIT License - feel free to use this project for your needs!

## Support

For issues or questions, please open an issue on GitHub.
