# obsidian-shadcn-template

A super starter template for building Obsidian plugins with shadcn/ui.

## Features

- Use container query to make view more responsive;
- No more influence from global styles;
- Won't influence other plugins;
- Support shadcn/ui;
- Support dark mode;

## Installation

- Use the "Use this template" button to create a new repository.
- Clone the repository to your local machine.
- Run `pnpm install` to install the dependencies.
- Run `pnpm dlx shadcn@latest add ...` to add components;

## Usage

- **Replace all `custom-` with your custom prefix**;
  - e.g. `custom-next` in `view.tsx`, `postcss.config.mjs` and also `tailwind.config.ts`;
- Update manifest.json with your plugin information;
- Run `pnpm dev` to start the development server.
  - You can look into vite.config.ts to see the plugin configuration.

## Best Practices

- You need to add custom class to the components you want to use, so that you can use both `tailwindcss-scoped-preflight` and also postcss to generate scoped class;



