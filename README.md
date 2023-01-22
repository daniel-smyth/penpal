# Penpal

Reinventing how you work.

Generate paragraphs of MBA-level English content with just a simple question.

```console
Question: Write me three paragraphs on the Australian Open today
```

Penpal does all the work.

```console
Answer: "This year's Australian Open has seen some exciting matches and upsets, with many of the top players competing for the title. The men's singles tournament has seen the early exit of some of the top seeds…”
```

Penpal will improve the English and in most cases, the quality, of your content no matter the circumstances. Lawyers, copywriters, engineers, students, social media content creators, and many more will all be shocked at Penpal's imagination and writing ability.

## Stack

| Library    | Website                  |
| ---------- | ------------------------ |
| Next.js 13 | https://nextjs.org/docs/ |

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

4. Add your [OpenAI API key](https://beta.openai.com/account/api-keys) to the newly created `.env` file

5. Run the app

   ```bash
   $ npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/...). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
