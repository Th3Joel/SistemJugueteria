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
('0eb539e8-3d9c-4162-99c5-7637457af381','9b939b32-28e8-4d3a-aad0-9cce8a137b61','FH3','Pequeños de hulk',10,0,0,0,1,0,'2024-10-14 18:58:22.515','2024-10-14 18:58:22.515'),
('288cd85f-4709-48de-afd3-dc04d2f02aef','9b939b32-28e8-4d3a-aad0-9cce8a137b61','FKC','Capitan america',10,0,0,0,1,0,'2024-10-14 18:57:56.553','2024-10-14 18:57:56.553'),
('4233b7fa-8b82-4ac0-8d06-11b0eefb6741','e88b3a76-a02e-48a3-baa1-dfb049dca77c','p','Pequeñas de plastico',10,1,26,24.074074074074073,1,0,'2024-10-09 18:03:50.931','2024-10-10 09:41:17.160'),
('46205891-2e96-4986-bf4b-40f6d13cec0f','8c0c8917-53b0-4baf-8c83-9fdea4556176','ES','Especial hotwheels',10,19,30,22.5,1,0,'2024-10-09 18:08:15.571','2024-10-10 09:46:44.259'),
('5385d295-362b-4ba6-956a-3d4f284db544','9b939b32-28e8-4d3a-aad0-9cce8a137b61','F12','Mujer maravilla',10,0,0,0,1,0,'2024-10-14 18:57:39.162','2024-10-14 18:57:39.162'),
('6da29673-015e-402a-a440-980754b90c83','8c0c8917-53b0-4baf-8c83-9fdea4556176','OP','Optimus Prime especial',10,0,330,22.5,1,0,'2024-10-10 00:02:13.747','2024-10-10 00:02:13.747'),
('7af8eb1c-0823-436f-8cf5-6160cc6bb03f','3fff73db-3f54-41ee-a36f-42d85ee1ea55','MIA','Miutu con altavoz',10,0,0,0,1,0,'2024-10-10 00:06:15.843','2024-10-10 00:06:15.843'),
('af88b8eb-22e1-4146-9f64-a6a1422f7e56','8c0c8917-53b0-4baf-8c83-9fdea4556176','BU2','Bumbleblee de control remoto',10,1,220,22.5,1,0,'2024-10-10 00:03:24.395','2024-10-10 00:03:24.395'),
('c94f1c54-772c-43f5-ae58-5cb6e2ab678b','8c0c8917-53b0-4baf-8c83-9fdea4556176','A','Hotwheels',10,45,20,16.72340425531915,1,0,'2024-10-07 16:12:02.108','2024-10-14 18:07:31.509'),
('d349d900-d909-4f37-8b54-546acfb5ab93','3fff73db-3f54-41ee-a36f-42d85ee1ea55','PI2','Pickachus de colección',10,3,65,22.5,1,0,'2024-10-10 00:06:46.461','2024-10-10 00:06:46.461'),
('faa5b342-131b-456f-a2b8-33f503d76ec2','9b939b32-28e8-4d3a-aad0-9cce8a137b61','FG1','Flash de metal tamaño grande',10,1,58,24.074074074074073,1,0,'2024-10-14 18:58:54.376','2024-10-14 18:58:54.376'),
('fdc87132-7cff-4757-8fa6-3b3e8c75e308','8c0c8917-53b0-4baf-8c83-9fdea4556176','N','Machtbox',5,20,70,22.5,1,0,'2024-10-22 15:20:34.933','2024-10-22 15:20:34.933');
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
  `state` bigint(20) DEFAULT 1,
  `initial_balance` double DEFAULT NULL,
  `total_cash_balance` double DEFAULT NULL,
  `total_sales` double DEFAULT NULL,
  `closed_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `total_expenses` double DEFAULT NULL,
  `total_cordobas` double DEFAULT NULL,
  `missing_in_cordobas` double DEFAULT NULL,
  `cordobas_surplus` double DEFAULT NULL,
  `total_dollars` double DEFAULT NULL,
  `missing_in_dollars` double DEFAULT NULL,
  `dollars_surplus` double DEFAULT NULL,
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
('2029458d-0dd9-4103-9ed8-9cf8f78e349e','80fe7a34-852a-4389-af82-44a8f7c3fbd1',0,2583,NULL,180,'2024-10-15 02:55:44.395','2024-10-15 02:43:08.601',256,1182.2,0,2.2999999999999545,36,0,0),
('25ff949c-3763-4b90-b2c3-fa9b39cc5b86','80fe7a34-852a-4389-af82-44a8f7c3fbd1',0,1500,NULL,0,'2024-10-15 22:02:32.530','2024-10-15 19:07:39.941',0,1500,0,0,0,0,0),
('3239ab65-6d41-4644-adfb-c93a95587bf6','80fe7a34-852a-4389-af82-44a8f7c3fbd1',0,500,NULL,0,'2024-10-22 16:14:59.374','2024-10-22 16:14:23.806',162,338,0,0,0,0,0),
('360ac010-5718-4046-a295-c51a8719eded','80fe7a34-852a-4389-af82-44a8f7c3fbd1',0,1000,NULL,60,'2024-10-22 16:11:50.907','2024-10-22 16:01:41.342',162,898,0,0,0,0,0),
('3a31913c-c029-4b6e-ad7b-ab945cabb781','5be21058-2809-4dfe-a0ba-9f36b98adf4f',0,3000,NULL,136,'2024-10-10 01:00:04.839','2024-10-10 00:35:56.727',60,2965.6,0,59.40000000000009,3,0,0),
('3e3d54f8-117e-46e4-917e-9182ad525051','80fe7a34-852a-4389-af82-44a8f7c3fbd1',0,1,NULL,823,'2024-10-22 15:31:17.582','2024-10-22 15:16:46.721',0,88,0,0,20,0,0),
('5b807dbd-9bf3-4d14-af39-18e98cdbb44d','80fe7a34-852a-4389-af82-44a8f7c3fbd1',0,2000,NULL,130,'2024-10-10 00:54:56.401','2024-10-10 00:07:18.467',40,2016.4,0,39.59999999999991,2,0,0),
('680ecb99-d89e-44bf-8fa8-080021f70750','80fe7a34-852a-4389-af82-44a8f7c3fbd1',0,2400,NULL,0,'2024-10-22 15:16:02.694','2024-10-15 23:08:53.097',0,2400,0,0,0,0,0),
('6f7911d9-5059-48af-b3ee-4d9fd7ac1cb5','5be21058-2809-4dfe-a0ba-9f36b98adf4f',0,1300,NULL,323,'2024-10-10 02:04:33.855','2024-10-10 01:59:53.548',0,1586.2,0.20000000000004547,0,1,0,0),
('9869e770-bda2-47fb-a64f-8056d22b060b','80fe7a34-852a-4389-af82-44a8f7c3fbd1',0,1500,NULL,0,'2024-10-09 21:57:34.405','2024-10-09 18:35:50.495',200,1300,0,0,0,0,0),
('b119e417-88e6-42ab-9085-0042e71269ff','5be21058-2809-4dfe-a0ba-9f36b98adf4f',0,1200,NULL,136,'2024-10-10 01:58:33.623','2024-10-10 01:03:19.982',30,1195.6,0.599999999999909,0,3,0,0),
('b9ba6cd1-5d72-43fb-9a1b-3d40a98d3bf0','5be21058-2809-4dfe-a0ba-9f36b98adf4f',0,1600,NULL,0,'2024-10-22 15:52:07.892','2024-10-16 21:20:58.900',0,1600,0,0,0,0,0),
('d0be5da3-3f5d-4984-ad05-10d3f5f6057a','80fe7a34-852a-4389-af82-44a8f7c3fbd1',0,1200,NULL,250,'2024-10-10 08:38:05.791','2024-10-10 08:17:12.230',200,1066,66,0,5,0,0),
('d33f2fc1-1643-40ab-98c6-f47a31b68040','80fe7a34-852a-4389-af82-44a8f7c3fbd1',1,500,NULL,0,NULL,'2024-10-22 16:16:34.535',0,0,0,0,0,0,0),
('d4c75ff0-644f-440c-b205-a5f2fefc9961','5be21058-2809-4dfe-a0ba-9f36b98adf4f',0,1000,NULL,170,'2024-10-22 15:56:16.518','2024-10-22 15:52:55.356',0,1170,0,0,0,0,0),
('fafbc9d5-6943-4008-8b95-4ac4edfa101d','80fe7a34-852a-4389-af82-44a8f7c3fbd1',0,2000,NULL,800,'2024-10-09 16:22:52.005','2024-10-09 16:08:15.178',150,2282,2,0,10,1,0);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES
('1','Coleccióname','','','coleccióname@gmail.com','34565432','logo.png',36.8,'0000-00-00 00:00:00.000','2024-10-07 15:42:53.677');
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
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  `zero_point_five` double DEFAULT NULL,
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
INSERT INTO `denominations` VALUES
('050cb4c1-f558-47f7-806e-ae91f4d94b52','680ecb99-d89e-44bf-8fa8-080021f70750','',0,0,0,0,0,4,0,0,2,0,2400,NULL,0),
('061fda7b-3fe8-4ee9-b4bd-47fa4b3c5d9d','25ff949c-3763-4b90-b2c3-fa9b39cc5b86','',0,0,0,0,0,0,0,1,1,0,1500,NULL,0),
('13b4f13f-405b-4ebf-981e-8d68e31b74cb','b9ba6cd1-5d72-43fb-9a1b-3d40a98d3bf0','',0,0,0,50,0,6,0,0,0,0,1600,NULL,0),
('17df9020-4b67-4873-b1ae-84cdea4a9fea','360ac010-5718-4046-a295-c51a8719eded','',33,5,10,2,6,4,0,0,0,0,898,NULL,0),
('27115275-2085-4dc5-88c8-246e849d96ff','b119e417-88e6-42ab-9085-0042e71269ff','',0,1,0,2,1,1,0,0,1,3,1195,NULL,0),
('272b4318-04c4-4ef2-a102-4bedc29e0db3','6f7911d9-5059-48af-b3ee-4d9fd7ac1cb5','',1,1,3,0,1,0,0,1,1,1,1586,NULL,0),
('3e0e59a6-09ec-4076-a56e-4abc6cfc0f29','3a31913c-c029-4b6e-ad7b-ab945cabb781','',0,1,0,1,0,0,0,0,3,3,3025,NULL,0),
('8b57284e-be46-46f2-9d20-a4add66ce649','d4c75ff0-644f-440c-b205-a5f2fefc9961','',0,0,2,5,1,10,0,0,0,0,1170,NULL,0),
('9e2dfb1a-11f7-4551-9fb4-b93b13dd5de4','2029458d-0dd9-4103-9ed8-9cf8f78e349e','',2,1,0,1,3,0,5,0,0,36,1184.5,NULL,15),
('ad6bd571-ccc1-4531-bf7a-68b2d4b0a5dc','3e3d54f8-117e-46e4-917e-9182ad525051','',13,5,1,2,0,0,0,0,0,20,88,NULL,0),
('af93a822-50ec-4392-a32f-e0eeeaeb5728','5b807dbd-9bf3-4d14-af39-18e98cdbb44d','',6,0,0,0,1,0,0,0,2,2,2056,NULL,0),
('b0996311-9b4a-4677-aa22-c089f3dfc8b4','3239ab65-6d41-4644-adfb-c93a95587bf6','',3,1,1,1,0,1,1,0,0,0,338,NULL,0),
('be800e60-a247-4f54-8d98-4e806c575a8e','d0be5da3-3f5d-4984-ad05-10d3f5f6057a','',0,0,0,0,0,0,0,0,1,5,1000,NULL,0),
('d9773a31-afd1-4473-9438-fcc2536a851e','9869e770-bda2-47fb-a64f-8056d22b060b','',0,0,0,0,0,1,1,0,1,0,1300,NULL,0),
('efed5699-c9bc-4e5b-b12b-18ab3d0f9c9d','fafbc9d5-6943-4008-8b95-4ac4edfa101d','',0,0,8,0,0,0,1,0,2,9,2280,NULL,0);
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
('05efafeb-f88b-4e0c-bf1b-047b68f6127e','de8e9a03-4145-404d-b875-ce0e3c06f334','46205891-2e96-4986-bf4b-40f6d13cec0f',30,25,562.5,'2024-10-22 15:23:12.487','2024-10-22 15:23:12.488'),
('0942c489-c3d9-4bc4-83c6-b61b0092a9b9','b4f0617a-eba7-4f98-8c26-8c15277a06f0','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',50,67,1340,'2024-10-09 17:02:02.352','2024-10-09 17:02:02.352'),
('15487fc2-0e64-4214-a267-c6a3ac4585f3','de7f10bc-2e5c-4145-846c-1864cf45f3a0','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',20,10,167.1999969482422,'2024-10-09 18:01:19.922','2024-10-09 18:02:51.497'),
('185dc314-c14e-4ef3-a31c-4afced97d17c','38afc688-aa85-4a16-9dd2-c074a23e6fb4','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',50,25,909.0909090909091,'2024-10-08 08:33:55.050','2024-10-08 08:33:55.051'),
('2473e575-e0df-4ba1-ab13-427f0cc74ce5','06790023-20bf-43e1-a796-92f7ff3eb5b3','faa5b342-131b-456f-a2b8-33f503d76ec2',58,1,24.06999969482422,'2024-10-15 02:37:21.605','2024-10-15 02:37:21.605'),
('35922002-5c6a-495b-af74-c53d3f211863','de7f10bc-2e5c-4145-846c-1864cf45f3a0','4233b7fa-8b82-4ac0-8d06-11b0eefb6741',24,9,150.47999572753906,'2024-10-09 18:05:35.169','2024-10-09 18:05:35.169'),
('4c73a09b-db43-4bda-ad83-6d4cb13f9ab1','131f45f4-a86a-4187-be56-cc04cb7413ce','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',50,35,1100,'2024-10-07 18:00:54.970','2024-10-07 18:00:54.970'),
('5a8e6019-4dad-4b7d-8d9f-4c9902d1d4aa','de8e9a03-4145-404d-b875-ce0e3c06f334','af88b8eb-22e1-4146-9f64-a6a1422f7e56',220,1,22.5,'2024-10-22 15:23:12.490','2024-10-22 15:23:12.490'),
('6bae24be-3888-40c9-83a3-679b41226479','de7f10bc-2e5c-4145-846c-1864cf45f3a0','46205891-2e96-4986-bf4b-40f6d13cec0f',17,28,468.1600036621094,'2024-10-09 23:56:30.192','2024-10-09 23:56:30.192'),
('7341d812-0b16-4bb5-91bd-9ebc0d250e8a','de8e9a03-4145-404d-b875-ce0e3c06f334','d349d900-d909-4f37-8b54-546acfb5ab93',65,5,112.5,'2024-10-22 15:23:12.491','2024-10-22 15:23:12.492'),
('7ad377d9-a23e-4a38-8d29-d2c3e3db8ed5','06790023-20bf-43e1-a796-92f7ff3eb5b3','46205891-2e96-4986-bf4b-40f6d13cec0f',30,1,24.06999969482422,'2024-10-15 02:37:21.603','2024-10-15 02:37:21.603'),
('7af612c1-df1e-4863-8bea-efc7def8d5d5','fd2cd6ca-6fbc-41c9-8ebf-3bdc437f39d3','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',50,48,987,'2024-10-09 17:19:29.892','2024-10-09 17:19:48.523'),
('8966e30b-0396-4a43-aa09-424c98c1a842','55d5566a-3f51-4cfb-ac46-10c27ec791e2','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',50,56,799,'2024-10-09 17:18:42.329','2024-10-09 17:18:42.329'),
('a104726d-a7c2-4939-b171-da9b2f598dff','06790023-20bf-43e1-a796-92f7ff3eb5b3','4233b7fa-8b82-4ac0-8d06-11b0eefb6741',26,5,120.35,'2024-10-09 23:57:03.040','2024-10-09 23:57:03.041'),
('ab222a91-7d32-416a-a669-87a7c2c4d1c4','9af90fcb-86b0-4071-9598-d4f25df285a8','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',50,30,1200,'2024-10-07 17:35:54.510','2024-10-07 17:41:52.337'),
('b7b8ce8d-804d-4958-acf3-2f0b5187f97a','de8e9a03-4145-404d-b875-ce0e3c06f334','6da29673-015e-402a-a440-980754b90c83',330,1,22.5,'2024-10-22 15:23:12.488','2024-10-22 15:23:12.489'),
('c38b0ca7-ba33-4555-9000-be8b7eb1a6dc','38afc688-aa85-4a16-9dd2-c074a23e6fb4','46205891-2e96-4986-bf4b-40f6d13cec0f',17,22,367.8399963378906,'2024-10-09 19:14:23.091','2024-10-09 19:14:23.091'),
('d1472118-4314-470c-9b08-54a9084ffd21','131f45f4-a86a-4187-be56-cc04cb7413ce','46205891-2e96-4986-bf4b-40f6d13cec0f',17,12,200.63999938964844,'2024-10-09 19:14:44.136','2024-10-09 19:14:44.136'),
('e00e7b00-4528-47dc-999c-e8c17048b9d0','de8e9a03-4145-404d-b875-ce0e3c06f334','fdc87132-7cff-4757-8fa6-3b3e8c75e308',70,20,450,'2024-10-22 15:23:12.493','2024-10-22 15:23:12.494'),
('ec9a03c4-0c42-4db4-b985-ac224fbb8a84','7bd85a5e-4905-420e-8d06-28a182b24f54','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',50,30,967.0000000000002,'2024-10-09 17:21:20.991','2024-10-09 17:29:25.541'),
('f8a7e018-1194-45df-ba7e-6919174546d1','06790023-20bf-43e1-a796-92f7ff3eb5b3','fdc87132-7cff-4757-8fa6-3b3e8c75e308',70,4,90,'2024-10-22 16:05:30.057','2024-10-22 16:05:30.058');
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
('0280fc0d-54b0-43f2-93b2-6265e692cbcf','1a16587c-3650-4688-910a-02b3b6bbd25e','d349d900-d909-4f37-8b54-546acfb5ab93',1,65,0,0,'2024-10-22 15:26:10.127','2024-10-22 15:26:10.127'),
('161fff52-8ac7-4cc8-b1db-9c6434af763e','a17237ab-2e05-4250-817c-9ce00dd17b0a','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',5,250,0,0,'2024-10-08 23:07:49.643','2024-10-08 23:07:49.644'),
('1d3f87ca-9f08-4600-903a-43eb21c185d3','35c61621-e8b5-4f18-8886-72171e79ddc1','46205891-2e96-4986-bf4b-40f6d13cec0f',6,180,0,0,'2024-10-15 02:47:52.213','2024-10-15 02:47:52.213'),
('463d1f0a-b940-4789-912f-68a15067b4a2','55a58530-f0a2-483d-8432-0d765c78564f','d349d900-d909-4f37-8b54-546acfb5ab93',1,65,0,0,'2024-10-22 15:28:31.557','2024-10-22 15:28:31.557'),
('4e98edf6-57d0-4fbb-9f36-f69243268270','6daed10d-5b6a-4ee0-9387-fe1e6306148c','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',3,150,0,0,'2024-10-08 23:08:50.233','2024-10-08 23:08:50.234'),
('54094bda-74c5-4de4-8a2b-1d3e098938e7','677359ae-96b8-428b-9d03-9d6b81e7863e','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',13,650,0,0,'2024-10-08 08:06:54.424','2024-10-08 08:06:54.424'),
('5da50abe-13f0-4461-bfc9-c8759a01480f','267a8425-5c52-4768-af97-b7a37ba82e83','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',6,300,0,0,'2024-10-08 23:23:54.154','2024-10-08 23:23:54.154'),
('6de29772-b43a-4beb-8c74-f14e6069e3eb','1412112f-c33e-4657-b43d-e39168607dee','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',5,250,0,0,'2024-10-07 20:39:41.854','2024-10-07 20:39:41.854'),
('6f12b5d7-e22c-4bce-8bb0-b7086b766efe','1a16587c-3650-4688-910a-02b3b6bbd25e','fdc87132-7cff-4757-8fa6-3b3e8c75e308',2,140,0,0,'2024-10-22 15:26:10.129','2024-10-22 15:26:10.129'),
('7c673ed7-f11a-4409-958a-6448fc223aa9','f7b5c9f1-a5aa-4bc2-a479-e6c3da2ad391','46205891-2e96-4986-bf4b-40f6d13cec0f',4,68,0,0,'2024-10-10 02:01:03.898','2024-10-10 02:01:03.899'),
('8636cc9a-ce42-40f8-bb67-06bd2eaae98c','475a1958-80cd-40ec-a188-908a3239fbb0','4233b7fa-8b82-4ac0-8d06-11b0eefb6741',5,130,0,0,'2024-10-10 00:53:41.035','2024-10-10 00:53:41.035'),
('958d3857-4087-4a52-9fa5-33d6383b938e','55a58530-f0a2-483d-8432-0d765c78564f','4233b7fa-8b82-4ac0-8d06-11b0eefb6741',3,78,0,0,'2024-10-22 15:28:31.554','2024-10-22 15:28:31.554'),
('a36f126a-ea88-438a-bb35-7d483b389502','1a16587c-3650-4688-910a-02b3b6bbd25e','46205891-2e96-4986-bf4b-40f6d13cec0f',5,150,0,5,'2024-10-22 15:26:10.125','2024-10-22 15:26:10.126'),
('ab7e396f-fbb6-4fa9-b7bf-8aa06f51c1e7','187b6b0f-c835-40d6-9a2e-c76ab3eea8ee','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',5,250,0,0,'2024-10-09 16:09:40.821','2024-10-09 16:09:40.822'),
('aee04a9d-cc4a-468c-9183-1a3a839eccbe','e14aa350-8723-4fe7-99eb-6b8a27d0d940','46205891-2e96-4986-bf4b-40f6d13cec0f',15,255,0,0,'2024-10-10 02:02:22.069','2024-10-10 02:02:22.070'),
('b22f5f50-7794-4ae4-a352-6c6b39a42cff','55a58530-f0a2-483d-8432-0d765c78564f','6da29673-015e-402a-a440-980754b90c83',1,330,0,0,'2024-10-22 15:28:31.555','2024-10-22 15:28:31.556'),
('b2e8f9f2-df06-450b-8922-dbfdc401c23b','d209f4c9-899c-49ce-9d54-eb3f72fccac6','46205891-2e96-4986-bf4b-40f6d13cec0f',1,30,0,0,'2024-10-22 15:54:03.562','2024-10-22 15:54:03.563'),
('c7dc02d2-552f-4551-8c47-02dfb52182da','d0419662-1e4d-4603-86c8-06632cb5c347','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',11,550,0,0,'2024-10-09 16:17:19.608','2024-10-09 16:17:19.609'),
('d5219120-79e9-42f3-9c5a-fc6e913d3faf','b58a049b-7c10-45df-a8e9-3ebe94cdf103','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',3,60,0,0,'2024-10-22 16:03:13.429','2024-10-22 16:03:13.429'),
('d6620a4d-448a-4f81-97e0-75fe78acd2f8','b0cb965e-0733-4055-a023-933828ae0663','46205891-2e96-4986-bf4b-40f6d13cec0f',8,136,0,0,'2024-10-10 00:56:25.788','2024-10-10 00:56:25.789'),
('d75d8bc7-7798-4117-9b50-dbd3c44a4eeb','2451dad1-c17e-4a4a-bb23-d5cc207bd8a2','fdc87132-7cff-4757-8fa6-3b3e8c75e308',2,140,0,0,'2024-10-22 15:54:53.737','2024-10-22 15:54:53.737'),
('ddc35db3-38e6-4ac9-b95e-20ffba5a2cc3','54d003ed-7985-4697-a8ae-dbaee97a60ef','46205891-2e96-4986-bf4b-40f6d13cec0f',15,255,0,5,'2024-10-10 08:19:22.704','2024-10-10 08:19:22.704'),
('e9f3aee0-45c5-46d6-947d-1b3535821c9d','0a3e50a1-5c4e-4457-94f7-91d690e6e6e2','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',5,250,0,0,'2024-10-08 17:07:21.006','2024-10-08 17:07:21.007');
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
  `cash_register_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_petty_cashes_expenses` (`petty_cash_id`),
  KEY `fk_expenses_cash_register` (`cash_register_id`),
  CONSTRAINT `fk_expenses_cash_register` FOREIGN KEY (`cash_register_id`) REFERENCES `cash_registers` (`id`),
  CONSTRAINT `fk_petty_cashes_expenses` FOREIGN KEY (`petty_cash_id`) REFERENCES `petty_cashes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenses`
--

LOCK TABLES `expenses` WRITE;
/*!40000 ALTER TABLE `expenses` DISABLE KEYS */;
INSERT INTO `expenses` VALUES
('208d9607-5241-4bd5-9a1e-e6f9d3048334',NULL,'','comida',200,'2024-10-09 18:38:36.065','2024-10-09 18:38:36.065','9869e770-bda2-47fb-a64f-8056d22b060b'),
('261ed95d-78e6-4122-ba57-c6e81beaf09e',NULL,'','Comida',130,'2024-10-09 16:20:50.767','2024-10-09 16:20:50.767','fafbc9d5-6943-4008-8b95-4ac4edfa101d'),
('3ac65d0d-026e-48a7-a9b0-7a33d556a37c',1,'','pago',150,'2024-10-22 16:17:04.594','2024-10-22 16:17:04.594',NULL),
('493b6d6f-67b8-4c8d-a9cc-eb74a6bcbbe7',NULL,'','Pago de luz',200,'2024-10-10 08:37:19.928','2024-10-10 08:37:19.928','d0be5da3-3f5d-4984-ad05-10d3f5f6057a'),
('49cc3529-935e-46d3-be4a-9dcd865a7243',NULL,'','bebida',30,'2024-10-10 01:55:59.113','2024-10-10 01:55:59.113','b119e417-88e6-42ab-9085-0042e71269ff'),
('5787b235-b338-4200-b388-e25658b2e41f',NULL,'','bebida',20,'2024-10-09 16:10:55.825','2024-10-09 16:10:55.825','fafbc9d5-6943-4008-8b95-4ac4edfa101d'),
('5f82edb1-e9fd-43a5-8593-ce1900126b23',1,'','pago de luz',162,'2024-10-22 16:13:53.511','2024-10-22 16:13:53.511',NULL),
('639a193d-5893-4529-8dde-70704ae97621',1,'','comida',20,'2024-10-16 20:35:08.093','2024-10-16 20:35:08.093',NULL),
('6e1addc6-eec0-4b46-af4a-83bd0b75fdab',NULL,'','Compra comida',256,'2024-10-15 02:49:43.469','2024-10-15 02:49:43.469','2029458d-0dd9-4103-9ed8-9cf8f78e349e'),
('8fadb745-4fae-4f26-9f49-079fe280f753',1,'','Bebida',20,'2024-10-16 20:32:43.873','2024-10-16 20:32:43.873',NULL),
('a7d56b4c-2c34-49dd-bfae-84e27626a7ab',NULL,'','bebida',60,'2024-10-10 00:59:26.058','2024-10-10 00:59:26.058','3a31913c-c029-4b6e-ad7b-ab945cabb781'),
('ac8fb91d-893f-4add-9fb6-ae2d053acf96',NULL,'','bebida',40,'2024-10-10 00:54:51.727','2024-10-10 00:54:51.727','5b807dbd-9bf3-4d14-af39-18e98cdbb44d'),
('c423c0cf-7258-4370-bfa7-cb00d56a7b23',1,'','bebida',20,'2024-10-09 16:37:35.309','2024-10-09 16:37:35.309',NULL),
('e5e730ec-5764-4eb1-b2b7-997b575eefc5',1,'','Almuerzo',130,'2024-10-22 15:40:14.510','2024-10-22 15:40:14.510',NULL);
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
  `quantity` bigint(20) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `update_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_other_inventory_outputs_article` (`article_id`),
  CONSTRAINT `fk_other_inventory_outputs_article` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `other_inventory_outputs`
--

LOCK TABLES `other_inventory_outputs` WRITE;
/*!40000 ALTER TABLE `other_inventory_outputs` DISABLE KEYS */;
INSERT INTO `other_inventory_outputs` VALUES
('0b181483-d275-42cf-ba81-6c66e7e958ca','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',2,'Uso personal','2024-10-14 18:07:04.972','2024-10-14 18:07:04.972'),
('0d2ef47b-fd6c-4569-afc1-59ef92cd3c67','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',2,'Uso personal','2024-10-08 10:20:53.145','2024-10-08 10:20:53.145'),
('0d734af5-ab3c-4577-8df1-bcad97614a56','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',1,'Daño','2024-10-14 18:07:31.505','2024-10-14 18:07:31.505'),
('1f18a37d-b580-4a26-a433-3ec306480725','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',2,'Regalía','2024-10-08 10:22:59.035','2024-10-08 10:22:59.035'),
('4b6f7a73-c4b4-47cf-8a50-f6b497f5a5b6','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',4,'Daño','2024-10-14 18:07:11.398','2024-10-14 18:07:11.398'),
('5aedb1b0-d50c-443f-b798-40903fee7046','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',6,'Uso personal','2024-10-10 09:39:04.560','2024-10-10 09:39:04.560'),
('63a758e1-a06d-4058-b28d-1495a85e3598','4233b7fa-8b82-4ac0-8d06-11b0eefb6741',1,'Uso personal','2024-10-10 09:41:17.159','2024-10-10 09:41:17.159'),
('6554deb1-9fc5-4893-8923-535eeb83f20a','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',2,'Uso personal','2024-10-08 10:21:38.359','2024-10-08 10:21:38.359'),
('669ea6c1-6051-435a-9551-2afa95f78d1c','46205891-2e96-4986-bf4b-40f6d13cec0f',10,'Daño','2024-10-10 09:46:44.257','2024-10-10 09:46:44.257'),
('68e2095f-0f70-406c-91aa-3aa5752b58ba','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',1,'Uso personal','2024-10-10 09:44:04.766','2024-10-10 09:44:04.766'),
('7519b0ea-10f5-40c5-af19-9ca1a52de128','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',4,'Vencimiento','2024-10-08 10:07:27.253','2024-10-08 10:07:27.253'),
('7fe69a6a-97f6-4ca3-93c4-eb6045c32143','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',1,'Regalía','2024-10-14 18:07:29.359','2024-10-14 18:07:29.359'),
('8c9bf4e8-bfd5-4c90-8ada-97e2fa556c28','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',2,'Vencimiento','2024-10-08 10:19:05.095','2024-10-08 10:19:05.095'),
('a2fd448c-e339-48a0-b7db-5c22287059d8','46205891-2e96-4986-bf4b-40f6d13cec0f',5,'Regalía','2024-10-10 02:57:43.115','2024-10-10 02:57:43.115'),
('a7815753-0e43-4e82-a2c4-fe1d52e6a566','4233b7fa-8b82-4ac0-8d06-11b0eefb6741',4,'Vencimiento','2024-10-09 20:38:02.486','2024-10-09 20:38:02.486'),
('a7c9fec1-0453-4054-84ba-f77bf0be7865','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',1,'Daño','2024-10-14 18:07:27.599','2024-10-14 18:07:27.599'),
('b9ada048-045b-4a25-8c93-b269f90f47a8','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',2,'Uso personal','2024-10-08 10:22:19.267','2024-10-08 10:22:19.267'),
('c4988177-a024-41bd-b006-ebbc7390b387','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',1,'Uso personal','2024-10-14 18:07:23.912','2024-10-14 18:07:23.912'),
('d571ce2c-2bbd-418b-a00d-39788c4b472d','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',2,'Vencimiento','2024-10-09 12:16:23.609','2024-10-09 12:16:23.609'),
('d68645f4-fdc1-4ea7-9fde-6e18f6181b9f','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',2,'Regalía','2024-10-08 10:24:51.300','2024-10-08 10:24:51.300'),
('dfeafd0f-094b-4b93-a1be-5c250754c0a4','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',6,'Regalía','2024-10-14 18:07:20.099','2024-10-14 18:07:20.099'),
('dfece8d5-9a04-41b9-86d2-748ad08c100d','c94f1c54-772c-43f5-ae58-5cb6e2ab678b',6,'Uso personal','2024-10-08 10:11:07.507','2024-10-08 10:11:07.507');
/*!40000 ALTER TABLE `other_inventory_outputs` ENABLE KEYS */;
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
(1,1000,1000,500,'0000-00-00 00:00:00.000','2024-10-22 16:17:11.175');
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
('06790023-20bf-43e1-a796-92f7ff3eb5b3','80fe7a34-852a-4389-af82-44a8f7c3fbd1','53dbe60a-d77a-471e-b760-950efb11024c','54dcc9da-c05f-4c66-9b5d-77d0eac0913d',0,67,258.49,'2024-10-09 23:57:03.037','2024-10-22 16:05:30.057'),
('131f45f4-a86a-4187-be56-cc04cb7413ce','80fe7a34-852a-4389-af82-44a8f7c3fbd1','0e1ecdf0-b655-49a5-b6ee-8b40d9875613','54dcc9da-c05f-4c66-9b5d-77d0eac0913d',1,2,1300.6399999999999,'2024-10-07 18:00:54.965','2024-10-09 19:14:44.135'),
('38afc688-aa85-4a16-9dd2-c074a23e6fb4','80fe7a34-852a-4389-af82-44a8f7c3fbd1','53dbe60a-d77a-471e-b760-950efb11024c','54dcc9da-c05f-4c66-9b5d-77d0eac0913d',1,4,1276.9309090909092,'2024-10-08 08:33:55.049','2024-10-09 19:14:23.091'),
('55d5566a-3f51-4cfb-ac46-10c27ec791e2','80fe7a34-852a-4389-af82-44a8f7c3fbd1','53dbe60a-d77a-471e-b760-950efb11024c','54dcc9da-c05f-4c66-9b5d-77d0eac0913d',1,44,799,'2024-10-09 17:18:42.325','2024-10-09 17:18:42.325'),
('7bd85a5e-4905-420e-8d06-28a182b24f54','80fe7a34-852a-4389-af82-44a8f7c3fbd1','53dbe60a-d77a-471e-b760-950efb11024c','54dcc9da-c05f-4c66-9b5d-77d0eac0913d',1,65,967.0000000000002,'2024-10-09 17:21:20.988','2024-10-09 17:29:25.538'),
('9af90fcb-86b0-4071-9598-d4f25df285a8','80fe7a34-852a-4389-af82-44a8f7c3fbd1','0e1ecdf0-b655-49a5-b6ee-8b40d9875613','54dcc9da-c05f-4c66-9b5d-77d0eac0913d',1,1,1200,'2024-10-07 17:35:54.506','2024-10-07 17:41:52.335'),
('b4f0617a-eba7-4f98-8c26-8c15277a06f0','80fe7a34-852a-4389-af82-44a8f7c3fbd1','53dbe60a-d77a-471e-b760-950efb11024c','54dcc9da-c05f-4c66-9b5d-77d0eac0913d',1,22,1340,'2024-10-09 17:02:02.350','2024-10-09 17:02:02.350'),
('de7f10bc-2e5c-4145-846c-1864cf45f3a0','80fe7a34-852a-4389-af82-44a8f7c3fbd1','53dbe60a-d77a-471e-b760-950efb11024c','54dcc9da-c05f-4c66-9b5d-77d0eac0913d',1,88,785.8399999999999,'2024-10-09 18:01:19.915','2024-10-09 23:56:30.192'),
('de8e9a03-4145-404d-b875-ce0e3c06f334','80fe7a34-852a-4389-af82-44a8f7c3fbd1','293a9671-5d35-4c6a-9176-e18010fbed29','54dcc9da-c05f-4c66-9b5d-77d0eac0913d',0,102,1170,'2024-10-22 15:23:12.485','2024-10-22 15:23:12.486'),
('fd2cd6ca-6fbc-41c9-8ebf-3bdc437f39d3','80fe7a34-852a-4389-af82-44a8f7c3fbd1','0e1ecdf0-b655-49a5-b6ee-8b40d9875613','54dcc9da-c05f-4c66-9b5d-77d0eac0913d',1,65,987,'2024-10-09 17:19:29.890','2024-10-09 17:19:48.520');
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
('089754ab-9487-468f-ac0c-4ef7f7814e3f',1,20,'','2024-10-16 20:38:17.909','2024-10-16 20:38:17.909'),
('319f57e8-8a39-4db6-8529-138a270f5594',1,330,'Reembolso semana 20-26/10/24','2024-10-22 15:41:19.845','2024-10-22 15:41:19.845'),
('98b87220-2465-405a-a070-03492415c699',1,20,'','2024-10-09 16:37:48.436','2024-10-09 16:37:48.436'),
('e1622551-cfcd-43ac-a8c1-5a72f383df46',1,200,'','2024-10-08 21:26:05.922','2024-10-08 21:26:05.922'),
('f33b5d1a-6e98-4245-972c-26f2fe4285c8',1,20,'','2024-10-16 20:37:42.552','2024-10-16 20:37:42.552');
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
  KEY `fk_sales_user` (`user_id`),
  CONSTRAINT `fk_sales_costumer` FOREIGN KEY (`costumer_id`) REFERENCES `costumers` (`id`),
  CONSTRAINT `fk_sales_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES
('0a3e50a1-5c4e-4457-94f7-91d690e6e6e2','e979fcfc-990e-485c-8f99-63eddb3a9a7f','7cc9107f-476f-41fb-80d7-7b95664af2b5','80fe7a34-852a-4389-af82-44a8f7c3fbd1',3,1,0,250,250,70,5,4,'2024-10-08 17:07:21.006','2024-10-08 17:07:21.006'),
('1412112f-c33e-4657-b43d-e39168607dee','9a94f86d-8026-4412-81c7-5eae95e09e39','7cc9107f-476f-41fb-80d7-7b95664af2b5','80fe7a34-852a-4389-af82-44a8f7c3fbd1',1,1,0,250,250,250,0,0,'2024-10-06 20:39:41.853','2024-10-07 20:39:41.853'),
('187b6b0f-c835-40d6-9a2e-c76ab3eea8ee','fafbc9d5-6943-4008-8b95-4ac4edfa101d','7cc9107f-476f-41fb-80d7-7b95664af2b5','80fe7a34-852a-4389-af82-44a8f7c3fbd1',7,1,0,250,250,200,2,23.6,'2024-10-09 16:09:40.821','2024-10-09 16:09:40.821'),
('1a16587c-3650-4688-910a-02b3b6bbd25e','3e3d54f8-117e-46e4-917e-9182ad525051','f83e26cd-e711-444e-9d01-72f95310fbd2','80fe7a34-852a-4389-af82-44a8f7c3fbd1',15,1,5,355,350,500,0,150,'2024-10-22 15:26:10.125','2024-10-22 15:26:10.125'),
('2451dad1-c17e-4a4a-bb23-d5cc207bd8a2','d4c75ff0-644f-440c-b205-a5f2fefc9961','f83e26cd-e711-444e-9d01-72f95310fbd2','5be21058-2809-4dfe-a0ba-9f36b98adf4f',18,1,0,140,140,500,0,360,'2024-10-22 15:54:53.736','2024-10-22 15:54:53.736'),
('267a8425-5c52-4768-af97-b7a37ba82e83','955ccc54-12f7-42e5-8f22-45eb460dd147','7cc9107f-476f-41fb-80d7-7b95664af2b5','80fe7a34-852a-4389-af82-44a8f7c3fbd1',6,1,0,300,300,200,5,84,'2024-10-08 23:23:54.153','2024-10-08 23:23:54.153'),
('35c61621-e8b5-4f18-8886-72171e79ddc1','2029458d-0dd9-4103-9ed8-9cf8f78e349e','7cc9107f-476f-41fb-80d7-7b95664af2b5','80fe7a34-852a-4389-af82-44a8f7c3fbd1',14,1,0,180,180,0,36,1144.8,'2024-10-15 02:47:52.212','2024-10-15 02:47:52.212'),
('475a1958-80cd-40ec-a188-908a3239fbb0','5b807dbd-9bf3-4d14-af39-18e98cdbb44d','f83e26cd-e711-444e-9d01-72f95310fbd2','80fe7a34-852a-4389-af82-44a8f7c3fbd1',9,1,0,130,130,60,2,3.6,'2024-10-10 00:53:41.034','2024-10-10 00:53:41.034'),
('54d003ed-7985-4697-a8ae-dbaee97a60ef','d0be5da3-3f5d-4984-ad05-10d3f5f6057a','7cc9107f-476f-41fb-80d7-7b95664af2b5','80fe7a34-852a-4389-af82-44a8f7c3fbd1',13,1,5,255,250,70,5,4,'2024-10-10 08:19:22.704','2024-10-10 08:19:22.704'),
('55a58530-f0a2-483d-8432-0d765c78564f','3e3d54f8-117e-46e4-917e-9182ad525051','f83e26cd-e711-444e-9d01-72f95310fbd2','80fe7a34-852a-4389-af82-44a8f7c3fbd1',16,1,0,473,473,0,20,263,'2024-10-22 15:28:31.553','2024-10-22 15:28:31.553'),
('677359ae-96b8-428b-9d03-9d6b81e7863e','9a94f86d-8026-4412-81c7-5eae95e09e39','7cc9107f-476f-41fb-80d7-7b95664af2b5','80fe7a34-852a-4389-af82-44a8f7c3fbd1',2,0,0,650,650,300,10,18,'2024-10-08 08:06:54.424','2024-10-09 19:24:40.939'),
('6daed10d-5b6a-4ee0-9387-fe1e6306148c','9273a83e-c0ea-4173-85f5-42d5cbb1ad09','7cc9107f-476f-41fb-80d7-7b95664af2b5','80fe7a34-852a-4389-af82-44a8f7c3fbd1',5,1,0,150,150,0,5,34,'2024-10-08 23:08:50.233','2024-10-08 23:08:50.233'),
('a17237ab-2e05-4250-817c-9ce00dd17b0a','9273a83e-c0ea-4173-85f5-42d5cbb1ad09','7cc9107f-476f-41fb-80d7-7b95664af2b5','80fe7a34-852a-4389-af82-44a8f7c3fbd1',4,1,0,250,250,300,0,50,'2024-08-08 23:07:49.642','2024-10-08 23:07:49.642'),
('b0cb965e-0733-4055-a023-933828ae0663','b119e417-88e6-42ab-9085-0042e71269ff','7cc9107f-476f-41fb-80d7-7b95664af2b5','5be21058-2809-4dfe-a0ba-9f36b98adf4f',10,1,0,136,136,50,3,24.4,'2024-10-10 00:56:25.787','2024-10-10 00:56:25.787'),
('b58a049b-7c10-45df-a8e9-3ebe94cdf103','360ac010-5718-4046-a295-c51a8719eded','7ca57a26-faa3-4845-a4e4-ea6efbedaeb6','80fe7a34-852a-4389-af82-44a8f7c3fbd1',19,1,0,60,60,100,0,40,'2024-10-22 16:03:13.428','2024-10-22 16:03:13.428'),
('d0419662-1e4d-4603-86c8-06632cb5c347','fafbc9d5-6943-4008-8b95-4ac4edfa101d','f83e26cd-e711-444e-9d01-72f95310fbd2','80fe7a34-852a-4389-af82-44a8f7c3fbd1',8,1,0,550,550,300,8,44.4,'2024-10-09 16:17:19.608','2024-10-09 16:17:19.608'),
('d209f4c9-899c-49ce-9d54-eb3f72fccac6','d4c75ff0-644f-440c-b205-a5f2fefc9961','f83e26cd-e711-444e-9d01-72f95310fbd2','5be21058-2809-4dfe-a0ba-9f36b98adf4f',17,1,0,30,30,50,0,20,'2024-10-22 15:54:03.562','2024-10-22 15:54:03.562'),
('e14aa350-8723-4fe7-99eb-6b8a27d0d940','6f7911d9-5059-48af-b3ee-4d9fd7ac1cb5','f83e26cd-e711-444e-9d01-72f95310fbd2','5be21058-2809-4dfe-a0ba-9f36b98adf4f',12,1,0,255,255,300,0,45,'2024-09-10 02:02:22.068','2024-10-10 02:02:22.068'),
('f7b5c9f1-a5aa-4bc2-a479-e6c3da2ad391','6f7911d9-5059-48af-b3ee-4d9fd7ac1cb5','f83e26cd-e711-444e-9d01-72f95310fbd2','5be21058-2809-4dfe-a0ba-9f36b98adf4f',11,1,0,68,68,50,1,18.8,'2024-09-10 02:01:03.896','2024-10-10 02:01:03.896');
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
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `update_at` datetime(3) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES
('0e1ecdf0-b655-49a5-b6ee-8b40d9875613','Alex Pineda','','Pacas monzeñor','87567343','2024-10-07 16:10:52.167','2024-10-07 16:10:52.167','Best Brand'),
('293a9671-5d35-4c6a-9176-e18010fbed29','Marcos Centeno','','Matagalpa','23458765','2024-10-16 17:38:35.565','2024-10-16 17:38:35.565','Pacas Hollywood'),
('53dbe60a-d77a-471e-b760-950efb11024c','Maria Cruz','','Pacas matagalpa','56456324','2024-10-08 08:21:05.476','2024-10-08 08:21:05.476','Best Brand'),
('e9ac3da2-a6b8-4ac5-9487-9269ddf91334','Pablo Cruz','','Managua central','58209439','2024-10-16 17:32:39.800','2024-10-16 17:32:39.800','Best Brand');
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
('5be21058-2809-4dfe-a0ba-9f36b98adf4f','Miguel','miguel@gmail.com','$2a$10$aI.FCpNmns6YMOKL5RIky.e/osoV9vSG9EcHCLNIBsSlhRotcg0d2','admin','miguel@gmail.com.jpg','2024-10-07 16:00:20.784','2024-10-07 16:00:20.784'),
('80fe7a34-852a-4389-af82-44a8f7c3fbd1','Joel Urbina','joel8080ur@gmail.com','$2a$10$0O/tKT6Wsw7HBbAsC8nw.uh.ylu5TphHUOUG/CR8jsdwGU/B/js..','admin','joel8080ur@gmail.com.webp','2024-10-07 15:34:13.802','2024-10-16 20:22:15.577'),
('8f0f3e44-8596-4b97-841b-bb3ae3e5cf51','Alex','alex@gmail.com','$2a$10$5o.shHEtoExphSumKw3WzeicfTcLMn5zmB36IctHq2bZSJP6JnpmK','admin','alex@gmail.com.jpg','2024-10-07 15:53:27.238','2024-10-07 15:53:27.238');
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

-- Dump completed on 2024-10-22 19:43:55
