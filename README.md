# TheSkyBlock 開発サーバー Datapack自動デプロイサーバー

Datapackリポジトリへのpush時に任意のスクリプトを実行できるサーバー

autodeployと付いていますがそこまではやってくれません

## 使い方

### 1. GitHub

1. 対象リポジトリのSettingsからWebhookを作成
1. `Content type` は `application/json`

### 2. 設定ファイル

1. `template_config.yaml` を基に `config.yaml` 作成
1. ファイル内のコメントに従って設定値を入力

### 3. 実行

1. `yarn`
1. `yarn compile`
1. `yarn start`
