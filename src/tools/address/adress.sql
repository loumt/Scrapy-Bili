CREATE TABLE `hz_area` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `level` int(4) DEFAULT NULL COMMENT '地区等级',
  `code` varchar(255) DEFAULT NULL COMMENT '地区code',
  `name` varchar(255) DEFAULT NULL COMMENT '地区名',
  `province` varchar(32) DEFAULT NULL COMMENT '省级code',
  `city` varchar(32) DEFAULT NULL COMMENT '市code',
  `area` varchar(32) DEFAULT NULL COMMENT '区名',
  `town` varchar(32) DEFAULT NULL COMMENT '街道名',
  `full_name` varchar(255) DEFAULT NULL COMMENT '全名',
  `created_time` datetime DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=110206 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='地区表';

