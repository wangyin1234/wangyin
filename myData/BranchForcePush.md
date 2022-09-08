# ブランチ強制更新

##  注意

* 管理者権限が必要
* 強制更新の場合、対象になるブランチの履歴が完全に上書きするので、十分確認した上で実施してください。

##  作業手順(githubで更新)

### ブランチ保護解除

1.  githubの対象リポジトリに入って
2.  「Settings」タブをクリックする
3.  左メニューの「Branch」をクリックする
4.  上書きしたいブランチが「Branch protection rules」に存在している場合、Editで Branch name pattern を別名に変更する
5.  Save Changesボタン押す
6.  masterを更新したい場合、ステップ１から３実施して、Default branchをmaster以外に更新してください。

### 対象ブランチ削除

1.  githubの対象リポジトリに入って
2.  「branches」リンクをクリック
3.  対象ブランチを削除する

### 対象ブランチ作成する

通常ブランチ作成と同じ方法でベースブランチから新規作成する

### ブランチ保護追加
1.  githubの対象リポジトリに入って
2.  「Settings」タブをクリックする
3.  左メニューの「Branch」をクリックする
4.  上書きしたいブランチが「Branch protection rules」に存在している場合、Editで Branch name pattern を保護したい名前に変更する
5.  Save Changesボタン押す
6.  masterを更新したい場合、ステップ１から３実施して、Default branchをmasterに更新してください。

##  gitロールバック作業手順

間違ったpushまたはprのマージでいらないcommitが入ってしまう場合、当該手順に従ってロールバックしてください。

例：最新の二つコミットが間違ったので、3番目の状態にロールバックしたい場合

![sample1](./image/sample1.png)

1.  ローカル最新化
```
git checkout 対象ブランチ
git pull
```

2.  履歴確認

```
git log -3
```

3番目へロールバックしたいですので、最新三つコミット表示する。パラメータは必要に応じて変更してください。

以下のような出力が出る
```
commit 5cf92e1a372afef2408a28e089fd5bda526f32b2 (HEAD -> master, origin/master, origin/HEAD)
Author: wuhd <wuhd@cn.ibm.com>
Date:   Sun Mar 14 19:16:00 2021 +0800

    間違ったcommit2

commit f5569534086582235791ab8a895e396b6fddee78
Author: wuhd <wuhd@cn.ibm.com>
Date:   Sun Mar 14 19:14:37 2021 +0800

    間違ったcommit1

commit 26dcf01110eace313167b9c9feef115006b9efa1
Author: wuhd <wuhd@cn.ibm.com>
Date:   Sun Mar 14 18:48:57 2021 +0800

    add force push
(END)

```

26dcf01110eace313167b9c9feef115006b9efa1 へロールバックしたいですので、当該コミットidをコピーする

2.  ローカルでロールバック
```
git reset --hard コミットID
```

コミットIDはステップ１でコピーしたコミットIDを使ってください。

3.  ロールバック後の状態確認
```
git log -2
```

```
commit 26dcf01110eace313167b9c9feef115006b9efa1 (HEAD -> master)
Author: wuhd <wuhd@cn.ibm.com>
Date:   Sun Mar 14 18:48:57 2021 +0800

    add force push

commit ce0542f345942c33391edb01481b38f461728f30
Author: wuhd <wuhd@cn.ibm.com>
Date:   Tue Feb 2 10:23:04 2021 +0800

    edit
```

最新コミットIDがあっていることを確認する

4.  リモートも更新する
```
git push --force
```

強制更新なので、保護されたブランチはできません。「作業手順(githubで更新)」の「ブランチ保護解除」に従って保護解除してから上記コマンドを実行してください。更新後保護の回復を忘れないようにご注意ください。

5.  github上確認