<<<<<<< HEAD
import Layout from "@/components/layouts/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CountProvider } from "@/context/CountContext"; // Import CountProvider

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CountProvider> {/* Wrap the entire application with CountProvider */}
=======
import Layout from "@/components/layouts/Layout"; // Corrected path/alias
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CountProvider } from "@/context/CountContext"; // Corrected path/alias

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CountProvider>
>>>>>>> 85dde0c4380e0bfff46c35a8479d4073ff1d64d1
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CountProvider>
  )
}