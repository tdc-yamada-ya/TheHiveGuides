# TLP について

TLP とは Traffic Light Protocol の略称です。
TLP について日本語で整理された良い情報源が見当たらないため、
[FIRSTの解説ページ](https://www.first.org/tlp/)を元に説明します。

TLP とは情報の共有を促進するために作成された仕様で、
簡単に言えば情報の公開可能な範囲を4色で分けるものです。
TheHiveにおいては、ケース (Case) を登録する際に必ず TLP を登録する必要があります。

TLP における4色は以下の通りです。

* レッド (RED) : 指定された受信者のみ

  会議に出席した人、情報を直接手渡しをした人など、特定の個人にのみ許可され、それ以上の公開を許可しません。

* アンバー (AMBER) : 組織内の限定的な範囲

  自組織あるいは顧客の中で「知る必要がある人」に対して公開を許可します。

* グリーン (GREEN) : コミュニティの範囲

  特定の広範なコミュニティに対して公開を許可します。

* ホワイト (WHITE) : 無制限
 
  公開範囲に制限はありません。