# vue学习项目wap版
### 项目域名
[https://tcm.m.emao.com](https://tcm.m.emao.com)

### 项目描述
淘车猫项目wap版

### 本地开发初始化
```
# 进入本地工作目录
cd /path/to/work

# 克隆仓库
git clone git@git.emao.net:tob/project-taochemao-wap.git

# 进入项目目录
cd project-taochemao-wap

# 安装依赖
npm install

# 运行开发模式
npm run dev

# 打开浏览器http://localhost:8080查看效果
```


### 服务器环境初始化
```
# 进入www目录
cd /data/www/

# 克隆仓库
git clone git@git.emao.net:tob/project-taochemao-wap.git

# 设置nginx软链
ln -s /data/www/project-taochemao-wap/serverconfig/nginx/online/conf.d /etc/nginx/conf.d/project-taochemao-wap

# 重启nginx服务器
/etc/init.d/nginx restart

# 设置权限
chmod -R 755 /data/www/project-taochemao-wap
chown -R nginx.nginx /data/www/project-taochemao-wap

# 进入项目目录并编译
cd /data/www/project-taochemao-wap
sh script/build.sh
```


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
代码文件位置

`/data/www/project-taochemao-wap/src`

nginx配置文件

`ln -s /data/www/project-taochemao-wap/serverconfig/nginx/online/conf.d /etc/nginx/conf.d/project-taochemao-wap`


