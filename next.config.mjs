/** @type {import('next').NextConfig} */

const nextConfig = {
    output: "export",
    basePath: "/chronocademy",
    images: {
        loader: "custom",
        loaderFile: "./imageLoader.js",
        unoptimized: false,
    }
};

export default nextConfig;
