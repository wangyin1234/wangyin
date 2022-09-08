# 複数commitマージ手順

##  前提

強制pushが必要ですので、個人ブランチ(保護ないブランチ)で実施してからPR出す運用にしてください。

##  手順

### 既存状況確認

最近４個コミットを表示する
```
git log -4
```

出力結果
```
commit d1810a287b9c1124062614c2fa47360cc2671f4e (HEAD -> test_whd, origin/test_whd)
Author: wuhd <wuhd@cn.ibm.com>
Date:   Tue Jun 29 13:50:19 2021 +0800

    commit3

commit 9ece5ca5fa7a809f3f4763cb4538367b6fdac8be
Author: wuhd <wuhd@cn.ibm.com>
Date:   Tue Jun 29 13:49:57 2021 +0800

    commit2

commit 635cb2566a2894a48ea49073dabda86a4285d5aa
Author: wuhd <wuhd@cn.ibm.com>
Date:   Tue Jun 29 13:49:41 2021 +0800

    commit1

commit 9e855ad3e134e686be6260fb91b8c8b23489f0b3 (origin/master, origin/HEAD, master)
Author: SUENOBU ITOH <E02631@jp.ibm.com>
Date:   Wed Nov 25 17:27:23 2020 +0900

    Initial commit
```

* commit1変更点: commit1という行追加
* commit2変更点: commit2という行追加
* commit3変更点: commit2をcommit3へ変更

### commit1~3をマージする

git rebase -i マージしたいcommitidの一個前のcommitid

```
git rebase -i 9e855ad3e134e686be6260fb91b8c8b23489f0b3
```

上記コマンドを実行したら、以下が表示されます。

```
pick 635cb25 commit1
pick 9ece5ca commit2
pick d1810a2 commit3

# Rebase 9e855ad..d1810a2 onto 9e855ad (3 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
....以下は省略
```

commit1にマージする為、二行目、三行目のpickをsquashへ変更し:wqで保管する

```
pick 635cb25 commit1
squash 9ece5ca commit2
squash d1810a2 commit3

# Rebase 9e855ad..d1810a2 onto 9e855ad (3 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
....以下は省略
```

commitメッセージ変更画面が表示されます。変更したい場合は変更してください。:wqで再度保管する

pushする
```
git push --force
```

[github上の差分イメージ](https://github.ibm.com/chancenextams/sample-for-try/commit/f32cb996b3dce68dcbecafab0573882460103ad8)