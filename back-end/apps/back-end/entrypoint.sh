#!/bin/sh

npx prisma migrate dev --name dev
# npx prisma migrate deploy

node dist/main.js

