# ローカルサーバー構築手順

##  前提

* RHEL 8

##  設定

### sshd

####  ssh機能起動＆サーバー起動時起動
```
systemctl start sshd
systemctl enable sshd
```

####  パスワードなしログイン設定

1.  自分のid_rsa.pubをサーバーへコピー

2.  authorized_keysへ追加
```
cat id_rsa.pub >> ~/.ssh/authorized_keys
```

3.  authorized_keys権限追加
```
chmod 600 ~/.ssh/authorized_keys 
```

### firewall

```
sudo firewall-cmd  --permanent --zone=public --add-service=http 
sudo firewall-cmd --zone=public --add-masquerade --permanent
sudo firewall-cmd --reload
```

### インストトールrepo設定

> 必要に応じて設定

[参考](https://mirrors.tuna.tsinghua.edu.cn/help/centos/)

##  ソフトインストール

### zsh

```
yum install zsh
```

### oh-my-zsh

```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

~/.zshrcを開いて、ZSH_THEMEをcleanへ変更

```
ZSH_THEME="clean"
```

### docker

* [参考](https://docs.docker.com/engine/install/centos/)

```
sudo yum install -y yum-utils
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install docker-ce docker-ce-cli containerd.io
sudo systemctl enable docker
sudo systemctl start docker
```

* 権限設定

```
sudo usermod -aG docker $USER
```

* ローカルregistry設定

/etc/docker/daemon.jsonに以下を追加

```JSON
...省略...
"insecure-registries": [
  "<server ip>:5000"
],
...省略...
```

### docker-registry
```
docker run -d \
  -p 5000:5000 \
  --restart=always \
  --name registry \
  -v <ローカルデータ保管場所>:/var/lib/registry \
  registry:2
```

### nexus3
```
docker run -d -p 8081:8081 --name nexus \
  --restart=always \
  -v /home/chance/Documents/nexus:/nexus-data sonatype/nexus3
```

### ファイルサーバー
```
docker run --name fileserver -d \
  -v ~/Documents:/usr/src \
  -p 8080:8080 9.197.12.29:5000/fileserver
```

### code-server

config.yaml
```
bind-addr: 127.0.0.1:8080
auth: password
password: <パスワード>
cert: false
```

```
docker run -d -it --name code-server -p 8085:8080 \
  -v "/home/chance/Documents/code-server:/home/coder/.config/code-server" \
  -v "/home/chance/Documents:/home/coder/project" \
  -u "$(id -u):$(id -g)" \
  -e "DOCKER_USER=$USER" \
  codercom/code-server:latest
```

### proxy

### 自己証明のクラウドサーバーへのリクエストの場合

local => http-proxy => https-proxy => self-signed serverで通信します。

http-proxyはリクエスト内容確認できます。確認必要ない場合、構築しなくても良い


#### http-proxy

```
docker run -d --restart=always \
  --name requestintercepter \
  -p 8000:1080 mockserver/mockserver -logLevel INFO -serverPort 1080 -proxyRemotePort <https-proxy port> -proxyRemoteHost <https-proxy ip address>
```

#### https-proxy(http => https)

```
docker run --restart=always \
  --add-host=<self-signed サーバードメイン>:<サーバードIPアドレス> \
  -d --name itaproxy -p 8001:8000 9.197.12.29:5000/itaproxy
```


### sonarqube

####  postgres
```
docker volume create postgresdata
docker run -d \
    --name postgres \
    -p 5432:5432 \
    -e POSTGRES_DB=sonarqube \
    -e POSTGRES_PASSWORD=123456 \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -v postgresdata:/var/lib/postgresql/data \
    postgres
```

* backup
```
pg_dump -h localhost -U postgres -p 5432 -d sonarqube -w -F c -b -v -f /tmp/data.backup
```

* restore
```
pg_restore -h localhost -p 5432 -U postgres -W -d sonarqube -v "/tmp/data.backup"
```

####  sonarqube

```
docker volume create sonarqube_data
docker volume create sonarqube_extensions
docker volume create sonarqube_logs
docker run -d --name sonarqube \
  -p 9000:9000 \
  -e SONAR_JDBC_URL=jdbc:postgresql://9.197.12.27:5432/sonarqube \
  -e SONAR_JDBC_USERNAME=postgres \
  -e SONAR_JDBC_PASSWORD=123456 \
  -v sonarqube_data:/opt/sonarqube/data \
  -v sonarqube_extensions:/opt/sonarqube/extensions \
  -v sonarqube_logs:/opt/sonarqube/logs \
  sonarqube:8.3.1-community
```

### coredns

```
docker run -d \
  --restart always \
  --name coredns \
  -p 53:53/tcp \
  -p 53:53/udp \
  -v $(pwd)/coredns/hosts:/etc/hosts \
  -v $(pwd)/coredns/Corefile:/Corefile \
  coredns/coredns
```
