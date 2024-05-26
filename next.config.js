/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["mongoose", "*.my-proxy.com"],
    },
  },
    images: {
      remotePatterns:[
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
        port: "",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
      },
    ],
    },
    typescript: {
      ignoreBuildErrors: true,
    },
};

module.exports = nextConfig;
