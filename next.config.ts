import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      new URL("https://cdn.pixabay.com/**"),
      new URL("https://lh3.googleusercontent.com/**"),
      new URL("http://localhost:9000/**")
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '3mb',
    },
  },
};

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: "./messages/en.json"
  }
});

export default withNextIntl(nextConfig);
