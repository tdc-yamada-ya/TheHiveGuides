# TheHive と Cortex ができること
## セキュリティインシデントのケース (Cases) を管理する

TheHive の主要機能はセキュリティインシデントのケース管理です。
セキュリティインシデントのケースとしては「パソコンがウィルスに感染したイベント」や「IDS/IPSが検知したアラート」などが挙げられます。

* ケースは Web 画面あるいはプログラム ([API](https://github.com/TheHive-Project/TheHiveDocs/blob/master/api/README.md)) で登録することができます
* ケースには以下の項目を登録することができます
    * タイトル (Title)
    * 日時 (Date)
    * 重要度 (Severity)
    * [TLP](./tlp)
    * タグ (Tags)
    * [PAP](./pap)
    * 概要 (Description)
    * タスク (Tasks)
* ケーステンプレートを作成することができ、以下の項目を登録することができます
    * タイトルの接頭辞 (Title prefix)
    * デフォルトの重要度 (Severity)
    * TLP
    * PAP
    * タグ (Tags)
    * 概要 (Description)
    * 初期登録されるタスク (Task)
    * メトリクス (Metrics)
    * カスタムフィールド (Custom fields)
* 2018-10-10 現在、ケース一覧テーブルにカスタムフィールドの列を表示したり、カスタムフィールドで検索することが[できません](https://github.com/TheHive-Project/TheHive/issues/377)

## アナリストが行うべきこと (Tasks) を定義し、作業のログ (Task logs) を残す

(執筆中)

## API で自動化する

TheHive および Cortex は REST API を提供しており、外部プログラムから様々なデータを登録することができます。

* [TheHive API](https://github.com/TheHive-Project/TheHiveDocs/blob/master/api/README.md)
* [Cortex API](https://github.com/TheHive-Project/CortexDocs/blob/master/api/api-guide.md)

両サービスともに API を使用するためには API キーが必要となります。
API キーはユーザ管理 (Users) の中で入手することができます。

**TheHive の API ドキュメントは 2018-10-10 現在不完全です。**
API ドキュメントに記載されていないものも実際には提供されています。

例えば 2018-10-10 時点ではケース (Case) の POST API に PAP フィールドを設定できるという記載はドキュメントにはありませんが、
実際には `pap` という JSON フィールドを指定することで登録することができます。
