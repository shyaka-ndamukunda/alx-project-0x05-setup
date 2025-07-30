import Layout from "@/components/layouts/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CountProvider } from "@/context/CountContext"; // Import CountProvider

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CountProvider> {/* Wrap the entire application with CountProvider */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CountProvider>
  )
}