## 맥에서 작업 해야 할 것
 - 맥에서 vagrant 설치 ( 검색해서 )
 
 - git source
 ```
 cd ~
 mkdir dev
 cd dev
 git clone git@github.com:kidsnote/kidsnote-points.git
 cd kidsnote-points/install/vagrant/
 
 ```
 
 - 가상머신 설치 
 ```
 vagrant up 
 ```
 
 - 네트워크 설정
 ```
 sudo vi /etc/hosts
 192.168.10.156 local-point.kidsnote.com
 ```
 
 - 가상머신 접속
 ```
 vagrant ssh
 ```
 
 


## 설치 후 작업

### mariadb 서버 설정
```
sudo vi /etc/mysql/mariadb.conf.d/50-server.cnf 
bind-address            = 0.0.0.0
sudo service mysqld restart
```

### install python package

```
cd ~/code/requirements/
cp ~/code/install/vagrant/conf/project/local.txt.example local.txt
pip3 install -r local.txt
```

### setting django local.py
```
cd ~/code/pointwallet/conf/settings/
cp ~/code/install/vagrant/conf/project/local.py.example local.py
```

### 마이그레이션

```
cd ~/code/pointwallet
python3 manage.py migrate --database=default
python3 manage.py migrate --database=pwdb_1
python3 manage.py migrate --database=pwdb_2
python3 manage.py migrate --database=pwdb_3
python3 manage.py migrate --database=pwdb_4
python3 manage.py migrate --database=pwdb_5
```

### Seed 생성
```
python3 manage.py runscript generate_init_data
python3 manage.py runscript generate_dummy_data
```

### worker 실행
```
sudo /etc/init.d/celeryd-point restart
sudo /etc/init.d/celeryd restart
```

### rabbitmq 
http://local-point.kidsnote.com:15672/

kidsnote // kidsnote

![rabbitmq 사이트](./image/rabbitmq.png)

## Pycharm 설정 with vagrant

### Support django

![장고 활성](./image/support_django.png)

### 1. interpreter 설정 (Vagrant)
![인터프리터 설정1](./image/interprint1.png)
![인터프리터 설정2](./image/interprint2.png)

### 2. File Watcher - SCSS
![scss watcher](./image/watcher.png)

```
Program : /usr/local/bin/compass
Arguments : compile $FileParentDir$ $UnixSeparators($FilePath$)$
output paths : $FileNameWithoutExtension$.css:$FileNameWithoutExtension$.css.map
```

### Root Source 로 지정
- 화면 왼쪽 Project 탭에서 pointwallet 디렉토리 클릭 후 "Mark Direct AS" => Root Source

### Django Server 추가
![django_server](./image/pw_server.png)

```
Host : 0.0.0.0 
Port : 8000
Environment variables: PYTHONUNBUFFERED=1;DJANGO_SETTINGS_MODULE=conf.settings.local;KAGE_SECRET_KEY=2FJcEUckQqw7QRR9C0lv3Htw1TqmlMAuCSjDrDPk3ySDZWSLvd5Q1dnKO1PBljJ6;KAGE_ACCESS_KEY=z0ceClrVuPv2awbFE39UtZJY8CCdRafQ
```

### http://local-point.kidsnote.com:8000 접속 확인


### Vagrant 명령어 
```
vagrant ssh : 쉘 접속
vagrant sanpshot : 스냅샷 저장
vagrant suspend : 일시중지
vagrant resume : 일시중지를 다시 진행으로

```

#### 초기 셋팅이 끝났으면 스냅샷으로 찍어 놓자
- vagrant sanpshot save "init_stage"



