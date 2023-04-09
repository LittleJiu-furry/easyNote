- 建表语句-"p_user"
```sql
CREATE TABLE `p_user` (
	`uid` BIGINT UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
	`uuid` TEXT NOT NULL,
	`nick_account` TEXT NOT NULL,
	`nick_sign` TEXT NOT NULL,
	`pwd_1` TEXT NOT NULL,
	`pwd_2` TEXT NOT NULL,
	`pwd_3` TEXT NOT NULL,
	`pwd_i` TEXT NOT NULL,
	`pwd_pwd` TEXT NOT NULL,
	`em` TEXT NOT NULL,
	`nickname` TEXT NOT NULL,
	`reg_time` BIGINT NOT NULL DEFAULT 0,
	`code` TEXT NOT NULL,
	PRIMARY KEY (`uid`)
)
COMMENT='用户信息表，用于存储用户信息'
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;
```

- p_code

```sql
CREATE TABLE `p_code` (
	`code_id` TEXT NOT NULL,
	`code_content` TEXT NOT NULL,
	`code_st` BIGINT UNSIGNED NOT NULL,
	`code_str` TEXT NOT NULL
)
COMMENT='临时验证码表，用于存储正在生效的验证码'
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;
```

- p_user_ex

```sql
CREATE TABLE `p_user_ex` (
	`uid` BIGINT(20) UNSIGNED NOT NULL,
	`user_exaccount` LONGTEXT NOT NULL COLLATE 'utf8_general_ci',
	`user_icon` LONGTEXT NOT NULL COLLATE 'utf8_general_ci',
	`user_note` LONGTEXT NOT NULL COLLATE 'utf8_general_ci',
	PRIMARY KEY (`uid`) USING BTREE
)
COMMENT='用户拓展信息表，主要存储所有图像索引'
COLLATE='utf8_general_ci'
ENGINE=MyISAM
;
```