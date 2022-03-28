---
layout:     post
title:      快速搭建一个使用github pages的免费个人博客完整教程 
subtitle:   
date:       2022-3-26
author:     BY
header-img: img/post-bg-universe.jpg
catalog: true
tags:
    - 个人博客网站
---


## 前言
按照该教程流程你能免费搭建一个个人博客网站：markdown驱动、评论系统、标签系统、分页、个人介绍、网站浏览统计、搜索引擎收录。<br>
使用github pages托管个人博客网站，不需要你学习jekyll相关知识，也不需要你了解编程技术，按照本博客简单的步骤就可以搭建自己的博客网站。你不需要从头使用jekyll创建项目，最简单的方式在github找到别人的博客网站比如[我的博客](https://github.com/heykb/heykb.github.io)，如果你喜欢他的主题，fork项目到自己的仓库，修改一些私人配置，网站就完成了。


## 正文

### fork项目
fork[zrc的博客](https://github.com/heykb/heykb.github.io),修改项目名称为 username.github.io。点击setting->Pages，刷新页面如下后，即可访问
username.github.io网站。
![](/img/2022-03-28-10-20-27.png)

### 配置_config.yml
修改_config.yml文件，替换配置如用户名、自我介绍、邮箱等，总之将所有个人信息替换为你自己的。如果你想要本地调试，运行jekyll serve。你也许需要安装jekyll，参见官网安装教程。
~~~yml
title: ZRC
SEOTitle: 朱镕城的博客 | ZRC Blog
header-img: img/home-bg.jpg
email: bigSheller08@gmail.com
description: "（网站介绍）这是朱镕城的个人网站，目前处于测试状态，欢迎大家访问，一起交流学习."
keyword: "WP,ZRC,朱镕城，朱镕城的博客"
url: "http://heykb.github.io"          # your host, for absolute URL
baseurl: ""      # for example, '/blog' if your blog hosted on 'host/blog'
github_repo: "https://github.com/heykb/heykb.github.io.git" # you code repository

# Sidebar settings
sidebar: true                           # whether or not using Sidebar.
sidebar-about-description: "饥饿知识分子，牛逼、牛逼、更牛逼。渴求观其面而知其所以然境界而不得，一人弱而集体强，故求知于open network。我们做朋友吧"
sidebar-avatar: /img/avatar_binggan.jpg 
~~~

### 配置gitalk评论系统
首先到```https://github.com/settings/developers```点击```New Oauth App```创建一个第三方授权应用，主要是获取 clientID和 clientSecret。然后博客项目中添加一个issue设置lable为gitalk。最后修改下面的配置即可。gitalk第一次初始化，你可能需要到线上才能看到效果。
~~~yml
gitalk:
  enable: true    #是否开启Gitalk评论
  clientID: d33e918a5765faa31b07                            #生成的clientID
  clientSecret: cc8cef049be4c1255077730e97384e08d7f755e8    #生成的clientSecret
  repo: heykb.github.io    #仓库名称
  owner: heykb    #github用户名
  admin: heykb
  labels: gitalk ##issue label所有的评论会添加到该issue中
  distractionFreeMode: true #是否启用类似FB的阴影遮罩
~~~
### 配置谷歌分析，即博客中显示的浏览量统计
分别到谷歌统计和百度统计创建网站，然后修改以下配置，请不要使用我的
~~~yml
# Analytics settings
# 百度统计
ba_track_id: 9db816d08b7290b02d58d02ce331a62f
# 谷歌统计 Analytics
ga_track_id: 'G-G1WQCNPBE6'            
ga_domain: auto 
~~~
### 谷歌搜索
为了让谷歌能够搜索到我们的博客，需要让谷歌收录我们的网站。进入[Google Search Console](https://search.google.com/search-console/welcome)添加网站，建议使用html文件验证方式，到```Google Search Console```下载验证html,将文件复制到项目根目录下即可。保证```http://usernanme.github.io/googlexxx.html```能访问成功后，到```Google Search Console```验证网站。
![](/img/2022-03-28-10-46-41.png)

### 百度搜索
和谷歌收录类似。[网址](https://ziyuan.baidu.com/https/index)

### 添加站点地图sitemap
站点地图sitemap是告诉搜索引擎推荐抓取的地址，可辅助搜索引擎更好的收录我们的博客。
1. 确认```http://usernanme.github.io/sitemap.xml```能正常访问。默认应该是可以访问的，如果你fork的是我的博客的话。如果不行请搜索教程，这里不做描述
2. 到[谷歌站点地图配置](https://search.google.com/search-console/sitemaps)网站添加站点地图
### 新增博客
_post目录下按照命名格式新建md文件，即可生成一个新的博客
![](/img/2022-03-28-11-09-29.png)


# 结语

最后，[给个 star 吧](https://github.com/heykb/heykb.github.io)~