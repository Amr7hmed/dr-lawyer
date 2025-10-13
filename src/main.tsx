import { queryClient } from "@/lib/queryClient.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Loader from "./components/common/loader.tsx";
import { AuthProvider } from "./contexts/authContext.tsx";
import "./index.css";
import "./lib/i18n.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loader />}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Suspense>
    </QueryClientProvider>
  </StrictMode>,
);
