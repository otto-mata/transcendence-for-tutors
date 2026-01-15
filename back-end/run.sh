#!/usr/bin/env bash

npx prisma migrate deploy 
npx prisma generate
npm run build

exec node dist/src/main
