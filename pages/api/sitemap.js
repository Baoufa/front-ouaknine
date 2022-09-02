import clientApi from '../../libs/clientApi';
import * as fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  const locales = ['fr', 'en'];

  const BASE_URL = process.env.NEXT_PUBLIC_HOST; //This is where you will define your base url. You can also use the default dev url http://localhost:3000
  // const staticPaths = [];

  // const canonical = await fs.readdir(path.resolve(process.cwd(), 'pages'));

  // const canonicalPaths = canonical.filter(staticPage => {
  //   return ![
  //     'sitemap.xml.jsx',
  //     '404.jsx',
  //     '404.module.scss',
  //     '_app.js',
  //     '_document.js',
  //     'api',
  //     'Home.module.scss',
  //     'expertise.module.scss',
  //     'articles.module.scss',
  //     'contact.module.scss',
  //     'legal.module.scss',
  //     'index.js',
  //   ].includes(staticPage);
  // });

  // canonicalPaths.forEach(staticPagePath => {
  //   staticPaths.push(`${BASE_URL}/${staticPagePath.replace('.jsx', '')}`);
  //   for (const locale of locales) {
  //     staticPaths.push(
  //       `${BASE_URL}/${locale}/${staticPagePath.replace('.jsx', '')}`
  //     );
  //   }
  // });

  const posts = await clientApi.fetch(
    `*[_type == "post" 
    && dateTime(publishedAt) 
        < dateTime(now())] | order(publishedAt desc)
       {
    _id,
  }`
  );

  const dynamicPaths = [];

  posts.forEach(singleBlog => {
    dynamicPaths.push(`${BASE_URL}/articles/${singleBlog._id}`);
    for (const locale of locales) {
      dynamicPaths.push(`${BASE_URL}/${locale}/articles/${singleBlog._id}`);
    }
  });

  const allPaths = [...dynamicPaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
<loc>https://www.ouaknine-avocat.com</loc>
</url>
<url>
<loc>https://www.ouaknine-avocat.com/en</loc>
</url>
<url>
<loc>https://www.ouaknine-avocat.com/fr</loc>
</url>
<url>
<loc>https://www.ouaknine-avocat.com/articles</loc>
</url>
<url>
<loc>https://www.ouaknine-avocat.com/fr/articles</loc>
</url>
<url>
<loc>https://www.ouaknine-avocat.com/en/articles</loc>
</url>
<url>
<loc>https://www.ouaknine-avocat.com/contact</loc>
</url>
<url>
<loc>https://www.ouaknine-avocat.com/fr/contact</loc>
</url>
<url>
<loc>https://www.ouaknine-avocat.com/en/contact</loc>
</url>
<url>
<loc>https://www.ouaknine-avocat.com/expertise</loc>
</url>
<url>
<loc>https://www.ouaknine-avocat.com/fr/expertise</loc>
</url>
<url>
<loc>https://www.ouaknine-avocat.com/en/expertise</loc>
</url>
<url>
<loc>https://www.ouaknine-avocat.com/legal</loc>
</url>
<url>
<loc>https://www.ouaknine-avocat.com/fr/legal</loc>
</url>
<url>
<loc>https://www.ouaknine-avocat.com/en/legal</loc>
</url>
      ${allPaths
        .map(url => {
          return `
            <url>
              <loc>${url}</loc>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/xml');

  // Instructing the Vercel edge to cache the file
  res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600');

  res.end(sitemap);
}
