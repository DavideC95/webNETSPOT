-- -----------------------------------------------------
-- Table `mydb`.`Jobs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Jobs` (
  `id` INT NULL,
  `id_utente` INT NULL,
  `stato` VARCHAR(45) NULL,
  `filename` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Utente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Utente` (
  `id_utente` INT NOT NULL,
  `username` VARCHAR(45) NULL,
  `pwd` VARCHAR(45) NULL,
  PRIMARY KEY (`id_utente`),
  CONSTRAINT `id_utente`
    FOREIGN KEY (`id_utente`)
    REFERENCES `mydb`.`Jobs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

