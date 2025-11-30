# Project Overview

This is a Next.js project bootstrapped with `create-next-app`. It uses React and Tailwind CSS for the frontend. The project is configured to use TypeScript.

The project is a website for an agro-export company called "Shivaay International". The website has a home page, an about page, a products page, a blog, a contact page, and a newsletter subscription page. The website is well-designed and uses animations to make it more interactive.

# Building and Running

## Development

To run the development server, use the following command:

```bash
npm run dev
```

This will start the development server on [http://localhost:3000](http://localhost:3000).

## Building

To build the project for production, use the following command:

```bash
npm run build
```

## Starting the production server

To start the production server, use the following command:

```bash
npm run start
```

# Linting

To lint the project files, use the following command:

```bash
npm run lint
```

# Development Conventions

The project uses ESLint for linting. The configuration is in the `eslint.config.mjs` file. The project also uses TypeScript, and the configuration is in the `tsconfig.json` file.

# Linting Errors

I am currently facing the following linting errors:

*   `app/newsletter/page.tsx`: `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`
*   `app/products/[id]/page.tsx`: `Error: Calling setState synchronously within an effect can trigger cascading renders`
*   `app/products/page.tsx`: `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`

I have tried to fix these errors multiple times, but I am still getting them. I would appreciate it if you could help me fix them.