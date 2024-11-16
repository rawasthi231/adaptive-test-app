import type { AppProps } from "next/app";

import QueryProvider from "@/pages/queryProvider";
import Sidebar from "@/components/sidebar";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryProvider>
      <div className="flex h-screen">
        <Sidebar />
        <Component {...pageProps} />
      </div>
    </QueryProvider>
  );
}
