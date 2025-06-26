/** @type {import('next').NextConfig} */

const repo = "react-todo-app";
const isProd = true; // Set to true for production, false for development

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export",
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  trailingSlash: true,
};

module.exports = nextConfig;
