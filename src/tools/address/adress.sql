CREATE TABLE `hz_area` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `level` int(4) DEFAULT NULL COMMENT '�����ȼ�',
  `code` varchar(255) DEFAULT NULL COMMENT '����code',
  `name` varchar(255) DEFAULT NULL COMMENT '������',
  `province` varchar(32) DEFAULT NULL COMMENT 'ʡ��code',
  `city` varchar(32) DEFAULT NULL COMMENT '��code',
  `area` varchar(32) DEFAULT NULL COMMENT '����',
  `town` varchar(32) DEFAULT NULL COMMENT '�ֵ���',
  `full_name` varchar(255) DEFAULT NULL COMMENT 'ȫ��',
  `created_time` datetime DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=110206 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='������';

