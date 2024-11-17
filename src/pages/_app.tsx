// src/pages/_app.tsx
import { AppProps } from 'next/app'; // Import AppProps from Next.js for type safety
import Head from 'next/head'; // Import Next.js Head component for meta tags and external scripts
import '../styles/globals.css'; // Import global styles

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Add metadata and external scripts using Head */}
      <Head>
        {/* Add the Jitsi API script */}
        <script src="https://meet.jit.si/external_api.js" async></script>
      </Head>

      {/* Render the actual page component */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
