## 使用技術

- Vue.js
- Vitest

## テストの書き方

- テストファイルは、
  - テスト対象のファイルと同一階層に配置します。
  - `<テスト対象のファイル名>.test.ts` という名前にしてください。
- describe および it の第一引数は日本語で書いてください。
- 既に存在するテストを参考にしてください。
- TypeScriptの静的解析でエラーとなるケースのテストは書かないでください。  
- テストに必要な関数 (describe, it, expect等) は明示的にインポートしてください。
