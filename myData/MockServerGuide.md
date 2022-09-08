# モックサーバーガイド

##  [公式サイト](https://mock-server.com/)

##  UseCase

###  MSモック

####  利用シナリオ
1.  ローカル環境
  * 依存するmsのモック
2.  IT環境
  * 利用できないMSのモック：連携基盤
  * 利用したくないMSのモック：OTP

####  よく使われる設定パターン

1.  クリア

[ガイド](https://mock-server.com/mock_server/clearing_and_resetting.html)

```
  curl --location --request PUT 'http://localhost:1080/mockserver/clear'
```

既存設定クリア。

ローカルのテストは、クリア→設定→テストリクエスト発行→検証という流れを推奨します。

2.  一般的な設定（リクエストパスのマッチング）

例１：
```
curl --location --request PUT 'http://localhost:1080/mockserver/expectation' \
--header 'Content-Type: application/json' \
--data-raw '{
	"httpRequest": {
		"path": "/userauth/v1.1.0/otp/request"
	},
	"httpResponse": {
	  "body": {
          "seqNo": "2"
	  },
	  "statusCode": 200
}
}
'
```

例２：
```
curl --location --request PUT 'http://localhost:1080/mockserver/expectation' \
--header 'Content-Type: application/json' \
--data-raw '{
	"httpRequest": {
		"path": "/userauth/v1.1.0/otp/confirmation"
	},
	"httpResponse": {
	  "body": {
          "authenticationResult": true
	  },
	  "statusCode": 200
}
}
'
```

3.  条件マッチング設定
例：

パスが「/JavaWebService/TougoukokyakuNayoseKouzaShoukaiService」かつリクエストボディがxpathの条件にみたす場合の応答設定
```
curl --location --request PUT 'http://localhost:1080/mockserver/expectation' \
--header 'Content-Type: application/json' \
--data-raw '{
    "httpRequest" : {
      "path": "/JavaWebService/TougoukokyakuNayoseKouzaShoukaiService",
      "body": {
        "type" : "XPATH",
        "xpath" : "//torihikiKouzatenban[text()='\''123'\'']"
      }
    },
    "httpResponse" : {
      "headers" : {
	      "Content-Type" : [ "text/xml;charset=utf-8" ]
	    },
      "body": "<result>ok</result>",
      "statusCode": 200
    }
  }'
```

3.  一定時間待ってから応答（タイムアウトテスト）

例：2秒待ってから応答
```
curl --location --request PUT 'http://localhost:1080/mockserver/expectation' \
--header 'Content-Type: application/json' \
--data-raw '{
	"httpRequest": {
		"path": "/userauth/v1.1.0/otp/request"
	},
	"httpResponse": {
        "body": {
            "seqNo": "2"
        },
        "delay": {
            "timeUnit": "SECONDS",
            "value": 2
        },
        "statusCode": 200
}
}
'
```

4.  回数指定

対象パスが一回だけ応答する
```
curl --location --request PUT 'http://localhost:1080/mockserver/expectation' \
--header 'Content-Type: application/json' \
--data-raw '{
	"httpRequest": {
		"path": "/userauth/v1.1.0/otp/request"
	},
	"httpResponse": {
        "body": {
            "seqNo": "1"
        },
        "statusCode": 200
    },
    "times" : {
        "remainingTimes" : 1,
        "unlimited" : false
    },
    "timeToLive" : {
        "unlimited" : true
    },

}

'
```

１１４の利用パターン：５０３リトライテスト

5.  [設定ガイド](https://mock-server.com/mock_server/creating_expectations.html)


###  リクエスト検証

####  利用シナリオ
1.  実サービス接続前の確認
2.  ローカルテスト

####  利用方法

1.  [モックサーバーDashboard](http://localhost:1080/mockserver/dashboard)

2.  RestAPI

```
curl -v -X PUT "http://localhost:1080/mockserver/retrieve?type=REQUESTS"
```

3.  コンテナログ

```
docker logs -f mockserver
```

### プロクシ

####  利用シナリオ
1.  やりとりデータの記録
2.  IBMネット=>クラウドのプロクシ

[起動ガイド](https://mock-server.com/where/docker.html)
