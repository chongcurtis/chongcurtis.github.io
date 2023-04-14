import "@/styles/globals.css";


import { Poppins } from "next/font/google";
import type { AppProps } from "next/app";

// how to serve fonts: https://nextjs.org/docs/basic-features/font-optimization
const poppins = Poppins({
    weight: "300",
    style: "normal",
    subsets: ["latin-ext"],
});


export default function App({ Component, pageProps }: AppProps) {
    return <main className={poppins.className}>
        <Component {...pageProps} />
    </main>;
}
