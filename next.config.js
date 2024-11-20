/** @type {import("next").NextConfig} */
const nextConfig = {
    // assetPrefix: assetPrefix,
    // basePath: basePath,
    // images: {
    //     loader: "imgix",
    //     path: 'the "domain" of your Imigix source',
    // },
    reactStrictMode: true,
    output: "export",
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
