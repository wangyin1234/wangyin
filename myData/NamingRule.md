# ネーミングルール

## プログラム系

* groupId: jp.co.chance.114bank.digitalapp
* artifactId:
  * API共通
    * api-common
  * BFF
    * digitalapp-bff
  * 銀行受付
    * digitalapp-bfo
  * デジタル手続
    * digitalapp-app
  * BA（MBA）
    * ba-host
  * BA（iCIF/mail）
    * ba-distributed
  * バッチ共通
    * batch-common
  * バッチ（住所変更登録）
    * bat-address-change
  * バッチ（再発行登録）
    * bat-reissue
  * バッチ（住所変更）
    * bat-address-change-api
  * バッチ（受付メール）
    * bat-receipt-mail
  * バッチ（結果メール）
    * bat-result-mail
  * バッチ店舗マスタ
    * bat-master-branch
  * バッチカレンダー営業日
    * bat-master-calendar
  * バッチ住所コードバッチ
    * bat-master-address
  * DBメンテ
    * bat-mente-XXX
* package(ルート名、機能名はそれ以下につけていく)
  * API共通
    * jp.co.chance.digitalapp.api.common
  * BFF
    * jp.co.chance.digitalapp.bff
  * 銀行受付
    * jp.co.chance.digitalapp.bfo
  * デジタル手続
    * jp.co.chance.digitalapp.app
  * BA（MBA）
    * jp.co.chance.digitalapp.ba.host
  * BA（iCIF/mail）
    * jp.co.chance.digitalapp.ba.distributed.icif
    * jp.co.chance.digitalapp.ba.distributed.mail
  * バッチ共通
    * jp.co.chance.digitalapp.bat.common
  * バッチ（住所変更登録）
    * jp.co.chance.digitalapp.bat.common.bat.addresschange
  * バッチ（再発行登録）
    * jp.co.chance.digitalapp.bat.common.bat.reissue
  * バッチ（住所変更）
    * jp.co.chance.digitalapp.bat.common.bat.addresschangeapi
  * バッチ（受付メール）
    * jp.co.chance.digitalapp.bat.common.bat.receiptmail
  * バッチ（結果メール）
    * jp.co.chance.digitalapp.bat.common.bat.resultmail
  * バッチ店舗マスタ
    * jp.co.chance.digitalapp.bat.common.bat.masterbranch
  * バッチカレンダー営業日
    * jp.co.chance.digitalapp.bat.common.bat.mastercalendar
  * バッチ住所コードバッチ
    * jp.co.chance.digitalapp.bat.common.bat.masteraddress
  * DBメンテ
    * jp.co.chance.digitalapp.bat.common.bat.menteXXX

## CISルールブック

対象  | ネーミングルール | 例
-|-|-
共通ブックExcelファイル名  | COMM_MS名_共通ブック | CIS_BFO_共通ブック.xlsx
共通ブックXMLファイル名  | COMM_MS名_COMM | CIS_BFO_COMM.xml
共通ブックユーザーテーブル銀行共通  | UTBL_BK_COMM | UTBL_BK_COMM
共通ブックユーザーテーブルMS共通  | UTBL_MS_COMM | UTBL_MS_COMM
取引ブックファイル名  | CIS_MS名_API和名 | CIS_BFO_ユーザー認証API.xlsx
出力ファイル名 | CIS_MS名_API英名 | CIS_BFO_USERAUTH.xml
マップ編集シート名 | EDIT_API英名_I/Ox_U/D | EDIT_USERAUTH_I/Ox_U
マップレイアウト定義シート名 | MAP_API英名_I/Ox_U/D | MAP_USERAUTH_O1_D

[CISRule例外一覧](./CISRuleNamingException.md)


## UTテスト
対象  | ネーミングルール | 例
-|-|-
テストスクリプト名 | MS名_API英名.postman_collection.json | BFO_USERAUTH.postman_collection.json
テストスデータ| MS名_API和名.xlsx | BFO_ユーザー認証API.xlsx
