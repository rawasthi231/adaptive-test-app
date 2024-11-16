import type { AppProps } from "next/app";

import QueryProvider from "@/pages/queryProvider";
import Sidebar from "@/components/sidebar";

import { AuthProvider } from "@/context/AuthContext";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </QueryProvider>
  );
}
