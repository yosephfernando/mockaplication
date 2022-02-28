-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: biodata
-- ------------------------------------------------------
-- Server version	5.7.35

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
-- Table structure for table `data_pribadi`
--

DROP TABLE IF EXISTS `data_pribadi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `data_pribadi` (
  `id_biodata` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) DEFAULT NULL,
  `posisi_dilamar` varchar(50) DEFAULT NULL,
  `no_ktp` varchar(20) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `tempat_lahir` varchar(100) DEFAULT NULL,
  `agama` enum('ISLAM','KRISTEN','KATHOLIK','BUDHA','HINDU') DEFAULT NULL,
  `golongan_darah` enum('A','B','AB','O') DEFAULT NULL,
  `status_pernikahan` enum('SUDAH','BELUM','JANDA','DUDA') DEFAULT NULL,
  `alamat_ktp` text,
  `alamat_tempat_tinggal` text,
  `email` varchar(80) DEFAULT NULL,
  `no_telp` varchar(13) DEFAULT NULL,
  `emergency_contact` varchar(13) DEFAULT NULL,
  `skils` text,
  `bersedia_ditempatkan` enum('YA','TIDAK') DEFAULT NULL,
  `penghasilan_diharapkan` int(11) DEFAULT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_biodata`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `data_pribadi`
--

LOCK TABLES `data_pribadi` WRITE;
/*!40000 ALTER TABLE `data_pribadi` DISABLE KEYS */;
/*!40000 ALTER TABLE `data_pribadi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pendidikan_terakhir`
--

DROP TABLE IF EXISTS `pendidikan_terakhir`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pendidikan_terakhir` (
  `id_pt` int(11) NOT NULL AUTO_INCREMENT,
  `id_biodata` int(11) DEFAULT NULL,
  `jenjang` varchar(4) DEFAULT NULL,
  `nama_institusi` varchar(50) DEFAULT NULL,
  `jurusan` varchar(20) DEFAULT NULL,
  `tahun_lulus` int(11) DEFAULT NULL,
  `ipk` float DEFAULT NULL,
  PRIMARY KEY (`id_pt`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pendidikan_terakhir`
--

LOCK TABLES `pendidikan_terakhir` WRITE;
/*!40000 ALTER TABLE `pendidikan_terakhir` DISABLE KEYS */;
/*!40000 ALTER TABLE `pendidikan_terakhir` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `riwayat_pekerjaan`
--

DROP TABLE IF EXISTS `riwayat_pekerjaan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `riwayat_pekerjaan` (
  `id_riwayat` int(11) NOT NULL AUTO_INCREMENT,
  `id_biodata` int(11) DEFAULT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `posisi` varchar(50) DEFAULT NULL,
  `pendapatan` int(11) DEFAULT NULL,
  `tahun` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_riwayat`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `riwayat_pekerjaan`
--

LOCK TABLES `riwayat_pekerjaan` WRITE;
/*!40000 ALTER TABLE `riwayat_pekerjaan` DISABLE KEYS */;
/*!40000 ALTER TABLE `riwayat_pekerjaan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `riwayat_pelatihan`
--

DROP TABLE IF EXISTS `riwayat_pelatihan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `riwayat_pelatihan` (
  `id_riwayat` int(11) NOT NULL AUTO_INCREMENT,
  `id_biodata` int(11) DEFAULT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `sertifikat` enum('ada','tidak') DEFAULT NULL,
  `tahun` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_riwayat`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `riwayat_pelatihan`
--

LOCK TABLES `riwayat_pelatihan` WRITE;
/*!40000 ALTER TABLE `riwayat_pelatihan` DISABLE KEYS */;
/*!40000 ALTER TABLE `riwayat_pelatihan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `role` varchar(6) DEFAULT NULL,
  `password` text,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'fernandoyoseph6@gmail.com','admin','$2a$10$mv07z5vz.Z6HDFGmuoXpI.7i9en1BZ.TWimcJHuUDPRFjRcnUulQi'),(2,'yoseph@ymail.com','user','$2b$10$KbnCL4FaN8bYDFuGAd94NueXDsVtobGVjyOFUj5SLhYRdpp.exbZC'),(7,'test@asdysp.com','admin','$2b$10$KbnCL4FaN8bYDFuGAd94NueXDsVtobGVjyOFUj5SLhYRdpp.exbZC'),(8,'test@mmm.com','user','$2b$10$1ZGUTSojPi8eQ4JbIrWETeiOAvLgKYC8CQsjOr8CrTZwyHiCoFrAy'),(9,'test@lll.com','user','$2b$10$vdWn7rdbnAnIXmbnNuli7.i8NXwPc1VpgJYVm3U5XQvdFAT8aia2K');
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

-- Dump completed on 2022-03-01  4:25:36
