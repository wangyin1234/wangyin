# ログの検証

##  目的

ログをelasticsearchへ出力し、apiで取得できるようにしておいて、ログを検証する場合、簡単にできます。

##  処理概要

### eclipse稼働の場合

aifのログ設定で、fluentd経由で内容をelasticsearchへ出力する

* log.properties
```
#,file追加
LOGGER.SYSTEM.WRITER=console,socket
#以下の行追加
LOGGER.SYSTEM.WRITER.socket.HOST=fluent_ip
LOGGER.SYSTEM.WRITER.socket.PORT=5170
LOGGER.SYSTEM.WRITER.socket.FORMATTER=com.ibm.cis.aif.log.SocketFormatter
LOGGER.SYSTEM.WRITER.socket.PROTOCOL=TCP
```

### コンテナ稼働の場合

dockerのログドライバをfluendへ指定するによって、ログ内容をelasticsearchへ出力する

* docker run例

```
docker run --log-driver=fluentd --rm centos echo "Hello Fluentd"
```

* docker-compose例

```
...省略...
services:
  testapp:
    image: testapp
    build:
      context: .
      dockerfile: Dockerfile_local
    container_name: testapp
    environment:
      - DIGITALAPP_APP=mock:1080
      - BA_HOST=mock:1080
      - ABA_USER_AUTH=mock:1080
      - ABA_COMMON_UTILS=mock:1080
      - ABA_RECEPTION=mock:1080
      - IDG=http://mock:1080
      - DB2_DBNAME=${dbname}
      - DB2_DBPASS=${dbpass}
      - DB2_DBPORT=${dbport}
      - DB2_DBHOST=${dbserver}
      - DB2_DBUSER=${dbuser}
      - HASH_SECRET=1234567890123456
      - DEV=Y
      - TZ=Asia/Tokyo
    logging:
      driver: fluentd
      options:
        fluentd-address: "fluentd_ip:24224"
...省略...
```

##  環境準備

### elasticsearch起動
```
docker run -d -p 9200:9200 -p 9300:9300 --name elasticsearch \
  -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.14.0
```

### kibana起動
```
docker run --name kibana -d \
  --link elasticsearch:elasticsearch \
  -p 5601:5601 -e "ELASTICSEARCH_HOSTS=http://elasticsearch:9200" \
  docker.elastic.co/kibana/kibana:7.14.0
```

### fluentd起動（コンテナ稼働の場合）

[イメージ作成](https://github.ibm.com/chancenextams/baseimages#fluentd%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8)

* 設定ファイル([demo.conf](./demo.conf))
```
<source>
  @type forward
  port 24224
  bind 0.0.0.0
</source>

<source>
  @type tcp
  tag tcp
  <parse>
    @type none
  </parse>
  port 5170
  bind 0.0.0.0
</source>

<match *>
  @type elasticsearch
  host elasticsearch
  port 9200
  index_name testlog
  <buffer tag,time>
    @type memory
    timekey 1s
    timekey_wait 1s
  </buffer>
</match>
```

* 起動コマンド
```
docker run --name fluentd -d -it -p 5170:5170 -p 24224:24224 --rm \
  --link elasticsearch:elasticsearch \
  -v $(pwd)/demo.conf:/fluentd/etc/demo.conf \
  -e FLUENTD_CONF=demo.conf 9.197.12.29:5000/fluentd
```



##  ログデータベースの操作(node.js)

[参考](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html)

### install
```
npm install @elastic/elasticsearch
```

### 検索例(docker稼働の場合)
```javascript
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://elasticsearch_ip:9200' });

(async () => {
  // データ検索
  const result = await client.search({
    index: 'testlog',
    size: 1000,
    body: {
      query: {
        match: { _index: 'testlog' }
      }
    }
  });
  console.log(result.body.hits.hits);
  // データ削除
  const result2 = await client.deleteByQuery({
    index: 'testlog',
    size: 1000,
    wait_for_completion: true,
      body: {
        query: {
          match: { _index: 'testlog' }
        }
      }
  });
})();
```
