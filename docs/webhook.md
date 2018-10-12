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

TheHive 3.11.1 において、Webhook を登録するには設定ファイル (/etc/thehive/application.conf) の書き換えが必要です。

Webhook の設定のサンプルは次のテスト用サンプルに含まれています。

## Webhook テスト用のサンプル

TheHiveから呼ばれる Webhook リクエストの内容がどのようになっているか確認するためのサンプルを用意しています。

[サンプルコード](./samples) のページ内の「基本的なサンプルコード」を参照してください。

## Webhook に対応するイベント

公式のドキュメントには対応状況の記載がありませんが、
基本的なデータであるケース (Cases)、タスク (Tasks)、観測データ (Observables) の登録、更新から始まり、
ユーザ (Users) の登録、更新に至るまで、非常に多くのオブジェクトの変更に対応しているようです。

例えば観測データ (Observables) のアナライザー実行 (Run analyzers) が完了した瞬間に、
その結果 (Report) の内容に応じて別のアナライザーを API 呼び出しによって起動する、といった制御を行うことも可能です。
