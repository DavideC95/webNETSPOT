-- -----------------------------------------------------
-- Table `webnetspot`.`Jobs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `webnetspot`.`Jobs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_utente` INT NOT NULL,
  `stato` VARCHAR(45) NULL,
  `filename` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `webnetspot`.`Utente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `webnetspot`.`Utente` (
  `id_utente` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `pwd` VARCHAR(45) NULL,
  PRIMARY KEY (`id_utente`))
ENGINE = InnoDB;
