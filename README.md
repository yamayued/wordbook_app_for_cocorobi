# CoCoRoBi Wordbook

CoCoRoBi 社内ルールや AI 活用のポイントを学ぶための単語帳アプリです。覚えた内容をフラッシュカードやクイズで復習できます。静的ファイルのみで構成されているので、ローカルでも GitHub Pages でもそのまま利用できます。

## ローカルでの確認方法

```bash
python3 -m http.server 8000
```

ブラウザで `http://localhost:8000` にアクセスすると画面を確認できます。

## GitHub Pages で公開する

このリポジトリには、`main` ブランチへの push をトリガーに GitHub Pages へ自動デプロイするワークフロー (`.github/workflows/deploy.yml`) を追加しています。公開するには以下を実施してください。

1. リポジトリ設定で **Settings > Pages** を開きます。
2. "Build and deployment" の **Source** に "GitHub Actions" が選ばれていることを確認します。
3. `main` ブランチへ変更を push すると、自動的にビルド & デプロイが実行されます。
4. デプロイ完了後、`https://<ユーザー名>.github.io/<リポジトリ名>/` でページを閲覧できます。

> ワークフローはリポジトリ直下の静的ファイル（`index.html`, `script.js`, `styles.css` など）をそのまま配信します。追加のビルド工程は不要です。

## 構成

- `index.html` – UI とアプリの骨組み
- `styles.css` – レイアウトやアニメーションなどのスタイル
- `script.js` – カードデータ・学習状況の保存・フラッシュカードとクイズの制御ロジック

## 免責

ローカルストレージへ学習状況を保存します。共有端末で利用する場合はブラウザのローカルストレージをクリアするなど適切に管理してください。
