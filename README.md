# 💖 A Little World With Us
> **Private Couples Intimacy, Shared Memories, Wellness & Life OS**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React Native](https://img.shields.io/badge/React_Native-Expo-000020?style=flat-square&logo=expo)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL_&_Auth-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media_CDN-3448C5?style=flat-square&logo=cloudinary)](https://cloudinary.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Production-black?style=flat-square&logo=vercel)](https://a-little-world-with-us.vercel.app)

---

## 🌟 Overview

**A Little World With Us** is a private couples platform for sharing memories, coordinating daily life, tracking wellness, and learning together.

The repository contains a Next.js web application and an Expo/React Native mobile application, backed by Supabase for database, authentication, storage, and realtime features.

> **Security note:** Do not describe the current chat encryption implementation as end-to-end encryption (E2EE) until a reviewed key-management design ensures that decryption keys are unavailable to the server and other unauthorized parties. A key delivered to browser JavaScript is accessible to that browser environment and does not, by itself, provide E2EE.

## 🚀 Key Features

* **📸 Vault & Memories**: Multimedia journaling and media storage integrations.
* **💬 Private Real-Time Chat**: Realtime messaging, voice notes, reactions, and media sharing.
* **🌸 Care & Daily Wellness**: Wellness logs and shared insights.
* **🗓️ Shared Planning & Calendar**: Shared milestones, travel planning, and expense tracking.
* **🇰🇷 Interactive Learning**: Korean language learning modules.
* **🤖 Couples AI Companion**: AI-assisted ideas, check-ins, and memory features.
* **🤖 Telegram Integration**: Bot-driven notifications and alerts, subject to configured authorization and topic restrictions.

## 🏗️ Architecture & Tech Stack

* **Web:** Next.js 16, React, TypeScript, Tailwind CSS, App Router, PWA.
* **Mobile:** Expo / React Native for iOS and Android.
* **Backend:** Supabase (PostgreSQL 17, Auth, Row Level Security, Realtime, Edge Functions).
* **Jobs and cache:** Upstash Redis; scheduled jobs may also use Supabase Cron.
* **Media:** Cloudinary and Backblaze B2.
* **External integrations:** Google Drive, AI providers, Telegram, email, and push notifications.

The integrations above describe repository capabilities and configured services; they should not be interpreted as proof that every production delivery path has passed an end-to-end test.

## ⚡ Quickstart & Local Development

### Prerequisites

* Node.js `>=24.3.0 <25` (see the root `package.json`).
* npm, with lockfiles kept in sync.

### Setup

```bash
# Install web dependencies
npm run web:install

# Install mobile dependencies
npm run mobile:install

# Run the web application
npm run dev

# Run the mobile application
npm run mobile:dev
```

Configure the environment variables required by each app before starting local services. Never commit real credentials or production secrets.

### Useful checks

```bash
npm run typecheck
npm run lint
npm run test
npm run mobile:typecheck
npm run mobile:lint
npm run mobile:test
```

## 🔒 Security & Privacy

* **Row Level Security (RLS):** Database access must be governed by reviewed policies and least-privilege grants. RLS being enabled is not, by itself, proof that every policy is correct.
* **Service credentials:** Keep service-role keys, bot tokens, signing secrets, and provider credentials server-side. Do not expose them through `NEXT_PUBLIC_*` variables.
* **Chat encryption:** The current browser-side key arrangement must not be represented as E2EE. Review and migrate key management before making stronger confidentiality claims; do not rotate keys or rewrite existing ciphertext without a migration and recovery plan.
* **Integrations:** Validate webhook signatures/secrets, authorization, replay protection, rate limits, and delivery outcomes for each integration.
* **Production safety:** Database migrations, secret rotation, destructive operations, and production deployments require an explicit reviewed change plan.

## 📜 License & Compliance

Distributed under private proprietary license. All Rights Reserved.
