-- Table structure for table `jobs`

DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs` (
  `id` INT(11) NOT NULL,
  `id_user` INT(11) UNSIGNED NOT NULL,
  `state` INT(11) NOT NULL,
  `path` VARCHAR(255) DEFAULT NULL,
  `date` TIMESTAMP NOT NULL,
  FOREIGN KEY (`id_user`) REFERENCES users(`id`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

