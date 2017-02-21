-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: myoa
-- ------------------------------------------------------
-- Server version	5.7.10-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (15),(15);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jt_employee_role`
--

DROP TABLE IF EXISTS `jt_employee_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jt_employee_role` (
  `employee_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`employee_id`,`role_id`),
  KEY `FKbuo2nrtk4n48qwnyn63kl6338` (`role_id`),
  CONSTRAINT `FK91uh2hada0oimqindyi1r3v64` FOREIGN KEY (`employee_id`) REFERENCES `t_employee` (`id`),
  CONSTRAINT `FKbuo2nrtk4n48qwnyn63kl6338` FOREIGN KEY (`role_id`) REFERENCES `t_role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jt_employee_role`
--

LOCK TABLES `jt_employee_role` WRITE;
/*!40000 ALTER TABLE `jt_employee_role` DISABLE KEYS */;
INSERT INTO `jt_employee_role` VALUES (1,3),(1,4);
/*!40000 ALTER TABLE `jt_employee_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jt_role_authority`
--

DROP TABLE IF EXISTS `jt_role_authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jt_role_authority` (
  `role_id` int(11) NOT NULL,
  `authority_id` int(11) NOT NULL,
  PRIMARY KEY (`role_id`,`authority_id`),
  KEY `FKk77lhqw0nng6jta6ocgroqo66` (`authority_id`),
  CONSTRAINT `FKk77lhqw0nng6jta6ocgroqo66` FOREIGN KEY (`authority_id`) REFERENCES `t_authority` (`id`),
  CONSTRAINT `FKp4jrmwsrsc2dew90i6k358qt0` FOREIGN KEY (`role_id`) REFERENCES `t_role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jt_role_authority`
--

LOCK TABLES `jt_role_authority` WRITE;
/*!40000 ALTER TABLE `jt_role_authority` DISABLE KEYS */;
INSERT INTO `jt_role_authority` VALUES (3,1),(4,1),(4,2);
/*!40000 ALTER TABLE `jt_role_authority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_authority`
--

DROP TABLE IF EXISTS `t_authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_authority` (
  `id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKs0jfeye8t0jqlbuyu27xfinr1` (`parent_id`),
  CONSTRAINT `FKs0jfeye8t0jqlbuyu27xfinr1` FOREIGN KEY (`parent_id`) REFERENCES `t_authority` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_authority`
--

LOCK TABLES `t_authority` WRITE;
/*!40000 ALTER TABLE `t_authority` DISABLE KEYS */;
INSERT INTO `t_authority` VALUES (1,NULL,'浏览',NULL,NULL),(2,NULL,'浏览公告',NULL,1),(3,NULL,'浏览本人信息',NULL,1),(4,NULL,'浏览所有员工信息',NULL,1),(5,NULL,'浏览本人工资单',NULL,1),(6,NULL,'浏览所有人工资单',NULL,1),(7,NULL,'申请',NULL,NULL),(8,NULL,'申请请假',NULL,7),(9,NULL,'申请报销',NULL,7),(10,NULL,'申请提交简历',NULL,7),(11,NULL,'批准',NULL,NULL),(12,NULL,'批准升职',NULL,11),(13,NULL,'批准请假',NULL,11),(14,NULL,'批准报销',NULL,11),(15,NULL,'提交',NULL,NULL),(16,NULL,'提交考勤',NULL,16),(17,NULL,'提交个人信息',NULL,16),(18,NULL,'修改',NULL,NULL),(19,NULL,'修改当前角色密码',NULL,18),(20,NULL,'修改当前角色基本信息',NULL,18);
/*!40000 ALTER TABLE `t_authority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_employee`
--

DROP TABLE IF EXISTS `t_employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `guid` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `psw` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_i4jitgahxdiai79pskwtxdj9f` (`guid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_employee`
--

LOCK TABLES `t_employee` WRITE;
/*!40000 ALTER TABLE `t_employee` DISABLE KEYS */;
INSERT INTO `t_employee` VALUES (1,'andyxia49@gmail.com','axia021','Andy Xia','18217265619','1234',NULL),(2,'zhangsan@163.com','rzhang067','San Zhang','15900676628','1234',NULL);
/*!40000 ALTER TABLE `t_employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_role`
--

DROP TABLE IF EXISTS `t_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_role` (
  `id` int(11) NOT NULL,
  `department` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_role`
--

LOCK TABLES `t_role` WRITE;
/*!40000 ALTER TABLE `t_role` DISABLE KEYS */;
INSERT INTO `t_role` VALUES (1,'Finance','Manager'),(2,'Finance','Employee'),(3,'Finance','Intern'),(4,'HR','Manager'),(5,'HR','Campus Recruit'),(6,'HR','InCampus'),(7,'JAVA','Develop'),(8,'JAVA','Testing'),(9,'JAVA','Intern'),(10,'Cleaner',NULL),(11,'Security',NULL),(12,'Visitor',NULL),(13,'SuperAdmin',NULL);
/*!40000 ALTER TABLE `t_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-02-21 17:25:53
