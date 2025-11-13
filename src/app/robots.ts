import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/organizer/', '/sponsor/'],
    },
    sitemap: 'https://match-my-sponsor.vercel.app/sitemap.xml',
  };
}
