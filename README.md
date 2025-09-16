# CoCoRoBi Wordbook

CoCoRoBi 社内ルールや AI 活用のポイントを学ぶための単語帳アプリです。覚えた内容をフラッシュカードやクイズで復習できます。静的ファイルのみで構成されているので、ローカルでも GitHub Pages でもそのまま利用できます。

## ローカルでの確認方法

静的ファイルは `docs/` ディレクトリにまとまっています。次のいずれかの方法で簡単に確認できます。

```bash
# 例1: docs 配下でサーバーを起動
cd docs
python3 -m http.server 8000

# 例2: ルートから docs を公開対象に指定
python3 -m http.server 8000 --directory docs
```

ブラウザで `http://localhost:8000` にアクセスすると画面を確認できます。

## テストの実行

静的ファイルの主要セクションやデータ構造が維持されているかを確認する簡易テストを用意しています。

```bash
python -m unittest discover -s tests
```

`docs/index.html` に必須セクションが存在するか、`docs/script.js` に十分なカードデータが定義されているかなどをチェックします。

## GitHub Pages で公開する

このリポジトリには、`docs/` の内容を GitHub Pages に公開するための GitHub Actions ワークフロー (`.github/workflows/deploy.yml`) を用意しています。公開するには以下を実施してください。

1. リポジトリ設定で **Settings > Pages** を開きます。
2. "Build and deployment" の **Source** に "GitHub Actions" が選ばれていることを確認します。
3. `main` ブランチへ変更を push すると、自動的にビルド & デプロイが実行されます。
4. Actions タブで "Deploy static content to Pages" ワークフローが成功していることを確認します。
5. デプロイ完了後、`https://<ユーザー名>.github.io/<リポジトリ名>/` でページを閲覧できます。

> GitHub Pages を Actions ではなくブランチ公開で運用したい場合は、Source に "Deploy from a branch" を選択し、ブランチを `main`、フォルダを `/docs` に設定してください。

ワークフローは `docs/` の静的ファイル（`index.html`, `script.js`, `styles.css` など）をそのまま配信します。追加のビルド工程は不要です。`docs/.nojekyll` によって GitHub Pages の Jekyll 処理を無効化し、静的アセットがそのまま公開されます。

## 構成

- `docs/index.html` – UI とアプリの骨組み
- `docs/styles.css` – レイアウトやアニメーションなどのスタイル
- `docs/script.js` – カードデータ・学習状況の保存・フラッシュカードとクイズの制御ロジック
- `docs/.nojekyll` – GitHub Pages で Jekyll 処理を無効化

## 免責

ローカルストレージへ学習状況を保存します。共有端末で利用する場合はブラウザのローカルストレージをクリアするなど適切に管理してください。
