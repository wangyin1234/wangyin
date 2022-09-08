# ローカル環境設定ガイド

##  前提条件
* 以下のものがインストールされたこと
  * Eclipse
  * Docker
  * docker-compose
  * node.js
  * git
* IBMネットワークに接続可能
  * IBMネット
  * Cisco接続可能
* MotionPro接続可能
* hostsに以下のエントリが追加済み
```
10.192.125.83 nexus3-dev01.chance.co.jp
```

##  目的
* 開発対象のms以外に依存しない環境を構築する
  * 開発対象のmsはeclipseで稼働する
  * 対象ms以外のサービスがコンテナで稼働する
  * コールするMSが一つのモックサーバーにてモックする


##  設定ガイド

### docker設定(Windows WSLのみ必要)
1.  以下の内容で「/etc/docker/daemon.json」を作成します。
```JSON
{
  "experimental": false,
  "insecure-registries": [
    "registry.cn.ibm.com:443"
  ],
  "debug": true
}
```

3.  確認

IBMネットワークに接続で、以下のコマンドを実行して、正常終了したことを確認
```
docker pull registry.cn.ibm.com/utdb
```


####  Editor設定

- ソースのインデントはtabを利用する。
- tabサイズは４(eclipseデフォルト)に設定する。
- tabをスペースに変換する

#####  設定方法
- eclipse設定

![eclipse_editor_tab_setting](./image/eclipse_editor_tab_setting.png)

- atom設定

![atom_editor_tab_setting1](./image/atom_editor_tab_setting1.png)

![atom_editor_tab_setting2](./image/atom_editor_tab_setting2.png)

### Eclips設定(初回のみ)

####  WASインストール
![was1](./image/was1.png)

![was2](./image/was2.png)

![was3](./image/was3.png)

![was4](./image/was4.png)

![was1](./image/was1.png)

![was5](./image/was5.png)

[wlp](https://ibm.ent.box.com/file/729276076018)をダウンロードして、解凍します  

![was6](./image/was6.png)

![was7](./image/was7.png)

![was8](./image/was8.png)

![was9](./image/was9.png)


####  Maven設定
1.  Eclipseを開く
2.  メニュー => Preference
3.  以下図のところをクリクで、[maven設定ファイル](./settings.xml)の内容を入れて、保存してください。
![maven](./image/maven-setting.png)

### ソース取得(bfoを例で説明)

####  個人開発ブランチ作成(BFOを例として)

1.  [BFO](https://github.ibm.com/digital-service-chance-114bank/114bank-api-digitalapp-bfo)開く
2.  個人開発ブランチ作成(以下の例はrelease-dev01からdev-whdを作成する)
![branch](./image/branch.png)
3.  ローカルへクローンする
```SHELL
git clone -b dev-whd git@github.ibm.com:digital-service-chance-114bank/114bank-api-digitalapp-bfo.git
```
注：dev-whdを自分のブランチ名へ切り替えてください。  

4.  共通ファイル取得
```SHELL
git clone git@github.ibm.com:digital-service-chance-114bank/114bank-api-common-files.git
```
※基本的はmasterブランチを利用するが、必要に応じて、ブランチを切り替えて取ってください。

5.  共通ファイルをMSへコピーする
* 設定ファイル

114bank-api-common-files/config配下のファイルを114bank-api-digitalapp-bfo/APIRoot/war/src/main/webapp/aif/configへコピーする  
* CIS共通

114bank-api-common-files/rule/transaction配下のファイルを114bank-api-digitalapp-bfo/APIRoot/war/src/main/webapp/aif/rule/transactionへコピーする  

####  ワークスペースへ導入
1.  MotionPro接続で、以下の手順にしたがって導入する
![import1](./image/import1.png)

![import2](./image/import2.png)

![import3](./image/import3.png)

導入して、Elclipsがビルド行います。完了しましたら、エラーないことを確認する

2.  他のMSを開発したい場合、以下の手順でワークスペースから削除して、step1で開発対象MSを導入する
![delete1](./image/delete1.png)

![delete2](./image/delete1.png)

####  個人開発ブランチの最新化(release-dev01を例にします)
```SHELL
# 初回の場合
git checkout -b release-dev01 origin/release-dev01
# release-dev01すでにある場合
git checkout release-dev01
# release-dev01最新化
git pull
# 個人ブランチ最新化
git checkout dev-whd
git merge release-dev01
# マージメッセージがあれば、Escをクリックで、:wq入れて、Enterを押します。
# Conflictあれば、コンパイルエラーになりますので、ソースを確認する上で対応してください
```

### ローカル稼働環境構築
#### ローカルデータベース構築
* 前提：IBMのCiscoが繋がっていること   

MAC
```SHELL
docker run -itd --name chancedb \
  -e TZ=Asia/Shanghai \
  --restart=always \
  --privileged=true \
  -p 50000:50000 \
  -e LICENSE=accept \
  -e DB2INST1_PASSWORD=123456 registry.cn.ibm.com/utdb
```

Windows
```SHELL
docker run -itd --name chancedb ^
  -e TZ=Asia/Shanghai ^
  --restart=always ^
  --privileged=true ^
  -p 50000:50000 ^
  -e LICENSE=accept ^
  -e DB2INST1_PASSWORD=123456 registry.cn.ibm.com/utdb
```

完全に起動するまで５分間ぐらいかかります。

#### モックサーバー起動
```SHELL
docker run -d --restart=always --name mockserver -p 1080:1080 -p 10322:1080 mockserver/mockserver:mockserver-5.10.0
```

#### 確認
```
docker ps
```

以下のように三つコンテナが起動指されたらOK
```
CONTAINER ID        IMAGE                                        COMMAND                  CREATED             STATUS              PORTS                                                          NAMES
bb8580503753        mockserver/mockserver:mockserver-5.10.0      "/opt/mockserver/run…"   2 weeks ago         Up 7 days           0.0.0.0:1080->1080/tcp, 0.0.0.0:10322->1080/tcp                mockserver
6b4bfe4a1b16        57d8f6caf1cb                                 "/var/db2_setup/lib/…"   7 weeks ago         Up 7 days           22/tcp, 55000/tcp, 60006-60007/tcp, 0.0.0.0:50000->50000/tcp   chancedb
```

### データベース管理ツール(必須ではない)

####  インストール

* [Windows用](https://na.artifactory.swg-devops.com/artifactory/g2o-asset-repo/DBeaver%20-%20LIUA/6.1/dbeaver-ce-6.1.3-x86_64-setup.exe)
* [MAC用](https://na.artifactory.swg-devops.com/artifactory/g2o-asset-repo/DBeaver%20-%20LIUA/6.1/dbeaver-ce-6.1.3-installer.pkg)


####  設定
dbeaver開いてから、以下の手順で設定する

![dbeaver1](./image/dbeaver1.png)

![dbeaver2](./image/dbeaver2.png)

* デジタルアプリの場合、DatabaseにCHANCEDB
* バンキングアプリの場合、DatabaseにBKAPPDB

![dbeaver3](./image/dbeaver3.png)

[db2jcc](https://ibm.ent.box.com/file/729356485003)ダウンロードします

![dbeaver4](./image/dbeaver4.png)

![dbeaver5](./image/dbeaver5.png)

![dbeaver6](./image/dbeaver6.png)

### Eclipseで稼働する

1.  JDBCダウンロード
* [db2jcc4.jar](https://ibm.ent.box.com/file/729362757342)
* [db2jcc_license_cu.jar](https://ibm.ent.box.com/file/729363108642)
をダウンロードします。

2.  was設定ファイル

![wassetting1](./image/wassetting1.png)

上記二つのファイルをそれぞれ開いて、以下の内容で上書きします

server.xml(コメントの部分は修正必要ですので、ご注意ください)
```xml
<server description="new server">
    <featureManager>
        <feature>javaee-7.0</feature>    
        <feature>cdi-1.2</feature>
        <feature>concurrent-1.0</feature>
        <feature>jaxrs-2.0</feature>
        <feature>jndi-1.0</feature>
        <feature>jsonp-1.0</feature>
        <feature>localConnector-1.0</feature>
        <feature>javaMail-1.5</feature>
        <feature>jsf-2.2</feature>
    </featureManager>

    <keyStore password="{xor}Lz4sLCgwLTs="/>

    <httpEndpoint host="*" httpPort="9080" httpsPort="9443" id="defaultHttpEndpoint"/>

    <applicationManager autoExpand="true"/>
		<library id="DB2JCC4Lib">
      <!-- dirの内容はステップ１でダウンロードした場所へ変換してください。 -->
	    <fileset dir="/Users/wuhuidong/Downloads/jar" includes="db2jcc4.jar db2jcc_license_cu.jar"/>
	  </library>

		<dataSource id="defaultDS" jndiName="jdbc/DB2CLOUD">
			<jdbcDriver libraryRef="DB2JCC4Lib"/>
			<properties.db2.jcc databaseName="${env.DB2_DBNAME}" password="${env.DB2_DBPASS}" portNumber="${env.DB2_DBPORT}" serverName="${env.DB2_DBHOST}" user="${env.DB2_DBUSER}"/>
		</dataSource>

    <applicationMonitor updateTrigger="mbean"/>
</server>
```


server.env(コメントの部分は修正必要ですので、ご注意ください)
```
keystore_password=WP6HENWb7UxwPhf0C0fzdIS
WLP_SKIP_MAXPERMSIZE=true
DIGITALAPP_APP=localhost:1080
IDG=http://localhost:1080
DB2_DBNAME=CHANCEDB
DB2_DBPASS=123456
DB2_DBPORT=50000
DB2_DBHOST=localhost
DB2_DBUSER=db2inst1
ABA_USER_AUTH=localhost:1080
ABA_COMMON_UTILS=localhost:1080
ABA_TWILIOACCESS=localhost:1080
ABA_RECEPTION=localhost:1080
BA_HOST=localhost:1080
DEV=Y
# CONFIG_ROOTは「114bank-api-digitalapp-bfo/APIRoot/war/src/main/webapp/aif」の絶対パスを指定する
CONFIG_ROOT=/Users/wuhuidong/Documents/DigitalAPPWorkspace/114bank-api-digitalapp-bfo/APIRoot/war/src/main/webapp/aif
```

3.  MS起動

![startaif1](./image/startaif1.png)

![startaif2](./image/startaif2.png)

![startaif3](./image/startaif3.png)

![startaif4](./image/startaif4.png)

###  静的チェック

#### ローカルチェック

* Eclipseのプラグイン「SonarLint」でチェックする。
* インストール
  EclipseのメニューのHelp => Eclispe Marketplace... => SonarLintで検索 => 以下のプラグインをインストールする

![](./sonarlint.png)

* チェック

  Eclipseでフォルダまだはソースを選択して、右クリックでSonarLint => Analyzeでチェックする

#### サーバーへ結果アップ

> SonarCubeサーバーはibmネットにあるPCで構築しているので、実施する場合、ibmネットに接続かつ MotionPro接続前提。

pomがあるフォルダで以下のコマンド実施
```
mvn clean verify sonar:sonar
```

またはdockerで実施

```
docker run --rm -v $HOME/.m2:/root/.m2 \
  -e nexusurl=http://nexus3-dev01.chance.co.jp \
  --add-host=nexus3-dev01.chance.co.jp:10.192.125.83 \
  -v $(pwd):/usr/src/mymaven \
  -w /usr/src/mymaven maven:3.3.9-jdk-8-alpine \
  mvn clean verify sonar:sonar
```


[mavenダンロード](http://maven.apache.org/install.html)

[maven設定](http://maven.apache.org/install.html)

[日本語版 windows mavenインストール](https://qiita.com/Junichi_M_/items/20daee936cd0c03c3115)

[結果確認](http://9.197.12.27:9000/projects?sort=-analysis_date)
