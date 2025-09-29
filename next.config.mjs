/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["luadmin.coderorbit.com"],
  },

  async rewrites() {
    const backendUrl = process.env.BASE_URL || "https://luadmin.coderorbit.com"; 

    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
