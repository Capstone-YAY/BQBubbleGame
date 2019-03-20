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
-- Table structure for table `game_users`
--

CREATE TABLE `game_users` (
  `name` varchar(255) NOT NULL,
  `pass` text NOT NULL,
  `email` text NOT NULL,
  `level` tinyint(4) NOT NULL,
  `approved` tinyint(1) NOT NULL DEFAULT '0',
  `district` smallint(6) NOT NULL DEFAULT '0',
  `team` int(11) NOT NULL DEFAULT '0',
  `parent` text NOT NULL,
  `coach` text NOT NULL,
  `firstname` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


--
-- Indexes for dumped tables
--

--
-- Indexes for table `game_users`
--
ALTER TABLE `game_users`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
