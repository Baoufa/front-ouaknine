import * as fs from 'fs';
import clientApi from '../libs/clientApi';
import path from 'path';

const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res, locales }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_HOST; //This is where you will define your base url. You can also use the default dev url http://localhost:3000

  const staticPaths = [];

  const canonicalPaths = fs.readdirSync(path.join(process.cwd(), 'pages')).filter(staticPage => {
    return ![
      'sitemap.xml.jsx',
      '404.jsx',
      '404.module.scss',
      '_app.js',
      '_document.js',
      'api',
      'Home.module.scss',
      'expertise.module.scss',
      'articles.module.scss',
      'contact.module.scss',
      'legal.module.scss',
      'index.js',
    ].includes(staticPage);
  });

  canonicalPaths.forEach((staticPagePath) => {
    staticPaths.push(`${BASE_URL}/${staticPagePath.replace('.jsx', '')}`);
    for (const locale of locales) {
      staticPaths.push(`${BASE_URL}/${locale}/${staticPagePath.replace('.jsx', '')}`);
    }
  });



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

  const allPaths = [BASE_URL ,...staticPaths, ...dynamicPaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      // This is where we would be putting in our URLs
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

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
