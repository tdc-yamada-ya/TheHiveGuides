## Docker Compose による TheHive および Cortex のインストール

この説明は [Installation Guide](https://github.com/TheHive-Project/TheHiveDocs/blob/master/installation/install-guide.md#docker)
を元にしています。

TheHive は複数のサービスを連携させて動作することを前提としていますが、
Docker Composeを使うことで簡単にインストールできます。

前提条件として以下の仮想環境を用意してください。VirtualBox でも AWS でも Azure でも構いません。

* Ubuntu 16.04
* RAM 4GB 以上
* Disk 10GB 以上
* TCP 9000, TCP 9001 にアクセスできること

### Azure 仮想マシンを使用する場合の注意点

もし Azure を使用する場合はスワップが無効になっているため有効化します。
`sudo vim /etc/waagent.conf`  を実行して、以下の設定値に変更してください。

```
ResourceDisk.Format=y
ResourceDisk.EnableSwap=y
ResourceDisk.SwapSizeMB=4096
```

設定したら `sudo systemctl restart walinuxagent.service` で Linux エージェントを再起動します。

### Elasticsearch 用の設定

TheHive で使用する Elasticsearch のインストールに最低限必要な設定を行います。

仮想メモリの上限を変更します。
`sudo vim /etc/sysctl.conf` を実行して、以下の設定値を追加してください。

```
vm.max_map_count = 262144
```

### Docker のインストール

[Get Docker CE for Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/) を参考に Docker をインストールしてください。

[Install Docker Compose](https://docs.docker.com/compose/install/) を参考に Docker Compose をインストールしてください。
インストールする Docker Compose のバージョン番号が1.22.0以上であることに注意してください。
`chmod` で Docker Compose の実行権限を付与する手順を忘れないようにしてください。

次のコマンドを実行して、Docker が自動起動するように設定した上で、サービスを起動します。

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

### docker-compose.yml の準備

Ubuntu 上の適当な位置に以下の内容の docker-compose.yml を作成してください。

```yaml
version: "2"
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:5.6.0
    environment:
      - http.host=0.0.0.0
      - transport.host=0.0.0.0
      - xpack.security.enabled=false
      - cluster.name=hive
      - script.inline=true
      - thread_pool.index.queue_size=100000
      - thread_pool.search.queue_size=100000
      - thread_pool.bulk.queue_size=100000
    ulimits:
      nofile:
        soft: 65536
        hard: 65536
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data
    restart: always
  cortex:
    image: thehiveproject/cortex:latest
    depends_on:
      - elasticsearch
    ports:
      - "0.0.0.0:9001:9001"
    restart: always
  thehive:
    image: thehiveproject/thehive:latest
    depends_on:
      - elasticsearch
      - cortex
    ports:
      - "0.0.0.0:9000:9000"
    command: --cortex-port 9001 --cortex-key XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    restart: always
volumes:
  elasticsearch_data:
```

なお `--cortex-key XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` には Cortex で作成する API キーを後で設定します。

### Cortex を起動

一旦 Cortex のみを起動します。

```bash
sudo docker-compose up -d cortex
```

http://hostname:9001/ にアクセスして Cortex の Web 画面を表示してください。

Cortex の初期設定として `superadmin` ロールのユーザの登録を求められます。
ID、パスワードは任意で構わないのでユーザを登録してください。

続けて組織 (Organization) を作成してください。
こちらも名前 (Name)、概要 (Description) は任意で構いません。

作成した組織にてユーザ (User) を作成してください。
ユーザ名 (Login)、フルネーム (Full name) は任意で構いませんが、ロール (Roles) は `read,analyze,orgadmin` を選択してください。

ユーザの作成後、作成したユーザのパスワードを変更 (Edit password) してください。
さらに APIキー (API Key) をコピーしてください。
コピーした API キーを docker-compose.yml の `--cortex-key XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` の部分に割り当てます。

以降 Cortex 上で解析の実行や、アナライザーの設定等を行うことができますが、
その際は組織内のユーザでログインしてください。
`superadmin` ロールのユーザではそれらの操作を行うことができません。

### TheHive を起動

次に TheHive を起動します。

```bash
sudo docker-compose up -d thehive
```

http://hostname:9001/ にアクセスして TheHive の Web 画面を表示してください。

TheHive も同様に初期ユーザ登録を求められます。
ID、パスワードは任意で構わないのでユーザを登録してください。

作成したユーザで TheHive にログインした後、Web 画面の右上のアカウント名から、
About をクリックして、TheHive のステータスを表示してください。
Cortex の行が OK になっていれば TheHive と Cortex の連携が正常に行えています。

以上で Docker Compose によるインストールは完了です。
