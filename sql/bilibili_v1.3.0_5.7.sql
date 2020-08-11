/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50723
Source Host           : 127.0.0.1:3306
Source Database       : bilibili

Target Server Type    : MYSQL
Target Server Version : 50723
File Encoding         : 65001

Date: 2019-10-15 17:55:14
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for bl_attention_cartoon
-- ----------------------------
DROP TABLE IF EXISTS `bl_attention_cartoon`;
CREATE TABLE `bl_attention_cartoon` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `mid` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `originName` varchar(255) DEFAULT NULL,
  `evaluate` text COMMENT '简介',
  `score` int(11) DEFAULT NULL,
  `banner` varchar(255) DEFAULT NULL COMMENT '海报',
  `fans` int(11) DEFAULT '0' COMMENT '追番人数',
  `ratingCount` int(11) DEFAULT NULL COMMENT '评论人数',
  `cancel` tinyint(1) DEFAULT '0' COMMENT '撤销',
  `ratingCode` float(2,1) DEFAULT NULL COMMENT '评分',
  `ctime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `utime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `mid` (`mid`)
) ENGINE=InnoDB AUTO_INCREMENT=1098 DEFAULT CHARSET=utf8 COMMENT='番剧表';

-- ----------------------------
-- Table structure for bl_attention_uper
-- ----------------------------
DROP TABLE IF EXISTS `bl_attention_uper`;
CREATE TABLE `bl_attention_uper` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `bid` bigint(20) NOT NULL,
  `utime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `ctime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '关注时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `bid` (`bid`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8 COMMENT='UP主关注表';

-- ----------------------------
-- Table structure for bl_attention_uper_dynamic
-- ----------------------------
DROP TABLE IF EXISTS `bl_attention_uper_dynamic`;
CREATE TABLE `bl_attention_uper_dynamic` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `mid` bigint(20) NOT NULL,
  `did` varchar(128) DEFAULT NULL,
  `type` int(8) DEFAULT NULL COMMENT '动态类型',
  `title` text,
  `description` text,
  `content` text,
  `dynamic` text,
  `repost` int(8) DEFAULT '0' COMMENT '转发人数',
  `reply` int(8) DEFAULT '0' COMMENT '评论数',
  `like` int(8) DEFAULT '0' COMMENT '获赞数',
  `ptime` datetime DEFAULT NULL COMMENT '发布时间',
  `ctime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `utime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=647 DEFAULT CHARSET=utf8mb4 COMMENT='动态表';

-- ----------------------------
-- Table structure for bl_attention_uper_video
-- ----------------------------
DROP TABLE IF EXISTS `bl_attention_uper_video`;
CREATE TABLE `bl_attention_uper_video` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `aid` bigint(20) NOT NULL,
  `title` text COMMENT '标题',
  `subtitle` text COMMENT '子标题',
  `coin` int(8) DEFAULT NULL COMMENT '获币数',
  `share` int(8) DEFAULT NULL COMMENT '转发人数',
  `like` int(8) DEFAULT NULL COMMENT '获赞数',
  `favorite` int(8) DEFAULT NULL COMMENT '收藏人数',
  `danmaku` int(8) DEFAULT NULL COMMENT '弹幕数',
  `view` int(8) DEFAULT NULL COMMENT '播放',
  `comment` int(8) DEFAULT NULL COMMENT '评论人数',
  `duration` bigint(20) DEFAULT NULL COMMENT '持续时间',
  `pic` varchar(255) DEFAULT '' COMMENT '视频海报',
  `length` varchar(255) DEFAULT '' COMMENT '视频长度,纯显示用',
  `desc` text,
  `ptime` datetime DEFAULT NULL COMMENT '发布时间',
  `ctime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `utime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `mid` bigint(20) NOT NULL,
  `author` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `aid` (`aid`)
) ENGINE=InnoDB AUTO_INCREMENT=766 DEFAULT CHARSET=utf8 COMMENT='视频表';

-- ----------------------------
-- Table structure for bl_search_history
-- ----------------------------
DROP TABLE IF EXISTS `bl_search_history`;
CREATE TABLE `bl_search_history` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `bid` bigint(20) NOT NULL,
  `type` int(6) DEFAULT NULL COMMENT '类型',
  `name` varchar(255) DEFAULT NULL,
  `stime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COMMENT='查询历史表';

-- ----------------------------
-- Table structure for bl_send_request
-- ----------------------------
DROP TABLE IF EXISTS `bl_send_request`;
CREATE TABLE `bl_send_request` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `url` varchar(255) NOT NULL,
  `type` tinyint(1) DEFAULT '0' COMMENT '类型 1:用户 2.定时器',
  `stime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '请求时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=738 DEFAULT CHARSET=utf8 COMMENT='请求记录表';

-- ----------------------------
-- Table structure for bl_uper
-- ----------------------------
DROP TABLE IF EXISTS `bl_uper`;
CREATE TABLE `bl_uper` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `bid` bigint(20) NOT NULL,
  `face` varchar(255) DEFAULT NULL,
  `sex` tinyint(1) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `level` int(11) DEFAULT '1' COMMENT '等级',
  `sign` text COMMENT '签名',
  `contribute` int(11) DEFAULT '0' COMMENT '投稿数量',
  `attention` int(11) DEFAULT '0' COMMENT '关注',
  `fans` int(11) DEFAULT '0' COMMENT '粉丝数量',
  `play` int(11) DEFAULT NULL COMMENT '播放量',
  `read` int(11) DEFAULT '0' COMMENT '阅读量',
  `ctime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `utime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `bid` (`bid`)
) ENGINE=InnoDB AUTO_INCREMENT=4757 DEFAULT CHARSET=utf8 COMMENT='UP主信息主表';

-- ----------------------------
-- Table structure for bl_uper_task
-- ----------------------------
DROP TABLE IF EXISTS `bl_uper_task`;
CREATE TABLE `bl_uper_task` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `bid` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `urgent` tinyint(1) DEFAULT '0' COMMENT '急迫',
  `repeat_tag` tinyint(1) DEFAULT '0' COMMENT '重复标记',
  `ctime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `bid` (`bid`)
) ENGINE=InnoDB AUTO_INCREMENT=29651 DEFAULT CHARSET=utf8 COMMENT='UP主任务表';

-- ----------------------------
-- View structure for bl_v_attention_uper
-- ----------------------------
DROP VIEW IF EXISTS `bl_v_attention_uper`;
CREATE VIEW `bl_v_attention_uper` AS select `u`.`id` AS `id`,`u`.`bid` AS `bid`,`n`.`name` AS `name`,`n`.`sex` AS `sex`,`n`.`face` AS `face`,`n`.`level` AS `level`,`n`.`sign` AS `sign`,`n`.`contribute` AS `contribute`,`n`.`fans` AS `fans`,`n`.`play` AS `play`,`n`.`read` AS `read`,`n`.`attention` AS `attention` from (`bl_attention_uper` `u` left join `bl_uper` `n` on((`u`.`bid` = `n`.`bid`))) ;

-- 更新sql
ALTER TABLE bl_attention_uper_dynamic ADD aid BIGINT (20) DEFAULT NULL COMMENT '视频ID' AFTER type;
ALTER TABLE bl_attention_uper MODIFY `utime` datetime DEFAULT NULL COMMENT '更新时间';


-- 系统消息表
DROP TABLE IF EXISTS `bl_system_message`;
CREATE TABLE `bl_system_message` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `bid` bigint(20) NOT NULL,
  `mid` bigint(20) NOT NULL,
  `aid` bigint(20) NOT NULL,
  `title` varchar(255) COMMENT '标题',
  `message` varchar(255) COMMENT '消息',
  `type` tinyint DEFAULT 0 COMMENT '消息类型',
  `remark` text,
  `ctime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='系统消息表';

-- 用户表
DROP TABLE IF EXISTS `m_user`;
CREATE TABLE `m_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `username` varchar(64) NOT NULL  COMMENT '用户名',
  `nickname` varchar(64) DEFAULT NULL COMMENT '昵称',
  `password` varchar(64) NOT NULL COMMENT '密码',
  `salt` varchar(64) NOT NULL COMMENT '盐',
  `face` varchar(255) DEFAULT "" COMMENT '头像',
  `isAdmin` tinyint default 0 comment "是否为管理员",
   `ctime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `utime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='用户表';

ALTER TABLE `m_user` ADD unique(`username`);

-- 初始化管理用户
INSERT INTO m_user(id,username,nickname,password,salt,isAdmin) values(1,"admin",'BOSS',"49468c59dae59a2d862e6ad231a6b9ab","uTKrmSoT",1);


-- 角色表
DROP TABLE IF EXISTS `m_role`;
CREATE TABLE `m_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `name` varchar(64) NOT NULL  COMMENT '角色名',
  `remark` text default null COMMENT '备注',
   `ctime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='角色表';

ALTER TABLE `m_role` ADD unique(`name`);

INSERT INTO `m_role` (`id`, `name`, `remark`, `ctime`) VALUES ('1', 'ADMIN', '管理员', CURRENT_TIMESTAMP());



-- 权限资源表
DROP TABLE IF EXISTS `m_permission`;
CREATE TABLE `m_permission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `code` varchar(64) NOT NULL  COMMENT '资源代码',
  `desc` varchar(255)  default "" COMMENT '描述',
   `ctime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='权限资源表';

ALTER TABLE `m_permission` ADD unique(`code`);

-- 用户角色关联表
DROP TABLE IF EXISTS `m_user_role`;
CREATE TABLE `m_user_role` (
  `uid` bigint(20) NOT NULL  COMMENT 'user id',
  `rid`  bigint(20) NOT NULL COMMENT 'role id',
  PRIMARY KEY (`uid`,`rid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户角色关联表';

INSERT INTO `m_user_role` (`uid`, `rid`) VALUES ('1', '1');


-- 角色权限资源表
DROP TABLE IF EXISTS `m_role_permission`;
CREATE TABLE `m_role_permission` (
  `rid` bigint(20) NOT NULL  COMMENT 'role id',
  `pid`  bigint(20) NOT NULL COMMENT 'permission id',
  PRIMARY KEY (`rid`,`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色权限资源表';


-- ----------------------------
-- Table structure for bl_emoji
-- ----------------------------
DROP TABLE IF EXISTS `bl_emoji`;
CREATE TABLE `bl_emoji` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `key` varchar(64) NOT NULL  COMMENT '表情对应key',
  `url` varchar(255) DEFAULT NULL COMMENT '地址',
  `data` varchar(255) DEFAULT NULL COMMENT 'base64',
  `ctime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='表情';

DROP table if exists m_login_log;
CREATE TABLE `m_login_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `username` varchar(64) NOT NULL COMMENT '用户名',
  `type` TINYINT NOT NULL COMMENT '类型，0-登出，1-登录',
  `ctime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=MYISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='登录登出日志表';