/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.5.2-MariaDB, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: jugueteria
-- ------------------------------------------------------
-- Server version	9.1.0

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
  `description` longtext,
  `minimun_stock` bigint DEFAULT '10',
  `stock` bigint DEFAULT NULL,
  `sale_price` double DEFAULT NULL,
  `purchase_price` double DEFAULT NULL,
  `state` bigint DEFAULT '1',
  `created_at` datetime(3) DEFAULT NULL,
  `update_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_articles_category` (`category_id`),
  CONSTRAINT `fk_articles_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES
('0eb539e8-3d9c-4162-99c5-7637457af381','9b939b32-28e8-4d3a-aad0-9cce8a137b61','FH3','Pequeños de hulk',10,0,0,0,1,'0000-00-00 00:00:00.000','2024-10-14 18:58:22.515'),
('288cd85f-4709-48de-afd3-dc04d2f02aef','9b939b32-28e8-4d3a-aad0-9cce8a137b61','FKC','Capitan america',10,0,0,0,1,'0000-00-00 00:00:00.000','2024-10-14 18:57:56.553'),
('4233b7fa-8b82-4ac0-8d06-11b0eefb6741','e88b3a76-a02e-48a3-baa1-dfb049dca77c','p','Pequeñas de plastico',10,1,26,24.074074074074073,1,'0000-00-00 00:00:00.000','2024-10-09 18:03:50.931'),
('46205891-2e96-4986-bf4b-40f6d13cec0f','8c0c8917-53b0-4baf-8c83-9fdea4556176','ES','Especial hotwheels',10,19,30,22.5,1,'0000-00-00 00:00:00.000','2024-10-09 18:08:15.571'),
('5385d295-362b-4ba6-956a-3d4f284db544','9b939b32-28e8-4d3a-aad0-9cce8a137b61','F12','Mujer maravilla',10,0,0,0,1,'0000-00-00 00:00:00.000','2024-10-14 18:57:39.162'),
('6da29673-015e-402a-a440-980754b90c83','8c0c8917-53b0-4baf-8c83-9fdea4556176','OP','Optimus Prime especial',10,0,330,22.5,1,'0000-00-00 00:00:00.000','2024-10-10 00:02:13.747'),
('7af8eb1c-0823-436f-8cf5-6160cc6bb03f','3fff73db-3f54-41ee-a36f-42d85ee1ea55','MIA','Miutu con altavoz',10,0,0,0,1,'0000-00-00 00:00:00.000','2024-10-10 00:06:15.843'),
('af88b8eb-22e1-4146-9f64-a6a1422f7e56','8c0c8917-53b0-4baf-8c83-9fdea4556176','BU2','Bumbleblee de control remoto',10,1,220,22.5,1,'0000-00-00 00:00:00.000','2024-10-10 00:03:24.395'),
('c94f1c54-772c-43f5-ae58-5cb6e2ab678b','8c0c8917-53b0-4baf-8c83-9fdea4556176','A','Hotwheels',10,45,20,16.72340425531915,1,'0000-00-00 00:00:00.000','2024-10-07 16:12:02.108'),
('d349d900-d909-4f37-8b54-546acfb5ab93','3fff73db-3f54-41ee-a36f-42d85ee1ea55','PI2','Pickachus de colección',10,3,65,22.5,1,'0000-00-00 00:00:00.000','2024-10-10 00:06:46.461'),
('faa5b342-131b-456f-a2b8-33f503d76ec2','9b939b32-28e8-4d3a-aad0-9cce8a137b61','FG1','Flash de metal tamaño grande',10,1,58,24.074074074074073,1,'0000-00-00 00:00:00.000','2024-10-14 18:58:54.376'),
('fdc87132-7cff-4757-8fa6-3b3e8c75e308','8c0c8917-53b0-4baf-8c83-9fdea4556176','N','Machtbox',5,20,70,22.5,1,'0000-00-00 00:00:00.000','2024-10-22 15:20:34.933');
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
  `toys_quantity` bigint DEFAULT NULL,
  `purchase_price` double DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles_boxes`
--

LOCK TABLES `articles_boxes` WRITE;
/*!40000 ALTER TABLE `articles_boxes` DISABLE KEYS */;
INSERT INTO `articles_boxes` VALUES
('507e5444-269b-4b25-b46c-7963ae7dc101','J','MId-20',0,0,'2024-10-22 16:00:58.719','2024-10-22 16:00:58.719'),
('54dcc9da-c05f-4c66-9b5d-77d0eac0913d','A','Niños varios',160,3600,'2024-10-07 16:11:39.124','2024-10-22 15:23:12.487'),
('d07bbc18-f802-4f75-b0aa-4e16683b975e','M','Saco de peluches',0,0,'2024-10-22 15:44:13.296','2024-10-22 15:44:13.296');
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
  `state` bigint DEFAULT '1',
  `initial_balance` double DEFAULT NULL,
  `total_sales` double DEFAULT NULL,
  `total_expenses` double DEFAULT NULL,
  `total_cordobas` double DEFAULT NULL,
  `missing_in_cordobas` double DEFAULT NULL,
  `cordobas_surplus` double DEFAULT NULL,
  `total_dollars` double DEFAULT NULL,
  `missing_in_dollars` double DEFAULT NULL,
  `dollars_surplus` double DEFAULT NULL,
  `closed_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cash_registers_users` (`user_id`),
  CONSTRAINT `fk_cash_registers_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cash_registers`
--

LOCK TABLES `cash_registers` WRITE;
/*!40000 ALTER TABLE `cash_registers` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES
('3fff73db-3f54-41ee-a36f-42d85ee1ea55','Pokemons','','2024-10-10 00:04:40.654','2024-10-10 00:04:40.654'),
('8c0c8917-53b0-4baf-8c83-9fdea4556176','Carros','','2024-10-07 16:11:10.875','2024-10-07 16:11:10.875'),
('9b939b32-28e8-4d3a-aad0-9cce8a137b61','Funkos','','2024-10-14 18:57:01.481','2024-10-14 18:57:01.481'),
('e88b3a76-a02e-48a3-baa1-dfb049dca77c','Muñecas LOL','','2024-10-09 18:03:26.032','2024-10-09 18:03:26.032');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES
('1','Jugueteria','','','','','',36.8,'2024-10-29 21:04:49.761','2024-10-29 21:04:49.759');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `costumers`
--

LOCK TABLES `costumers` WRITE;
/*!40000 ALTER TABLE `costumers` DISABLE KEYS */;
INSERT INTO `costumers` VALUES
('74d73002-f477-4d45-9457-5bc4800da84f','Marcos','','2024-10-16 16:00:07.137','2024-10-16 16:00:07.137'),
('7ca57a26-faa3-4845-a4e4-ea6efbedaeb6','Heidy','','2024-10-22 16:00:16.165','2024-10-22 16:00:16.165'),
('7cc9107f-476f-41fb-80d7-7b95664af2b5','Pedro','','2024-10-07 16:11:00.626','2024-10-07 16:11:00.626'),
('88e7abbf-5b38-428b-a079-e04ed2feeec8','Juan','45253256','2024-10-22 15:42:09.045','2024-10-22 15:42:09.045'),
('ec866bf3-0e24-4cdd-8dc9-bce5be0b92ed','Juan Carros de madera','58963256','2024-10-22 15:42:48.335','2024-10-22 15:42:48.335'),
('eee1ed84-aa78-4546-be9a-93eb68c004a8','Martha','','2024-10-16 16:32:26.007','2024-10-16 16:32:26.007'),
('f83e26cd-e711-444e-9d01-72f95310fbd2','Varios','','2024-10-07 16:11:04.575','2024-10-07 16:11:04.575'),
('fcea00be-45ab-4435-b749-3e58457fb1ca','Alex','','2024-10-16 20:40:43.028','2024-10-16 20:40:43.028');
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
  `zero_point_five` double DEFAULT NULL,
  `one` bigint DEFAULT NULL,
  `five` bigint DEFAULT NULL,
  `ten` bigint DEFAULT NULL,
  `twenty` bigint DEFAULT NULL,
  `fyfty` bigint DEFAULT NULL,
  `one_hundred` bigint DEFAULT NULL,
  `two_hundred` bigint DEFAULT NULL,
  `five_hundred` bigint DEFAULT NULL,
  `one_thousand` bigint DEFAULT NULL,
  `total_dollar` double DEFAULT NULL,
  `total_cordoba` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cash_registers_denomination` (`cash_register_id`),
  CONSTRAINT `fk_cash_registers_denomination` FOREIGN KEY (`cash_register_id`) REFERENCES `cash_registers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `quantity` bigint DEFAULT NULL,
  `subtotal` double DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_detail_purchases_article` (`article_id`),
  KEY `fk_purchases_detail_purchase` (`purchase_id`),
  CONSTRAINT `fk_detail_purchases_article` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`),
  CONSTRAINT `fk_purchases_detail_purchase` FOREIGN KEY (`purchase_id`) REFERENCES `purchases` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_purchases`
--

LOCK TABLES `detail_purchases` WRITE;
/*!40000 ALTER TABLE `detail_purchases` DISABLE KEYS */;
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
  `quantity` bigint DEFAULT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_sales`
--

LOCK TABLES `detail_sales` WRITE;
/*!40000 ALTER TABLE `detail_sales` DISABLE KEYS */;
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
  `petty_cash_id` bigint DEFAULT NULL,
  `num_invoice` varchar(50) DEFAULT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_expenses_cash_register` (`cash_register_id`),
  KEY `fk_petty_cashes_expenses` (`petty_cash_id`),
  CONSTRAINT `fk_expenses_cash_register` FOREIGN KEY (`cash_register_id`) REFERENCES `cash_registers` (`id`),
  CONSTRAINT `fk_petty_cashes_expenses` FOREIGN KEY (`petty_cash_id`) REFERENCES `petty_cashes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenses`
--

LOCK TABLES `expenses` WRITE;
/*!40000 ALTER TABLE `expenses` DISABLE KEYS */;
/*!40000 ALTER TABLE `expenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `other_inventory_outputs`
--

DROP TABLE IF EXISTS `other_inventory_outputs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `other_inventory_outputs` (
  `id` varchar(191) NOT NULL,
  `article_id` varchar(255) DEFAULT NULL,
  `quantity` bigint DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `update_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_other_inventory_outputs_article` (`article_id`),
  CONSTRAINT `fk_other_inventory_outputs_article` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `other_inventory_outputs`
--

LOCK TABLES `other_inventory_outputs` WRITE;
/*!40000 ALTER TABLE `other_inventory_outputs` DISABLE KEYS */;
/*!40000 ALTER TABLE `other_inventory_outputs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `petty_cashes`
--

DROP TABLE IF EXISTS `petty_cashes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `petty_cashes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `initial_balance` double DEFAULT NULL,
  `balance` double DEFAULT NULL,
  `limit` double DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `update_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `petty_cashes`
--

LOCK TABLES `petty_cashes` WRITE;
/*!40000 ALTER TABLE `petty_cashes` DISABLE KEYS */;
INSERT INTO `petty_cashes` VALUES
(1,1000,1000,500,'2024-10-29 21:04:49.764','2024-10-29 21:04:49.763');
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
  `state` bigint DEFAULT '0',
  `code` bigint DEFAULT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchases`
--

LOCK TABLES `purchases` WRITE;
/*!40000 ALTER TABLE `purchases` DISABLE KEYS */;
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
  `petty_cash_id` bigint DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `observation` longtext,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_petty_cashes_refunds` (`petty_cash_id`),
  CONSTRAINT `fk_petty_cashes_refunds` FOREIGN KEY (`petty_cash_id`) REFERENCES `petty_cashes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `code` bigint DEFAULT NULL,
  `state` bigint DEFAULT '1',
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
  KEY `fk_sales_user` (`user_id`),
  CONSTRAINT `fk_sales_costumer` FOREIGN KEY (`costumer_id`) REFERENCES `costumers` (`id`),
  CONSTRAINT `fk_sales_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
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
  `company` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `update_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES
('0e1ecdf0-b655-49a5-b6ee-8b40d9875613','Best Brand','Alex Pineda','','Pacas monzeñor','87567343','2024-10-07 16:10:52.167','0000-00-00 00:00:00.000'),
('293a9671-5d35-4c6a-9176-e18010fbed29','Best Brand','Marcos Centeno','','Matagalpa','23458765','2024-10-16 17:38:35.565','0000-00-00 00:00:00.000'),
('53dbe60a-d77a-471e-b760-950efb11024c','Best Brand','Maria Cruz','','Pacas matagalpa','56456324','2024-10-08 08:21:05.476','0000-00-00 00:00:00.000'),
('66e76a32-c8de-4935-b4a6-fc7ec844d437','Toys inc','Cruz Perex','','Sede Jinotega','56456324','2024-10-29 21:24:11.111','2024-10-29 21:24:11.111'),
('e9ac3da2-a6b8-4ac5-9487-9269ddf91334','Best Brand','Pablo Cruz','','Managua central','87567343','2024-10-16 17:32:39.800','0000-00-00 00:00:00.000');
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
  `picture` longtext,
  `created_at` datetime(3) DEFAULT NULL,
  `update_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uni_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
('5be21058-2809-4dfe-a0ba-9f36b98adf4f','Miguel','miguel@gmail.com','$2a$10$aI.FCpNmns6YMOKL5RIky.e/osoV9vSG9EcHCLNIBsSlhRotcg0d2','admin','miguel@gmail.com.jpg','2024-10-07 16:00:20.784','2024-10-07 16:00:20.784'),
('80fe7a34-852a-4389-af82-44a8f7c3fbd1','Joel Urbina','joel8080ur@gmail.com','$2a$10$0O/tKT6Wsw7HBbAsC8nw.uh.ylu5TphHUOUG/CR8jsdwGU/B/js..','admin','joel8080ur@gmail.com.webp','2024-10-07 15:34:13.802','2024-10-16 20:22:15.577'),
('8f0f3e44-8596-4b97-841b-bb3ae3e5cf51','Alex','alex@gmail.com','$2a$10$5o.shHEtoExphSumKw3WzeicfTcLMn5zmB36IctHq2bZSJP6JnpmK','admin','alex@gmail.com.jpg','2024-10-07 15:53:27.238','2024-10-07 15:53:27.238'),
('cf59e4dd-223f-4ac8-b554-c9d62b0da6fb','Joel Urbina','joel@gmail.com','$2a$10$2AVycPtKJD94HM1yhuUNw.YEJrvPaRMtgNcPeQuEB58bONzNuKCd6','admin','','2024-10-29 21:04:49.756','2024-10-29 21:04:49.755');
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

-- Dump completed on 2024-10-29 21:25:00
