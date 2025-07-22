import "@/styles/globals.css";

import { Outfit } from "next/font/google";
import type { AppProps } from "next/app";
import Sidebar from "@/components/sidebar/Sidebar";
import classNames from "classnames";
import Head from "next/head";
import Script from "next/script";

// how to serve fonts: https://nextjs.org/docs/basic-features/font-optimization
const outfit = Outfit({
    weight: ["100", "300", "700"],
    style: "normal",
    subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Curtis' Site</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                {/* <meta name="viewport" content="initial-scale=1, maximum-scale=1" /> */}
            </Head>
            <Script
                strategy="lazyOnload"
                src="https://www.googletagmanager.com/gtag/js?id=G-TCKVPGLF3X"
            ></Script>
            <Script strategy="lazyOnload" id="analytics">
                {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-TCKVPGLF3X');`}
            </Script>
            <main className={classNames(outfit.className)}>
                <Sidebar>
                    <Component {...pageProps} />
                </Sidebar>
            </main>
        </>
    );
}
