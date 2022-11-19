// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "cloudinary",
    domains: ["res.cloudinary.com"],
    path: "https://res.cloudinary.com/<cloudinary-id>/image/upload",
  },
  i18n: {
    locales: ["id"],
    defaultLocale: "id",
  },
};
export default config;
