# サンプルコード

[このリポジトリ](https://github.com/tdc-yamada-ya/TheHiveGuides)
には TheHive および Cortex のインストールや、機能拡張の参考となるサンプルコードを登録しています。

## 基本的なサンプルコード

[基本的なサンプルコード](https://github.com/tdc-yamada-ya/TheHiveGuides/tree/master/samples/docker)
には以下の機能が含まれています。

* Docker Compose による TheHive, Cortex のインストール
* TheHive の WebHook の追加設定
* TheHive の WebHook のテスト用 Node.js アプリケーション (containers/webhook/app)
* TheHive の API のテスト用 Node.js アプリケーション (containers/client/app)

このサンプルコードを実行するには以下の手順を実行してください。

[インストールガイド](./install.md) に記載した前提条件の仮想環境を新たに用意し、
Docker および Docker Compose のインストール、Elasticsearch 用の設定が完了したら、
以下の手順を実行してサンプルを実行してください。

まずは Cortex サービスを単独で起動します。

```bash
git clone https://github.com/tdc-yamada-ya/TheHiveGuides.git
cd samples/docker
sudo docker-compose up -d cortex
```

インストールガイドにあるとおり、Cortex で API キーを生成して docker-compose.yml に設定します。
続けて TheHive を起動します。

```bash
sudo docker-compose up -d thehive
```

TheHive の起動後、各種設定が完了したら、作成した管理用ユーザの API キーを作成してください。
作成した API キーは docker-compose.yml の `THEHIVE_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` に登録してください。

### WebHook テスト用サンプルの動作確認

以下のコマンドを実行して WebHook テスト用のサービスを起動してください。
このサービスはシンプルな Node.js Web アプリケーションで、受け付けたリクエストをコンソールログに出力するだけのプログラムです。

```bash
sudo docker-compose up -d webhook
```

TheHive から任意の内容のケース (Cases) を登録した後、以下のコマンドを実行して、
webhook サービスのログを確認してください。

```bash
sudo docker-compose logs -f webhook
```

作成されたケースの内容がログに出力されていれば Webhook による連携テストは成功です。

### API テスト用サンプルの動作確認

以下のコマンドを実行して TheHive API テスト用アプリケーションを実行してください。

```bash
sudo docker-compose up client
```

実行後 TheHive にケース 1 件、アラート 1 件が登録されていれば API による連携テストは成功です。
