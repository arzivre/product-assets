-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: harisenin
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('1f979470-011a-407e-b025-aedbd549d22c','462fd485a77c9d297a3f188c5783ed6603df8fa27d2b4eebbd929cb42d83b5d2','2022-11-19 05:45:43.314','20221119054542_init',NULL,NULL,'2022-11-19 05:45:42.903',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asset`
--

DROP TABLE IF EXISTS `asset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asset` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productAssetId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Asset_productAssetId_fkey` (`productAssetId`),
  CONSTRAINT `Asset_productAssetId_fkey` FOREIGN KEY (`productAssetId`) REFERENCES `productasset` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset`
--

LOCK TABLES `asset` WRITE;
/*!40000 ALTER TABLE `asset` DISABLE KEYS */;
INSERT INTO `asset` VALUES ('claniviuq0005mhz44oovfw8m','claniviuq0002mhz46wjwxghv','harisenin/umrmj9rjnuseyjvbrnk5','https://res.cloudinary.com/dbatk1jxc/image/upload/v1668837693/harisenin/umrmj9rjnuseyjvbrnk5.png',89573,'2022-11-19 06:01:35.282','2022-11-19 06:01:35.282'),('claniviuq0006mhz4k3bu0lvz','claniviuq0002mhz46wjwxghv','harisenin/ba9iwudo4plryhxvniwd','https://res.cloudinary.com/dbatk1jxc/image/upload/v1668837696/harisenin/ba9iwudo4plryhxvniwd.png',75098,'2022-11-19 06:01:35.282','2022-11-19 06:01:35.282'),('clanvromp0008mhgstcw5kcye',NULL,'harisenin/rttig2g5dednn1nnusa7','https://res.cloudinary.com/dbatk1jxc/image/upload/v1668864024/harisenin/rttig2g5dednn1nnusa7.jpg',325091,'2022-11-19 12:02:31.153','2022-11-19 13:20:25.594'),('clanvth4l000bmhgsyc9lvxfa',NULL,'harisenin/lsp9rfzknz97cmnhqldd','https://res.cloudinary.com/dbatk1jxc/image/upload/v1668865153/harisenin/lsp9rfzknz97cmnhqldd.jpg',551957,'2022-11-19 12:03:54.741','2022-11-19 13:39:14.139'),('clany24vp000hmhgs8vmlaqzi','clanj39dv000bmhz4kha5t126','harisenin/f1myqwf2zykpogc9zahz','https://res.cloudinary.com/dbatk1jxc/image/upload/v1668863197/harisenin/f1myqwf2zykpogc9zahz.jpg',250560,'2022-11-19 13:06:38.005','2022-11-19 13:06:38.005');
/*!40000 ALTER TABLE `asset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Category_asset_id_key` (`asset_id`),
  CONSTRAINT `Category_asset_id_fkey` FOREIGN KEY (`asset_id`) REFERENCES `asset` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('clanvth4l000amhgs928adl9h','tes','tes','clanvth4l000bmhgsyc9lvxfa','2022-11-19 12:03:54.741','2022-11-19 13:39:14.148');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('claniviuq0003mhz4f4er8htx','product assset 1','product-assset-1',10000,'tes upppload ','2022-11-19 06:01:35.282','2022-11-19 06:01:35.282'),('clanj39dv000cmhz4qukr385g','sdfsf update updatea','sdfsf-update-updatea',1231231,'update qwewqe updatea','2022-11-19 06:07:36.259','2022-11-19 13:06:38.005'),('clansmgbn0000mhgswhxhy2ni','create prodcut tes','create-prodcut-tes',123213,'teslkjdlf sdf sdf sd  sadfs','2022-11-19 10:34:28.209','2022-11-19 10:34:28.209');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productasset`
--

DROP TABLE IF EXISTS `productasset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productasset` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ProductAsset_productId_key` (`productId`),
  CONSTRAINT `ProductAsset_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productasset`
--

LOCK TABLES `productasset` WRITE;
/*!40000 ALTER TABLE `productasset` DISABLE KEYS */;
INSERT INTO `productasset` VALUES ('claniviuq0002mhz46wjwxghv','claniviuq0003mhz4f4er8htx'),('clanj39dv000bmhz4kha5t126','clanj39dv000cmhz4qukr385g');
/*!40000 ALTER TABLE `productasset` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-19 20:48:20
