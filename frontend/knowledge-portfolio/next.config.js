/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	images: {
		domains: ['res.cloudinary.com'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				port: '',
			},
		],
	},
};

module.exports = nextConfig;
