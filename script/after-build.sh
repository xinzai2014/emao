#!/bin/bash
#-------------------------------------------------------------------------
# Filename: after-build.sh
# Author: 马新才
# Date: 2017-08-15
# Description: 本脚本的作用是在build完成后执行一下勾子
#  -------------------------------------------------------------------------

app_path='/data/www/project-taochemao-wap'

# 删除gitignore文件方便将编译后的文件加入到build git
delete_gitignore()
{
    if [ -f "${app_path}/dist/.gitignore" ]
    then
        rm -rf ${app_path}/dist/.gitignore
    fi
}

main()
{
    delete_gitignore
}

main