/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  
  // Enhanced compression
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts', 'framer-motion', 'lottie-react'],
    optimizeCss: true,
    // Optimize server components
    serverActions: {
      allowedOrigins: ['localhost:3000', 'localhost:3001']
    },
    // Reduce bundle size
    bundlePagesRouterDependencies: true,
    optimizeServerReact: true,
    // Enable gzip compression
    gzipSize: true,
  },
  
  // Move serverComponentsExternalPackages to root level
  serverExternalPackages: ['sharp'],
  
  // Optimize CSS
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    // Enable SWC minification
    styledComponents: true,
  },
  
  // Optimize webpack
  webpack: (config, { isServer, dev }) => {
    // Optimize bundle size
    if (!isServer && !dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000, // Increase minimum size
          maxSize: 50000, // Larger chunks for better caching but still reasonable
          cacheGroups: {
            default: false,
            vendors: false,
            // Framework chunk (React, Next.js) - keep small
            framework: {
              chunks: 'all',
              name: 'framework',
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
              maxSize: 50000,
            },
            // Animation libraries - async loading
            animations: {
              name: 'animations',
              chunks: 'async',
              test: /[\\/]node_modules[\\/](framer-motion|lottie-react|motion-dom|lottie-web)[\\/]/,
              priority: 30,
              enforce: true,
              maxSize: 40000,
            },
            // UI libraries - async and medium size
            ui: {
              name: 'ui',
              chunks: 'async',
              test: /[\\/]node_modules[\\/](lucide-react|recharts|@radix-ui)[\\/]/,
              priority: 25,
              enforce: true,
              maxSize: 30000,
            },
            // Vendor chunk - larger pieces for better caching
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]/,
              priority: 20,
              minChunks: 1,
              maxSize: 50000,
            },
            // Common chunk - medium size
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
              maxSize: 30000,
            }
          }
        },
        // Aggressive tree shaking
        usedExports: true,
        sideEffects: false,
        // Module concatenation for better tree shaking
        concatenateModules: true,
        // Minimize bundle size
        minimize: true,
        // Remove unused modules
        providedExports: true,
        // Better module ids for caching
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
      }

      // Add aggressive module replacement for smaller alternatives
      config.resolve.alias = {
        ...config.resolve.alias,
        // Use smaller alternatives where possible
        'react/jsx-runtime': 'react/jsx-runtime',
        'react/jsx-dev-runtime': 'react/jsx-dev-runtime',
      }

      // Ignore large modules that aren't needed
      config.externals = {
        ...config.externals,
        // Externalize large libraries if they're not critical
        canvas: 'canvas',
        bufferutil: 'bufferutil',
        'utf-8-validate': 'utf-8-validate',
      }
    }

    // Add module concatenation for better tree shaking
    if (!isServer && !dev) {
      config.optimization.concatenateModules = true;
    }

    // Optimize module resolution
    config.resolve.modules = ['node_modules'];
    config.resolve.symlinks = false;

    return config
  },
  
  // Complex Security Headers Configuration
  async headers() {
    // Only apply strict security headers in production
    if (process.env.NODE_ENV !== 'production') {
      return []
    }
    
    return [
      {
        source: '/:path*',
        headers: [
          // DNS Prefetch Control - Allow DNS prefetching for performance
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          // HSTS - Force HTTPS for 2 years including subdomains with preload
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          // Prevent clickjacking attacks
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // XSS Protection (legacy but still useful)
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // Control referrer information
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // Permissions Policy - Restrict browser features
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()'
          },
          // COOP - Same origin for better isolation
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          // COEP - Allow cross-origin resources
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none'
          },
          // CORP - Allow same-site and cross-origin
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin'
          },
          // Comprehensive CSP with balanced security and functionality
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.gstatic.com https://www.google.com https://www.recaptcha.net https://apis.google.com https://danamasjid.firebaseapp.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https: wss:",
              "frame-src 'self' https://www.google.com https://www.recaptcha.net https://recaptcha.net https://danamasjid.firebaseapp.com",
              "worker-src 'self' blob:",
              "child-src 'self' blob:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "manifest-src 'self'",
              "media-src 'self' blob: data:",
              "upgrade-insecure-requests"
            ].join('; ')
          },
          // Additional security headers
          {
            key: 'X-Permitted-Cross-Domain-Policies',
            value: 'none'
          },
          {
            key: 'X-Download-Options',
            value: 'noopen'
          },
          {
            key: 'Expect-CT',
            value: 'max-age=86400, enforce'
          }
        ],
      },
      // Cache static assets aggressively with proper MIME types
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Type',
            value: 'image/*',
          },
        ],
      },
      {
        source: '/_next/static/css/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Type',
            value: 'text/css; charset=utf-8',
          },
        ],
      },
      {
        source: '/_next/static/js/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig

// Cloudflare integration - uncomment after installing @opennextjs/cloudflare
// import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev())
