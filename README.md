# 淘车猫项目wap版
### 项目域名
[https://tcm.m.emao.com](https://tcm.m.emao.com)

### 项目描述
淘车猫项目wap版

### 初始化
* cd /data/www/
* git clone git@git.emao.net:tob/project-taochemao-wap.git
* ln -s /data/www/project-taochemao-wap/serverconfig/nginx/online/conf.d /etc/nginx/conf.d/project-taochemao-wap
* chmod -R 755 /data/www/project-taochemao-wap
* chown -R nginx.nginx /data/www/project-taochemao-wap
* sh script/build.sh

### 项目环境
* vuejs

### 项目仓库
http://git.emao.net/tob/project-taochemao-wap.git

### 项目依赖
* https://tcmapi.emao.com 淘车猫接口

### 期望上线方式
需要通过node编译
* node版本: >= 4.0.0
* npm版本: >= 3.0.0

### 项目结构
php代码文件位置

`/data/www/project-taochemao-wap`

nginx配置文件

`ln -s /data/www/project-taochemao-wap/serverconfig/nginx/online/conf.d /etc/nginx/conf.d/project-taochemao-wap`


