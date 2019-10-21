#!/bin/bash
#-------------------------------------------------------------------------
# Filename: build.sh
# Author: 马新才
# Date: 2017-08-15
# Description: 本脚本的作用是在build代码
#  -------------------------------------------------------------------------

app_path='/data/www/project-taochemao-wap'

main()
{
    cd ${app_path}
    # npm install
    #	npm run build
    cnpm install
    /bin/npm run build
}

main
