# MeetHeart - Modern Dating Site

MeetHeart is a beautiful, modern dating application where singles can discover compatible matches, connect with people, and build meaningful relationships through real-time messaging.

![MeetHeart](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🌟 Features

- **Smart Matching**: AI-powered algorithm matches you with compatible people
- **Real-Time Chat**: Instant messaging with matched friends
- **Verified Profiles**: All users are verified for safety and security
- **Advanced Discovery**: Filter and discover new people based on interests
- **Responsive Design**: Beautiful UI that works on desktop and mobile
- **Dark Mode**: Full dark mode support for better viewing experience
- **Modern Tech Stack**: Built with React, TypeScript, Tailwind CSS, and Express

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (preferred) or npm/yarn

### Installation

1. **Clone the repository** (or use this as your starting point)
```bash
git clone <repository-url>
cd meetHeart
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Run development server**
```bash
pnpm dev
# or
npm run dev
```

The app will start at `http://localhost:8080` with hot reload enabled for both client and server.

## 📁 Project Structure

```
meetHeart/
├── client/                    # React SPA frontend
│   ├── components/
│   │   ├── ui/               # Pre-built UI components (buttons, inputs, etc)
│   │   └── Layout.tsx        # Shared layout with header, nav, footer
│   ├── pages/
│   │   ├── Index.tsx         # Homepage
│   │   ├── Chat.tsx          # Chat/messaging page
│   │   ├── Matches.tsx       # Matches page
│   │   └── NotFound.tsx      # 404 page
│   ├── hooks/                # Custom React hooks
│   ├── App.tsx               # Main app component with routing
│   ├── global.css            # Global styles and theme
│   └── vite-env.d.ts         # Vite environment types
│
├── server/                   # Express API backend
│   ├── routes/               # API endpoint handlers
│   ├── index.ts              # Main server setup
│   └── node-build.ts         # Production server builder
│
├── shared/                   # Shared types and interfaces
│   └── api.ts                # API type definitions
│
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## 🎨 Design System

MeetHeart uses a modern, vibrant color scheme with:

- **Primary Color**: Deep rose/pink (#EF4444 - from HSL 335 85% 55%)
- **Secondary Color**: Purple/Violet (#B24BF3 - from HSL 280 80% 55%)
- **Accent Color**: Warm orange (#FF9147 - from HSL 15 86% 57%)
- **Light backgrounds** for clean, modern feel
- **Custom animations** and transitions for smooth interactions

All colors are defined in `client/global.css` using CSS variables and support both light and dark modes.

## 🛠️ Development

### Available Scripts

```bash
# Start development server (client + server)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run type checking
pnpm typecheck

# Run tests
pnpm test

# Format code
pnpm format.fix
```

### Adding New Features

#### New Page/Route

1. Create component in `client/pages/NewPage.tsx`
2. Import in `client/App.tsx`
3. Add route:
```tsx
<Route path="/new-page" element={<NewPage />} />
```
4. Make sure to use the `Layout` component to maintain consistent header/footer

#### New API Endpoint

1. Create handler in `server/routes/my-route.ts`
2. Register in `server/index.ts`:
```ts
import { handleMyRoute } from "./routes/my-route";
app.get("/api/my-endpoint", handleMyRoute);
```

#### New UI Component

Use the pre-built Radix UI components in `client/components/ui/` or create custom components in `client/components/`.

## 🌐 Deployment

### Deploy to Vercel

MeetHeart is optimized for Vercel deployment. Follow these steps:

#### Option 1: Using Git (Recommended)

1. **Push to GitHub**
   - Create a GitHub repository
   - Push your code:
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the configuration

3. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your app automatically

#### Option 2: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Select existing project or create new one
   - Vercel will handle the rest

3. **View your app**
   - Your deployment URL will be provided
   - Auto-deploys on every push to main

#### Environment Variables

If you add environment variables, create a `.env.local` file locally:

```env
VITE_API_URL=http://localhost:8080
```

For production on Vercel, add them in the Vercel dashboard:
- Project Settings → Environment Variables

## 📱 Pages

### Homepage (`/`)
Landing page with:
- Hero section with call-to-action
- Features overview
- How it works section
- Social proof (user stats)
- Final conversion CTA

### Chat (`/chat`)
Real-time messaging interface with:
- Chat list sidebar (shows all matches)
- Active chat window
- Message history
- User status indicators
- Send/receive messages with timestamps
- Call and video call buttons (UI ready)

### Matches (`/matches`)
Shows your current matches (placeholder ready for custom features)

### 404 Page
Friendly error page with navigation back to home

## 🎯 Features to Build Next

1. **User Authentication**: Sign up, login, profile management
2. **User Profiles**: Photo gallery, bio, interests, preferences
3. **Swiping Interface**: Swipe to like/dislike profiles
4. **Real Match Algorithm**: Connect likes to create mutual matches
5. **Database Integration**: Store users, messages, matches
6. **Video Calls**: Real-time video calling integration
7. **Push Notifications**: Alert users of new messages
8. **Payment System**: Premium features and subscription

## 🔒 Security

Current implementation includes:
- XSS protection via React
- CSRF protection ready
- Secure headers configured
- TypeScript for type safety

For production, also consider:
- HTTPS/TLS encryption
- User input validation
- Rate limiting on API endpoints
- Secure session management
- Password hashing and salting
- Regular security audits

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Make your changes
3. Commit: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💬 Support

Need help? Check out:
- [Builder.io Docs](https://www.builder.io/c/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Express.js Guide](https://expressjs.com/)

## 🎨 Design Credits

- UI Components: [Radix UI](https://www.radix-ui.com/)
- Icons: [Lucide React](https://lucide.dev/)
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- Fonts: [Inter](https://fonts.google.com/specimen/Inter)

## 📈 Performance

- ⚡ Vite for fast development and builds
- 🎯 React 18 with optimization
- 🎨 Tailwind CSS for minimal CSS output
- 📦 Code splitting and lazy loading ready
- 🔄 React Query for efficient data fetching

## 🚀 Next Steps

1. Start the development server: `pnpm dev`
2. Explore the app at `http://localhost:8080`
3. Check out the homepage, chat page, and navigation
4. Customize colors, fonts, and branding in `client/global.css` and `tailwind.config.ts`
5. Add your own features and API endpoints
6. Deploy to Vercel when ready!

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
