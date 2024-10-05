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
('8ac18c3d-2dd6-4d14-a3e0-5778cb5c7ac4','ef10548d-929e-4bd2-9323-30dc884eafd2','HT2','Hotwheels',10,26,15,12.820512820512821,1,0,'2024-10-02 16:18:00.885','2024-10-02 16:18:00.885');
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
('1db81c24-e773-4586-b6ec-478f520b4cdf','CH','Variado niños',39,500,'2024-10-02 16:17:32.484','2024-10-02 16:22:33.681');
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
('ba46af8e-b498-4f4e-b5df-f4be28f8a66e','e299c6cb-753a-420a-a4bf-243c4b52cceb',1,1500,0,0,NULL,'2024-09-26 23:13:50.477'),
('c0aaf693-fccf-40fc-b770-7c28c02f5e9b','e299c6cb-753a-420a-a4bf-243c4b52cceb',1,1500,0,0,NULL,'2024-09-28 16:05:51.441');
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
('ef10548d-929e-4bd2-9323-30dc884eafd2','Carros','','2024-10-02 16:17:44.959','2024-10-02 16:17:44.959');
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
('1','Jugueteria','','','','','logo.png',36.8,'2024-09-26 22:28:29.229','2024-09-26 22:28:29.228');
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
('5ad9d821-6854-4fe9-bb64-6e0d9ccfe1a9','Varios','','2024-10-02 16:17:22.037','2024-10-02 16:17:22.037');
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
  KEY `fk_detail_purchases_article` (`article_id`),
  KEY `fk_purchases_detail_purchase` (`purchase_id`),
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
('41c3890f-a748-4ca2-8b6f-227b9bc914b8','de45d493-292a-46e0-b6b6-5990ac396ecf','8ac18c3d-2dd6-4d14-a3e0-5778cb5c7ac4',15,35,448.71794871794873,'2024-10-02 16:22:33.681','2024-10-02 16:22:33.682');
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
('7aa9e054-4729-434a-91e7-b0413aff9822','88ff335e-3503-4d59-b448-54ebb64849eb','8ac18c3d-2dd6-4d14-a3e0-5778cb5c7ac4',4,60,0,0,'2024-10-02 19:46:54.332','2024-10-02 19:46:54.332'),
('8c820720-94ed-4355-94a5-ab50367b7753','fcfa6065-16bf-4ed4-8c64-bc30e41bccc0','8ac18c3d-2dd6-4d14-a3e0-5778cb5c7ac4',5,75,0,0,'2024-10-02 19:46:40.307','2024-10-02 19:46:40.308');
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
  `cash_register_id` varchar(255) DEFAULT NULL,
  `petty_cash_id` bigint(20) DEFAULT NULL,
  `num_invoice` varchar(50) DEFAULT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cash_registers_expenses` (`cash_register_id`),
  KEY `fk_petty_cashes_expenses` (`petty_cash_id`),
  CONSTRAINT `fk_cash_registers_expenses` FOREIGN KEY (`cash_register_id`) REFERENCES `cash_registers` (`id`),
  CONSTRAINT `fk_petty_cashes_expenses` FOREIGN KEY (`petty_cash_id`) REFERENCES `petty_cashes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenses`
--

LOCK TABLES `expenses` WRITE;
/*!40000 ALTER TABLE `expenses` DISABLE KEYS */;
INSERT INTO `expenses` VALUES
('54b3de36-cc6b-4c5b-9657-7ae64dfa64af',NULL,1,'','comida',120,'2024-09-30 23:14:05.463','2024-09-30 23:14:05.463');
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
(1,2000,1890,800,'2024-09-26 22:28:29.230','2024-10-02 15:55:43.693');
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
  KEY `fk_purchases_user` (`user_id`),
  KEY `fk_purchases_supplier` (`supplier_id`),
  KEY `fk_purchases_article_box` (`article_box_id`),
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
('de45d493-292a-46e0-b6b6-5990ac396ecf','e299c6cb-753a-420a-a4bf-243c4b52cceb','a5442e7b-6de6-4426-91aa-378dd42e9604','1db81c24-e773-4586-b6ec-478f520b4cdf',0,1,448.71794871794873,'2024-10-02 16:22:33.679','2024-10-02 16:22:33.680');
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
INSERT INTO `refunds` VALUES
('f4e0eb79-3d96-4877-bbe5-a30131f6971f',1,10,'','2024-10-02 15:55:43.691','2024-10-02 15:55:43.691');
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
('88ff335e-3503-4d59-b448-54ebb64849eb','ba46af8e-b498-4f4e-b5df-f4be28f8a66e','5ad9d821-6854-4fe9-bb64-6e0d9ccfe1a9','e299c6cb-753a-420a-a4bf-243c4b52cceb',2,1,0,60,60,100,0,40,'2024-10-02 19:46:54.331','2024-10-02 19:46:54.331'),
('fcfa6065-16bf-4ed4-8c64-bc30e41bccc0','ba46af8e-b498-4f4e-b5df-f4be28f8a66e','5ad9d821-6854-4fe9-bb64-6e0d9ccfe1a9','e299c6cb-753a-420a-a4bf-243c4b52cceb',1,1,0,75,75,80,0,5,'2024-11-03 19:46:40.307','2024-10-02 19:46:40.307');
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
('a5442e7b-6de6-4426-91aa-378dd42e9604','Toys inc','','','','2024-10-02 16:17:14.041','2024-10-02 16:17:14.041'),
('a76a9d7f-a1b8-4216-9946-9ffdc70b6e58','Presa','','','','2024-10-03 18:15:00.300','2024-10-03 18:15:00.300');
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
('45007768-2575-4b31-9002-22a4f8775b23','Alex Urbina','alex@gmail.com','$2a$10$ddbuT2oVoo3f7iE7kfhvjOfDnrdlUjriFk2lsuWwaQO1UxIwvfr7q','vendedor','','2024-10-02 15:52:31.997','2024-10-02 15:52:31.997'),
('e299c6cb-753a-420a-a4bf-243c4b52cceb','Joel Urbina','joel@gmail.com','$2a$10$1GP7wS.kfSkP1meJkYYCO.WN/SA.Il.2dOPyF3o3AfEqfcTZjVdoe','admin','','2024-09-26 22:28:29.227','2024-09-26 22:28:29.226');
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

-- Dump completed on 2024-10-04 21:39:08
