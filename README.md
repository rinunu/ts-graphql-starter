# ts-graphql-starter

Sample Project

- Common
  - TypeScript 
  - Nx monorepo
  - GraphQL
  - Firebase Authentication
- Backend
  - NestJs
- Frontend
  - Next.js
  - Urql
- Infrastructure
  - TODO Cloud Run
  - TODO Vercel
- Test
  - TODO e2e
  - TODO Jest
  - Storybook
  - Chromatic
- Other
  - Sentry
  - TODO Asynchronous execution

## Commands

```shell
docker compose up
```

```shell
nx run-many --target=serve --all
```

```shell
nx run-many --target=lint --all
```

```shell
prisma generate
```

```shell
nx storybook browser-storybook-host
```

```shell
nx g move --project api-bff backend/bff --importPath=@backend/bff
```

```shell
nx g @nrwl/react:library browser/urql --importPath=@browser/urql
```

## PMM

TODO

### 設定

```shell
docker compose up pmm-server
# 別ウィンドウで
docker compose exec pmm-server change-admin-password admin
docker compose run --rm pmm-client-setup

# docker compose up pmm-server 停止
docker compose --profile pmm up

docker compose exec pmm-client pmm-admin add mysql --query-source=slowlog --username=pmm --password=pass mysql-main mysql:3306
```

```shell
open https://localhost/
# Chrome で "thisisunsafe" とキーボードを叩く
```

## IntelliJ

node_modules/.prisma を
`Mark Directory as` > `Not Excluded`
