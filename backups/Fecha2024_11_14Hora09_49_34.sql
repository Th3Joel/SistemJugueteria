-- MySQL dump 10.13  Distrib 8.0.40, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: jugueteria
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
INSERT INTO `articles` VALUES ('03337a88-e9b7-4e8d-bc4c-a3bf6e67c1e7','bc05aa50-cd28-49e3-8ade-78a83e4d78ce','Bici1','bicicleta de plastico',10,1,220,50,1,'2024-11-08 18:43:41.422','2024-11-08 18:43:41.422'),('0eb539e8-3d9c-4162-99c5-7637457af381','9b939b32-28e8-4d3a-aad0-9cce8a137b61','FH3','Pequeños de hulk',10,0,0,0,1,'0000-00-00 00:00:00.000','2024-10-14 18:58:22.515'),('288cd85f-4709-48de-afd3-dc04d2f02aef','9b939b32-28e8-4d3a-aad0-9cce8a137b61','FKC','Capitan america',10,0,0,0,1,'0000-00-00 00:00:00.000','2024-10-14 18:57:56.553'),('4233b7fa-8b82-4ac0-8d06-11b0eefb6741','e88b3a76-a02e-48a3-baa1-dfb049dca77c','p','Pequeñas de plastico',10,19,90,45,1,'0000-00-00 00:00:00.000','2024-10-09 18:03:50.931'),('427a34c1-2c7b-40e6-b002-8eb2d7f9298c','0a4882c5-a7c8-42e6-b4b4-7a05e8d3b4f4','LL14','llaveros de niño y niña',15,28,60,45,1,'2024-11-08 18:35:49.337','2024-11-08 18:35:49.337'),('46205891-2e96-4986-bf4b-40f6d13cec0f','8c0c8917-53b0-4baf-8c83-9fdea4556176','ES','Especial hotwheels',10,13,70,31.25,1,'0000-00-00 00:00:00.000','2024-11-13 19:51:19.723'),('478125fc-c9e9-4a65-8938-f68ae2c651e9','8c0c8917-53b0-4baf-8c83-9fdea4556176','c20','carros de 20 a 50 cm',10,20,150,50,1,'2024-11-08 18:38:35.157','2024-11-08 18:38:35.157'),('48a0165d-cb9f-40bb-bf7d-3cdbdc144d5b','f7ea78d2-624b-43e6-9f98-2b1268ad0e44','Transformer45','transformer de 45cm',5,0,350,31.25,1,'2024-11-08 18:45:40.647','2024-11-13 19:50:57.801'),('5385d295-362b-4ba6-956a-3d4f284db544','9b939b32-28e8-4d3a-aad0-9cce8a137b61','F12','Mujer maravilla',10,5,60,45,1,'0000-00-00 00:00:00.000','2024-10-14 18:57:39.162'),('545fe881-58d0-431e-aa07-c3e97197fe61','04c24ac0-3d89-4046-ab0e-70df5492dc18','N16','pistola nerf de dartos',10,7,300,50,1,'2024-11-08 18:37:05.208','2024-11-08 18:37:05.208'),('58ef7115-24d1-487c-b367-1f7eaf3e174f','a4884540-6c95-4086-81be-d38328b322b5','marvel12','marvel',10,12,60,31.25,1,'2024-11-08 18:45:01.266','2024-11-08 18:45:01.266'),('5abb42c5-d146-4cd7-b0ce-5fc3db44a618','d56051e8-c6ec-4d3c-9510-7cb12623742e','P2650','peluches de 26cm a 50cm',10,0,0,0,1,'2024-11-08 18:41:11.103','2024-11-08 18:41:11.103'),('67a2fddd-c5c9-40c4-b86d-30617718b58f','69df1cec-5587-46dd-b39c-e854b114b073','JM1','juegos de mesa',5,2,120,50,1,'2024-11-08 18:41:57.847','2024-11-08 18:41:57.847'),('685cdc22-332a-4863-8007-d8e7d8384e62','d56051e8-c6ec-4d3c-9510-7cb12623742e','P525','puluches de 5cm a 25cm',10,16,70,31.25,1,'2024-11-08 18:40:35.214','2024-11-08 18:40:35.214'),('6da29673-015e-402a-a440-980754b90c83','8c0c8917-53b0-4baf-8c83-9fdea4556176','OP','Optimus Prime especial',10,1,330,31.25,1,'0000-00-00 00:00:00.000','2024-10-10 00:02:13.747'),('7af8eb1c-0823-436f-8cf5-6160cc6bb03f','3fff73db-3f54-41ee-a36f-42d85ee1ea55','MIA','Miutu con altavoz',10,5,60,31.25,1,'0000-00-00 00:00:00.000','2024-10-10 00:06:15.843'),('7b71d0a9-f26b-44c3-aafc-18155c98d7bb','e88b3a76-a02e-48a3-baa1-dfb049dca77c','pelonas12','pelonas',6,25,90,45,1,'2024-11-08 18:44:38.557','2024-11-08 18:44:38.557'),('95aff6ea-9543-4869-8bcf-35b2f2c92bf3','82c462e4-a2b8-4f1d-a461-998525305d95','CHIN1','chinchin',5,12,40,31.25,1,'2024-11-08 18:42:26.415','2024-11-08 18:42:26.415'),('af88b8eb-22e1-4146-9f64-a6a1422f7e56','8c0c8917-53b0-4baf-8c83-9fdea4556176','BU2','Bumbleblee de control remoto',10,1,220,31.25,1,'0000-00-00 00:00:00.000','2024-11-13 19:51:08.339'),('b08d8e97-d98d-451d-9ede-8ca2b10cce77','04c24ac0-3d89-4046-ab0e-70df5492dc18','N15','pistola Nerf de agua',10,6,250,31.25,1,'2024-11-08 18:36:38.308','2024-11-08 18:36:38.308'),('bb1dd978-bee1-41bd-a5b7-e056e90fe896','e88b3a76-a02e-48a3-baa1-dfb049dca77c','LOL10','muñecas con pelo largoi',10,16,80,45,1,'2024-11-08 18:47:06.695','2024-11-09 03:36:09.062'),('c94f1c54-772c-43f5-ae58-5cb6e2ab678b','8c0c8917-53b0-4baf-8c83-9fdea4556176','A','Hotwheels',10,45,20,16.72340425531915,1,'0000-00-00 00:00:00.000','2024-10-07 16:12:02.108'),('d349d900-d909-4f37-8b54-546acfb5ab93','3fff73db-3f54-41ee-a36f-42d85ee1ea55','PI2','Pickachus de colección',10,23,65,31.25,1,'0000-00-00 00:00:00.000','2024-10-10 00:06:46.461'),('e7a70ab1-bea8-4d06-9431-1527865102e5','82c462e4-a2b8-4f1d-a461-998525305d95','MB1','Muñeco de bebe en amaca',5,1,300,31.25,1,'2024-11-08 18:43:05.464','2024-11-08 18:43:05.464'),('f776a0b8-907f-4578-8c65-4b931fe2a0a0','f7ea78d2-624b-43e6-9f98-2b1268ad0e44','goku8','Goku de 8cm',10,4,150,50,1,'2024-11-08 18:46:17.497','2024-11-08 18:46:17.497'),('fa5a2bdd-84d7-440e-9343-dbfe2c7aed91','8c0c8917-53b0-4baf-8c83-9fdea4556176','C10','caros de 5a 20 cm',25,45,50,50,1,'2024-11-08 18:38:05.021','2024-11-08 18:38:05.021'),('faa5b342-131b-456f-a2b8-33f503d76ec2','9b939b32-28e8-4d3a-aad0-9cce8a137b61','FG1','Flash de metal tamaño grande',10,0,58,24.074074074074073,1,'0000-00-00 00:00:00.000','2024-11-13 19:51:30.901'),('fdc87132-7cff-4757-8fa6-3b3e8c75e308','8c0c8917-53b0-4baf-8c83-9fdea4556176','N','Machtbox',5,30,70,31.25,1,'0000-00-00 00:00:00.000','2024-10-22 15:20:34.933');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articles_boxes`
--

DROP TABLE IF EXISTS `articles_boxes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
INSERT INTO `articles_boxes` VALUES ('240b4557-b492-453d-b16d-cb7a85ec68f9','F','Caja premium',160,5000,'2024-11-08 18:26:11.661','2024-11-08 18:49:59.807'),('2a0a7e36-ece3-499d-bb7b-bb0970ea1eda','E','Caja mixta',70,3500,'2024-11-08 18:25:33.469','2024-11-08 18:57:47.685'),('507e5444-269b-4b25-b46c-7963ae7dc101','C','Caja de muñecas',0,0,'2024-10-22 16:00:58.719','2024-10-22 16:00:58.719'),('54dcc9da-c05f-4c66-9b5d-77d0eac0913d','A','Caja Niños varios',0,0,'2024-10-07 16:11:39.124','2024-10-22 15:23:12.487'),('adaf5a4e-d913-4aaf-8afc-2fa3aefdf77b','D','Caja de niñas varias',40,1800,'2024-11-08 18:24:45.379','2024-11-08 18:59:42.357'),('d07bbc18-f802-4f75-b0aa-4e16683b975e','B','Saco de peluches',0,0,'2024-10-22 15:44:13.296','2024-10-22 15:44:13.296');
/*!40000 ALTER TABLE `articles_boxes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cash_registers`
--

DROP TABLE IF EXISTS `cash_registers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
INSERT INTO `cash_registers` VALUES ('701ea872-011a-426a-91f5-8d343d4a0073','5be21058-2809-4dfe-a0ba-9f36b98adf4f',0,100,115,100,4.6000000000000085,0,0.3999999999999915,3,0,0,'2024-11-09 03:17:06.677','2024-11-09 03:08:19.256'),('bdd07bf6-1065-443d-a168-4e3c520aa451','80fe7a34-852a-4389-af82-44a8f7c3fbd1',0,1000,580,0,1212,0,0,10,0,0,'2024-11-08 19:04:58.924','2024-11-07 17:31:34.111');
/*!40000 ALTER TABLE `cash_registers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
INSERT INTO `categories` VALUES ('04c24ac0-3d89-4046-ab0e-70df5492dc18','armas','Nerf, soft Dartos','2024-11-08 18:31:07.898','2024-11-08 18:31:07.898'),('0a4882c5-a7c8-42e6-b4b4-7a05e8d3b4f4','Llaveros','llaveros de caricaturas','2024-11-08 18:32:43.901','2024-11-08 18:32:43.901'),('3fff73db-3f54-41ee-a36f-42d85ee1ea55','Pokemons','','2024-10-10 00:04:40.654','2024-10-10 00:04:40.654'),('69df1cec-5587-46dd-b39c-e854b114b073','Juegos de mesa','de todas las edades','2024-11-08 18:33:53.959','2024-11-08 18:33:53.959'),('82c462e4-a2b8-4f1d-a461-998525305d95','juguetes de Bebe','juguetes musicales','2024-11-08 18:29:50.774','2024-11-08 18:29:50.774'),('8c0c8917-53b0-4baf-8c83-9fdea4556176','Carros','varios','2024-10-07 16:11:10.875','2024-10-07 16:11:10.875'),('9b939b32-28e8-4d3a-aad0-9cce8a137b61','Funkos','funkos varios de coleccion','2024-10-14 18:57:01.481','2024-10-14 18:57:01.481'),('a4884540-6c95-4086-81be-d38328b322b5','Heroes','Marwel, Oscorp, DC comics','2024-11-08 18:28:38.455','2024-11-08 18:28:38.455'),('bc05aa50-cd28-49e3-8ade-78a83e4d78ce','juguetes grandes','','2024-11-08 18:33:24.358','2024-11-08 18:33:24.358'),('d56051e8-c6ec-4d3c-9510-7cb12623742e','Peluches','peluches de niño y niña','2024-11-08 18:39:58.247','2024-11-08 18:39:58.247'),('e88b3a76-a02e-48a3-baa1-dfb049dca77c','Muñecas LOL','','2024-10-09 18:03:26.032','2024-10-09 18:03:26.032'),('f7ea78d2-624b-43e6-9f98-2b1268ad0e44','Colección','juguetes de colección','2024-11-08 18:31:44.697','2024-11-08 18:31:44.697');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
INSERT INTO `companies` VALUES ('1','Colecióname','','','coleccioname@gmail.com','76574654','logo.png',36.8,'2024-10-29 21:04:49.761','2024-10-29 21:04:49.759');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `costumers`
--

DROP TABLE IF EXISTS `costumers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
INSERT INTO `costumers` VALUES ('7cc9107f-476f-41fb-80d7-7b95664af2b5','Pedro muñecas','','2024-10-07 16:11:00.626','2024-10-07 16:11:00.626'),('88e7abbf-5b38-428b-a079-e04ed2feeec8','Juan','83363084','2024-10-22 15:42:09.045','2024-10-22 15:42:09.045'),('ec866bf3-0e24-4cdd-8dc9-bce5be0b92ed','Juan Carros de madera','58963256','2024-10-22 15:42:48.335','2024-10-22 15:42:48.335'),('f83e26cd-e711-444e-9d01-72f95310fbd2','Varios','','2024-10-07 16:11:04.575','2024-10-07 16:11:04.575'),('fcea00be-45ab-4435-b749-3e58457fb1ca','Alex','','2024-10-16 20:40:43.028','2024-10-16 20:40:43.028');
/*!40000 ALTER TABLE `costumers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `denominations`
--

DROP TABLE IF EXISTS `denominations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
INSERT INTO `denominations` VALUES ('4fd64537-380c-4aa3-bbd6-279fce3dcc20','701ea872-011a-426a-91f5-8d343d4a0073','',0,0,1,0,0,0,0,0,0,0,3,5),('9ee6e182-1baa-45d5-9df6-cc835d03f5dc','bdd07bf6-1065-443d-a168-4e3c520aa451','',0,12,10,3,1,2,3,1,1,0,10,1212);
/*!40000 ALTER TABLE `denominations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail_purchases`
--

DROP TABLE IF EXISTS `detail_purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
INSERT INTO `detail_purchases` VALUES ('0639f25c-bc05-4c0d-8a68-68ddee1f3145','a3d4629f-f926-499c-9030-01c954deef7b','7b71d0a9-f26b-44c3-aafc-18155c98d7bb',90,10,312.5,'2024-11-08 18:49:59.850','2024-11-08 18:49:59.850'),('2c6c5b72-2b78-4ebb-9229-5e76ef5588b2','a3d4629f-f926-499c-9030-01c954deef7b','545fe881-58d0-431e-aa07-c3e97197fe61',300,5,156.25,'2024-11-08 18:54:10.402','2024-11-08 18:54:10.402'),('33c61091-17d1-4091-95ef-6354c9e52451','a3d4629f-f926-499c-9030-01c954deef7b','e7a70ab1-bea8-4d06-9431-1527865102e5',300,1,31.25,'2024-11-08 18:49:59.829','2024-11-08 18:49:59.829'),('40609839-844e-44d4-81f5-e2e43aed4189','b4801e36-e36b-44f6-a6cb-7e7bae1f3bf8','7b71d0a9-f26b-44c3-aafc-18155c98d7bb',90,15,675,'2024-11-08 18:59:42.400','2024-11-08 18:59:42.400'),('45bcb020-67c4-4d35-aa74-dd1dbe6119fd','a3d4629f-f926-499c-9030-01c954deef7b','58ef7115-24d1-487c-b367-1f7eaf3e174f',60,12,375,'2024-11-08 18:49:59.859','2024-11-08 18:49:59.859'),('53274bef-ca59-4d1d-a106-c5dd14afc503','a3d4629f-f926-499c-9030-01c954deef7b','685cdc22-332a-4863-8007-d8e7d8384e62',70,16,500,'2024-11-08 18:54:10.347','2024-11-08 18:54:10.347'),('55a07ba7-1325-4298-90a6-bc2e115ba74a','a3d4629f-f926-499c-9030-01c954deef7b','fdc87132-7cff-4757-8fa6-3b3e8c75e308',70,10,312.5,'2024-11-08 18:54:10.368','2024-11-08 18:54:10.368'),('632724c4-940e-4195-88ea-0c249d0f5636','3ab73bb4-e521-4903-bfe5-ec80fc048314','427a34c1-2c7b-40e6-b002-8eb2d7f9298c',60,24,1200,'2024-11-08 18:57:47.722','2024-11-08 18:57:47.722'),('65d46826-7095-4d91-85e7-7bb153053a31','b4801e36-e36b-44f6-a6cb-7e7bae1f3bf8','bb1dd978-bee1-41bd-a5b7-e056e90fe896',80,10,450,'2024-11-08 18:59:42.390','2024-11-08 18:59:42.390'),('67a81815-bfd0-49fd-9c97-8a86439b92c2','a3d4629f-f926-499c-9030-01c954deef7b','bb1dd978-bee1-41bd-a5b7-e056e90fe896',80,6,187.5,'2024-11-08 18:49:59.840','2024-11-08 18:49:59.840'),('76dce07e-dde2-4bbc-b7e9-b1a21da8a2ea','a3d4629f-f926-499c-9030-01c954deef7b','478125fc-c9e9-4a65-8938-f68ae2c651e9',150,10,312.5,'2024-11-08 18:54:10.410','2024-11-08 18:54:10.410'),('7dddfc7b-ce9f-4e03-97c6-0787a2b75625','a3d4629f-f926-499c-9030-01c954deef7b','fa5a2bdd-84d7-440e-9343-dbfe2c7aed91',50,20,625,'2024-11-08 18:54:10.336','2024-11-08 18:54:10.336'),('83e331b3-e36e-4a2c-840a-8e6724e5d603','a3d4629f-f926-499c-9030-01c954deef7b','f776a0b8-907f-4578-8c65-4b931fe2a0a0',150,2,62.5,'2024-11-08 18:49:59.881','2024-11-08 18:49:59.881'),('84fa4b31-bce3-4328-96c1-ddb14adbb7af','a3d4629f-f926-499c-9030-01c954deef7b','7af8eb1c-0823-436f-8cf5-6160cc6bb03f',60,5,156.25,'2024-11-08 18:54:10.303','2024-11-08 18:54:10.303'),('85d1fe13-5598-4b36-aa6c-2f55534e5323','3ab73bb4-e521-4903-bfe5-ec80fc048314','545fe881-58d0-431e-aa07-c3e97197fe61',300,2,100,'2024-11-08 18:57:47.692','2024-11-08 18:57:47.692'),('8ea07e30-8934-4120-a193-263cb145554a','3ab73bb4-e521-4903-bfe5-ec80fc048314','03337a88-e9b7-4e8d-bc4c-a3bf6e67c1e7',220,1,50,'2024-11-08 18:57:47.755','2024-11-08 18:57:47.755'),('a733d643-f259-4982-a40d-c5d3c4ea90c8','b4801e36-e36b-44f6-a6cb-7e7bae1f3bf8','5385d295-362b-4ba6-956a-3d4f284db544',60,5,225,'2024-11-08 18:59:42.361','2024-11-08 18:59:42.361'),('acde13a9-8ba2-45bf-b8a9-508d1e5f34fb','a3d4629f-f926-499c-9030-01c954deef7b','b08d8e97-d98d-451d-9ede-8ca2b10cce77',250,6,187.5,'2024-11-08 18:54:10.388','2024-11-08 18:54:10.388'),('bea685e4-45c7-47b0-8a06-d7d0fb410b13','a3d4629f-f926-499c-9030-01c954deef7b','4233b7fa-8b82-4ac0-8d06-11b0eefb6741',90,12,375,'2024-11-08 18:54:10.356','2024-11-08 18:54:10.356'),('bf4c8afc-b746-41b3-9f7e-69f8455900eb','a3d4629f-f926-499c-9030-01c954deef7b','46205891-2e96-4986-bf4b-40f6d13cec0f',70,6,187.5,'2024-11-08 18:54:10.295','2024-11-08 18:54:10.295'),('c51d8067-0bd5-4f39-90a5-e68e4e085f16','a3d4629f-f926-499c-9030-01c954deef7b','95aff6ea-9543-4869-8bcf-35b2f2c92bf3',40,15,468.75,'2024-11-08 18:49:59.814','2024-11-08 18:49:59.814'),('cfd23ac1-5ce6-420b-ab41-7b863c026c58','a3d4629f-f926-499c-9030-01c954deef7b','d349d900-d909-4f37-8b54-546acfb5ab93',65,20,625,'2024-11-08 18:54:10.324','2024-11-08 18:54:10.324'),('d10c2956-7b2f-4b3f-924f-d797084642a8','3ab73bb4-e521-4903-bfe5-ec80fc048314','f776a0b8-907f-4578-8c65-4b931fe2a0a0',150,2,100,'2024-11-08 18:57:47.743','2024-11-08 18:57:47.744'),('d12d0c61-4f62-41e5-b8c0-7f2612bafc2a','3ab73bb4-e521-4903-bfe5-ec80fc048314','fa5a2bdd-84d7-440e-9343-dbfe2c7aed91',50,25,1250,'2024-11-08 18:57:47.702','2024-11-08 18:57:47.702'),('d2d9ae3e-b371-4fbc-8451-319b0af9c427','a3d4629f-f926-499c-9030-01c954deef7b','af88b8eb-22e1-4146-9f64-a6a1422f7e56',220,2,62.5,'2024-11-08 18:54:10.314','2024-11-08 18:54:10.314'),('d69cf964-fd83-4be3-89bf-d7f840f9368d','b4801e36-e36b-44f6-a6cb-7e7bae1f3bf8','4233b7fa-8b82-4ac0-8d06-11b0eefb6741',90,6,270,'2024-11-08 18:59:42.370','2024-11-08 18:59:42.370'),('d9fd2337-9dd1-44f0-aa7d-f614773be1b4','3ab73bb4-e521-4903-bfe5-ec80fc048314','bb1dd978-bee1-41bd-a5b7-e056e90fe896',80,3,150,'2024-11-08 18:57:47.766','2024-11-08 18:57:47.767'),('ea665de5-0788-4319-bf02-26b9c0b7776a','a3d4629f-f926-499c-9030-01c954deef7b','6da29673-015e-402a-a440-980754b90c83',330,1,31.25,'2024-11-08 18:54:10.377','2024-11-08 18:54:10.377'),('ec70b179-8925-4e20-ad30-24b6bde041f1','b4801e36-e36b-44f6-a6cb-7e7bae1f3bf8','427a34c1-2c7b-40e6-b002-8eb2d7f9298c',60,4,180,'2024-11-08 18:59:42.379','2024-11-08 18:59:42.379'),('ed17efd5-46f1-41e6-9d5c-4c02e064dfea','3ab73bb4-e521-4903-bfe5-ec80fc048314','67a2fddd-c5c9-40c4-b86d-30617718b58f',120,3,150,'2024-11-08 18:57:47.732','2024-11-08 18:57:47.732'),('ee03932a-19d0-455e-b91f-88b3a16429f2','a3d4629f-f926-499c-9030-01c954deef7b','48a0165d-cb9f-40bb-bf7d-3cdbdc144d5b',350,1,31.25,'2024-11-08 18:49:59.871','2024-11-08 18:49:59.872'),('efb4e9a0-4ab5-42a1-a258-952362e94fb5','3ab73bb4-e521-4903-bfe5-ec80fc048314','478125fc-c9e9-4a65-8938-f68ae2c651e9',150,10,500,'2024-11-08 18:57:47.712','2024-11-08 18:57:47.712');
/*!40000 ALTER TABLE `detail_purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail_sales`
--

DROP TABLE IF EXISTS `detail_sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
INSERT INTO `detail_sales` VALUES ('1b69cd68-531b-48c4-accc-5f7b278b71f8','99a87cec-56e9-4aae-a5ee-8009bd4dea98','46205891-2e96-4986-bf4b-40f6d13cec0f',10,300,0,0,'2024-11-07 17:31:55.734','2024-11-07 17:31:55.734'),('50ed80fc-0f1d-447f-ba66-faccd72b5f5b','8378fbe5-3df9-4b7f-a539-b92757606dd3','bb1dd978-bee1-41bd-a5b7-e056e90fe896',2,160,0,0,'2024-11-08 19:03:23.322','2024-11-08 19:03:23.322'),('a9451706-e921-44a1-ab53-17132b77c8cd','99e62bf6-e481-468a-bc8d-5ef0e8f60b38','95aff6ea-9543-4869-8bcf-35b2f2c92bf3',3,120,0,5,'2024-11-09 03:16:04.480','2024-11-09 03:16:04.480'),('b1e653a6-5ecc-4151-aa97-e68cd21ed363','56d2a65f-26ad-47e5-afff-024f4a0f7328','67a2fddd-c5c9-40c4-b86d-30617718b58f',1,120,0,0,'2024-11-08 19:03:54.312','2024-11-08 19:03:54.313');
/*!40000 ALTER TABLE `detail_sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expenses`
--

DROP TABLE IF EXISTS `expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
INSERT INTO `expenses` VALUES ('2bfa240d-c656-4267-9752-10115612b2d1','701ea872-011a-426a-91f5-8d343d4a0073',NULL,'','Fresco',40,'2024-11-09 03:15:15.137','2024-11-09 03:15:15.137'),('51dd0150-4649-42e1-93f8-39aa19f4611e',NULL,1,'3771688','Luz, restante',500,'2024-11-09 03:13:46.113','2024-11-09 03:13:46.113'),('69aab827-9b5c-4f5d-b538-cd6da53a8cfd','701ea872-011a-426a-91f5-8d343d4a0073',NULL,'3771688','Luz',60,'2024-11-09 03:13:17.452','2024-11-09 03:13:17.452');
/*!40000 ALTER TABLE `expenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `other_inventory_outputs`
--

DROP TABLE IF EXISTS `other_inventory_outputs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
INSERT INTO `other_inventory_outputs` VALUES ('6b18b5e8-f4d4-4efa-b00b-21886ba2a651','faa5b342-131b-456f-a2b8-33f503d76ec2',1,'Daño','2024-11-13 19:51:30.897','2024-11-13 19:51:30.897'),('8678ffb2-4904-4d87-9234-4dfd19633893','46205891-2e96-4986-bf4b-40f6d13cec0f',2,'Uso personal','2024-11-13 19:51:19.718','2024-11-13 19:51:19.718'),('a4d5030b-09f6-4fc9-aaa3-e41055b3dc04','48a0165d-cb9f-40bb-bf7d-3cdbdc144d5b',1,'Uso personal','2024-11-13 19:50:57.797','2024-11-13 19:50:57.797'),('a7d70937-db92-4fc5-baac-dd38cdc0991c','af88b8eb-22e1-4146-9f64-a6a1422f7e56',2,'Daño','2024-11-13 19:51:08.336','2024-11-13 19:51:08.336'),('d95cddd9-90a7-4c92-a821-1efda226de76','bb1dd978-bee1-41bd-a5b7-e056e90fe896',1,'Regalía','2024-11-09 03:36:09.054','2024-11-09 03:36:09.054');
/*!40000 ALTER TABLE `other_inventory_outputs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `petty_cashes`
--

DROP TABLE IF EXISTS `petty_cashes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
INSERT INTO `petty_cashes` VALUES (1,1000,800,500,'2024-10-29 21:04:49.764','2024-11-09 03:17:32.886');
/*!40000 ALTER TABLE `petty_cashes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchases`
--

DROP TABLE IF EXISTS `purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
INSERT INTO `purchases` VALUES ('3ab73bb4-e521-4903-bfe5-ec80fc048314','80fe7a34-852a-4389-af82-44a8f7c3fbd1','e9ac3da2-a6b8-4ac5-9487-9269ddf91334','2a0a7e36-ece3-499d-bb7b-bb0970ea1eda',1,1653220,3500,'2024-11-08 18:57:47.680','2024-11-08 18:57:47.680'),('a3d4629f-f926-499c-9030-01c954deef7b','80fe7a34-852a-4389-af82-44a8f7c3fbd1','293a9671-5d35-4c6a-9176-e18010fbed29','240b4557-b492-453d-b16d-cb7a85ec68f9',1,14520,5000,'2024-11-08 18:49:59.799','2024-11-08 18:54:10.290'),('b4801e36-e36b-44f6-a6cb-7e7bae1f3bf8','80fe7a34-852a-4389-af82-44a8f7c3fbd1','53dbe60a-d77a-471e-b760-950efb11024c','adaf5a4e-d913-4aaf-8afc-2fa3aefdf77b',1,1204852,1800,'2024-11-08 18:59:42.353','2024-11-08 18:59:42.353');
/*!40000 ALTER TABLE `purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refunds`
--

DROP TABLE IF EXISTS `refunds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
INSERT INTO `refunds` VALUES ('3c5a6eaa-2a82-4553-bd1f-779f42970b2f',1,300,'Del pago de la luz','2024-11-09 03:17:32.881','2024-11-09 03:17:32.881');
/*!40000 ALTER TABLE `refunds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
INSERT INTO `sales` VALUES ('56d2a65f-26ad-47e5-afff-024f4a0f7328','bdd07bf6-1065-443d-a168-4e3c520aa451','f83e26cd-e711-444e-9d01-72f95310fbd2','80fe7a34-852a-4389-af82-44a8f7c3fbd1',3,1,0,120,120,200,0,80,'2024-11-08 19:03:54.307','2024-11-08 19:03:54.307'),('8378fbe5-3df9-4b7f-a539-b92757606dd3','bdd07bf6-1065-443d-a168-4e3c520aa451','f83e26cd-e711-444e-9d01-72f95310fbd2','80fe7a34-852a-4389-af82-44a8f7c3fbd1',2,1,0,160,160,0,5,24,'2024-10-08 19:03:23.314','2024-11-08 19:03:23.314'),('99a87cec-56e9-4aae-a5ee-8009bd4dea98','bdd07bf6-1065-443d-a168-4e3c520aa451','f83e26cd-e711-444e-9d01-72f95310fbd2','80fe7a34-852a-4389-af82-44a8f7c3fbd1',1,1,0,300,300,200,5,84,'2024-11-07 17:31:55.730','2024-11-07 17:31:55.730'),('99e62bf6-e481-468a-bc8d-5ef0e8f60b38','701ea872-011a-426a-91f5-8d343d4a0073','f83e26cd-e711-444e-9d01-72f95310fbd2','5be21058-2809-4dfe-a0ba-9f36b98adf4f',4,1,5,120,115,5,3,0.4,'2024-11-09 03:16:04.475','2024-11-09 03:16:04.475');
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
INSERT INTO `suppliers` VALUES ('0e1ecdf0-b655-49a5-b6ee-8b40d9875613','Best Brand','Alex Pineda','','Pacas monzeñor','87567343','2024-10-07 16:10:52.167','0000-00-00 00:00:00.000'),('293a9671-5d35-4c6a-9176-e18010fbed29','Best Brand','Marcos Centeno','','Matagalpa','23458765','2024-10-16 17:38:35.565','0000-00-00 00:00:00.000'),('53dbe60a-d77a-471e-b760-950efb11024c','Best Brand','Maria Cruz','','Pacas matagalpa','56456324','2024-10-08 08:21:05.476','0000-00-00 00:00:00.000'),('66e76a32-c8de-4935-b4a6-fc7ec844d437','Toys inc','Cruz Pérez','','Sede Jinotega','56456324','2024-10-29 21:24:11.111','2024-10-29 21:24:11.111'),('e9ac3da2-a6b8-4ac5-9487-9269ddf91334','Best Brand','Pablo Cruz','','Managua central','87567343','2024-10-16 17:32:39.800','0000-00-00 00:00:00.000');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
INSERT INTO `users` VALUES ('5be21058-2809-4dfe-a0ba-9f36b98adf4f','Juan Jenkins','jm151925@gmail.com','$2a$10$ZMCCqdJ9Z5gZjjasPzaj8uJjss26kFtKE3.QteyereoEr4AjrfHNu','admin','jm151925@gmail.com.jpg','2024-10-07 16:00:20.784','2024-10-07 16:00:20.784'),('80fe7a34-852a-4389-af82-44a8f7c3fbd1','Joel Urbina','joel8080ur@gmail.com','$2a$10$0O/tKT6Wsw7HBbAsC8nw.uh.ylu5TphHUOUG/CR8jsdwGU/B/js..','admin','joel8080ur@gmail.com.webp','2024-10-07 15:34:13.802','2024-10-16 20:22:15.577'),('8f0f3e44-8596-4b97-841b-bb3ae3e5cf51','Alex','alex@gmail.com','$2a$10$5o.shHEtoExphSumKw3WzeicfTcLMn5zmB36IctHq2bZSJP6JnpmK','vendedor','alex@gmail.com.jpg','2024-10-07 15:53:27.238','2024-10-07 15:53:27.238');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-14  9:49:35
