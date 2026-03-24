/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	typescript: {
		ignoreBuildErrors: true // Temporarily ignore TypeScript errors during build
	},
	experimental: {
		serverActions: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cfngdoszuhfiujrgozih.supabase.co',
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'soyfxhyasghymffubbhi.supabase.co',
			},
			{
				protocol: 'https',
				hostname: 'yralcgckodgemrozhvhn.supabase.co',
			},
			{
				protocol: 'https',
				hostname: 'epdeijkqhklbeinsbtqx.supabase.co',
			},
			{
				protocol: 'https',
				hostname: 'placehold.co',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
		],
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},
	async headers() {
		return [
			/*
			 * ChatGPT widget iframe origin (*.web-sandbox.oaiusercontent.com) loads
			 * ES modules and CSS from /mcp/* (public/). Without CORS, the browser
			 * blocks script execution (see Blocks diagram-app widget routes).
			 */
			{
				// Match drafty-pro next.config: CORS for Apps SDK iframe + cache static bundles
				source: '/mcp/:path*',
				headers: [
					{ key: 'Access-Control-Allow-Origin', value: '*' },
					{ key: 'Access-Control-Allow-Methods', value: 'GET, OPTIONS' },
					{
						key: 'Access-Control-Allow-Headers',
						value: 'Content-Type, Authorization',
					},
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
			{
				source: '/api/send-mail',
				headers: [
					{ key: 'Access-Control-Allow-Credentials', value: 'true' },
					{ key: 'Access-Control-Allow-Origin', value: '*' },
					{ key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
					{ key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
				],
			},
			{
				source: '/.well-known/:path*',
				headers: [
					{ key: 'Access-Control-Allow-Origin', value: '*' },
					{ key: 'Access-Control-Allow-Methods', value: 'GET, OPTIONS' },
					{ key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
				],
			},
			{
				source: '/api/mcp/:path*',
				headers: [
					{ key: 'Access-Control-Allow-Origin', value: '*' },
					{ key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
					{ key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
					{ key: 'Access-Control-Allow-Private-Network', value: 'true' },
				],
			},
		]
	},
	async rewrites() {
		return [
			{
				source: '/.well-known/jwks.json',
				destination: '/api/.well-known/jwks',
			},
		]
	},
}

import withBundleAnalyzer from '@next/bundle-analyzer'

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
})

export default bundleAnalyzer({
	env: {
		NEXT_PUBLIC_ENV: 'PRODUCTION',
	},
	...nextConfig,
})
