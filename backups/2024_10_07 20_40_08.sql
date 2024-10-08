/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.5.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: jugueteria
-- ------------------------------------------------------
-- Server version	11.5.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articles` (
  `id` varchar(191) NOT NULL,
  `category_id` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `minimun_stock` bigint(20) DEFAULT 10,
  `stock` bigint(20) DEFAULT NULL,
  `sale_price` double DEFAULT NULL,
  `purchase_price` double DEFAULT NULL,
  `state` bigint(20) DEFAULT 1,
  `profit` double DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `update_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_articles_category` (`category_id`),
  CONSTRAINT `fk_articles_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES
('c94f1c54-772c-43f5-ae58-5cb6e2ab678b','8c0c8917-53b0-4baf-8c83-9fdea4556176','A','Hotwheels',10,60,50,31.428571428571427,1,0,'2024-10-07 16:12:02.108','2024-10-07 16:12:02.108');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articles_boxes`
--

DROP TABLE IF EXISTS `articles_boxes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articles_boxes` (
  `id` varchar(191) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `toys_quantity` bigint(20) DEFAULT NULL,
  `purchase_price` double DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles_boxes`
--

LOCK TABLES `articles_boxes` WRITE;
/*!40000 ALTER TABLE `articles_boxes` DISABLE KEYS */;
INSERT INTO `articles_boxes` VALUES
('54dcc9da-c05f-4c66-9b5d-77d0eac0913d','A','Niños varios',35,1100,'2024-10-07 16:11:39.124','2024-10-07 18:00:54.967');
/*!40000 ALTER TABLE `articles_boxes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cash_registers`
--

DROP TABLE IF EXISTS `cash_registers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cash_registers` (
  `id` varchar(191) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `state` bigint(20) DEFAULT 1,
  `initial_balance` double DEFAULT NULL,
  `total_cash_balance` double DEFAULT NULL,
  `total_sales` double DEFAULT NULL,
  `closed_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cash_registers_users` (`user_id`),
  CONSTRAINT `fk_cash_registers_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cash_registers`
--

LOCK TABLES `cash_registers` WRITE;
/*!40000 ALTER TABLE `cash_registers` DISABLE KEYS */;
INSERT INTO `cash_registers` VALUES
('9a94f86d-8026-4412-81c7-5eae95e09e39','80fe7a34-852a-4389-af82-44a8f7c3fbd1',1,1000,0,0,NULL,'2024-10-07 18:07:06.189');
/*!40000 ALTER TABLE `cash_registers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` varchar(191) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `update_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES
('8c0c8917-53b0-4baf-8c83-9fdea4556176','Carros','','2024-10-07 16:11:10.875','2024-10-07 16:11:10.875');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies` (
  `id` varchar(191) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `ruc` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `price_dollar` double DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `update_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES
('1','Jugueteria','','','','','logo.png',36.8,'0000-00-00 00:00:00.000','2024-10-07 15:42:53.677');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `costumers`
--

DROP TABLE IF EXISTS `costumers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `costumers` (
  `id` varchar(191) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `update_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `costumers`
--

LOCK TABLES `costumers` WRITE;
/*!40000 ALTER TABLE `costumers` DISABLE KEYS */;
INSERT INTO `costumers` VALUES
('7cc9107f-476f-41fb-80d7-7b95664af2b5','Pedro','','2024-10-07 16:11:00.626','2024-10-07 16:11:00.626'),
('f83e26cd-e711-444e-9d01-72f95310fbd2','Varios','','2024-10-07 16:11:04.575','2024-10-07 16:11:04.575');
/*!40000 ALTER TABLE `costumers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `denominations`
--

DROP TABLE IF EXISTS `denominations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `denominations` (
  `id` varchar(191) NOT NULL,
  `cash_register_id` varchar(255) DEFAULT NULL,
  `comes_with_denomination` varchar(5) DEFAULT NULL,
  `one` bigint(20) DEFAULT NULL,
  `five` bigint(20) DEFAULT NULL,
  `ten` bigint(20) DEFAULT NULL,
  `twenty` bigint(20) DEFAULT NULL,
  `fyfty` bigint(20) DEFAULT NULL,
  `one_hundred` bigint(20) DEFAULT NULL,
  `two_hundred` bigint(20) DEFAULT NULL,
  `five_hundred` bigint(20) DEFAULT NULL,
  `one_thousand` bigint(20) DEFAULT NULL,
  `total_dollar` double DEFAULT NULL,
  `total_cordoba` double DEFAULT NULL,
  `total` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cash_registers_denomination` (`cash_register_id`),
  CONSTRAINT `fk_cash_registers_denomination` FOREIGN KEY (`cash_register_id`) REFERENCES `cash_registers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `denominations`
--

LOCK TABLES `denominations` WRITE;
/*!40000 ALTER TABLE `denominations` DISABLE KEYS */;
/*!40000 ALTER TABLE `denominations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail_purchases`
--

DROP TABLE IF EXISTS `detail_purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detail_purchases` (
  `id` varchar(191) NOT NULL,
  `purchase_id` varchar(255) DEFAULT NULL,
  `article_id` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `quantity` bigint(20) DEFAULT NULL,
  `subtotal` double DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_purchases_detail_purchase` (`purchase_id`),
  KEY `fk_detail_purchases_article` (`article_id`),
  CONSTRAINT `fk_detail_purchases_article` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`),
  CONSTRAINT `fk_purchases_detail_purchase` FOREIGN KEY (`purchase_id`) REFERENCES `purchases` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_purchases`
--

LOCK TABLES `detail_purchases` WRITE;
/*!40000 ALTER TABLE `detail_purchases` DISABLE KEYS */;
INSERT INTO `detail_purchases` VALUES
('4c73a09b-db43-4bda-ad83-6d4cb13f9ab1','131f45f4-a86a-4187-be56-cc04cb7413ce','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',50,35,1100,'2024-10-07 18:00:54.970','2024-10-07 18:00:54.970'),
('ab222a91-7d32-416a-a669-87a7c2c4d1c4','9af90fcb-86b0-4071-9598-d4f25df285a8','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',50,30,1200,'2024-10-07 17:35:54.510','2024-10-07 17:41:52.337');
/*!40000 ALTER TABLE `detail_purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail_sales`
--

DROP TABLE IF EXISTS `detail_sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detail_sales` (
  `id` varchar(191) NOT NULL,
  `sale_id` varchar(255) DEFAULT NULL,
  `article_id` varchar(255) DEFAULT NULL,
  `quantity` bigint(20) DEFAULT NULL,
  `subtotal` double DEFAULT NULL,
  `profit` double DEFAULT NULL,
  `discount` double DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_detail_sales_article` (`article_id`),
  KEY `fk_sales_detail_sale` (`sale_id`),
  CONSTRAINT `fk_detail_sales_article` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`),
  CONSTRAINT `fk_sales_detail_sale` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_sales`
--

LOCK TABLES `detail_sales` WRITE;
/*!40000 ALTER TABLE `detail_sales` DISABLE KEYS */;
INSERT INTO `detail_sales` VALUES
('6de29772-b43a-4beb-8c74-f14e6069e3eb','1412112f-c33e-4657-b43d-e39168607dee','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',5,250,0,0,'2024-10-07 20:39:41.854','2024-10-07 20:39:41.854');
/*!40000 ALTER TABLE `detail_sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expenses`
--

DROP TABLE IF EXISTS `expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `expenses` (
  `id` varchar(191) NOT NULL,
  `petty_cash_id` bigint(20) DEFAULT NULL,
  `num_invoice` varchar(50) DEFAULT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_petty_cashes_expenses` (`petty_cash_id`),
  CONSTRAINT `fk_petty_cashes_expenses` FOREIGN KEY (`petty_cash_id`) REFERENCES `petty_cashes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenses`
--

LOCK TABLES `expenses` WRITE;
/*!40000 ALTER TABLE `expenses` DISABLE KEYS */;
/*!40000 ALTER TABLE `expenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `petty_cashes`
--

DROP TABLE IF EXISTS `petty_cashes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `petty_cashes` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `initial_balance` double DEFAULT NULL,
  `balance` double DEFAULT NULL,
  `limit` double DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `update_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `petty_cashes`
--

LOCK TABLES `petty_cashes` WRITE;
/*!40000 ALTER TABLE `petty_cashes` DISABLE KEYS */;
INSERT INTO `petty_cashes` VALUES
(1,1000,1000,500,'0000-00-00 00:00:00.000','2024-10-07 15:42:53.677');
/*!40000 ALTER TABLE `petty_cashes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchases`
--

DROP TABLE IF EXISTS `purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchases` (
  `id` varchar(191) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `supplier_id` varchar(255) DEFAULT NULL,
  `article_box_id` varchar(255) DEFAULT NULL,
  `state` bigint(20) DEFAULT 0,
  `code` bigint(20) DEFAULT NULL,
  `total` double DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_purchases_supplier` (`supplier_id`),
  KEY `fk_purchases_article_box` (`article_box_id`),
  KEY `fk_purchases_user` (`user_id`),
  CONSTRAINT `fk_purchases_article_box` FOREIGN KEY (`article_box_id`) REFERENCES `articles_boxes` (`id`),
  CONSTRAINT `fk_purchases_supplier` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`),
  CONSTRAINT `fk_purchases_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchases`
--

LOCK TABLES `purchases` WRITE;
/*!40000 ALTER TABLE `purchases` DISABLE KEYS */;
INSERT INTO `purchases` VALUES
('131f45f4-a86a-4187-be56-cc04cb7413ce','80fe7a34-852a-4389-af82-44a8f7c3fbd1','0e1ecdf0-b655-49a5-b6ee-8b40d9875613','54dcc9da-c05f-4c66-9b5d-77d0eac0913d',0,2,1100,'2024-10-07 18:00:54.965','2024-10-07 18:00:54.966'),
('9af90fcb-86b0-4071-9598-d4f25df285a8','80fe7a34-852a-4389-af82-44a8f7c3fbd1','0e1ecdf0-b655-49a5-b6ee-8b40d9875613','54dcc9da-c05f-4c66-9b5d-77d0eac0913d',1,1,1200,'2024-10-07 17:35:54.506','2024-10-07 17:41:52.335');
/*!40000 ALTER TABLE `purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refunds`
--

DROP TABLE IF EXISTS `refunds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `refunds` (
  `id` varchar(191) NOT NULL,
  `petty_cash_id` bigint(20) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `observation` longtext DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_petty_cashes_refunds` (`petty_cash_id`),
  CONSTRAINT `fk_petty_cashes_refunds` FOREIGN KEY (`petty_cash_id`) REFERENCES `petty_cashes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refunds`
--

LOCK TABLES `refunds` WRITE;
/*!40000 ALTER TABLE `refunds` DISABLE KEYS */;
/*!40000 ALTER TABLE `refunds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales` (
  `id` varchar(191) NOT NULL,
  `cash_register_id` varchar(255) DEFAULT NULL,
  `costumer_id` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `code` bigint(20) DEFAULT NULL,
  `state` bigint(20) DEFAULT 1,
  `discount_total` double DEFAULT NULL,
  `neto` double DEFAULT NULL,
  `total` double DEFAULT NULL,
  `cash_cordoba` double DEFAULT NULL,
  `cash_dollar` double DEFAULT NULL,
  `exchange` double DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `update_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sales_costumer` (`costumer_id`),
  CONSTRAINT `fk_sales_costumer` FOREIGN KEY (`costumer_id`) REFERENCES `costumers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES
('1412112f-c33e-4657-b43d-e39168607dee','9a94f86d-8026-4412-81c7-5eae95e09e39','7cc9107f-476f-41fb-80d7-7b95664af2b5','80fe7a34-852a-4389-af82-44a8f7c3fbd1',1,1,0,250,250,250,0,0,'2024-10-07 20:39:41.853','2024-10-07 20:39:41.853');
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suppliers` (
  `id` varchar(191) NOT NULL,
  `name` longtext DEFAULT NULL,
  `email` longtext DEFAULT NULL,
  `address` longtext DEFAULT NULL,
  `phone` longtext DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `update_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES
('0e1ecdf0-b655-49a5-b6ee-8b40d9875613','Toys inc','','','','2024-10-07 16:10:52.167','2024-10-07 16:10:52.167');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` varchar(191) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `picture` longtext DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `update_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uni_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
('5be21058-2809-4dfe-a0ba-9f36b98adf4f','Miguel','miguel@gmail.com','$2a$10$aI.FCpNmns6YMOKL5RIky.e/osoV9vSG9EcHCLNIBsSlhRotcg0d2','vendedor','miguel@gmail.com.jpg','2024-10-07 16:00:20.784','2024-10-07 16:00:20.784'),
('80fe7a34-852a-4389-af82-44a8f7c3fbd1','Joel Urbina','joel@gmail.com','$2a$10$UuTd3COM3ee6206WMRrKmekrTCi50/BEVTLlXpFr49ritzjwOIABe','admin','joel@gmail.com.webp','2024-10-07 15:34:13.802','2024-10-07 15:42:53.674'),
('8f0f3e44-8596-4b97-841b-bb3ae3e5cf51','alex@gmail.com','alex@gmail.com','$2a$10$5o.shHEtoExphSumKw3WzeicfTcLMn5zmB36IctHq2bZSJP6JnpmK','vendedor','alex@gmail.com.jpg','2024-10-07 15:53:27.238','2024-10-07 15:53:27.238');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2024-10-07 20:40:08
