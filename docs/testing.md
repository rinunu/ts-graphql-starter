# テスト

以下をメインのテスト手法とする

- Integration テスト
- Storybook による VRT
- E2E テスト

## Backend

### Integration テスト

ユーザー (含む BFF) が利用する形でテストを行う。

Service 間の独立性を担保するため、テスト対象は Service の API とする。
また、テスト対象以外の Service は原則モックする。

SQL もテスト対象としたいため、 DB まで含めたテストを行う。

テスト対象を広くカバーでき、 API が比較的安定することが期待できるため、このテストをメインのテストとする。

### E2E テスト

(まだまだ) 時間がかかり、壊れやすいため、メインとなる流れのみをテストする。
バリエーションは Integration テストで担保する。

### Unit テスト

リファクタリング時にテストが壊れる可能性が高いと考えており、そのためメインのテストとはしない。

Integration テストの補助として、 Integration テストではテストしづらいテストにて利用する。

## Frontend

### Storybook による VRT

## テスト実行環境

CI では maxWorkers を増やしても早くならないという情報があったので、取り急ぎは並列実行をしない形としておく

https://jestjs.io/docs/troubleshooting



