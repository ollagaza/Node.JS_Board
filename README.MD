# Node.JS Board 

### Database Connection
```
npm install mysql
```

### Mysql table Define
CREATE TABLE `job` (
`idx` INT(10) NOT NULL AUTO_INCREMENT,
`job_code` VARCHAR(10) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
`worker` VARCHAR(20) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
`manager` VARCHAR(20) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
`subject` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
`content` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
`moddate` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
`regdate` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
`passwd` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
`hit` INT(10) NULL DEFAULT '0',
PRIMARY KEY (`idx`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=46
;

### Mysql stored Procedure
CREATE DEFINER=`root`@`localhost` PROCEDURE `spJobList`(
IN `iJob_code` VARCHAR(10),
IN `iKeyword` VARCHAR(100)
)
LANGUAGE SQL
NOT DETERMINISTIC
CONTAINS SQL
SQL SECURITY DEFINER
COMMENT ''
BEGIN
SET @SQL = "SELECT idx, job_code, worker, manager, subject, date_format(moddate, '%Y-%m-%d %H:%i:%s') modidate, date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate, hit";
SET @SQL = CONCAT(@SQL, " FROM job WHERE job_code LIKE '%", iJob_code, "%'");

	IF iKeyword != '' THEN
		SET @SQL = CONCAT(@SQL, " AND subject LIKE '%", iKeyword, "%'");
END IF;

SET @SQL = CONCAT(@SQL, " ORDER BY regdate DESC");
PREPARE stmt1 FROM @SQL;
EXECUTE stmt1;
DEALLOCATE PREPARE stmt1;

	SELECT FOUND_ROWS() AS totalCount;
END


CREATE DEFINER=`root`@`localhost` PROCEDURE `spJobView`(
IN `iJob_code` VARCHAR(10),
IN `iIdx` INT
)
LANGUAGE SQL
NOT DETERMINISTIC
CONTAINS SQL
SQL SECURITY DEFINER
COMMENT ''
BEGIN
SELECT idx, job_code, worker, manager, subject, content, date_format(moddate, '%Y-%m-%d %H:%i:%s') modidate, date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate, hit
FROM job WHERE job_code = iJob_code AND idx= iIdx;

	SET  @rowCnt = FOUND_ROWS();
	SELECT @rowCnt AS totalCount ;

END

CREATE DEFINER=`root`@`localhost` PROCEDURE `spJobWrite`(
IN `iJob_code` VARCHAR(10),
IN `iSubject` VARCHAR(200),
IN `iContent` TEXT,
IN `iWorker` VARCHAR(20),
IN `iManager` VARCHAR(20)
)
LANGUAGE SQL
NOT DETERMINISTIC
CONTAINS SQL
SQL SECURITY DEFINER
COMMENT ''
BEGIN
INSERT INTO job (job_code, subject, content, worker, manager) VALUES (iJob_code, iSubject, iContent, iWorker, iManager);

END
