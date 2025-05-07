#!/bin/sh
esbuild --bundle src/main.tsx --jsx=automatic --define:import.meta.env.DEV=true --outdir=public
npx tailwindcss -c tailwind.config.ts -i ./src/index.css -o /tmp/$$.css
cat /tmp/$$.css >> ./public/main.css
