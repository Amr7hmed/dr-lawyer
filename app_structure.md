// 📁 src/

├── assets/ // 🖼️ Static images, logos, pdfs, etc.
├── components/ // 🧩 Reusable UI components
│ ├── ui/ // ShadCN UI components (Button, Dialog, etc.)
│ ├── common/ // Common elements like Spinner, Avatar, EmptyState
│ └── sections/ // Page-specific or semi-global sections (e.g., DashboardCards, CaseTimeline)
├── context/ // 🌐 React context providers (AuthContext, SocketContext, etc.)
├── hooks/ // 🪡 Custom React hooks (useAuth, useChat, useDebounce, etc.)
├── layouts/ // 🧱 Layouts by role (ClientLayout, LawyerLayout, etc.)
├── lib/ // 🔧 Utility functions (api.ts, socket.ts, jwt.ts, classMerge.ts)
├── locales/ // 🌍 i18n translation files (en.json, ar.json, etc.)
├── pages/ // 📄 Top-level routing (React Router or Next.js-style structure)
│ ├── login.tsx // Auth page
│ ├── not-found.tsx // 404
│ ├── unauthorized.tsx // 403 Forbidden for wrong role access
│ ├── client/ // Client dashboard
│ │ ├── dashboard.tsx // Home page for clients
│ │ ├── requests.tsx // Submitted requests list
│ │ └── case/CaseDetails.tsx // View case details by ID
│ └── lawyer/ // Lawyer dashboard
│ ├── dashboard.tsx // Home page for lawyers
│ ├── requests.tsx // Incoming client requests
│ └── case/LawyerCaseDetails.tsx // Manage individual case by ID
├── routes/ // 🔀 Route definitions and ProtectedRoute logic
│ ├── index.tsx // Global router + role redirect from '/'
│ └── ProtectedRoute.tsx // Role-based access control component
├── services/ // 📁 API services (auth.ts, cases.ts, payments.ts, etc.)
├── state/ // 🌐 Global state managers (Zustand, Redux, etc. if needed)
├── styles/ // 🎨 Global CSS, Tailwind config, MUI theme, etc.
├── types/ // 📀 TypeScript interfaces/types (User, Case, Request, etc.)
├── validators/ // ✅ Zod/Yup schemas for form validation
├── App.tsx // Root component
├── main.tsx // Vite or React entry point
└── vite.config.ts // Vite config with aliases, SVGR, etc.

// 📦 Recommended Libraries Structure

// 🧩 UI & Layout

├── shadcn/ui // ShadCN UI components
├── framer-motion // Animations
├── lucide-react / iconify // Icons
├── react-dropzone // File uploads
├── react-pdf // PDF viewer

// 🔐 Auth & Validation

├── zod / yup // Schema validation
├── jwt-decode // Token decoding
├── react-router-dom // Routing

// 🔗 Data Fetching

├── axios // API client
├── @tanstack/react-query // API caching, background refetching

// 💬 Realtime Chat

├── socket.io-client // Chat support
├── react-avatar // Profile icons

// 📄 Forms & Signatures

├── react-hook-form // Form handling
├── react-signature-canvas // Signature input
├── pdf-lib / jspdf // PDF generation

// 💸 Payments

├── @stripe/stripe-js // Stripe payments
├── react-stripe-js // Stripe React wrapper

// 🌍 Internationalization

├── react-i18next // i18n support

// 📊 Charts / Admin Dashboard

├── recharts / chart.js / nivo // Charts and KPIs
├── @tanstack/react-table // Tables with filtering/sorting
