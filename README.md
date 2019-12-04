# 一份动态简历

## 简介

最近网上看到别人做的一份动态简历，觉得比较有意思，于是自己基于create-react-app简单的模仿了一下。

之后可能会用vue再写一遍，先埋个坑再说。

原作品链接： http://strml.net/

## 预览

https://github.com/luowei95327/react-resume/build/index.html

## 运行

运行前请保证安装了 Nodejs 和 NPM 环境：

> npm install 
> 
> npm start

本地浏览： http://localhost:3000/

项目里面build文件夹中是打包好了的我自己的简历。

你可以在 src/assets/data.js 修改数据生成只有运行 <code>npm run build</code>命令重新生成自己的简历，或者基于此项目进行二次开发。

## 说明

此项目是使用的react官方脚手架create-react-app，里面集成了es6、es7、redux、react-router等等，不用我们自己再使用webpack自己去配置，我们只用专注于开发。

使用默认配置打包时发现发布到github上的页面资源都是404，查看配置源码得知默认会被替换为空，然后变为 "/" 目录，如果是生成环境需要在 <code>package.json</code> 里面配置 

        "homepage": "."
