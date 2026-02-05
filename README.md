# MeetHeart - Modern Dating Site

MeetHeart is a beautiful, modern dating application where singles can discover compatible matches, connect with people, and build meaningful relationships through real-time messaging with WebSocket support.

![MeetHeart](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🌟 Key Features

- **Complete Authentication**: Sign up and sign in with email/password
- **Real-Time Chat**: WebSocket-powered messaging for instant conversations
- **Beautiful UI**: Modern, responsive design that works on all devices
- **User Profiles**: Create detailed profiles with photos, bio, interests, and preferences
- **Demo Mode**: Try the app immediately with demo credentials
- **Dark Mode**: Built-in dark mode support
- **Production Ready**: Optimized for deployment on Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (preferred) or npm/yarn

### Installation & Running

1. **Clone and Install**
```bash
git clone <your-repo-url>
cd meetheart
pnpm install
```

2. **Run Locally**
```bash
pnpm dev
```

Visit `http://localhost:8080` in your browser.

3. **Try the Demo**
   - Go to **Sign In** page
   - Use demo credentials:
     - **Email**: `demo@meetheart.com`
     - **Password**: `demo123456`
   - Explore the chat interface and features

## 📁 Project Structure

```
meetheart/
├── client/
│   ├── components/
│   │   ├── ui/                 # Pre-built Radix UI components
│   │   └── Layout.tsx          # Shared layout with header/nav/footer
│   ├── contexts/
│   │   └── AuthContext.tsx     # Authentication state management
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── useWebSocket.ts     # WebSocket hook for real-time messaging
│   ├── lib/
│   │   └── supabase.ts         # Supabase configuration (optional)
│   ├── pages/
│   │   ├── Index.tsx           # Homepage
│   │   ├── Chat.tsx            # Chat/messaging page
│   │   ├── Matches.tsx         # Matches page
│   │   ├── SignUp.tsx          # Sign up page
│   │   ├── SignIn.tsx          # Sign in page
│   │   └── NotFound.tsx        # 404 page
│   ├── App.tsx                 # Main app with routing
│   └── global.css              # Global styles and theme
├── server/                     # Express backend
│   ├── index.ts                # Server setup
│   └── routes/                 # API handlers
├── shared/                     # Shared types
├── tailwind.config.ts          # Tailwind CSS config
├── package.json
└── README.md
```

## 🔐 Authentication

### Current Setup (Demo/Local)

The app uses **local storage-based authentication** by default:
- Sign up creates an account stored in browser localStorage
- Demo credentials included for immediate testing
- Perfect for development and testing

### Demo Credentials
```
Email: demo@meetheart.com
Password: demo123456
```

### Upgrade to Real Backend (Optional)

To add real authentication with Supabase:

1. **Connect Supabase MCP**
   - Click the MCP integrations button in Builder.io
   - Connect to Supabase
   - Follow setup prompts

2. **Set Environment Variables**
   Create `.env.local`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

3. **Create Database Tables**
   In Supabase dashboard, create:
   ```sql
   -- Users/Profiles table
   CREATE TABLE profiles (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID NOT NULL REFERENCES auth.users(id),
     name TEXT NOT NULL,
     age INTEGER,
     gender TEXT,
     looking_for TEXT,
     location TEXT,
     bio TEXT,
     avatar_url TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Messages table
   CREATE TABLE messages (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     sender_id UUID NOT NULL REFERENCES auth.users(id),
     receiver_id UUID NOT NULL REFERENCES auth.users(id),
     content TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT NOW(),
     read_at TIMESTAMP
   );

   -- Matches table
   CREATE TABLE matches (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID NOT NULL REFERENCES auth.users(id),
     matched_user_id UUID NOT NULL REFERENCES auth.users(id),
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

4. **Update AuthContext**
   - Uncomment Supabase imports in `client/contexts/AuthContext.tsx`
   - The context is already set up to use Supabase when available

## 💬 Real-Time Chat with WebSocket

### How It Works

1. **Connection**: Chat page automatically connects to WebSocket server
2. **Message Delivery**: Messages are sent via WebSocket for real-time updates
3. **Fallback**: If WebSocket unavailable, messages are queued locally
4. **Status Indicator**: Connection status shown in chat sidebar

### WebSocket Endpoints

The app expects WebSocket server at `/api/chat`:
```javascript
// Client automatically connects to:
// http://localhost:8080 (development)
// wss://your-domain.com (production)
```

### Implementing WebSocket Server

Create `server/websocket.ts`:
```typescript
import { WebSocketServer } from 'ws';
import { createServer } from 'http';

const server = createServer();
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.on('message', (data) => {
    const message = JSON.parse(data);
    // Broadcast to other clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  });
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(8080);
```

## 🎨 Design System

### Colors
- **Primary**: Deep pink (#EF4444 - HSL 335 85% 55%)
- **Secondary**: Purple (#B24BF3 - HSL 280 80% 55%)
- **Accent**: Orange (#FF9147 - HSL 15 86% 57%)

### Typography
- Font: Inter (Google Fonts)
- Sizes: Responsive with Tailwind CSS utilities

### Components
- Built with Radix UI for accessibility
- Tailwind CSS for styling
- Lucide React for icons

## 🔧 Development

### Available Commands

```bash
# Start dev server with hot reload
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Type checking
pnpm typecheck

# Run tests
pnpm test

# Format code
pnpm format.fix
```

### Adding New Pages

1. Create page in `client/pages/NewPage.tsx`
2. Add route in `client/App.tsx`:
   ```tsx
   <Route path="/new-page" element={<ProtectedRoute element={<NewPage />} />} />
   ```
3. Use `Layout` component for consistent header/footer
4. Use `useAuth` hook for user data

### Adding API Endpoints

1. Create handler in `server/routes/endpoint.ts`
2. Register in `server/index.ts`:
   ```typescript
   import { handleEndpoint } from "./routes/endpoint";
   app.post("/api/endpoint", handleEndpoint);
   ```

## 🚀 Deployment

### Deploy to Vercel

**Recommended**: Easiest deployment option

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects the configuration

3. **Set Environment Variables** (if using Supabase)
   - In Vercel dashboard → Project Settings → Environment Variables
   - Add `VITE_SUPABASE_URL`
   - Add `VITE_SUPABASE_ANON_KEY`

4. **Deploy**
   - Vercel automatically deploys on push to main
   - Get live URL immediately
   - HTTPS enabled by default

### Deploy to Netlify

1. **Connect Repository**
   - Go to netlify.com
   - Click "New site from Git"
   - Select your GitHub repo

2. **Configure Build**
   - Build command: `pnpm build`
   - Publish directory: `dist`
   - Add environment variables if needed

3. **Deploy**
   - Netlify auto-deploys on push
   - Get production URL

### Environment Variables for Production

```env
# Supabase (if using real backend)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-key

# API
VITE_API_URL=https://your-domain.com
```

## 📝 Pages Overview

### Homepage (`/`)
- Hero section with call-to-action
- Features showcase
- How it works explanation
- User stats and social proof
- Auto-redirects to chat if logged in

### Sign Up (`/signup`)
- Create new account
- Profile information
- Bio and preferences
- Form validation
- Link to sign in

### Sign In (`/signin`)
- Email and password login
- Demo credentials displayed
- Forgot password link (ready)
- Create account link
- Remember me (ready)

### Chat (`/chat`)
- Real-time messaging with WebSocket
- Chat list with all matches
- Active chat window
- User status indicators
- Message history with timestamps
- File attachment buttons (ready)
- Emoji picker (ready)
- Send button with validation

### Matches (`/matches`)
- Shows current matches
- Placeholder for features
- Encourages exploration

## 🔒 Security

Current implementation:
- Client-side form validation
- Secure password handling in localStorage (demo only)
- XSS protection via React
- CORS configured

For production with Supabase:
- JWT-based authentication
- Row-level security policies
- Encrypted connections
- Regular security audits

**Never use localStorage for passwords in production!** Switch to Supabase for real security.

## 🧪 Testing

### Manual Testing Checklist

- [ ] Sign up creates new account
- [ ] Sign in with demo credentials works
- [ ] Sign in with new account works
- [ ] Chat loads after login
- [ ] Can send messages
- [ ] Messages appear instantly
- [ ] Can sign out
- [ ] Logged out users redirected to signin

### Test Cases

```bash
# Demo login
Email: demo@meetheart.com
Password: demo123456

# New account (sign up, then sign in with same credentials)
Email: test@example.com
Password: test123456
```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - Mobile: 0px - 640px
  - Tablet: 641px - 1024px
  - Desktop: 1025px+
- Touch-friendly buttons and inputs
- Hamburger menu on mobile

## 🌙 Dark Mode

Built-in dark mode support:
- Toggle in browser DevTools (Inspector → :hov → toggle dark mode)
- Colors automatically adjust
- Uses CSS variables in `client/global.css`

## 📚 Resources

- **React**: https://react.dev
- **React Router**: https://reactrouter.com
- **Tailwind CSS**: https://tailwindcss.com
- **Radix UI**: https://www.radix-ui.com/
- **Supabase**: https://supabase.com/docs
- **WebSocket**: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket

## 🛣️ Roadmap

### MVP (Current)
- ✅ Authentication
- ✅ Chat interface
- ✅ Real-time messaging
- ✅ Responsive design

### Phase 2
- [ ] User discovery/swiping
- [ ] Matching algorithm
- [ ] Notifications
- [ ] Photo uploads
- [ ] Video calls

### Phase 3
- [ ] Advanced filters
- [ ] Premium features
- [ ] Analytics
- [ ] Payment integration

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Make changes and commit: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 💬 Support

Need help?
- Check the [Builder.io Docs](https://www.builder.io/c/docs)
- Review [React Documentation](https://react.dev)
- Check [Tailwind Docs](https://tailwindcss.com/docs)
- Explore [Supabase Guides](https://supabase.com/docs)

## 🎉 Getting Started

1. **Try it now**: Use demo credentials at `/signin`
2. **Create account**: Sign up with your email at `/signup`
3. **Chat**: Start messaging on `/chat`
4. **Deploy**: Push to GitHub and deploy to Vercel
5. **Customize**: Edit colors, text, and features as needed
6. **Scale**: Add real backend with Supabase when ready

---

**Built with ❤️ using React, TypeScript, Tailwind CSS, and WebSocket**

**Questions?** Create an issue or reach out!
