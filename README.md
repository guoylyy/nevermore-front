# nevermore-front

前端项目开发环境搭建步骤

1. 安装node，地址: https://nodejs.org/en/

2. 配置npm的阿里镜像，具体参考http://npm.taobao.org/，使用cnpm命令代替npm

3. 通过cnpm install －g grunt grunt-cli yo bower安装全局的grunt，bower，yo

4. 通过git拉取项目

5. 在项目根目录执行cnpm install安装需要的npm模块

6. 在项目根目录执行bower install安装需要的bower库，如果按照失败可以直接解压根目录中的bower_components.zip，但不保证是全部的，以后引用新的插件需要及时更新

7. 执行完上述操作后，在项目根目录执行grunt serve启动前端项目
