-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 10, 2019 at 07:58 AM
-- Server version: 5.6.41-84.1
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blah`
--

-- --------------------------------------------------------

--
-- Table structure for table `gamescores`
--

CREATE TABLE `gamescores` (
  `name` text NOT NULL,
  `pass` text NOT NULL,
  `game` text NOT NULL,
  `level` smallint(6) NOT NULL DEFAULT '0',
  `numq` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `time` float NOT NULL,
  `numc` int(11) NOT NULL,
  `nume` int(11) NOT NULL,
  `timestamp` bigint(20) NOT NULL,
  `versesc` longtext NOT NULL,
  `versese` longtext NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
