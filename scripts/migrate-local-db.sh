#! /bin/bash -eu

export $(cat .env | grep ^DATABASE_URL)
npx prisma db push

export $(cat .env.test | grep ^DATABASE_URL)
npx prisma db push
