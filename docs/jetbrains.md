## JetBrains IDEs で使用する場合

node_modules/.prisma を
`Mark Directory as` > `Not Excluded`

Jest 実行のオプションに
```
--setupFilesAfterEnv dotenv-flow/config
```
(.env.local が使用されないため)

