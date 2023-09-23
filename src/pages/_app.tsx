import "@/styles/globals.css";

import { Outfit } from "next/font/google";
import type { AppProps } from "next/app";
import Sidebar from "@/components/sidebar/Sidebar";
import classNames from "classnames";
import Head from "next/head";

// how to serve fonts: https://nextjs.org/docs/basic-features/font-optimization
const poppins = Outfit({
    weight: ["100", "300", "700"],
    style: "normal",
    subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Curtis</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                {/* <meta name="viewport" content="initial-scale=1, maximum-scale=1" /> */}
            </Head>
            <main className={classNames(poppins.className)}>
                <Sidebar>
                    <Component {...pageProps} />
                </Sidebar>
            </main>
        </>
    );
}
