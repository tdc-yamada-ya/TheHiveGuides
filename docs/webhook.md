# TheHive の Webhook によるデータ更新に連動した処理の実行

このガイドは TheHive の [Webhooks](https://github.com/TheHive-Project/TheHiveDocs/blob/master/admin/webhooks.md) を元に記述しています。

TheHive はデータが更新された時に、あらかじめ設定された Webhook に対して変更情報を HTTP POST する機能が備わっています。

## Webhook リクエストを受け付ける Web アプリケーションの実装

TheHive からの Webhook リクエストを受け付ける Web アプリケーションを実装する必要があります。

Web アプリケーションは任意の URL で HTTP POST を受け付けて何らかの処理を行うことができさえすればよいため、
開発に使用するプログラミング言語やフレームワークに制限はありません。

Webhook リクエストに対するレスポンスは、即座に `200 OK` を返すように実装してください。

Webhook 用 Web アプリケーションの実装は次のテスト用サンプルに含まれています。 

## Webhook の設定

TheHive 3.11.1 においては、Webhook を設定するには設定ファイル (/etc/thehive/application.conf) の書き換えが必要です。

Webhook の設定のサンプルは次のテスト用サンプルに含まれています。

## Webhook テスト用のサンプル

TheHiveから呼ばれる Webhook リクエストの内容がどのようになっているか確認するための
[サンプル](https://github.com/tdc-yamada-ya/TheHiveGuides/tree/master/samples/docker) を用意しています。

サンプルは Docker Compose 用に作られています。
webhook サービスは TheHive からの Webhook リクエストを待ちうけ、リクエストボディをコンソールログに出力するだけの、
単純な Node.js アプリケーションです。

[インストールガイド](./install.md) に記載した前提条件の仮想環境を新たに用意し、
Docker および Docker Compose のインストール、Elasticsearch 用の設定が完了したら、
以下の手順を実行してサンプルを実行してください。

```bash
git clone https://github.com/tdc-yamada-ya/TheHiveGuides.git
cd samples/docker
sudo docker-compose up -d cortex webhook
```

インストールガイドにあるとおり、Cortex で API キーを生成して docker-compose.yml に設定します。
続けて TheHive を起動します。

```bash
sudo docker-compose up -d thehive
```

TheHive の起動、各種設定が完了したら試しに任意の内容のケースを登録した後、以下のコマンドを実行して、
webhook サービスのログを確認してください。

```bash
sudo docker-compose logs -f webhook
```

作成されたケースの内容がログに出力されていれば Webhook による連携は成功です。

## Webhook に対応するイベント

公式のドキュメントには記載がありませんが、
基本的なデータであるケース (Cases)、タスク (Tasks)、観測データ (Observables) の登録、更新から始まり、
ユーザの登録、更新に至る非常に多くのオブジェクトの変更に対応しているようです。

例えば観測データ (Observable) のアナライザー実行 (Run analyzers) が完了した瞬間に、
その結果 (Report) の内容に応じて別のアナライザーを API 呼び出しによって起動する、といった制御を行うことも可能です。
