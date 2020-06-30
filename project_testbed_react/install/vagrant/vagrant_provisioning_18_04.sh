#!/bin/bash

sudo apt-get update

# install mariadb
sudo apt-get install mariadb-server -y
sudo mysqladmin -u root password 'password'
sudo mysql -u root -ppassword -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'password' WITH GRANT OPTION; FLUSH PRIVILEGES;"
sudo mysql -u root -ppassword -e "GRANT ALL PRIVILEGES ON *.* TO 'django'@'%' IDENTIFIED BY 'password' WITH GRANT OPTION; FLUSH PRIVILEGES;"
sudo mysql -u root -ppassword -e "create database pointwallet"
sudo mysql -u root -ppassword -e "create database pointwalletdb_1"
sudo mysql -u root -ppassword -e "create database pointwalletdb_2"
sudo mysql -u root -ppassword -e "create database pointwalletdb_3"
sudo mysql -u root -ppassword -e "create database pointwalletdb_4"
sudo mysql -u root -ppassword -e "create database pointwalletdb_5"


sudo service mysqld restart

# install related django
sudo apt-get install libmysqlclient-dev -y

# install pip, venv
sudo apt-get install python3-venv -y
sudo apt-get install python3-pip -y
sudo pip3 install pipenv
pip3 install djangorestframework==3.10.3


# install gssapi
sudo apt-get install libkrb5-dev -y


# install redis
#sudo apt-get install redis-server -y
#sudo service redis-server restart
#sudo systemctl enable redis-server.service

# install rabbitmq
#sudo apt-get install rabbitmq-server -y
#
#sudo rabbitmq-plugins enable rabbitmq_management
#sudo rabbitmq-plugins enable rabbitmq_federation
#sudo rabbitmq-plugins enable rabbitmq_federation_management

# setting rabbitmq
#rabbitmqadmin import /home/vagrant/conf/rabbitmq/definitions.json
#sudo cp -rf /home/vagrant/conf/rabbitmq/definitions.json /etc/rabbitmq/
#sudo cp -rf /home/vagrant/conf/rabbitmq/rabbitmq.config /etc/rabbitmq/
#
#sudo service rabbitmq-server restart


# install ghostscript
#wget https://github.com/ArtifexSoftware/ghostpdl-downloads/releases/download/gs921/ghostscript-9.21.tar.gz
#tar -xvzf ghostscript-9.21.tar.gz
#cd ghostscript-9.21/
#./configure --with-drivers=ALL --with-fontpath=/usr/share/fonts
#make
#make install


# install poppler-utils
#sudo apt-get install -y poppler-utils


# copy celery conf
#mkdir -p /home/vagrant/log/celery/local-worker.kidsnote.com/celeryd
#mkdir -p /home/vagrant/log/celery/local-worker-point.kidsnote.com/celeryd-point
#
#chown -R vagrant.vagrant /home/vagrant/log/celery/local-worker.kidsnote.com/celeryd
#chown -R vagrant.vagrant /home/vagrant/log/celery/local-worker-point.kidsnote.com/celeryd-point
#
#chmod -R 777 /home/vagrant/log/celery/local-worker.kidsnote.com/celeryd
#chmod -R 777 /home/vagrant/log/celery/local-worker-point.kidsnote.com/celeryd-point
#
#chmod -R 777 /home/vagrant/log/celery/local-worker.kidsnote.com
#chmod -R 777 /home/vagrant/log/celery/local-worker-point.kidsnote.com
#
#cp -rf /home/vagrant/conf/celery/init.d/* /etc/init.d/
#cp -rf /home/vagrant/conf/celery/default/* /etc/default/

# simbol link
#mkdir -p /home/vagrant/virtualenv/bin
#chown -R vagrant.vagrant /home/vagrant/virtualenv/bin
#
#ln -s /usr/bin/python3 /home/vagrant/virtualenv/bin/python3
#ln -s /usr/bin/python3 /home/vagrant/virtualenv/bin/python
#
#chown -R vagrant.vagrant /home/vagrant/virtualenv/bin/python3
#chown -R vagrant.vagrant /home/vagrant/virtualenv/bin/python
#

# https://tecadmin.net/install-nodejs-with-nvm/  nvm


sudo apt-get install -y libglu1
sudo apt-get install libxi6 libgconf-2-4 -y


mkdir /home/vagrant/vagrant_node_modules

mkdir -p /home/vagrant/code/app_front/node_modules

sudo mount --bind /home/vagrant/vagrant_mode_modules/ /home/vagrant/code/app_front/node_modules