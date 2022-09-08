# itaスマホアプリの利用方法


##  スマホがIBMネットに接続している場合

IBMネットにDSPへアクセスするproxyが立てていますので、そのまま利用できます。

* proxy通信概要図

![](./image/proxy-network.svg)

[proxy設定詳細](https://github.ibm.com/chancenextams/itaproxy)


##  自宅にいる場合

1. 前提条件
  * IBM PCがCISCO経由でIBMネットに接続できること
  * スマホがIBM PCと同じネットワーク(自宅ネットワーク)に接続していること

2. 概要

IBM PCをproxyとし、スマホの通信をサーバー（9.197.12.27)へ転送します。

3. IBM PCにproxyを立てる

```shell
docker run -d --name proxy --rm -it \
    --add-host=chancedsp.cn.ibm.com:9.197.12.27 \
    -p 8080:8080 \
    -p 127.0.0.1:8081:8081 mitmproxy/mitmproxy mitmweb --web-host 0.0.0.0
```

4. IBM PCのipアドレスを取得する

* 取得例：
自宅ネットワークのipは192で始まるので、以下のコマンドでIBM PCのipは192.168.28.204です。
```
✗ ifconfig | grep 192
	inet 192.168.28.204 netmask 0xffffff00 broadcast 192.168.28.255
```

5. スマホのhttp proxy設定

* 設定=>無線LAN

![mobile1](./image/mobile1.jpg)
![mobile2](./image/mobile2.jpg)

* ステップ3で取得したipを以下の設定する

![mobile3](./image/mobile3.jpg)

6. itaのアプリの利用

* itaのアプリがインストールすれば利用できます。
* DSPとの通信データは [proxy web](http://localhost:8081)　に見えます

7. 利用終わったら
* スマホの設定を回復
* proxy消します
```
docker stop proxy
```
