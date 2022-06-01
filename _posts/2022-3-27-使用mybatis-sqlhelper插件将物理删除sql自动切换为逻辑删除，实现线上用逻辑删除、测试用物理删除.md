---
layout:     post
title:      使用mybatis-sqlhelper插件将物理删除sql自动切换为逻辑删除，实现线上用逻辑删除、测试用物理删除
subtitle:   使用mybatis-sqlhelper插件
date:       2022-3-26
author:     BY
header-img: img/post-bg-universe.jpg
catalog: true
tags:
    - mybatis-sqlhelper
---


## 前言
逻辑删除是对某些重要数据的保护，使用一个表字段存储数据的状态（已删除、可用）。在开发测试阶段，无论是开发人员还是测试人员会创建大量的测试数据这些测试数据因为逻辑删除的原因无法通过程序删除，想要清理这些数据只能去操作数据库，但是由于各个表数据之间有关联性，操作数据库并不能保证数据的关联完整删除。所以需要实现开发测试环境中删除接口是物理删除，真正需要上线时再转换成逻辑删除。
> mybatis-sqlhelper插件使用sql解析器自动将物理删除sql转换成逻辑删除语句,并为查询语句添加逻辑删除条件。

## 正文
> mybatis-sqlhelper有纯mybatis版本也有spring和spring boot版本，这里介绍spring boot版本的使用

### 导入mybatis-sqlhelper-spring-boot-starter
建议使用3.0.0.SR1-SNAPSHOT版本，这个版本是3.0的修订版本的快照版，修复了3.0的一些bug，它是一个及时更新版本，请时刻关注正式修订版本3.0.0.SR1。在使用快照版本时遇到问题请及时联系我。qq:1259609102
~~~java
  <dependency>
      <groupId>io.github.heykb</groupId>
      <artifactId>mybatis-sqlhelper-spring-boot-starter</artifactId>
      <version>3.0.0.SR1-SNAPSHOT</version>
  </dependency>

        <!--快照仓库配置，如果你不使用快照版本，则跳过它-->
  <repositories>
      <repository>
          <id>sonatype-nexus-snapshots</id>
          <name>Sonatype Nexus Snapshots</name>
          <url>https://s01.oss.sonatype.org/content/repositories/snapshots/</url>
          <snapshots>
              <enabled>true</enabled>
          </snapshots>
          <releases>
              <enabled>false</enabled>
          </releases>
      </repository>
  </repositories>
~~~

### 配置逻辑删除信息

~~~yml
sqlhelper:
  logic-delete:
    enable: true
    column-name: is_deleted
    not-deleted-value: "'N'"
    deleteSqlDemo: update xx set is_deleted = 'Y'
    ignoreMapperIds: '**.noPlugin*'
    ignoreTables: xx,xxx
~~~

### 查看日志
 ![](/img/2022-06-01-10-31-53.png)

# 结语

更多用法参见[mybatis-sqlhelper](https://github.com/heykb/mybatis-sqlhelper)

最后，[给个 star 吧](https://github.com/heykb/mybatis-sqlhelper)~