import "@/styles/globals.css";

import { Poppins } from "next/font/google";
import type { AppProps } from "next/app";
import Sidebar from "@/components/sidebar/Sidebar";
import classNames from "classnames";

// how to serve fonts: https://nextjs.org/docs/basic-features/font-optimization
const poppins = Poppins({
    weight: ["100", "300", "700"],
    style: "normal",
    subsets: ["latin-ext"],
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className={classNames(poppins.className)}>
            <Sidebar>
                <Component {...pageProps} />
            </Sidebar>
        </main>
    );
}
