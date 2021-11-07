CREATE TABLE `enlistr`.`user` ( `id` INT NOT NULL AUTO_INCREMENT , `first_name` VARCHAR(45) NOT NULL , `last_name` VARCHAR(45) NOT NULL , `latest_degree` VARCHAR(45) NOT NULL , `major` VARCHAR(45) NOT NULL , `cgpa` VARCHAR(45) NOT NULL , `domain_skills` VARCHAR(100) NOT NULL , `graduation_year` VARCHAR(10) NOT NULL , `achievements` VARCHAR(45) NOT NULL , `email` VARCHAR(45) NOT NULL , `contact` VARCHAR(45) NOT NULL , `status` VARCHAR(45) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


ALTER TABLE `user` CHANGE `status` `status` VARCHAR(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'active';
