# ローカル環境設定ガイド

##  説明

ba-hostは本番モードとutシミュレータモード二つ形あるので、開発環境の切り替え方法を説明します。

##  前提

[開発環境構築](./DevEnvSetting.md)にしたがって設定済み

##  eclispeでmaven profile設定方法

![select_profile](./image/select_profile.png)

##  デフォルト設定

* ワークスペースへ初回で導入する場合、以下のようになります、prodチェックしない場合も問題ないです。

![default_profile](./image/default_profile.png)

##  utシミュレーターモード設定

* prod無効化にする

![deactive_prod](./image/deactive_prod.png)

* sim有効化にする

![active_sim](./image/active_sim.png)

* OKクリック

* UTシミューレーターワークフォルダ用意

1. [mb_bankingapp](./mb_bankingapp.zip)をダウンロードし、解凍します。
2. 「/Users/wuhuidong/Downloads」へ解凍するを例とする
3.  以下のファイルを開いて、「<ローカル保管場所>」を「/Users/wuhuidong/Downloads/mb_bankingapp」へ変換する。windowsの場合、/を\へも変換してください。
    - log4j.properties
    - mb.properties
    - MBCConvTable.properties

* server.envに以下の環境変数設定
```
MBI_ROOT=/Users/wuhuidong/Downloads/mb_bankingapp
```


##  本番モード設定

* sim無効化にする
* prod有効化にする
* OKクリック
