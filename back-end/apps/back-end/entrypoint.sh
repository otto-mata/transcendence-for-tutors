#!/bin/sh
echo "ta grand mere la chauve ?"

npx prisma migrate dev --name dev
# npx prisma migrate deploy

echo "ta grand mere la chauve ?"

node dist/main.js

