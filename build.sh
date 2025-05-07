#!/bin/sh
esbuild --bundle src/main.tsx --jsx=automatic --define:import.meta.env.DEV=true --outdir=public
npx tailwindcss -c tailwind.config.ts -i ./src/index.css -o ./public/main.css
