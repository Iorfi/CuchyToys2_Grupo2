-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: cuchytoys_nombredb
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.21-MariaDB

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `CREATED_AT` datetime NOT NULL,
  `MODIFIED_AT` datetime DEFAULT NULL,
  `DELETED_AT` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Juegos de mesa','2021-12-06 00:00:00',NULL,NULL),(2,'Aprendiendo a escribir','2021-12-06 00:00:00',NULL,NULL),(3,'Grafomotricidad','2021-12-06 00:00:00',NULL,NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `PRICE` text COLLATE utf8_unicode_ci NOT NULL,
  `DESCRIPTION` text COLLATE utf8_unicode_ci NOT NULL,
  `IMAGE` text COLLATE utf8_unicode_ci NOT NULL,
  `CATEGORY_ID` int(11) NOT NULL,
  `SUBCATEGORY_ID` int(11) NOT NULL,
  `DESTACADO` tinyint(4) NOT NULL,
  `DISCOUNT` int(11) DEFAULT NULL,
  `CREATED_AT` datetime NOT NULL,
  `MODIFIED_AT` datetime DEFAULT NULL,
  `DELETED_AT` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `product_FK` (`CATEGORY_ID`),
  KEY `product_FK_1` (`SUBCATEGORY_ID`),
  CONSTRAINT `product_FK` FOREIGN KEY (`CATEGORY_ID`) REFERENCES `categories` (`ID`),
  CONSTRAINT `product_FK_1` FOREIGN KEY (`SUBCATEGORY_ID`) REFERENCES `subcategories` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'TaTeTi Selva','150','TaTeTi suerte para Mi','https://images.app.goo.gl/CeqsPXZtWeQWvF428',1,2,0,NULL,'2021-12-06 00:00:00',NULL,NULL),(2,'Memotest Graja','180','Recuerda y venceras','https://images.app.goo.gl/AsZ1KAXenhPde9Qh9',1,4,0,NULL,'2021-12-06 00:00:00',NULL,NULL),(3,'Escribiendo Números Mar','250','Aprendiendo a escribir números','https://images.app.goo.gl/JhUsQ6PoK1D6ySBU7',3,3,0,NULL,'2021-12-06 00:00:00',NULL,NULL),(4,'Leo y Escribo Bosque','370','Leo y Escribo jojojo','https://images.app.goo.gl/C9h15e61XJKKxs5F9',2,1,0,NULL,'2021-12-06 00:00:00',NULL,NULL),(5,'A seguir la linea! Mar','450','Vamos a seguir la linea!!','https://images.app.goo.gl/Z6XCk7ZynnBNz241A',3,3,1,NULL,'2021-12-06 00:00:00',NULL,NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subcategories` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `CREATED_AT` datetime NOT NULL,
  `MODIFIED_AT` datetime DEFAULT NULL,
  `DELETED_AT` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (1,'Bosque','2021-12-06 00:00:00',NULL,NULL),(2,'Selva','2021-12-06 00:00:00',NULL,NULL),(3,'Mar','2021-12-06 00:00:00',NULL,NULL),(4,'Granja','2021-12-06 00:00:00',NULL,NULL);
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userproduct`
--

DROP TABLE IF EXISTS `userproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userproduct` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_ID` int(11) NOT NULL,
  `PRODUCT_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `userproduct_FK` (`USER_ID`),
  KEY `userproduct_FK_1` (`PRODUCT_ID`),
  CONSTRAINT `userproduct_FK` FOREIGN KEY (`USER_ID`) REFERENCES `users` (`ID`),
  CONSTRAINT `userproduct_FK_1` FOREIGN KEY (`PRODUCT_ID`) REFERENCES `product` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userproduct`
--

LOCK TABLES `userproduct` WRITE;
/*!40000 ALTER TABLE `userproduct` DISABLE KEYS */;
/*!40000 ALTER TABLE `userproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `USERNAME` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `EMAIL` varchar(70) COLLATE utf8_unicode_ci NOT NULL,
  `PASSWORD` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `AVATAR` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `CREATED_AT` datetime NOT NULL,
  `MODIFIED_AT` datetime DEFAULT NULL,
  `DELETED_AT` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (6,'Matias','Dopazo','Mati@dopazo.com','$2a$10$BspeySPDaLnWiDlE4LV49.nxqQVnX2HDHBAIrujmjEY','users-1638929216797.png','0000-00-00 00:00:00',NULL,NULL),(7,'Bautista','Iorfi','bauti@iorfi.com','$2a$10$2GcUQ/gUdzIsYCUJLn0jT.ICIodS.Vd65d.IeLskgJz','users-1638929247222.png','0000-00-00 00:00:00',NULL,NULL),(8,'Juan','Tuso','juan@tuso.com','$2a$10$I0fmARiEUxykGUfaPPBqieATeSHXwiKfLG4BBz/4L6E','users-1638929272295.png','0000-00-00 00:00:00',NULL,NULL),(9,'prueba','prueba','prueba@prueba.com','$2a$10$TDmw31o0ppJ.Hcz2ZekUPe8cvmn/jqjY4wzKXHQZmJW','users-1638929335183.png','0000-00-00 00:00:00',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'cuchytoys_nombredb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-07 23:14:19
