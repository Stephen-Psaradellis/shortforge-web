import type { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthProvider } from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import '@/styles/globals.css';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#141414',
            color: '#ffffff',
            border: '1px solid #333333',
            borderRadius: '0.75rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2)',
            padding: '16px',
            fontSize: '0.875rem',
            fontWeight: '500',
          },
          success: {
            style: {
              background: '#141414',
              color: '#ffffff',
              border: '1px solid #C50000',
              boxShadow: '0 0 20px rgba(197, 0, 0, 0.3)',
            },
            iconTheme: {
              primary: '#FF3B30',
              secondary: '#ffffff',
            },
          },
          error: {
            style: {
              background: '#141414',
              color: '#ffffff',
              border: '1px solid #9E0000',
              boxShadow: '0 0 20px rgba(158, 0, 0, 0.4)',
            },
            iconTheme: {
              primary: '#E6251A',
              secondary: '#ffffff',
            },
          },
          loading: {
            style: {
              background: '#141414',
              color: '#ffffff',
              border: '1px solid #333333',
            },
            iconTheme: {
              primary: '#FF3B30',
              secondary: '#141414',
            },
          },
        }}
      />
      </AuthProvider>
    </>
  );
}
