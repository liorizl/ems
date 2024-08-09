-- phpMyAdmin SQL Dump
-- version 4.0.10.11
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2024-08-09 14:59:26
-- 服务器版本: 5.7.20-log
-- PHP 版本: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `ems`
--

-- --------------------------------------------------------

--
-- 表的结构 `login_list`
--

CREATE TABLE IF NOT EXISTS `login_list` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `ip` varchar(20) NOT NULL,
  `userName` varchar(20) NOT NULL,
  `address` varchar(50) NOT NULL,
  `date` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `login_list`
--

INSERT INTO `login_list` (`id`, `ip`, `userName`, `address`, `date`) VALUES
(1, '127.0.0.1', 'liori', '未知', '2024-08-09 10:54:00'),
(2, '127.0.0.1', 'liori', '未知', '2024-08-09 11:05:43'),
(3, '127.0.0.1', 'liori', '未知', '2024-08-09 11:12:57');

-- --------------------------------------------------------

--
-- 表的结构 `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `keywords` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `picUrl` varchar(100) NOT NULL,
  `isUse` int(1) NOT NULL DEFAULT '1',
  `isIndex` int(1) NOT NULL DEFAULT '1',
  `source` varchar(50) NOT NULL,
  `upTime` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `user_admin`
--

CREATE TABLE IF NOT EXISTS `user_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(50) NOT NULL,
  `userPsd` varchar(100) NOT NULL,
  `loginTimes` int(10) NOT NULL,
  `lastLogin` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `user_admin`
--

INSERT INTO `user_admin` (`id`, `userId`, `userPsd`, `loginTimes`, `lastLogin`) VALUES
(1, 'liori', '9acf2c4eaa59b9e232b1977a1e105f67', 4, '2024-08-09 02:40:45');

-- --------------------------------------------------------

--
-- 表的结构 `user_session`
--

CREATE TABLE IF NOT EXISTS `user_session` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `sessionID` varchar(100) NOT NULL,
  `expire` bigint(20) NOT NULL,
  `data` varchar(100) NOT NULL,
  `loginIp` char(30) NOT NULL,
  `count` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `user_session`
--

INSERT INTO `user_session` (`id`, `sessionID`, `expire`, `data`, `loginIp`, `count`) VALUES
(1, 'liori', 1723216377189, '44c918709ba13dd2a29c9b64ae9ce540', '127.0.0.1', 1);

-- --------------------------------------------------------

--
-- 表的结构 `websetting`
--

CREATE TABLE IF NOT EXISTS `websetting` (
  `id` int(10) NOT NULL,
  `webName` varchar(50) NOT NULL,
  `description` varchar(500) NOT NULL,
  `keyword` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `websetting`
--

INSERT INTO `websetting` (`id`, `webName`, `description`, `keyword`) VALUES
(1, '企业人员管理系统', '企业人员管理系统', '企业人员管理系统');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
