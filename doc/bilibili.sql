/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50723
Source Host           : 127.0.0.1:3306
Source Database       : bilibili

Target Server Type    : MYSQL
Target Server Version : 50723
File Encoding         : 65001

Date: 2019-10-11 09:42:52
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for bl_attention
-- ----------------------------
DROP TABLE IF EXISTS `bl_attention`;
CREATE TABLE `bl_attention` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `bid` bigint(20) NOT NULL,
  `utime` timestamp DEFAULT NOW() COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `bid` (`bid`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COMMENT='UP主关注表';

-- ----------------------------
-- Table structure for bl_cartoon
-- ----------------------------
DROP TABLE IF EXISTS `bl_cartoon`;
CREATE TABLE `bl_cartoon` (
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
  `ctime` timestamp DEFAULT NOW() COMMENT '创建时间',
  `utime` timestamp DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `mid` (`mid`)
) ENGINE=InnoDB AUTO_INCREMENT=1102 DEFAULT CHARSET=utf8 COMMENT='番剧表';


-- ----------------------------
-- Table structure for bl_dynamic
-- ----------------------------
DROP TABLE IF EXISTS `bl_dynamic`;
CREATE TABLE `bl_dynamic` (
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
  `ptime` timestamp DEFAULT NULL COMMENT '发布时间',
  `ctime` timestamp DEFAULT NOW() COMMENT '创建时间',
  `utime` timestamp DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=416 DEFAULT CHARSET=utf8mb4 COMMENT='动态表';

-- ----------------------------
-- Table structure for bl_uper
-- ----------------------------
DROP TABLE IF EXISTS `bl_uper`;
CREATE TABLE `bl_uper` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `bid` bigint(20) NOT NULL,
  `face` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `level` int(11) DEFAULT '1' COMMENT '等级',
  `sign` text COMMENT '签名',
  `contribute` int(11) DEFAULT '0' COMMENT '投稿数量',
  `attention` int(11) DEFAULT '0' COMMENT '关注',
  `fans` int(11) DEFAULT '0' COMMENT '粉丝数量',
  `play` int(11) DEFAULT NULL COMMENT '播放量',
  `read` int(11) DEFAULT '0' COMMENT '阅读量',
  `ctime` timestamp DEFAULT NOW() COMMENT '创建时间',
  `utime` timestamp DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `bid` (`bid`)
) ENGINE=InnoDB AUTO_INCREMENT=4036 DEFAULT CHARSET=utf8 COMMENT='UP主信息主表';

-- ----------------------------
-- Table structure for bl_uper_task
-- ----------------------------
DROP TABLE IF EXISTS `bl_uper_task`;
CREATE TABLE `bl_uper_task` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `bid` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `repeat_tag` tinyint(1) DEFAULT '0' COMMENT '重复标记',
  `ctime` timestamp DEFAULT NOW() COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `bid` (`bid`)
) ENGINE=InnoDB AUTO_INCREMENT=25951 DEFAULT CHARSET=utf8 COMMENT='UP主任务表';

-- ----------------------------
-- Table structure for bl_video
-- ----------------------------
DROP TABLE IF EXISTS `bl_video`;
CREATE TABLE `bl_video` (
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
  `ptime` timestamp DEFAULT NULL COMMENT '发布时间',
  `ctime` timestamp DEFAULT NOW() COMMENT '创建时间',
  `utime` timestamp DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  `mid` bigint(20) NOT NULL,
  `author` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `aid` (`aid`)
) ENGINE=InnoDB AUTO_INCREMENT=460 DEFAULT CHARSET=utf8 COMMENT='视频表';
