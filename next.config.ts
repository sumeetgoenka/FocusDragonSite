/** @type {import('next').NextConfig} */
const nextConfig = {
  output: undefined,
  async redirects() {
    return [
      // Old auto-repair URLs from the FocusDragon macOS app pointed to
      // pages that never shipped. Redirect to the closest live walkthrough
      // so any cached tab or external link lands somewhere useful.
      {
        source: "/onboard/chrome/troubleshoot",
        destination: "/onboard/chrome/fix-no-block",
        permanent: true,
      },
      {
        source: "/onboard/chrome/permissions",
        destination: "/onboard/chrome/fix-permissions",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
