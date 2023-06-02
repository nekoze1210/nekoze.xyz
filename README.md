# nekoze.xyz
The homepage of [@nekoze1210](https://github.com/nekoze1210)

## Portfolio
You can check out my personal biography and resume.
- [nekoze.xyz](https://nekoze.xyz)

## Blog
You can read my posts.
- [nekoze.xyz](https://nekoze.xyz/posts)
- [Sitemap](https://nekoze.xyz/sitemap.xml)

## Getting Started
1. Install dependencies:

```bash
npm install
# or
yarn
```

2. Rename .env.example to .env.[local | development | production]:

```bash
mv .env.example .env.local
```

3. Enable Notion API and create Integration with your Notion Database: [^1]

- [Create integrations with the Notion API (Notion)](https://www.notion.so/help/create-integrations-with-the-notion-api)

[^1]: My blog uses Notion API as CMS
 
4. Replace example env variables your Notion's Database ID and API Token with example ID and token (e.g. xxxxxxx....)

```dotenv
...
NOTION_TOKEN=Your Notion API Token
NOTION_DATABASE_ID=Your Notion Database ID
SITE_URL=Your Website URL
...
```

5. Run the Next.js development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Learn More
Take a look at the following resources:

### Next.js
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Notion API
- [Notion API Reference](https://developers.notion.com/reference/intro) - learn about Notion API
- [Notion API Changelog](https://developers.notion.com/page/changelog) - a changelog of Notion API
- [Notion API Client](https://github.com/makenotion/notion-sdk-js) - an official Notion JavaScript SDK

## Deploy on Vercel
Use [Vercel CLI](https://vercel.com) to deploy:

```bash
# Build static pages 
npm run build
## or
yarn build

# Deploy on Vercel
vercel
```
