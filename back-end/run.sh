#!/usr/bin/env bash

npx prisma generate
npm run build
npx prisma migrate deploy

exec node dist/src/main
