# リリース後のブランチ整理

##  説明

> 「手順はbfoのrelease-itb01からリリースする」を例としてコマンド提示しますので、実際作業する場合、実際のrepositoryとブランチへ置き換えて実行してください。

##  作業手順

### 対象リポジトリクローン(ローカルにない場合)

```
git clone git@github.ibm.com:digital-service-chance-114bank/114bank-api-digitalapp-bfo.git
```

### リポジトリ最新化

* ローカルに対象ブランチあるかを確認
```
git branch
```

* ない場合
```
git checkout -b release-itb01 origin/release-itb01
```

* ある場合
```
git checkout release-itb01
git pull
```

* 最新commitID確認
```
git log -2
```

一番上のcommitIDがあっているかを確認

### マスター反映
```
git checkout master
git pull
git merge release-itb01
git push
```

### リリース作成する

1.  最新ではないcommitidからリリース作成する場合、まず以下のコマンドでtag付けます。
```
git tag -a バージョン番号 -m リリースメモ コミットID
git push origin v1.0.0
```

2.  GitHubに対象リポジトリを開いて、以下のreleaseをクリック

![](./image/release.png)

3.  初回リリースは「Create a new release」、二回目から「Draft a new release」をクリックする

4.  以下の赤い枠に記入し、Publish releaseボタンを押します。

![](./image/release2.png)

### 開発ブラン整理

####  説明
現時点二つの開発環境が用意しています。それぞれ二つのブランチ(ita, itb)が用意されています。

1.  開発環境①

緊急対応用

* ita => ブランチ(release-init-ita)
* itb => ブランチ(release-itb)

2.  開発環境②

案件対応用

* ita => ブランチ(release-dev01)
* itb => ブランチ(release-itb01)

>本番リリース後、開発環境に対応するitbブランチからmasterへマージした後、もう一個の開発環境の二つのブランチへもマージする必要があります

####  手順

例：開発環境②から本番リリースの場合、masterへマージした後開発環境①へマージします。

* release-init-ita反映
```SHELL
# release-init-ita存在の場合
git checkout release-init-ita
# release-init-ita存在しない場合
git checkout release-init-ita -b origin/release-init-ita
git pull
git merge master
git push
```

* release-itb反映
```
git checkout release-itb
git pull
git merge master
git push
```

### チェックリスト確認

[ブランチ整理チェックリストガイド参照](https://github.ibm.com/chancenextams/TestSupport/)
