---
layout:     post
title:      使用mybatis-sqlhelper插件为插入和更新sql,自动注入创建时间、创建人、更新人、更新时间
subtitle:   使用mybatis-sqlhelper插件
date:       2022-3-26
author:     BY
header-img: img/post-bg-universe.jpg
catalog: true
tags:
    - mybatis-sqlhelper
---


## 前言
实际生产中的大多数表都具有一些公共字段，比如created_by创建人、created_time创建时间、updated_by更新人、updated_time更新人。这些字段存在固定的处理逻辑：新增时设置created_by、created_time,更新时设置updated_by、updated_time。每新增一个表就要包含相同的代码，利用Mybati-sqlhelper简单的配置就可以为你的sql中自动注入这些逻辑。只要你使用了mybatis那么你就可以使用。


## 正文
### 导入mybatis-sqlhelper-spring-boot-starter
建议使用3.0.0.SR1-SNAPSHOT版本，这个版本是3.0的修订版本的快照版，修复了3.0的一些bug，它是一个及时更新版本，请时刻关注正式修订版本3.0.0.SR1。在使用快照版本时遇到问题请及时联系我。qq:1259609102
~~~java
  <dependency>
      <groupId>io.github.heykb</groupId>
      <artifactId>mybatis-sqlhelper-spring-boot-starter</artifactId>
      <version>3.0.0</version>
      <exclusions>
          <exclusion>
              <groupId>io.github.heykb</groupId>
              <artifactId>mybatis-sqlHelper</artifactId>
          </exclusion>
      </exclusions>
  </dependency>
  <dependency>
      <groupId>io.github.heykb</groupId>
      <artifactId>mybatis-sqlHelper</artifactId>
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

### 配置handler
update_by 注入，value的值从当前用户信息中获取用户名，尽量不要在handler中再执行mapper方法，可能会陷入循环，提前将用户信息放入线程上下文。<br>


~~~java
@Component
public class UpdateByInjectColumnHandler implements InjectColumnInfoHandler {
    private static final AntPathMatcher antPathMatcher = new AntPathMatcher(".");
    @Override
    public String getColumnName() {
        return "update_by";
    }

    @Override
    public String getValue() {
        String username = SecurityUtilsExt.getUserName();
        if(username == null){
            throw new RuntimeException("无法获取用户名");
        }
        return "'"+username+"'";
    }

    @Override
    public int getInjectTypes() {
        return UPDATE|INSERT;
    }

    @Override
    public boolean isExistSkip() {
        return true;
    }

    // 排除user_info表
    @Override
    public boolean checkTableName(String tableName) {
        return !"user_info".equals(tableName);
    }

    @Override
    public boolean checkMapperId(String mapperId) {
        return antPathMatcher.match("com.xx.**",mapperId);
    }
}
~~~
~~~java
@Component
public class UpdateTimeInjectColumnHandler implements InjectColumnInfoHandler {
    private static final AntPathMatcher antPathMatcher = new AntPathMatcher(".");
    @Override
    public String getColumnName() {
        return "update_time";
    }

    @Override
    public String getValue() {
        return "now()";
    }

    @Override
    public int getInjectTypes() {
        return UPDATE|INSERT;
    }

    @Override
    public boolean isExistSkip() {
        return true;
    }

    // 排除tmp表
    @Override
    public boolean checkTableName(String tableName) {
        return !"tmp".equals(tableName);
    }

    @Override
    public boolean checkMapperId(String mapperId) {
        return antPathMatcher.match("com.xx.**",mapperId);
    }
}
~~~
### 查看日志
 ![](/img/20220326_updateby.png)
### 解释
 * ```InjectColumnInfoHandler```代表一条自动注入设置
 * ```getColumnName()```返回注入的字段名称
 * ```getValue()```返回注入的值，该值被原样注入到sql中，类似mybatis的${xx}
 * ```getInjectTypes()```返回注入的类型，可选的类型有```CONDITION|INSERT|UPDATE```，分别代表条件注入、插入列注入、更新列注入。这里updated_time需要插入列注入和更新列注入
 * ```isExistSkip()``` 返回true,当原本的sql中已存在该字段则跳过
 * ```checkTableName(String tableName)``` 检查传入的tableName，返回false则不会进行注入
 * ```checkMapperId(String mapperId)``` 检查传入的mapperId，返回false则不会进行注入
<br>


# 结语

更多用法参见[mybatis-sqlhelper](https://github.com/heykb/mybatis-sqlhelper)

最后，[给个 star 吧](https://github.com/heykb/mybatis-sqlhelper)~