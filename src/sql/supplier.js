// supplier 供应商、厂商

/* CREATE TABLE IF NOT EXISTS `supplier`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `user_id` int UNSIGNED NOT NULL,
   `inviteCode` VARCHAR(1000) NOT NULL,
   `name` VARCHAR(1000) NOT NULL,
   `address` VARCHAR(2000) NOT NULL,
   `web` VARCHAR(1000),
   `owner` VARCHAR(1000) NOT NULL,
   `created_at` VARCHAR(1000) NOT NULL,
   `updated_at` VARCHAR(1000) NOT NULL,
   PRIMARY KEY ( `id` ),
   foreign key (user_id) references User(id) on delete cascade on update cascade
)ENGINE=InnoDB DEFAULT CHARSET=utf8; */