# Penpal

URL: https://penpal-git-development-daniel-smyth.vercel.app/ 

Reinventing how you work.

Penpal is a powerful tool that can enhance the quality and fluency of your written content, regardless of your profession or level of expertise. With its advanced algorithms and natural language processing capabilities, Penpal can help lawyers, copywriters, engineers, students, social media content creators, and many others to produce high-quality, professional-grade writing.

Whether you're working on an important document, a blog post, or a social media update, Penpal can help you take your writing to the next level, leaving your readers impressed by your imagination and writing ability.

```console
Question: Write me three paragraphs on the Australian Open today
```

Penpal does all the work.

```console
Answer: "This year's Australian Open has seen some exciting matches and upsets...”
```

## Stack

|           | Library    | Website                       |
| --------- | ---------- | ----------------------------- |
| Framework | Next.js 13 | https://nextjs.org/docs/      |
| Database  | MongoDB    | https://www.mongodb.com/docs/ |

## Setup

1. If you don’t have Node.js installed, [install it from here](https://nodejs.org/en/) (Node.js version >= 14.6.0 required)

2. Install the requirements

   ```bash
   $ npm install
   ```

3. Make a copy of the example environment variables file

   On Linux systems:

   ```bash
   $ cp .env.example .env
   ```

   On Windows:

   ```powershell
   $ copy .env.example .env
   ```

4. Add required environment variables to the newly created `.env` file

5. Run the app

   ```bash
   $ npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/...). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
