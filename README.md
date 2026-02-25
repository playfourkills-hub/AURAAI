# AI Chatbot - CodeX GPT

Professional AI chatbot application built with Next.js, TypeScript, and Groq AI. Features user authentication, persistent chat history, and a ChatGPT-inspired interface.

## Features

- User Authentication (Signup/Login)
- AI-Powered Chat with Groq
- Persistent Chat History
- Multiple Chat Sessions
- Real-time Messaging
- Beautiful UI with Animations
- Fully Responsive Design
- Vercel Deployment Ready

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Supabase)
- **AI**: Groq SDK
- **Animations**: Framer Motion
- **Styling**: CSS Modules

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up your Supabase database:
- Run the SQL schema from `db/schema.sql` in your Supabase SQL editor

3. Configure environment variables in `.env.local`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

Deploy to Vercel:
```bash
vercel
```

Make sure to add environment variables in Vercel dashboard.

## Environment Variables

Required environment variables are in `.env.local`:
- `GROQ_API_KEY` - Your Groq API key
- `SUPABASE_DBURL` - PostgreSQL connection string
- `CHATBOT_NAME` - Name of your chatbot
- `CHATBOT_LOGO_URL` - URL to chatbot logo
- `SESSION_SECRET` - Secret for JWT tokens

## License

MIT
