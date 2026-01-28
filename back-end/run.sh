#!/usr/bin/env bash

npx prisma migrate dev 
npx prisma generate
npm run build

exec node dist/src/main
