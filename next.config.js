/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [
      "localhost",
      "res.cloudinary.com",
      "img.icons8.com",
      "picsum.photos",
      "crazyegg.com",
      "ceblog.s3.amazonaws.com",
      "secure.gravatar.com",
      "images.pexels.com",
      "images.unsplash.com",
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
    };

    return config;
  },
};

module.exports = nextConfig;
