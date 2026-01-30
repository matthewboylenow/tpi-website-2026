import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xyxkftovdmpcozud.public.blob.vercel-storage.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "taylorproducts.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.taylor-company.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
