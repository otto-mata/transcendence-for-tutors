#!/usr/bin/env bash

npx prisma generate
npm run build
npx prisma migrate dev --name dev

exec node dist/src/main
