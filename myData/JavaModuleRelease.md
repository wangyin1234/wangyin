# Javaモジュールリリース手順

##  前提条件
1.  mavenがインストトールしている

##  maven設定ファイル配置
*  [settings.xml](./settings.xml)をmavenフォルダへ格納する(MACの場合は~/.m2)
* hostsファイル以下のエントリ追加
```
10.192.125.83 nexus3-dev01.chance.co.jp
```


##  モジュール取得

### aifモジュール

1.  aifリリースイメージ(isoイメージ)入手して、解凍する
2.  ./Modules/workspace/lib配下の以下のjarファイルをワークフォルダへ一旦コピーする
  * com.ibm.cis.aif.interceptor.jar
  * com.ibm.cis.aif.jar
3.  com.ibm.cis.aif.jarをコピーして、以下のようにリネームする
  * com.ibm.cis.aif.jar -> com.ibm.cis.aif.zip
4.  zipファイルを解凍し、./META-INF/MANIFEST.MFでバージョンを確認する
5.  確認できたバージョン番号をjarのファイル名に追加する、例えば、1.1.13FIX5の場合
  * com.ibm.cis.aif.interceptor.jar -> com.ibm.cis.aif.interceptor-1.1.13FIX5.jar
  * com.ibm.cis.aif.jar -> com.ibm.cis.aif-1.1.13FIX5.jar
6.  Nexusへ登録する

### JDBCモジュール

1.  [ダウンロードサイト](https://www.ibm.com/support/pages/db2-jdbc-driver-versions-and-downloads)から必要なバージョンのモジュールをダウンロードする
2.  確認できたバージョン番号をjarのファイル名に追加する、例えば、4.26.14の場合
  * db2jcc4.jar -> db2jcc4-4.26.14.jar
  * db2jcc_license_cu.jar -> db2jcc_license_cu-4.26.14.jar
3.  Nexusへ登録する



## デプロイコマンド
```
mvn deploy:deploy-file \
  -DgroupId=<groupId> -DartifactId=<artifactId> \
  -Dversion=<version> -Dpackaging=jar \
  -Dfile=<jarファイル保管場所> \
  -Durl=http://nexus3-dev01.chance.co.jp/repository/maven-releases/ \
  -DrepositoryId=DSPRepoepository
```

実行例：

```
mvn deploy:deploy-file \
  -DgroupId=AIF -DartifactId=com.ibm.cis.aif \
  -Dversion=1.1.13FIX5 -Dpackaging=jar \
  -Dfile=/Users/wuhuidong/Downloads/jar/com.ibm.cis.aif-1.1.13FIX5.jar \
  -Durl=http://nexus3-dev01.chance.co.jp/repository/maven-releases/ \
  -DrepositoryId=DSPRepoepository
```
