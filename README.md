# Transcript Keeper Frontend

Transcript Keeper Frontend is the web application for reviewing, managing, and downloading meeting transcripts captured by the Transcript Keeper desktop app.

It provides:

- A public landing page
- Google sign-in with Firebase Authentication
- A protected notes dashboard
- Transcript detail pages with copy support
- A macOS desktop download page that resolves the latest `.dmg` release from GitHub

## Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS v4
- Firebase Authentication
- Radix UI primitives
- Sonner

## Features

- Sign in with Google
- Authenticate API requests with Firebase ID tokens
- View saved meeting notes
- Open note detail pages and read transcripts line by line
- Copy the full transcript to the clipboard
- Rename and delete notes
- Show helpful retry states for API and network failures
- Offer a macOS desktop app download flow with unsigned app guidance

## Screens and Flows

### Public pages

- `/`
  Landing page with product overview, features, use cases, and CTA sections
- `/download`
  Desktop app download page for macOS users

### Authenticated pages

- `/signin`
  Google sign-in flow
- `/notes`
  Notes list
- `/notes/:id`
  Note detail page with transcript content and note actions

## Environment Variables

Create a `.env.local` file in the project root.

```bash
VITE_API_ROOT=http://localhost:8000

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

Notes:

- `VITE_API_ROOT` should point to the backend API origin
- The Firebase project must have Google sign-in enabled
- The app domain must be registered in Firebase Authentication authorized domains

## Backend Expectations

This frontend expects a backend that accepts Firebase-authenticated requests and exposes the following routes:

- `POST /v1/auth`
- `GET /v1/notes`
- `GET /v1/notes/:id`
- `DELETE /v1/notes/:id`
- `GET /v1/notes/:id/transcripts`

The frontend sends the Firebase ID token in the `Authorization` header as:

```http
Authorization: Bearer <firebase-id-token>
```

## Getting Started

### Prerequisites

- Node.js 20 or later recommended
- pnpm
- A Firebase project configured for Google Authentication
- A running Transcript Keeper backend

### Install

```bash
pnpm install
```

### Run in development

```bash
pnpm dev
```

### Build for production

```bash
pnpm build
```

### Preview the production build

```bash
pnpm preview
```

### Lint

```bash
pnpm lint
```

## Project Structure

```text
src/
  components/    Shared UI and page sections
  config/        App constants and environment access
  hooks/         Reusable hooks
  lib/           API, Firebase, and utility helpers
  pages/         Route-level pages
  stores/        Zustand stores for dialogs and alerts
  types/         Shared TypeScript types
```

## Download Page Behavior

The download page resolves the latest GitHub release at runtime and starts the current macOS `.dmg` download directly.

If the installer cannot be resolved automatically, the UI falls back to the GitHub Releases page.

The desktop app is currently distributed unsigned, so the page also includes first-launch guidance for users who are blocked by macOS Gatekeeper.

## Deployment Notes

- This is a static frontend and can be deployed to platforms like Vercel, Netlify, or any static hosting service
- Production Firebase config must be set through environment variables
- Make sure the deployed origin is added to Firebase Authentication authorized domains
- Make sure `VITE_API_ROOT` points to the production backend

## Repository Status

This repository contains the frontend application only.

The macOS recorder/downloader flow is designed to work alongside the separate Transcript Keeper desktop app and backend API.
