# 🧠 TalkTutor – Real-time AI Teaching Platform

TalkTutor is a modern, full-stack AI-powered SaaS application that provides real-time tutoring through voice-enabled AI companions. Built using **Next.js 14**, **Tailwind CSS**, **Supabase**, and **Vapi**, this app empowers learners to engage with smart, subject-based voice tutors.

## 🚀 Features

- 🎙️ Real-time voice interaction using [Vapi](https://www.vapi.ai/)
- 🧑‍🏫 AI-powered companions for multiple subjects and topics
- 🎨 Beautiful UI with responsive design using Tailwind CSS
- 🔐 Authentication via [Clerk](https://clerk.dev/)
- ❤️ Bookmark companions for quick access
- 🧠 Stores session history using Supabase
- 🌐 Deployed via Vercel with production-ready build

## 📸 Live
use laptop screen for a better experience
![TalkTutor](https://talktutor-ai.vercel.app/)

## 🧰 Tech Stack

- **Frontend:** Next.js 14, React, Tailwind CSS
- **Backend:** Supabase
- **Auth:** Clerk
- **Voice AI:** Vapi 
- **Deployment:** Vercel

## 📦 Installation

```bash
git clone https://github.com/YOUR_USERNAME/TalkTutor_AI_SaaS_app_using_Nextjs.git
cd TalkTutor_AI_SaaS_app_using_Nextjs
npm install
## Environment Variables
Create a .env.local file and configure the following:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
VAPI_API_KEY=your_vapi_api_key
## Running Locally
npm run dev


