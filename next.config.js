// https://www.viget.com/articles/host-build-and-deploy-next-js-projects-on-github-pages/
const isGithubActions = process.env.GITHUB_ACTIONS || false;

let assetPrefix = "";
let basePath = "/";

if (isGithubActions) {
    const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "");

    assetPrefix = `/${repo}/`;
    basePath = `/${repo}`;
}

/** @type {import("next").NextConfig} */
const nextConfig = {
    // assetPrefix: assetPrefix,
    // basePath: basePath,
    // images: {
    //     loader: "imgix",
    //     path: 'the "domain" of your Imigix source',
    // },
    reactStrictMode: true,
};

module.exports = nextConfig;
