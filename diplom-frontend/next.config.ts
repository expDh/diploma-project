// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   reactCompiler: true,
// };

// export default nextConfig;



import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // ← Добавляем настройку styled-components сюда
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
      minify: true,
    },
  },
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4200/api/:path*',   // прокси на NestJS
      },
    ];
  },
};

export default nextConfig;