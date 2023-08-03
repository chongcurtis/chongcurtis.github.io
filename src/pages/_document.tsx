import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en" className="bg-background-color">
            <Head>
                <title>Curtis</title>
                {/* <meta name="viewport" content="width=device-width, initial-scale=1"></meta> */}
                <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
