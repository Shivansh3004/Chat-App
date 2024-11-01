/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental : {
        swcPlugins : [
            ["next-superjson-plugin", {}]
        ]
    },
    images: {
        remotePatterns: [
            {protocol: 'https', hostname: 'res.cloudinary.com', port:''},
            {protocol: 'https', hostname: 'avatars.githubusercontent.com', port:''},
            {protocol: 'https', hostname: 'lh3.googleusercontent.com', port:''},
        ],
    },
};

export default nextConfig
