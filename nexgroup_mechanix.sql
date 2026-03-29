-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 28, 2026 at 03:31 AM
-- Server version: 10.11.16-MariaDB-cll-lve
-- PHP Version: 8.4.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nexgroup_mechanix`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_activities`
--

CREATE TABLE `admin_activities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `action` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `model_id` varchar(255) DEFAULT NULL,
  `changes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`changes`)),
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_activities`
--

INSERT INTO `admin_activities` (`id`, `user_id`, `action`, `model`, `model_id`, `changes`, `description`, `created_at`, `updated_at`) VALUES
(1, 1, 'updated', 'PageContent', '114', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page content: page content', '2025-09-26 17:02:41', '2025-09-26 17:02:41'),
(2, 1, 'updated', 'NavigationItem', '6', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated navigation item: navigation item', '2025-09-26 15:08:41', '2025-09-26 15:08:41'),
(3, 1, 'created', 'NavigationItem', '8', '{\"new\":{\"title\":\"navigation item\",\"status\":\"active\"}}', 'Created new navigation item: navigation item', '2025-09-26 20:54:41', '2025-09-26 20:54:41'),
(4, 1, 'updated', 'Project', '12', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated project: Contemporary Duplex Home', '2025-09-26 17:44:41', '2025-09-26 17:44:41'),
(5, 1, 'deleted', 'NavigationItem', '5', '{\"old\":{\"title\":\"navigation item\"}}', 'Deleted navigation item: navigation item', '2025-09-27 22:01:41', '2025-09-27 22:01:41'),
(6, 1, 'deleted', 'Project', '7', '{\"old\":{\"title\":\"Fine Dining Restaurant\"}}', 'Deleted project: Fine Dining Restaurant', '2025-09-27 22:38:41', '2025-09-27 22:38:41'),
(7, 1, 'deleted', 'Service', '2', '{\"old\":{\"title\":\"Commercial\"}}', 'Deleted service: Commercial', '2025-09-28 00:12:41', '2025-09-28 00:12:41'),
(8, 1, 'deleted', 'Service', '3', '{\"old\":{\"title\":\"Consultancy\"}}', 'Deleted service: Consultancy', '2025-09-27 16:16:41', '2025-09-27 16:16:41'),
(9, 1, 'created', 'Project', '5', '{\"new\":{\"title\":\"Retail Showroom Design\",\"status\":\"active\"}}', 'Created new project: Retail Showroom Design', '2025-09-27 15:28:41', '2025-09-27 15:28:41'),
(10, 1, 'deleted', 'PageContent', '38', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-09-27 14:38:41', '2025-09-27 14:38:41'),
(11, 1, 'deleted', 'Service', '2', '{\"old\":{\"title\":\"Commercial\"}}', 'Deleted service: Commercial', '2025-09-28 20:14:41', '2025-09-28 20:14:41'),
(12, 1, 'deleted', 'Project', '17', '{\"old\":{\"title\":\"Residential Complex Development\"}}', 'Deleted project: Residential Complex Development', '2025-09-29 19:35:41', '2025-09-29 19:35:41'),
(13, 1, 'updated', 'PageSection', '28', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page section: page section', '2025-09-29 13:26:41', '2025-09-29 13:26:41'),
(14, 1, 'updated', 'NavigationItem', '11', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated navigation item: navigation item', '2025-09-30 00:02:41', '2025-09-30 00:02:41'),
(15, 1, 'created', 'PageSection', '26', '{\"new\":{\"title\":\"page section\",\"status\":\"active\"}}', 'Created new page section: page section', '2025-09-29 15:47:41', '2025-09-29 15:47:41'),
(16, 1, 'updated', 'Project', '6', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated project: Business Center Interior', '2025-09-29 23:18:41', '2025-09-29 23:18:41'),
(17, 1, 'created', 'NavigationItem', '10', '{\"new\":{\"title\":\"navigation item\",\"status\":\"active\"}}', 'Created new navigation item: navigation item', '2025-09-29 17:34:41', '2025-09-29 17:34:41'),
(18, 1, 'updated', 'Project', '11', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated project: Resort Lobby Design', '2025-09-30 13:38:41', '2025-09-30 13:38:41'),
(19, 1, 'deleted', 'PageContent', '66', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-09-30 14:54:41', '2025-09-30 14:54:41'),
(20, 1, 'deleted', 'NavigationItem', '8', '{\"old\":{\"title\":\"navigation item\"}}', 'Deleted navigation item: navigation item', '2025-09-30 19:54:41', '2025-09-30 19:54:41'),
(21, 1, 'created', 'Project', '3', '{\"new\":{\"title\":\"Family Home Renovation\",\"status\":\"active\"}}', 'Created new project: Family Home Renovation', '2025-09-30 13:42:41', '2025-09-30 13:42:41'),
(22, 1, 'created', 'PageSection', '18', '{\"new\":{\"title\":\"page section\",\"status\":\"active\"}}', 'Created new page section: page section', '2025-09-30 19:06:41', '2025-09-30 19:06:41'),
(23, 1, 'deleted', 'Project', '8', '{\"old\":{\"title\":\"Casual Dining Cafe\"}}', 'Deleted project: Casual Dining Cafe', '2025-09-30 23:01:41', '2025-09-30 23:01:41'),
(24, 1, 'updated', 'NavigationItem', '7', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated navigation item: navigation item', '2025-09-30 23:55:41', '2025-09-30 23:55:41'),
(25, 1, 'deleted', 'NavigationItem', '7', '{\"old\":{\"title\":\"navigation item\"}}', 'Deleted navigation item: navigation item', '2025-10-01 18:49:41', '2025-10-01 18:49:41'),
(26, 1, 'created', 'NavigationItem', '1', '{\"new\":{\"title\":\"navigation item\",\"status\":\"active\"}}', 'Created new navigation item: navigation item', '2025-10-01 23:28:41', '2025-10-01 23:28:41'),
(27, 1, 'created', 'PageSection', '16', '{\"new\":{\"title\":\"page section\",\"status\":\"active\"}}', 'Created new page section: page section', '2025-10-01 22:29:41', '2025-10-01 22:29:41'),
(28, 1, 'updated', 'NavigationItem', '1', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated navigation item: navigation item', '2025-10-01 18:18:41', '2025-10-01 18:18:41'),
(29, 1, 'deleted', 'PageContent', '75', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-10-01 16:02:41', '2025-10-01 16:02:41'),
(30, 1, 'updated', 'Service', '1', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated service: Residential', '2025-10-04 00:03:41', '2025-10-04 00:03:41'),
(31, 1, 'deleted', 'PageContent', '39', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-10-03 22:36:41', '2025-10-03 22:36:41'),
(32, 1, 'created', 'Service', '3', '{\"new\":{\"title\":\"Consultancy\",\"status\":\"active\"}}', 'Created new service: Consultancy', '2025-10-04 19:07:41', '2025-10-04 19:07:41'),
(33, 1, 'updated', 'Project', '15', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated project: Mixed-Use Development', '2025-10-04 18:20:41', '2025-10-04 18:20:41'),
(34, 1, 'created', 'PageContent', '40', '{\"new\":{\"title\":\"page content\",\"status\":\"active\"}}', 'Created new page content: page content', '2025-10-04 13:53:41', '2025-10-04 13:53:41'),
(35, 1, 'deleted', 'Service', '1', '{\"old\":{\"title\":\"Residential\"}}', 'Deleted service: Residential', '2025-10-04 23:42:41', '2025-10-04 23:42:41'),
(36, 1, 'deleted', 'PageContent', '13', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-10-04 17:07:41', '2025-10-04 17:07:41'),
(37, 1, 'deleted', 'Service', '1', '{\"old\":{\"title\":\"Residential\"}}', 'Deleted service: Residential', '2025-10-04 15:06:41', '2025-10-04 15:06:41'),
(38, 1, 'deleted', 'PageSection', '18', '{\"old\":{\"title\":\"page section\"}}', 'Deleted page section: page section', '2025-10-04 21:38:41', '2025-10-04 21:38:41'),
(39, 1, 'created', 'NavigationItem', '1', '{\"new\":{\"title\":\"navigation item\",\"status\":\"active\"}}', 'Created new navigation item: navigation item', '2025-10-06 14:38:41', '2025-10-06 14:38:41'),
(40, 1, 'created', 'PageContent', '39', '{\"new\":{\"title\":\"page content\",\"status\":\"active\"}}', 'Created new page content: page content', '2025-10-06 23:23:41', '2025-10-06 23:23:41'),
(41, 1, 'deleted', 'PageContent', '51', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-10-07 20:27:41', '2025-10-07 20:27:41'),
(42, 1, 'deleted', 'PageSection', '3', '{\"old\":{\"title\":\"page section\"}}', 'Deleted page section: page section', '2025-10-08 16:09:41', '2025-10-08 16:09:41'),
(43, 1, 'updated', 'Project', '13', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated project: Urban Duplex Loft', '2025-10-08 20:48:41', '2025-10-08 20:48:41'),
(44, 1, 'deleted', 'Service', '3', '{\"old\":{\"title\":\"Consultancy\"}}', 'Deleted service: Consultancy', '2025-10-08 15:04:41', '2025-10-08 15:04:41'),
(45, 1, 'created', 'Project', '16', '{\"new\":{\"title\":\"High-Rise Construction\",\"status\":\"active\"}}', 'Created new project: High-Rise Construction', '2025-10-08 22:42:41', '2025-10-08 22:42:41'),
(46, 1, 'updated', 'PageSection', '2', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page section: page section', '2025-10-08 22:14:41', '2025-10-08 22:14:41'),
(47, 1, 'created', 'Service', '3', '{\"new\":{\"title\":\"Consultancy\",\"status\":\"active\"}}', 'Created new service: Consultancy', '2025-10-09 14:42:41', '2025-10-09 14:42:41'),
(48, 1, 'updated', 'NavigationItem', '3', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated navigation item: navigation item', '2025-10-09 16:58:41', '2025-10-09 16:58:41'),
(49, 1, 'updated', 'NavigationItem', '9', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated navigation item: navigation item', '2025-10-09 18:51:41', '2025-10-09 18:51:41'),
(50, 1, 'created', 'Service', '2', '{\"new\":{\"title\":\"Commercial\",\"status\":\"active\"}}', 'Created new service: Commercial', '2025-10-10 19:43:41', '2025-10-10 19:43:41'),
(51, 1, 'updated', 'Project', '17', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated project: Residential Complex Development', '2025-10-10 23:50:41', '2025-10-10 23:50:41'),
(52, 1, 'created', 'PageSection', '28', '{\"new\":{\"title\":\"page section\",\"status\":\"active\"}}', 'Created new page section: page section', '2025-10-12 00:13:41', '2025-10-12 00:13:41'),
(53, 1, 'updated', 'NavigationItem', '3', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated navigation item: navigation item', '2025-10-13 00:06:41', '2025-10-13 00:06:41'),
(54, 1, 'updated', 'PageSection', '21', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page section: page section', '2025-10-12 23:56:41', '2025-10-12 23:56:41'),
(55, 1, 'created', 'PageContent', '35', '{\"new\":{\"title\":\"page content\",\"status\":\"active\"}}', 'Created new page content: page content', '2025-10-13 20:54:41', '2025-10-13 20:54:41'),
(56, 1, 'deleted', 'Service', '2', '{\"old\":{\"title\":\"Commercial\"}}', 'Deleted service: Commercial', '2025-10-14 17:08:41', '2025-10-14 17:08:41'),
(57, 1, 'updated', 'PageContent', '52', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page content: page content', '2025-10-14 16:57:41', '2025-10-14 16:57:41'),
(58, 1, 'updated', 'NavigationItem', '7', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated navigation item: navigation item', '2025-10-15 18:50:41', '2025-10-15 18:50:41'),
(59, 1, 'updated', 'Service', '2', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated service: Commercial', '2025-10-15 15:53:41', '2025-10-15 15:53:41'),
(60, 1, 'created', 'PageSection', '30', '{\"new\":{\"title\":\"page section\",\"status\":\"active\"}}', 'Created new page section: page section', '2025-10-15 20:44:41', '2025-10-15 20:44:41'),
(61, 1, 'deleted', 'PageSection', '23', '{\"old\":{\"title\":\"page section\"}}', 'Deleted page section: page section', '2025-10-15 23:36:41', '2025-10-15 23:36:41'),
(62, 1, 'created', 'PageContent', '71', '{\"new\":{\"title\":\"page content\",\"status\":\"active\"}}', 'Created new page content: page content', '2025-10-15 23:07:41', '2025-10-15 23:07:41'),
(63, 1, 'deleted', 'PageContent', '46', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-10-15 16:12:41', '2025-10-15 16:12:41'),
(64, 1, 'deleted', 'NavigationItem', '5', '{\"old\":{\"title\":\"navigation item\"}}', 'Deleted navigation item: navigation item', '2025-10-16 19:42:41', '2025-10-16 19:42:41'),
(65, 1, 'created', 'NavigationItem', '5', '{\"new\":{\"title\":\"navigation item\",\"status\":\"active\"}}', 'Created new navigation item: navigation item', '2025-10-16 13:32:41', '2025-10-16 13:32:41'),
(66, 1, 'updated', 'Service', '2', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated service: Commercial', '2025-10-19 23:59:41', '2025-10-19 23:59:41'),
(67, 1, 'created', 'PageSection', '35', '{\"new\":{\"title\":\"page section\",\"status\":\"active\"}}', 'Created new page section: page section', '2025-10-19 15:01:41', '2025-10-19 15:01:41'),
(68, 1, 'deleted', 'PageContent', '68', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-10-19 14:15:41', '2025-10-19 14:15:41'),
(69, 1, 'deleted', 'Project', '5', '{\"old\":{\"title\":\"Retail Showroom Design\"}}', 'Deleted project: Retail Showroom Design', '2025-10-19 13:24:41', '2025-10-19 13:24:41'),
(70, 1, 'updated', 'NavigationItem', '8', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated navigation item: navigation item', '2025-10-19 19:08:41', '2025-10-19 19:08:41'),
(71, 1, 'deleted', 'Project', '12', '{\"old\":{\"title\":\"Contemporary Duplex Home\"}}', 'Deleted project: Contemporary Duplex Home', '2025-10-19 14:22:41', '2025-10-19 14:22:41'),
(72, 1, 'deleted', 'PageSection', '6', '{\"old\":{\"title\":\"page section\"}}', 'Deleted page section: page section', '2025-10-19 21:58:41', '2025-10-19 21:58:41'),
(73, 1, 'deleted', 'Service', '1', '{\"old\":{\"title\":\"Residential\"}}', 'Deleted service: Residential', '2025-10-21 00:07:41', '2025-10-21 00:07:41'),
(74, 1, 'deleted', 'Project', '14', '{\"old\":{\"title\":\"Sustainable Building Design\"}}', 'Deleted project: Sustainable Building Design', '2025-10-20 20:21:41', '2025-10-20 20:21:41'),
(75, 1, 'updated', 'Service', '1', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated service: Residential', '2025-10-21 23:29:41', '2025-10-21 23:29:41'),
(76, 1, 'updated', 'PageContent', '15', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page content: page content', '2025-10-21 18:11:41', '2025-10-21 18:11:41'),
(77, 1, 'deleted', 'PageSection', '7', '{\"old\":{\"title\":\"page section\"}}', 'Deleted page section: page section', '2025-10-23 14:59:41', '2025-10-23 14:59:41'),
(78, 1, 'deleted', 'NavigationItem', '10', '{\"old\":{\"title\":\"navigation item\"}}', 'Deleted navigation item: navigation item', '2025-10-23 21:39:41', '2025-10-23 21:39:41'),
(79, 1, 'deleted', 'PageSection', '17', '{\"old\":{\"title\":\"page section\"}}', 'Deleted page section: page section', '2025-10-23 17:10:41', '2025-10-23 17:10:41'),
(80, 1, 'updated', 'Service', '2', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated service: Commercial', '2025-10-24 18:37:41', '2025-10-24 18:37:41'),
(81, 1, 'deleted', 'PageSection', '9', '{\"old\":{\"title\":\"page section\"}}', 'Deleted page section: page section', '2025-10-24 23:14:41', '2025-10-24 23:14:41'),
(82, 1, 'created', 'NavigationItem', '10', '{\"new\":{\"title\":\"navigation item\",\"status\":\"active\"}}', 'Created new navigation item: navigation item', '2025-10-26 19:20:41', '2025-10-26 19:20:41'),
(83, 1, 'created', 'Project', '1', '{\"new\":{\"title\":\"Modern Villa Design\",\"status\":\"active\"}}', 'Created new project: Modern Villa Design', '2025-10-26 15:44:41', '2025-10-26 15:44:41'),
(84, 1, 'deleted', 'Project', '1', '{\"old\":{\"title\":\"Modern Villa Design\"}}', 'Deleted project: Modern Villa Design', '2025-10-26 17:56:41', '2025-10-26 17:56:41'),
(85, 1, 'deleted', 'PageContent', '65', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-10-26 13:30:41', '2025-10-26 13:30:41'),
(86, 1, 'deleted', 'NavigationItem', '7', '{\"old\":{\"title\":\"navigation item\"}}', 'Deleted navigation item: navigation item', '2025-10-27 00:11:41', '2025-10-27 00:11:41'),
(87, 1, 'deleted', 'Service', '1', '{\"old\":{\"title\":\"Residential\"}}', 'Deleted service: Residential', '2025-10-26 22:09:41', '2025-10-26 22:09:41'),
(88, 1, 'deleted', 'Project', '11', '{\"old\":{\"title\":\"Resort Lobby Design\"}}', 'Deleted project: Resort Lobby Design', '2025-10-26 22:31:41', '2025-10-26 22:31:41'),
(89, 1, 'deleted', 'PageContent', '16', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-10-26 22:08:41', '2025-10-26 22:08:41'),
(90, 1, 'created', 'PageContent', '78', '{\"new\":{\"title\":\"page content\",\"status\":\"active\"}}', 'Created new page content: page content', '2025-10-28 18:05:41', '2025-10-28 18:05:41'),
(91, 1, 'created', 'Service', '3', '{\"new\":{\"title\":\"Consultancy\",\"status\":\"active\"}}', 'Created new service: Consultancy', '2025-10-28 22:58:41', '2025-10-28 22:58:41'),
(92, 1, 'created', 'PageContent', '45', '{\"new\":{\"title\":\"page content\",\"status\":\"active\"}}', 'Created new page content: page content', '2025-10-30 14:32:41', '2025-10-30 14:32:41'),
(93, 1, 'deleted', 'NavigationItem', '9', '{\"old\":{\"title\":\"navigation item\"}}', 'Deleted navigation item: navigation item', '2025-10-30 20:31:41', '2025-10-30 20:31:41'),
(94, 1, 'deleted', 'Project', '16', '{\"old\":{\"title\":\"High-Rise Construction\"}}', 'Deleted project: High-Rise Construction', '2025-10-30 20:02:41', '2025-10-30 20:02:41'),
(95, 1, 'created', 'Project', '5', '{\"new\":{\"title\":\"Retail Showroom Design\",\"status\":\"active\"}}', 'Created new project: Retail Showroom Design', '2025-10-30 21:00:41', '2025-10-30 21:00:41'),
(96, 1, 'deleted', 'Service', '2', '{\"old\":{\"title\":\"Commercial\"}}', 'Deleted service: Commercial', '2025-10-30 22:22:41', '2025-10-30 22:22:41'),
(97, 1, 'updated', 'NavigationItem', '2', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated navigation item: navigation item', '2025-10-30 17:14:41', '2025-10-30 17:14:41'),
(98, 1, 'deleted', 'PageContent', '56', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-10-31 17:29:41', '2025-10-31 17:29:41'),
(99, 1, 'created', 'PageSection', '11', '{\"new\":{\"title\":\"page section\",\"status\":\"active\"}}', 'Created new page section: page section', '2025-10-31 18:55:41', '2025-10-31 18:55:41'),
(100, 1, 'created', 'PageContent', '108', '{\"new\":{\"title\":\"page content\",\"status\":\"active\"}}', 'Created new page content: page content', '2025-10-31 15:27:41', '2025-10-31 15:27:41'),
(101, 1, 'deleted', 'PageSection', '8', '{\"old\":{\"title\":\"page section\"}}', 'Deleted page section: page section', '2025-10-31 22:45:41', '2025-10-31 22:45:41'),
(102, 1, 'deleted', 'Service', '2', '{\"old\":{\"title\":\"Commercial\"}}', 'Deleted service: Commercial', '2025-10-31 19:24:41', '2025-10-31 19:24:41'),
(103, 1, 'created', 'NavigationItem', '3', '{\"new\":{\"title\":\"navigation item\",\"status\":\"active\"}}', 'Created new navigation item: navigation item', '2025-10-31 19:39:41', '2025-10-31 19:39:41'),
(104, 1, 'deleted', 'NavigationItem', '11', '{\"old\":{\"title\":\"navigation item\"}}', 'Deleted navigation item: navigation item', '2025-10-31 22:39:41', '2025-10-31 22:39:41'),
(105, 1, 'created', 'PageSection', '13', '{\"new\":{\"title\":\"page section\",\"status\":\"active\"}}', 'Created new page section: page section', '2025-11-01 21:38:41', '2025-11-01 21:38:41'),
(106, 1, 'created', 'Service', '1', '{\"new\":{\"title\":\"Residential\",\"status\":\"active\"}}', 'Created new service: Residential', '2025-11-01 16:03:41', '2025-11-01 16:03:41'),
(107, 1, 'updated', 'PageSection', '30', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page section: page section', '2025-11-02 21:15:41', '2025-11-02 21:15:41'),
(108, 1, 'deleted', 'PageContent', '63', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-11-02 14:37:41', '2025-11-02 14:37:41'),
(109, 1, 'deleted', 'Project', '17', '{\"old\":{\"title\":\"Residential Complex Development\"}}', 'Deleted project: Residential Complex Development', '2025-11-03 19:40:41', '2025-11-03 19:40:41'),
(110, 1, 'created', 'PageContent', '75', '{\"new\":{\"title\":\"page content\",\"status\":\"active\"}}', 'Created new page content: page content', '2025-11-03 18:44:41', '2025-11-03 18:44:41'),
(111, 1, 'updated', 'NavigationItem', '5', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated navigation item: navigation item', '2025-11-03 18:27:41', '2025-11-03 18:27:41'),
(112, 1, 'deleted', 'NavigationItem', '9', '{\"old\":{\"title\":\"navigation item\"}}', 'Deleted navigation item: navigation item', '2025-11-03 17:25:41', '2025-11-03 17:25:41'),
(113, 1, 'deleted', 'Project', '9', '{\"old\":{\"title\":\"Rooftop Restaurant\"}}', 'Deleted project: Rooftop Restaurant', '2025-11-03 14:28:41', '2025-11-03 14:28:41'),
(114, 1, 'updated', 'PageContent', '103', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page content: page content', '2025-11-05 00:20:41', '2025-11-05 00:20:41'),
(115, 1, 'deleted', 'NavigationItem', '3', '{\"old\":{\"title\":\"navigation item\"}}', 'Deleted navigation item: navigation item', '2025-11-04 23:24:41', '2025-11-04 23:24:41'),
(116, 1, 'created', 'PageSection', '1', '{\"new\":{\"title\":\"page section\",\"status\":\"active\"}}', 'Created new page section: page section', '2025-11-04 18:38:41', '2025-11-04 18:38:41'),
(117, 1, 'updated', 'Service', '3', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated service: Consultancy', '2025-11-04 15:08:41', '2025-11-04 15:08:41'),
(118, 1, 'deleted', 'Service', '1', '{\"old\":{\"title\":\"Residential\"}}', 'Deleted service: Residential', '2025-11-05 21:49:41', '2025-11-05 21:49:41'),
(119, 1, 'updated', 'NavigationItem', '2', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated navigation item: navigation item', '2025-11-06 22:43:41', '2025-11-06 22:43:41'),
(120, 1, 'created', 'PageSection', '17', '{\"new\":{\"title\":\"page section\",\"status\":\"active\"}}', 'Created new page section: page section', '2025-11-06 17:19:41', '2025-11-06 17:19:41'),
(121, 1, 'updated', 'NavigationItem', '7', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated navigation item: navigation item', '2025-11-07 14:00:41', '2025-11-07 14:00:41'),
(122, 1, 'deleted', 'Service', '1', '{\"old\":{\"title\":\"Residential\"}}', 'Deleted service: Residential', '2025-11-07 22:51:41', '2025-11-07 22:51:41'),
(123, 1, 'created', 'Service', '3', '{\"new\":{\"title\":\"Consultancy\",\"status\":\"active\"}}', 'Created new service: Consultancy', '2025-11-08 17:37:41', '2025-11-08 17:37:41'),
(124, 1, 'created', 'NavigationItem', '8', '{\"new\":{\"title\":\"navigation item\",\"status\":\"active\"}}', 'Created new navigation item: navigation item', '2025-11-09 23:17:41', '2025-11-09 23:17:41'),
(125, 1, 'created', 'PageContent', '115', '{\"new\":{\"title\":\"page content\",\"status\":\"active\"}}', 'Created new page content: page content', '2025-11-09 18:52:41', '2025-11-09 18:52:41'),
(126, 1, 'created', 'PageContent', '29', '{\"new\":{\"title\":\"page content\",\"status\":\"active\"}}', 'Created new page content: page content', '2025-11-09 21:36:41', '2025-11-09 21:36:41'),
(127, 1, 'updated', 'NavigationItem', '8', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated navigation item: navigation item', '2025-11-09 18:31:41', '2025-11-09 18:31:41'),
(128, 1, 'created', 'Service', '3', '{\"new\":{\"title\":\"Consultancy\",\"status\":\"active\"}}', 'Created new service: Consultancy', '2025-11-09 14:20:41', '2025-11-09 14:20:41'),
(129, 1, 'updated', 'PageContent', '8', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page content: page content', '2025-11-10 18:05:41', '2025-11-10 18:05:41'),
(130, 1, 'deleted', 'PageSection', '34', '{\"old\":{\"title\":\"page section\"}}', 'Deleted page section: page section', '2025-11-10 13:28:41', '2025-11-10 13:28:41'),
(131, 1, 'deleted', 'Service', '2', '{\"old\":{\"title\":\"Commercial\"}}', 'Deleted service: Commercial', '2025-11-10 19:53:41', '2025-11-10 19:53:41'),
(132, 1, 'deleted', 'Project', '12', '{\"old\":{\"title\":\"Contemporary Duplex Home\"}}', 'Deleted project: Contemporary Duplex Home', '2025-11-10 21:25:41', '2025-11-10 21:25:41'),
(133, 1, 'updated', 'Project', '9', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated project: Rooftop Restaurant', '2025-11-10 13:51:41', '2025-11-10 13:51:41'),
(134, 1, 'created', 'NavigationItem', '4', '{\"new\":{\"title\":\"navigation item\",\"status\":\"active\"}}', 'Created new navigation item: navigation item', '2025-11-11 19:11:41', '2025-11-11 19:11:41'),
(135, 1, 'updated', 'PageContent', '23', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page content: page content', '2025-11-11 18:03:41', '2025-11-11 18:03:41'),
(136, 1, 'created', 'NavigationItem', '3', '{\"new\":{\"title\":\"navigation item\",\"status\":\"active\"}}', 'Created new navigation item: navigation item', '2025-11-11 18:15:41', '2025-11-11 18:15:41'),
(137, 1, 'deleted', 'PageContent', '49', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-11-11 16:09:41', '2025-11-11 16:09:41'),
(138, 1, 'deleted', 'Service', '3', '{\"old\":{\"title\":\"Consultancy\"}}', 'Deleted service: Consultancy', '2025-11-11 16:19:41', '2025-11-11 16:19:41'),
(139, 1, 'updated', 'NavigationItem', '3', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated navigation item: navigation item', '2025-11-11 18:39:41', '2025-11-11 18:39:41'),
(140, 1, 'deleted', 'PageSection', '4', '{\"old\":{\"title\":\"page section\"}}', 'Deleted page section: page section', '2025-11-11 21:34:41', '2025-11-11 21:34:41'),
(141, 1, 'deleted', 'Project', '7', '{\"old\":{\"title\":\"Fine Dining Restaurant\"}}', 'Deleted project: Fine Dining Restaurant', '2025-11-12 13:24:41', '2025-11-12 13:24:41'),
(142, 1, 'deleted', 'Project', '15', '{\"old\":{\"title\":\"Mixed-Use Development\"}}', 'Deleted project: Mixed-Use Development', '2025-11-12 23:43:41', '2025-11-12 23:43:41'),
(143, 1, 'created', 'NavigationItem', '6', '{\"new\":{\"title\":\"navigation item\",\"status\":\"active\"}}', 'Created new navigation item: navigation item', '2025-11-12 16:04:41', '2025-11-12 16:04:41'),
(144, 1, 'deleted', 'Project', '4', '{\"old\":{\"title\":\"Corporate Office Space\"}}', 'Deleted project: Corporate Office Space', '2025-11-12 19:36:41', '2025-11-12 19:36:41'),
(145, 1, 'created', 'Service', '2', '{\"new\":{\"title\":\"Commercial\",\"status\":\"active\"}}', 'Created new service: Commercial', '2025-11-12 15:42:41', '2025-11-12 15:42:41'),
(146, 1, 'updated', 'Project', '5', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated project: Retail Showroom Design', '2025-11-12 23:21:41', '2025-11-12 23:21:41'),
(147, 1, 'deleted', 'NavigationItem', '6', '{\"old\":{\"title\":\"navigation item\"}}', 'Deleted navigation item: navigation item', '2025-11-13 18:34:41', '2025-11-13 18:34:41'),
(148, 1, 'deleted', 'NavigationItem', '8', '{\"old\":{\"title\":\"navigation item\"}}', 'Deleted navigation item: navigation item', '2025-11-13 20:11:41', '2025-11-13 20:11:41'),
(149, 1, 'created', 'Service', '2', '{\"new\":{\"title\":\"Commercial\",\"status\":\"active\"}}', 'Created new service: Commercial', '2025-11-13 18:44:41', '2025-11-13 18:44:41'),
(150, 1, 'updated', 'Project', '14', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated project: Sustainable Building Design', '2025-11-13 14:34:41', '2025-11-13 14:34:41'),
(151, 1, 'created', 'PageContent', '2', '{\"new\":{\"title\":\"page content\",\"status\":\"active\"}}', 'Created new page content: page content', '2025-11-13 16:13:41', '2025-11-13 16:13:41'),
(152, 1, 'updated', 'Service', '2', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated service: Commercial', '2025-11-14 19:15:41', '2025-11-14 19:15:41'),
(153, 1, 'created', 'Service', '2', '{\"new\":{\"title\":\"Commercial\",\"status\":\"active\"}}', 'Created new service: Commercial', '2025-11-14 20:43:41', '2025-11-14 20:43:41'),
(154, 1, 'updated', 'PageSection', '30', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page section: page section', '2025-11-14 22:37:41', '2025-11-14 22:37:41'),
(155, 1, 'updated', 'Service', '1', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated service: Residential', '2025-11-14 19:48:41', '2025-11-14 19:48:41'),
(156, 1, 'deleted', 'NavigationItem', '11', '{\"old\":{\"title\":\"navigation item\"}}', 'Deleted navigation item: navigation item', '2025-11-15 13:26:41', '2025-11-15 13:26:41'),
(157, 1, 'deleted', 'PageSection', '18', '{\"old\":{\"title\":\"page section\"}}', 'Deleted page section: page section', '2025-11-15 23:39:41', '2025-11-15 23:39:41'),
(158, 1, 'created', 'Project', '3', '{\"new\":{\"title\":\"Family Home Renovation\",\"status\":\"active\"}}', 'Created new project: Family Home Renovation', '2025-11-15 22:03:41', '2025-11-15 22:03:41'),
(159, 1, 'updated', 'PageContent', '71', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page content: page content', '2025-11-15 18:16:41', '2025-11-15 18:16:41'),
(160, 1, 'deleted', 'PageContent', '23', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-11-15 22:32:41', '2025-11-15 22:32:41'),
(161, 1, 'updated', 'PageContent', '63', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page content: page content', '2025-11-15 13:26:41', '2025-11-15 13:26:41'),
(162, 1, 'created', 'Project', '14', '{\"new\":{\"title\":\"Sustainable Building Design\",\"status\":\"active\"}}', 'Created new project: Sustainable Building Design', '2025-11-16 13:55:41', '2025-11-16 13:55:41'),
(163, 1, 'updated', 'Service', '1', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated service: Residential', '2025-11-16 21:54:41', '2025-11-16 21:54:41'),
(164, 1, 'created', 'Project', '1', '{\"new\":{\"title\":\"Modern Villa Design\",\"status\":\"active\"}}', 'Created new project: Modern Villa Design', '2025-11-16 18:25:41', '2025-11-16 18:25:41'),
(165, 1, 'updated', 'Project', '16', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated project: High-Rise Construction', '2025-11-16 14:32:41', '2025-11-16 14:32:41'),
(166, 1, 'created', 'PageContent', '29', '{\"new\":{\"title\":\"page content\",\"status\":\"active\"}}', 'Created new page content: page content', '2025-11-16 23:47:41', '2025-11-16 23:47:41'),
(167, 1, 'updated', 'PageContent', '3', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page content: page content', '2025-11-18 18:06:41', '2025-11-18 18:06:41'),
(168, 1, 'deleted', 'Service', '1', '{\"old\":{\"title\":\"Residential\"}}', 'Deleted service: Residential', '2025-11-19 21:28:41', '2025-11-19 21:28:41'),
(169, 1, 'created', 'PageSection', '32', '{\"new\":{\"title\":\"page section\",\"status\":\"active\"}}', 'Created new page section: page section', '2025-11-20 00:06:41', '2025-11-20 00:06:41'),
(170, 1, 'updated', 'PageSection', '26', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page section: page section', '2025-11-19 20:08:41', '2025-11-19 20:08:41'),
(171, 1, 'updated', 'PageSection', '34', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page section: page section', '2025-11-19 16:46:41', '2025-11-19 16:46:41'),
(172, 1, 'created', 'Service', '1', '{\"new\":{\"title\":\"Residential\",\"status\":\"active\"}}', 'Created new service: Residential', '2025-11-19 13:33:41', '2025-11-19 13:33:41'),
(173, 1, 'deleted', 'PageSection', '35', '{\"old\":{\"title\":\"page section\"}}', 'Deleted page section: page section', '2025-11-19 18:41:41', '2025-11-19 18:41:41'),
(174, 1, 'deleted', 'Service', '2', '{\"old\":{\"title\":\"Commercial\"}}', 'Deleted service: Commercial', '2025-11-19 15:15:41', '2025-11-19 15:15:41'),
(175, 1, 'created', 'Project', '4', '{\"new\":{\"title\":\"Corporate Office Space\",\"status\":\"active\"}}', 'Created new project: Corporate Office Space', '2025-11-20 16:39:41', '2025-11-20 16:39:41'),
(176, 1, 'deleted', 'NavigationItem', '10', '{\"old\":{\"title\":\"navigation item\"}}', 'Deleted navigation item: navigation item', '2025-11-20 20:06:41', '2025-11-20 20:06:41'),
(177, 1, 'updated', 'PageSection', '3', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page section: page section', '2025-11-20 16:28:41', '2025-11-20 16:28:41'),
(178, 1, 'deleted', 'Service', '2', '{\"old\":{\"title\":\"Commercial\"}}', 'Deleted service: Commercial', '2025-11-20 22:30:41', '2025-11-20 22:30:41'),
(179, 1, 'updated', 'Project', '3', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated project: Family Home Renovation', '2025-11-20 18:44:41', '2025-11-20 18:44:41'),
(180, 1, 'deleted', 'Project', '12', '{\"old\":{\"title\":\"Contemporary Duplex Home\"}}', 'Deleted project: Contemporary Duplex Home', '2025-11-20 20:57:41', '2025-11-20 20:57:41'),
(181, 1, 'updated', 'NavigationItem', '4', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated navigation item: navigation item', '2025-11-20 21:48:41', '2025-11-20 21:48:41'),
(182, 1, 'updated', 'NavigationItem', '4', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated navigation item: navigation item', '2025-11-20 18:43:41', '2025-11-20 18:43:41'),
(183, 1, 'created', 'Project', '15', '{\"new\":{\"title\":\"Mixed-Use Development\",\"status\":\"active\"}}', 'Created new project: Mixed-Use Development', '2025-11-21 13:40:41', '2025-11-21 13:40:41'),
(184, 1, 'deleted', 'Service', '1', '{\"old\":{\"title\":\"Residential\"}}', 'Deleted service: Residential', '2025-11-21 18:13:41', '2025-11-21 18:13:41'),
(185, 1, 'updated', 'Project', '17', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated project: Residential Complex Development', '2025-11-22 00:03:41', '2025-11-22 00:03:41'),
(186, 1, 'deleted', 'PageContent', '22', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-11-21 16:38:41', '2025-11-21 16:38:41'),
(187, 1, 'created', 'PageSection', '26', '{\"new\":{\"title\":\"page section\",\"status\":\"active\"}}', 'Created new page section: page section', '2025-11-21 20:47:41', '2025-11-21 20:47:41'),
(188, 1, 'updated', 'PageContent', '85', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page content: page content', '2025-11-21 14:45:41', '2025-11-21 14:45:41'),
(189, 1, 'deleted', 'PageContent', '57', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-11-21 17:39:41', '2025-11-21 17:39:41'),
(190, 1, 'deleted', 'PageSection', '24', '{\"old\":{\"title\":\"page section\"}}', 'Deleted page section: page section', '2025-11-22 17:37:41', '2025-11-22 17:37:41'),
(191, 1, 'deleted', 'PageSection', '28', '{\"old\":{\"title\":\"page section\"}}', 'Deleted page section: page section', '2025-11-22 16:24:41', '2025-11-22 16:24:41'),
(192, 1, 'created', 'Service', '3', '{\"new\":{\"title\":\"Consultancy\",\"status\":\"active\"}}', 'Created new service: Consultancy', '2025-11-22 22:08:41', '2025-11-22 22:08:41'),
(193, 1, 'deleted', 'PageSection', '16', '{\"old\":{\"title\":\"page section\"}}', 'Deleted page section: page section', '2025-11-22 15:50:41', '2025-11-22 15:50:41'),
(194, 1, 'created', 'PageSection', '31', '{\"new\":{\"title\":\"page section\",\"status\":\"active\"}}', 'Created new page section: page section', '2025-11-23 18:06:41', '2025-11-23 18:06:41'),
(195, 1, 'created', 'Project', '2', '{\"new\":{\"title\":\"Luxury Apartment Interior\",\"status\":\"active\"}}', 'Created new project: Luxury Apartment Interior', '2025-11-23 17:15:41', '2025-11-23 17:15:41'),
(196, 1, 'updated', 'NavigationItem', '6', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated navigation item: navigation item', '2025-11-23 16:07:41', '2025-11-23 16:07:41'),
(197, 1, 'deleted', 'PageContent', '93', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-11-24 19:59:41', '2025-11-24 19:59:41'),
(198, 1, 'updated', 'Service', '3', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated service: Consultancy', '2025-11-24 16:04:41', '2025-11-24 16:04:41'),
(199, 1, 'updated', 'PageContent', '83', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page content: page content', '2025-11-25 14:23:41', '2025-11-25 14:23:41'),
(200, 1, 'deleted', 'PageContent', '48', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-11-25 23:14:41', '2025-11-25 23:14:41'),
(201, 1, 'deleted', 'PageContent', '103', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-11-25 21:07:41', '2025-11-25 21:07:41'),
(202, 1, 'created', 'Service', '2', '{\"new\":{\"title\":\"Commercial\",\"status\":\"active\"}}', 'Created new service: Commercial', '2025-11-25 20:21:41', '2025-11-25 20:21:41'),
(203, 1, 'created', 'Service', '2', '{\"new\":{\"title\":\"Commercial\",\"status\":\"active\"}}', 'Created new service: Commercial', '2025-11-25 21:25:41', '2025-11-25 21:25:41'),
(204, 1, 'deleted', 'Project', '15', '{\"old\":{\"title\":\"Mixed-Use Development\"}}', 'Deleted project: Mixed-Use Development', '2025-11-25 17:42:41', '2025-11-25 17:42:41'),
(205, 1, 'created', 'PageContent', '67', '{\"new\":{\"title\":\"page content\",\"status\":\"active\"}}', 'Created new page content: page content', '2025-11-26 14:57:41', '2025-11-26 14:57:41'),
(206, 1, 'updated', 'Service', '3', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated service: Consultancy', '2025-11-26 18:07:41', '2025-11-26 18:07:41'),
(207, 1, 'created', 'Project', '16', '{\"new\":{\"title\":\"High-Rise Construction\",\"status\":\"active\"}}', 'Created new project: High-Rise Construction', '2025-11-27 21:31:41', '2025-11-27 21:31:41'),
(208, 1, 'deleted', 'PageContent', '40', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-11-27 20:30:41', '2025-11-27 20:30:41'),
(209, 1, 'updated', 'PageSection', '29', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page section: page section', '2025-11-27 14:02:41', '2025-11-27 14:02:41'),
(210, 1, 'updated', 'Service', '1', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated service: Residential', '2025-11-27 15:33:41', '2025-11-27 15:33:41'),
(211, 1, 'created', 'Service', '1', '{\"new\":{\"title\":\"Residential\",\"status\":\"active\"}}', 'Created new service: Residential', '2025-11-27 13:56:41', '2025-11-27 13:56:41'),
(212, 1, 'deleted', 'Service', '3', '{\"old\":{\"title\":\"Consultancy\"}}', 'Deleted service: Consultancy', '2025-11-27 16:01:41', '2025-11-27 16:01:41'),
(213, 1, 'deleted', 'Service', '1', '{\"old\":{\"title\":\"Residential\"}}', 'Deleted service: Residential', '2025-11-27 21:36:41', '2025-11-27 21:36:41'),
(214, 1, 'deleted', 'Project', '7', '{\"old\":{\"title\":\"Fine Dining Restaurant\"}}', 'Deleted project: Fine Dining Restaurant', '2025-11-28 21:16:41', '2025-11-28 21:16:41'),
(215, 1, 'created', 'PageContent', '101', '{\"new\":{\"title\":\"page content\",\"status\":\"active\"}}', 'Created new page content: page content', '2025-11-28 16:15:41', '2025-11-28 16:15:41'),
(216, 1, 'created', 'Service', '2', '{\"new\":{\"title\":\"Commercial\",\"status\":\"active\"}}', 'Created new service: Commercial', '2025-11-28 17:38:41', '2025-11-28 17:38:41'),
(217, 1, 'deleted', 'PageSection', '29', '{\"old\":{\"title\":\"page section\"}}', 'Deleted page section: page section', '2025-11-28 19:09:41', '2025-11-28 19:09:41'),
(218, 1, 'deleted', 'PageContent', '101', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-11-28 16:54:41', '2025-11-28 16:54:41'),
(219, 1, 'updated', 'PageContent', '46', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page content: page content', '2025-11-28 16:03:41', '2025-11-28 16:03:41'),
(220, 1, 'deleted', 'PageContent', '93', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-11-29 18:01:41', '2025-11-29 18:01:41'),
(221, 1, 'updated', 'Service', '3', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated service: Consultancy', '2025-11-29 23:47:41', '2025-11-29 23:47:41'),
(222, 1, 'created', 'Service', '1', '{\"new\":{\"title\":\"Residential\",\"status\":\"active\"}}', 'Created new service: Residential', '2025-11-29 15:55:41', '2025-11-29 15:55:41'),
(223, 1, 'created', 'PageContent', '16', '{\"new\":{\"title\":\"page content\",\"status\":\"active\"}}', 'Created new page content: page content', '2025-11-30 19:28:41', '2025-11-30 19:28:41'),
(224, 1, 'created', 'Service', '2', '{\"new\":{\"title\":\"Commercial\",\"status\":\"active\"}}', 'Created new service: Commercial', '2025-11-30 22:55:41', '2025-11-30 22:55:41'),
(225, 1, 'updated', 'NavigationItem', '4', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated navigation item: navigation item', '2025-12-01 00:01:41', '2025-12-01 00:01:41'),
(226, 1, 'deleted', 'PageContent', '20', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-11-30 14:18:41', '2025-11-30 14:18:41'),
(227, 1, 'deleted', 'Service', '2', '{\"old\":{\"title\":\"Commercial\"}}', 'Deleted service: Commercial', '2025-12-02 15:26:41', '2025-12-02 15:26:41'),
(228, 1, 'created', 'PageContent', '82', '{\"new\":{\"title\":\"page content\",\"status\":\"active\"}}', 'Created new page content: page content', '2025-12-02 19:25:41', '2025-12-02 19:25:41'),
(229, 1, 'updated', 'Project', '7', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated project: Fine Dining Restaurant', '2025-12-03 00:10:41', '2025-12-03 00:10:41'),
(230, 1, 'created', 'NavigationItem', '5', '{\"new\":{\"title\":\"navigation item\",\"status\":\"active\"}}', 'Created new navigation item: navigation item', '2025-12-02 23:43:41', '2025-12-02 23:43:41'),
(231, 1, 'created', 'NavigationItem', '10', '{\"new\":{\"title\":\"navigation item\",\"status\":\"active\"}}', 'Created new navigation item: navigation item', '2025-12-03 22:16:41', '2025-12-03 22:16:41'),
(232, 1, 'updated', 'PageContent', '61', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page content: page content', '2025-12-03 14:29:41', '2025-12-03 14:29:41'),
(233, 1, 'created', 'Service', '3', '{\"new\":{\"title\":\"Consultancy\",\"status\":\"active\"}}', 'Created new service: Consultancy', '2025-12-03 19:09:41', '2025-12-03 19:09:41'),
(234, 1, 'created', 'PageContent', '17', '{\"new\":{\"title\":\"page content\",\"status\":\"active\"}}', 'Created new page content: page content', '2025-12-03 19:21:41', '2025-12-03 19:21:41'),
(235, 1, 'created', 'Service', '2', '{\"new\":{\"title\":\"Commercial\",\"status\":\"active\"}}', 'Created new service: Commercial', '2025-12-03 17:39:41', '2025-12-03 17:39:41'),
(236, 1, 'created', 'Project', '10', '{\"new\":{\"title\":\"Boutique Hotel Interior\",\"status\":\"active\"}}', 'Created new project: Boutique Hotel Interior', '2025-12-04 18:51:41', '2025-12-04 18:51:41'),
(237, 1, 'deleted', 'PageSection', '4', '{\"old\":{\"title\":\"page section\"}}', 'Deleted page section: page section', '2025-12-04 23:03:41', '2025-12-04 23:03:41'),
(238, 1, 'updated', 'PageSection', '17', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page section: page section', '2025-12-06 17:51:41', '2025-12-06 17:51:41'),
(239, 1, 'updated', 'Service', '1', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated service: Residential', '2025-12-06 19:31:41', '2025-12-06 19:31:41'),
(240, 1, 'created', 'PageContent', '48', '{\"new\":{\"title\":\"page content\",\"status\":\"active\"}}', 'Created new page content: page content', '2025-12-07 20:12:41', '2025-12-07 20:12:41'),
(241, 1, 'updated', 'NavigationItem', '2', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated navigation item: navigation item', '2025-12-07 15:53:41', '2025-12-07 15:53:41'),
(242, 1, 'updated', 'Project', '17', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated project: Residential Complex Development', '2025-12-08 22:20:41', '2025-12-08 22:20:41'),
(243, 1, 'updated', 'PageSection', '35', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page section: page section', '2025-12-08 22:39:41', '2025-12-08 22:39:41'),
(244, 1, 'created', 'PageContent', '107', '{\"new\":{\"title\":\"page content\",\"status\":\"active\"}}', 'Created new page content: page content', '2025-12-08 22:17:41', '2025-12-08 22:17:41'),
(245, 1, 'updated', 'Service', '1', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated service: Residential', '2025-12-08 21:07:41', '2025-12-08 21:07:41'),
(246, 1, 'created', 'PageContent', '63', '{\"new\":{\"title\":\"page content\",\"status\":\"active\"}}', 'Created new page content: page content', '2025-12-08 14:32:41', '2025-12-08 14:32:41'),
(247, 1, 'deleted', 'Project', '13', '{\"old\":{\"title\":\"Urban Duplex Loft\"}}', 'Deleted project: Urban Duplex Loft', '2025-12-08 20:47:41', '2025-12-08 20:47:41'),
(248, 1, 'updated', 'Service', '3', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated service: Consultancy', '2025-12-08 22:35:41', '2025-12-08 22:35:41'),
(249, 1, 'deleted', 'Project', '12', '{\"old\":{\"title\":\"Contemporary Duplex Home\"}}', 'Deleted project: Contemporary Duplex Home', '2025-12-09 21:53:41', '2025-12-09 21:53:41'),
(250, 1, 'deleted', 'PageSection', '28', '{\"old\":{\"title\":\"page section\"}}', 'Deleted page section: page section', '2025-12-09 14:14:41', '2025-12-09 14:14:41'),
(251, 1, 'created', 'PageSection', '30', '{\"new\":{\"title\":\"page section\",\"status\":\"active\"}}', 'Created new page section: page section', '2025-12-09 23:20:41', '2025-12-09 23:20:41'),
(252, 1, 'deleted', 'Project', '8', '{\"old\":{\"title\":\"Casual Dining Cafe\"}}', 'Deleted project: Casual Dining Cafe', '2025-12-09 22:09:41', '2025-12-09 22:09:41'),
(253, 1, 'created', 'PageSection', '19', '{\"new\":{\"title\":\"page section\",\"status\":\"active\"}}', 'Created new page section: page section', '2025-12-09 16:26:41', '2025-12-09 16:26:41'),
(254, 1, 'deleted', 'Service', '1', '{\"old\":{\"title\":\"Residential\"}}', 'Deleted service: Residential', '2025-12-09 14:38:41', '2025-12-09 14:38:41'),
(255, 1, 'created', 'PageSection', '12', '{\"new\":{\"title\":\"page section\",\"status\":\"active\"}}', 'Created new page section: page section', '2025-12-09 18:18:41', '2025-12-09 18:18:41'),
(256, 1, 'updated', 'Service', '1', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated service: Residential', '2025-12-09 14:30:41', '2025-12-09 14:30:41'),
(257, 1, 'deleted', 'PageSection', '23', '{\"old\":{\"title\":\"page section\"}}', 'Deleted page section: page section', '2025-12-10 23:19:41', '2025-12-10 23:19:41'),
(258, 1, 'created', 'NavigationItem', '6', '{\"new\":{\"title\":\"navigation item\",\"status\":\"active\"}}', 'Created new navigation item: navigation item', '2025-12-10 20:21:41', '2025-12-10 20:21:41'),
(259, 1, 'deleted', 'PageSection', '22', '{\"old\":{\"title\":\"page section\"}}', 'Deleted page section: page section', '2025-12-11 19:21:41', '2025-12-11 19:21:41'),
(260, 1, 'deleted', 'Project', '16', '{\"old\":{\"title\":\"High-Rise Construction\"}}', 'Deleted project: High-Rise Construction', '2025-12-11 22:55:41', '2025-12-11 22:55:41'),
(261, 1, 'updated', 'NavigationItem', '6', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated navigation item: navigation item', '2025-12-11 21:37:41', '2025-12-11 21:37:41'),
(262, 1, 'updated', 'Service', '1', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated service: Residential', '2025-12-11 14:32:41', '2025-12-11 14:32:41'),
(263, 1, 'updated', 'Project', '5', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated project: Retail Showroom Design', '2025-12-11 20:34:41', '2025-12-11 20:34:41'),
(264, 1, 'updated', 'NavigationItem', '2', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated navigation item: navigation item', '2025-12-11 16:43:41', '2025-12-11 16:43:41'),
(265, 1, 'updated', 'Project', '14', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated project: Sustainable Building Design', '2025-12-11 13:26:41', '2025-12-11 13:26:41'),
(266, 1, 'deleted', 'PageSection', '1', '{\"old\":{\"title\":\"page section\"}}', 'Deleted page section: page section', '2025-12-12 15:07:41', '2025-12-12 15:07:41'),
(267, 1, 'created', 'PageContent', '79', '{\"new\":{\"title\":\"page content\",\"status\":\"active\"}}', 'Created new page content: page content', '2025-12-12 22:03:41', '2025-12-12 22:03:41'),
(268, 1, 'created', 'PageContent', '79', '{\"new\":{\"title\":\"page content\",\"status\":\"active\"}}', 'Created new page content: page content', '2025-12-12 17:57:41', '2025-12-12 17:57:41'),
(269, 1, 'deleted', 'Service', '2', '{\"old\":{\"title\":\"Commercial\"}}', 'Deleted service: Commercial', '2025-12-12 18:46:41', '2025-12-12 18:46:41'),
(270, 1, 'created', 'NavigationItem', '6', '{\"new\":{\"title\":\"navigation item\",\"status\":\"active\"}}', 'Created new navigation item: navigation item', '2025-12-12 22:45:41', '2025-12-12 22:45:41'),
(271, 1, 'updated', 'PageContent', '19', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page content: page content', '2025-12-12 16:25:41', '2025-12-12 16:25:41'),
(272, 1, 'deleted', 'NavigationItem', '8', '{\"old\":{\"title\":\"navigation item\"}}', 'Deleted navigation item: navigation item', '2025-12-13 23:28:41', '2025-12-13 23:28:41'),
(273, 1, 'created', 'PageSection', '15', '{\"new\":{\"title\":\"page section\",\"status\":\"active\"}}', 'Created new page section: page section', '2025-12-13 18:56:41', '2025-12-13 18:56:41');
INSERT INTO `admin_activities` (`id`, `user_id`, `action`, `model`, `model_id`, `changes`, `description`, `created_at`, `updated_at`) VALUES
(274, 1, 'created', 'NavigationItem', '9', '{\"new\":{\"title\":\"navigation item\",\"status\":\"active\"}}', 'Created new navigation item: navigation item', '2025-12-13 20:09:41', '2025-12-13 20:09:41'),
(275, 1, 'deleted', 'PageContent', '57', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-12-13 16:43:41', '2025-12-13 16:43:41'),
(276, 1, 'deleted', 'Service', '2', '{\"old\":{\"title\":\"Commercial\"}}', 'Deleted service: Commercial', '2025-12-14 19:51:41', '2025-12-14 19:51:41'),
(277, 1, 'deleted', 'PageContent', '5', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-12-14 21:13:41', '2025-12-14 21:13:41'),
(278, 1, 'created', 'PageContent', '52', '{\"new\":{\"title\":\"page content\",\"status\":\"active\"}}', 'Created new page content: page content', '2025-12-15 18:23:41', '2025-12-15 18:23:41'),
(279, 1, 'deleted', 'PageContent', '92', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-12-15 16:27:41', '2025-12-15 16:27:41'),
(280, 1, 'created', 'NavigationItem', '4', '{\"new\":{\"title\":\"navigation item\",\"status\":\"active\"}}', 'Created new navigation item: navigation item', '2025-12-16 21:57:41', '2025-12-16 21:57:41'),
(281, 1, 'deleted', 'PageSection', '35', '{\"old\":{\"title\":\"page section\"}}', 'Deleted page section: page section', '2025-12-16 14:40:41', '2025-12-16 14:40:41'),
(282, 1, 'deleted', 'PageSection', '26', '{\"old\":{\"title\":\"page section\"}}', 'Deleted page section: page section', '2025-12-16 14:32:41', '2025-12-16 14:32:41'),
(283, 1, 'updated', 'Service', '2', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated service: Commercial', '2025-12-16 19:05:41', '2025-12-16 19:05:41'),
(284, 1, 'created', 'PageContent', '112', '{\"new\":{\"title\":\"page content\",\"status\":\"active\"}}', 'Created new page content: page content', '2025-12-16 16:49:41', '2025-12-16 16:49:41'),
(285, 1, 'updated', 'Service', '1', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated service: Residential', '2025-12-18 00:11:41', '2025-12-18 00:11:41'),
(286, 1, 'deleted', 'Service', '2', '{\"old\":{\"title\":\"Commercial\"}}', 'Deleted service: Commercial', '2025-12-17 17:30:41', '2025-12-17 17:30:41'),
(287, 1, 'created', 'NavigationItem', '3', '{\"new\":{\"title\":\"navigation item\",\"status\":\"active\"}}', 'Created new navigation item: navigation item', '2025-12-17 23:25:41', '2025-12-17 23:25:41'),
(288, 1, 'updated', 'NavigationItem', '1', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated navigation item: navigation item', '2025-12-17 23:30:41', '2025-12-17 23:30:41'),
(289, 1, 'deleted', 'NavigationItem', '11', '{\"old\":{\"title\":\"navigation item\"}}', 'Deleted navigation item: navigation item', '2025-12-18 20:09:41', '2025-12-18 20:09:41'),
(290, 1, 'deleted', 'NavigationItem', '7', '{\"old\":{\"title\":\"navigation item\"}}', 'Deleted navigation item: navigation item', '2025-12-19 18:15:41', '2025-12-19 18:15:41'),
(291, 1, 'updated', 'PageContent', '46', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page content: page content', '2025-12-19 19:49:41', '2025-12-19 19:49:41'),
(292, 1, 'deleted', 'PageContent', '97', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-12-19 18:19:41', '2025-12-19 18:19:41'),
(293, 1, 'deleted', 'PageSection', '27', '{\"old\":{\"title\":\"page section\"}}', 'Deleted page section: page section', '2025-12-19 18:21:41', '2025-12-19 18:21:41'),
(294, 1, 'deleted', 'PageContent', '45', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-12-19 17:44:41', '2025-12-19 17:44:41'),
(295, 1, 'created', 'PageContent', '74', '{\"new\":{\"title\":\"page content\",\"status\":\"active\"}}', 'Created new page content: page content', '2025-12-20 21:04:41', '2025-12-20 21:04:41'),
(296, 1, 'deleted', 'Service', '1', '{\"old\":{\"title\":\"Residential\"}}', 'Deleted service: Residential', '2025-12-20 22:03:41', '2025-12-20 22:03:41'),
(297, 1, 'deleted', 'PageSection', '7', '{\"old\":{\"title\":\"page section\"}}', 'Deleted page section: page section', '2025-12-20 17:58:41', '2025-12-20 17:58:41'),
(298, 1, 'deleted', 'PageSection', '28', '{\"old\":{\"title\":\"page section\"}}', 'Deleted page section: page section', '2025-12-21 14:02:41', '2025-12-21 14:02:41'),
(299, 1, 'created', 'Project', '10', '{\"new\":{\"title\":\"Boutique Hotel Interior\",\"status\":\"active\"}}', 'Created new project: Boutique Hotel Interior', '2025-12-21 22:47:41', '2025-12-21 22:47:41'),
(300, 1, 'deleted', 'PageSection', '32', '{\"old\":{\"title\":\"page section\"}}', 'Deleted page section: page section', '2025-12-21 13:27:41', '2025-12-21 13:27:41'),
(301, 1, 'created', 'PageContent', '60', '{\"new\":{\"title\":\"page content\",\"status\":\"active\"}}', 'Created new page content: page content', '2025-12-21 13:27:41', '2025-12-21 13:27:41'),
(302, 1, 'deleted', 'Service', '2', '{\"old\":{\"title\":\"Commercial\"}}', 'Deleted service: Commercial', '2025-12-21 16:05:41', '2025-12-21 16:05:41'),
(303, 1, 'deleted', 'PageSection', '11', '{\"old\":{\"title\":\"page section\"}}', 'Deleted page section: page section', '2025-12-21 15:47:41', '2025-12-21 15:47:41'),
(304, 1, 'updated', 'Project', '10', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated project: Boutique Hotel Interior', '2025-12-21 21:43:41', '2025-12-21 21:43:41'),
(305, 1, 'created', 'Project', '1', '{\"new\":{\"title\":\"Modern Villa Design\",\"status\":\"active\"}}', 'Created new project: Modern Villa Design', '2025-12-22 21:11:41', '2025-12-22 21:11:41'),
(306, 1, 'deleted', 'PageContent', '70', '{\"old\":{\"title\":\"page content\"}}', 'Deleted page content: page content', '2025-12-22 21:19:41', '2025-12-22 21:19:41'),
(307, 1, 'updated', 'PageContent', '92', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page content: page content', '2025-12-22 23:51:41', '2025-12-22 23:51:41'),
(308, 1, 'created', 'PageContent', '6', '{\"new\":{\"title\":\"page content\",\"status\":\"active\"}}', 'Created new page content: page content', '2025-12-23 18:03:41', '2025-12-23 18:03:41'),
(309, 1, 'created', 'Project', '17', '{\"new\":{\"title\":\"Residential Complex Development\",\"status\":\"active\"}}', 'Created new project: Residential Complex Development', '2025-12-23 21:31:41', '2025-12-23 21:31:41'),
(310, 1, 'updated', 'PageContent', '9', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page content: page content', '2025-12-23 23:44:41', '2025-12-23 23:44:41'),
(311, 1, 'deleted', 'NavigationItem', '5', '{\"old\":{\"title\":\"navigation item\"}}', 'Deleted navigation item: navigation item', '2025-12-23 16:22:41', '2025-12-23 16:22:41'),
(312, 1, 'updated', 'Project', '8', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated project: Casual Dining Cafe', '2025-12-23 20:34:41', '2025-12-23 20:34:41'),
(313, 1, 'created', 'NavigationItem', '1', '{\"new\":{\"title\":\"navigation item\",\"status\":\"active\"}}', 'Created new navigation item: navigation item', '2025-12-23 19:45:41', '2025-12-23 19:45:41'),
(314, 1, 'updated', 'PageSection', '34', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated page section: page section', '2025-12-23 21:47:41', '2025-12-23 21:47:41'),
(315, 1, 'deleted', 'Service', '1', '{\"old\":{\"title\":\"Residential\"}}', 'Deleted service: Residential', '2025-12-24 20:44:41', '2025-12-24 20:44:41'),
(316, 1, 'deleted', 'NavigationItem', '9', '{\"old\":{\"title\":\"navigation item\"}}', 'Deleted navigation item: navigation item', '2025-12-24 23:57:41', '2025-12-24 23:57:41'),
(317, 1, 'deleted', 'Project', '7', '{\"old\":{\"title\":\"Fine Dining Restaurant\"}}', 'Deleted project: Fine Dining Restaurant', '2025-12-25 00:09:41', '2025-12-25 00:09:41'),
(318, 1, 'updated', 'NavigationItem', '11', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated navigation item: navigation item', '2025-12-24 14:08:41', '2025-12-24 14:08:41'),
(319, 1, 'created', 'Service', '2', '{\"new\":{\"title\":\"Commercial\",\"status\":\"active\"}}', 'Created new service: Commercial', '2025-12-24 18:44:41', '2025-12-24 18:44:41'),
(320, 1, 'updated', 'Project', '2', '{\"old\":{\"status\":\"draft\"},\"new\":{\"status\":\"active\"}}', 'Updated project: Luxury Apartment Interior', '2025-12-24 19:33:41', '2025-12-24 19:33:41'),
(321, 1, 'created', 'PageSection', '30', '{\"new\":{\"title\":\"page section\",\"status\":\"active\"}}', 'Created new page section: page section', '2025-12-24 19:33:41', '2025-12-24 19:33:41'),
(322, 1, 'updated', 'PageItem', '1', NULL, 'Updated item 1', '2026-01-22 14:28:05', '2026-01-22 14:28:05'),
(323, 1, 'updated', 'PageItem', '1', NULL, 'Updated item 1', '2026-01-22 14:28:14', '2026-01-22 14:28:14'),
(324, 1, 'created', 'PageItem', '50', NULL, 'Created item in stats', '2026-01-22 14:28:23', '2026-01-22 14:28:23'),
(325, 1, 'deleted', 'PageItem', '50', NULL, 'Deleted item 50', '2026-01-22 14:28:29', '2026-01-22 14:28:29'),
(326, 1, 'updated', 'PageItem', '1', NULL, 'Updated item 1', '2026-01-30 10:22:58', '2026-01-30 10:22:58'),
(327, 1, 'updated', 'PageItem', '2', NULL, 'Updated item 2', '2026-01-30 10:23:11', '2026-01-30 10:23:11'),
(328, 1, 'updated', 'PageItem', '1', NULL, 'Updated item 1', '2026-01-30 10:24:02', '2026-01-30 10:24:02'),
(329, 1, 'updated', 'PageItem', '2', NULL, 'Updated item 2', '2026-01-30 10:24:13', '2026-01-30 10:24:13'),
(330, 1, 'updated', 'PageItem', '3', NULL, 'Updated item 3', '2026-01-30 10:24:30', '2026-01-30 10:24:30'),
(331, 1, 'updated', 'PageItem', '4', NULL, 'Updated item 4', '2026-01-30 10:24:49', '2026-01-30 10:24:49'),
(332, 1, 'updated', 'PageItem', '5', NULL, 'Updated item 5', '2026-01-30 10:25:04', '2026-01-30 10:25:04'),
(333, 1, 'updated', 'PageSection', '15', NULL, 'Updated about us CEO vision section', '2026-01-30 10:25:57', '2026-01-30 10:25:57'),
(334, 1, 'updated', 'PageSection', '16', NULL, 'Updated values section', '2026-01-30 10:26:54', '2026-01-30 10:26:54'),
(335, 1, 'updated', 'PageItem', '6', NULL, 'Updated item 6', '2026-01-30 10:27:45', '2026-01-30 10:27:45'),
(336, 1, 'updated', 'PageItem', '16', NULL, 'Updated item 16', '2026-01-30 10:28:04', '2026-01-30 10:28:04'),
(337, 1, 'created', 'PageItem', '51', NULL, 'Created item in certificates', '2026-01-30 10:28:16', '2026-01-30 10:28:16'),
(338, 1, 'deleted', 'PageItem', '51', NULL, 'Deleted item 51', '2026-01-30 10:28:31', '2026-01-30 10:28:31'),
(339, 1, 'created', 'PageItem', '52', NULL, 'Created item in certificates', '2026-01-30 10:29:23', '2026-01-30 10:29:23'),
(340, 1, 'updated', 'PageItem', '21', NULL, 'Updated item 21', '2026-01-30 10:29:40', '2026-01-30 10:29:40'),
(341, 1, 'created', 'PageItem', '53', NULL, 'Created item in affiliations', '2026-01-30 10:30:03', '2026-01-30 10:30:03'),
(342, 1, 'updated', 'PageSection', '20', NULL, 'Updated about us CTA section', '2026-01-30 10:30:16', '2026-01-30 10:30:16'),
(343, 1, 'updated', 'PageSection', '16', NULL, 'Updated values section', '2026-01-30 10:32:07', '2026-01-30 10:32:07'),
(344, 1, 'updated', 'PageSection', '21', NULL, 'Updated about us quote section', '2026-01-30 11:12:03', '2026-01-30 11:12:03'),
(345, 1, 'updated', 'PageSection', '21', NULL, 'Updated about us quote section', '2026-01-30 11:12:47', '2026-01-30 11:12:47'),
(346, 1, 'updated', 'PageSection', '21', NULL, 'Updated about us quote section', '2026-01-30 11:13:38', '2026-01-30 11:13:38'),
(347, 1, 'updated', 'PageSection', '7', NULL, 'Updated careers job search section', '2026-01-30 11:17:50', '2026-01-30 11:17:50'),
(348, 1, 'updated', 'PageSection', '7', NULL, 'Updated careers job search section', '2026-01-30 11:18:37', '2026-01-30 11:18:37'),
(349, 1, 'created', 'JobOpening', '4', NULL, 'Created job opening: LAravel Developer', '2026-01-30 11:19:30', '2026-01-30 11:19:30'),
(350, 1, 'updated', 'JobOpening', '4', NULL, 'Updated job opening: LAravel Developer', '2026-01-30 11:19:36', '2026-01-30 11:19:36'),
(351, 1, 'deleted', 'JobOpening', NULL, NULL, 'Deleted job opening: LAravel Developer', '2026-01-30 11:19:40', '2026-01-30 11:19:40'),
(352, 1, 'updated', 'PageSection', '6', NULL, 'Updated careers page quote section', '2026-01-30 11:20:31', '2026-01-30 11:20:31'),
(353, 1, 'updated', 'PageSection', '6', NULL, 'Updated careers page quote section', '2026-01-30 11:20:54', '2026-01-30 11:20:54'),
(354, 1, 'updated', 'JobOpening', '1', NULL, 'Updated job opening: junor Java Developer', '2026-01-30 11:21:10', '2026-01-30 11:21:10'),
(355, 1, 'deleted', 'JobApplication', NULL, '{\"name\":\"greg\"}', 'Deleted job application from greg', '2026-01-30 11:34:23', '2026-01-30 11:34:23'),
(356, 1, 'updated', 'JobApplication', '2', '{\"name\":\"Choyon Ghosh\"}', 'Updated application status from pending to accepted', '2026-01-30 11:34:53', '2026-01-30 11:34:53'),
(357, 1, 'updated', 'JobApplication', '2', '{\"name\":\"Choyon Ghosh\"}', 'Updated application status from accepted to rejected', '2026-01-30 11:35:14', '2026-01-30 11:35:14'),
(358, 1, 'updated', 'JobApplication', '2', '{\"name\":\"Choyon Ghosh\"}', 'Updated application status from rejected to pending', '2026-01-30 11:35:17', '2026-01-30 11:35:17'),
(359, 1, 'deleted', 'JobApplication', NULL, '{\"name\":\"Choyon Ghosh\"}', 'Deleted job application from Choyon Ghosh', '2026-01-30 11:35:21', '2026-01-30 11:35:21'),
(360, 1, 'updated', 'PageSection', '38', NULL, 'Updated clients page settings', '2026-01-30 11:35:34', '2026-01-30 11:35:34'),
(361, 1, 'updated', 'PageSection', '38', NULL, 'Updated clients page settings', '2026-01-30 11:35:50', '2026-01-30 11:35:50'),
(362, 1, 'updated', 'PageSection', '9', NULL, 'Updated clients page quote section', '2026-01-30 11:36:13', '2026-01-30 11:36:13'),
(363, 1, 'updated', 'PageSection', '9', NULL, 'Updated clients page quote section', '2026-01-30 11:36:36', '2026-01-30 11:36:36'),
(364, 1, 'updated', 'Client', '1', NULL, 'Updated client Client 1', '2026-01-30 11:36:47', '2026-01-30 11:36:47'),
(365, 1, 'created', 'Client', '11', NULL, 'Created client anushree', '2026-01-30 11:37:40', '2026-01-30 11:37:40'),
(366, 1, 'updated', 'Client', '1', NULL, 'Updated client Client 1', '2026-01-30 11:38:31', '2026-01-30 11:38:31'),
(367, 1, 'updated', 'PageSection', '29', NULL, 'Updated life at mechanix design_zone section', '2026-01-30 11:39:35', '2026-01-30 11:39:35'),
(368, 1, 'updated', 'PageSection', '30', NULL, 'Updated life at mechanix meeting_zone section', '2026-01-30 11:40:15', '2026-01-30 11:40:15'),
(369, 1, 'updated', 'PageSection', '29', NULL, 'Updated life at mechanix design_zone section', '2026-01-30 11:40:20', '2026-01-30 11:40:20'),
(370, 1, 'updated', 'PageSection', '31', NULL, 'Updated life at mechanix quote section', '2026-01-30 11:40:24', '2026-01-30 11:40:24'),
(371, 1, 'updated', 'PageSection', '32', NULL, 'Updated life at mechanix coffee_zone section', '2026-01-30 11:40:41', '2026-01-30 11:40:41'),
(372, 1, 'updated', 'PageSection', '33', NULL, 'Updated life at mechanix team_dinner section', '2026-01-30 11:40:58', '2026-01-30 11:40:58'),
(373, 1, 'updated', 'PageSection', '34', NULL, 'Updated life at mechanix glimpse section', '2026-01-30 11:42:28', '2026-01-30 11:42:28'),
(374, 1, 'updated', 'PageSection', '29', NULL, 'Updated life at mechanix design_zone section', '2026-01-30 11:43:05', '2026-01-30 11:43:05'),
(375, 1, 'updated', 'PageSection', '30', NULL, 'Updated life at mechanix meeting_zone section', '2026-01-30 11:43:20', '2026-01-30 11:43:20'),
(376, 1, 'updated', 'PageSection', '31', NULL, 'Updated life at mechanix quote section', '2026-01-30 11:43:30', '2026-01-30 11:43:30'),
(377, 1, 'updated', 'PageSection', '32', NULL, 'Updated life at mechanix coffee_zone section', '2026-01-30 11:43:42', '2026-01-30 11:43:42'),
(378, 1, 'updated', 'PageSection', '33', NULL, 'Updated life at mechanix team_dinner section', '2026-01-30 11:44:00', '2026-01-30 11:44:00'),
(379, 1, 'updated', 'PageSection', '34', NULL, 'Updated life at mechanix glimpse section', '2026-01-30 11:44:15', '2026-01-30 11:44:15'),
(380, 1, 'updated', 'PageSection', '10', NULL, 'Updated life at mechanix page quote section', '2026-01-30 11:45:06', '2026-01-30 11:45:06'),
(381, 1, 'updated', 'PageSection', '10', NULL, 'Updated life at mechanix page quote section', '2026-01-30 11:45:28', '2026-01-30 11:45:28'),
(382, 1, 'updated', 'PageSection', '24', NULL, 'Updated our team ceo_quote section', '2026-01-30 11:50:01', '2026-01-30 11:50:01'),
(383, 1, 'updated', 'PageSection', '24', NULL, 'Updated our team ceo_quote section', '2026-01-30 11:50:24', '2026-01-30 11:50:24'),
(384, 1, 'updated', 'PageSection', '25', NULL, 'Updated our team team_quote section', '2026-01-30 11:50:45', '2026-01-30 11:50:45'),
(385, 1, 'updated', 'PageSection', '22', NULL, 'Updated our team whole_team_photo section', '2026-01-30 11:50:48', '2026-01-30 11:50:48'),
(386, 1, 'updated', 'PageSection', '26', NULL, 'Updated our team beyond_desk section', '2026-01-30 11:50:54', '2026-01-30 11:50:54'),
(387, 1, 'updated', 'PageSection', '27', NULL, 'Updated our team team_motion section', '2026-01-30 11:51:00', '2026-01-30 11:51:00'),
(388, 1, 'updated', 'PageSection', '24', NULL, 'Updated our team ceo_quote section', '2026-01-30 11:55:53', '2026-01-30 11:55:53'),
(389, 1, 'updated', 'PageSection', '22', NULL, 'Updated our team whole_team_photo section', '2026-01-30 11:56:03', '2026-01-30 11:56:03'),
(390, 1, 'updated', 'PageSection', '24', NULL, 'Updated our team ceo_quote section', '2026-01-30 11:56:13', '2026-01-30 11:56:13'),
(391, 1, 'updated', 'PageSection', '25', NULL, 'Updated our team team_quote section', '2026-01-30 11:56:30', '2026-01-30 11:56:30'),
(392, 1, 'updated', 'PageSection', '24', NULL, 'Updated our team ceo_quote section', '2026-01-30 11:56:33', '2026-01-30 11:56:33'),
(393, 1, 'updated', 'PageSection', '26', NULL, 'Updated our team beyond_desk section', '2026-01-30 11:56:37', '2026-01-30 11:56:37'),
(394, 1, 'updated', 'PageSection', '27', NULL, 'Updated our team team_motion section', '2026-01-30 11:56:44', '2026-01-30 11:56:44'),
(395, 1, 'updated', 'PageSection', '11', NULL, 'Updated our team page quote section', '2026-01-30 11:57:16', '2026-01-30 11:57:16'),
(396, 1, 'updated', 'PageSection', '11', NULL, 'Updated our team page quote section', '2026-01-30 11:57:38', '2026-01-30 11:57:38'),
(397, 1, 'deleted', 'TeamMember', NULL, NULL, 'Deleted team member: Mike Johnson', '2026-01-30 11:59:48', '2026-01-30 11:59:48'),
(398, 1, 'updated', 'PageSection', '39', NULL, 'Updated tips page settings', '2026-01-30 12:01:38', '2026-01-30 12:01:38'),
(399, 1, 'updated', 'PageSection', '39', NULL, 'Updated tips page settings', '2026-01-30 12:01:56', '2026-01-30 12:01:56'),
(400, 1, 'updated', 'PageSection', '12', NULL, 'Updated tips page quote section', '2026-01-30 12:02:08', '2026-01-30 12:02:08'),
(401, 1, 'updated', 'Tip', '1', NULL, 'Updated tip Choosing the Right Color PaletteDFF', '2026-01-30 12:02:26', '2026-01-30 12:02:26'),
(402, 1, 'created', 'Tip', '4', NULL, 'Created tip DSGSDFG', '2026-01-30 12:02:36', '2026-01-30 12:02:36'),
(403, 1, 'deleted', 'Tip', '4', NULL, 'Deleted tip DSGSDFG', '2026-01-30 12:02:58', '2026-01-30 12:02:58'),
(404, 1, 'updated', 'PageSection', '12', NULL, 'Updated tips page quote section', '2026-01-30 12:03:08', '2026-01-30 12:03:08'),
(405, 1, 'updated', 'PageSection', '1', NULL, 'Updated hero section', '2026-01-30 12:04:58', '2026-01-30 12:04:58'),
(406, 1, 'updated', 'PageSection', '1', NULL, 'Updated hero section', '2026-01-30 12:05:32', '2026-01-30 12:05:32'),
(407, 1, 'updated', 'PageSection', '1', NULL, 'Updated hero section', '2026-01-30 12:06:33', '2026-01-30 12:06:33'),
(408, 1, 'updated', 'PageSection', '2', NULL, 'Updated about section', '2026-01-30 12:08:09', '2026-01-30 12:08:09'),
(409, 1, 'updated', 'PageSection', '2', NULL, 'Updated about section', '2026-01-30 12:10:17', '2026-01-30 12:10:17'),
(410, 1, 'updated', 'Service', '1', NULL, 'Updated service: Residential HFD', '2026-01-30 12:10:30', '2026-01-30 12:10:30'),
(411, 1, 'updated', 'Service', '1', NULL, 'Updated service: ResidentiaL', '2026-01-30 12:10:58', '2026-01-30 12:10:58'),
(412, 1, 'updated', 'Project', '1', NULL, 'Updated project: Modern Villa Design', '2026-01-30 12:14:46', '2026-01-30 12:14:46'),
(413, 1, 'created', 'Project', '18', NULL, 'Created project: FGDFGVD', '2026-01-30 12:15:31', '2026-01-30 12:15:31'),
(414, 1, 'deleted', 'Project', NULL, NULL, 'Deleted project: FGDFGVD', '2026-01-30 12:16:40', '2026-01-30 12:16:40'),
(415, 1, 'updated', 'PageSection', '3', NULL, 'Updated founder section', '2026-01-30 12:17:43', '2026-01-30 12:17:43'),
(416, 1, 'updated', 'PageSection', '3', NULL, 'Updated founder section', '2026-01-30 12:18:22', '2026-01-30 12:18:22'),
(417, 1, 'updated', 'PageSection', '3', NULL, 'Updated founder section', '2026-01-30 12:19:05', '2026-01-30 12:19:05'),
(418, 1, 'updated', 'PageSection', '5', NULL, 'Updated contact section', '2026-01-30 12:20:36', '2026-01-30 12:20:36'),
(419, 1, 'updated', 'PageSection', '5', NULL, 'Updated contact section', '2026-01-30 12:21:29', '2026-01-30 12:21:29'),
(420, 1, 'deleted', 'ContactSubmission', '1', NULL, 'Deleted contact submission', '2026-01-30 12:22:16', '2026-01-30 12:22:16'),
(421, 1, 'updated', 'ContactSubmission', '2', NULL, 'Updated contact submission status to responded', '2026-01-30 12:22:56', '2026-01-30 12:22:56'),
(422, 1, 'updated', 'ContactSubmission', '2', NULL, 'Updated contact submission status to in_progress', '2026-01-30 12:23:00', '2026-01-30 12:23:00'),
(423, 1, 'updated', 'ContactSubmission', '2', NULL, 'Updated contact submission status to responded', '2026-01-30 12:23:02', '2026-01-30 12:23:02'),
(424, 1, 'deleted', 'ContactSubmission', '2', NULL, 'Deleted contact submission', '2026-01-30 12:23:45', '2026-01-30 12:23:45'),
(425, 1, 'updated', 'PageSection', '1', NULL, 'Updated hero section', '2026-02-05 06:07:31', '2026-02-05 06:07:31'),
(426, 1, 'updated', 'PageSection', '1', NULL, 'Updated hero section', '2026-02-05 06:10:11', '2026-02-05 06:10:11'),
(427, 1, 'updated', 'PageSection', '1', NULL, 'Updated hero section', '2026-02-05 06:11:20', '2026-02-05 06:11:20'),
(428, 1, 'updated', 'PageSection', '1', NULL, 'Updated hero section', '2026-02-05 06:14:21', '2026-02-05 06:14:21'),
(429, 1, 'updated', 'PageSection', '1', NULL, 'Updated hero section', '2026-02-05 06:20:53', '2026-02-05 06:20:53'),
(430, 1, 'updated', 'PageSection', '1', NULL, 'Updated hero section', '2026-02-05 06:21:49', '2026-02-05 06:21:49'),
(431, 1, 'updated', 'PageSection', '2', NULL, 'Updated about section', '2026-02-05 06:25:12', '2026-02-05 06:25:12'),
(432, 1, 'updated', 'PageSection', '2', NULL, 'Updated about section', '2026-02-05 06:28:36', '2026-02-05 06:28:36'),
(433, 1, 'updated', 'PageSection', '2', NULL, 'Updated about section', '2026-02-05 06:32:37', '2026-02-05 06:32:37'),
(434, 1, 'updated', 'PageSection', '2', NULL, 'Updated about section', '2026-02-05 06:34:37', '2026-02-05 06:34:37'),
(435, 1, 'updated', 'PageSection', '2', NULL, 'Updated about section', '2026-02-05 06:35:33', '2026-02-05 06:35:33'),
(436, 1, 'updated', 'PageSection', '2', NULL, 'Updated about section', '2026-02-05 06:37:18', '2026-02-05 06:37:18'),
(437, 1, 'updated', 'PageSection', '36', NULL, 'Updated services section', '2026-02-05 06:42:26', '2026-02-05 06:42:26'),
(438, 1, 'updated', 'Project', '1', NULL, 'Updated project: Luxury Apartment Interior', '2026-02-05 06:47:34', '2026-02-05 06:47:34'),
(439, 1, 'updated', 'Project', '2', NULL, 'Updated project: Luxury Apartment Interior', '2026-02-05 06:48:08', '2026-02-05 06:48:08'),
(440, 1, 'updated', 'Project', '1', NULL, 'Updated project: Duplex and House Interior Design', '2026-02-05 06:48:18', '2026-02-05 06:48:18'),
(441, 1, 'updated', 'Project', '3', NULL, 'Updated project: Duplex and House Interior Design', '2026-02-05 06:48:48', '2026-02-05 06:48:48'),
(442, 1, 'updated', 'Project', '1', NULL, 'Updated project: Apartment Interior Design in Dhaka', '2026-02-05 06:49:00', '2026-02-05 06:49:00'),
(443, 1, 'updated', 'PageSection', '3', NULL, 'Updated founder section', '2026-02-05 07:07:03', '2026-02-05 07:07:03'),
(444, 1, 'updated', 'PageSection', '3', NULL, 'Updated founder section', '2026-02-05 07:09:23', '2026-02-05 07:09:23'),
(445, 1, 'updated', 'PageSection', '3', NULL, 'Updated founder section', '2026-02-05 07:10:27', '2026-02-05 07:10:27'),
(446, 1, 'updated', 'PageSection', '4', NULL, 'Updated video break section', '2026-02-05 07:16:13', '2026-02-05 07:16:13'),
(447, 1, 'updated', 'PageSection', '4', NULL, 'Updated video break section', '2026-02-05 07:16:34', '2026-02-05 07:16:34'),
(448, 1, 'updated', 'PageSection', '5', NULL, 'Updated contact section', '2026-02-05 07:24:33', '2026-02-05 07:24:33'),
(449, 1, 'updated', 'PageSection', '5', NULL, 'Updated contact section', '2026-02-05 07:25:33', '2026-02-05 07:25:33'),
(450, 1, 'updated', 'PageSection', '5', NULL, 'Updated contact section', '2026-02-05 07:31:53', '2026-02-05 07:31:53'),
(451, 1, 'updated', 'PageSection', '5', NULL, 'Updated contact section', '2026-02-05 07:33:59', '2026-02-05 07:33:59'),
(452, 1, 'updated', 'SiteSetting', NULL, NULL, 'Updated welcome modal settings', '2026-02-05 07:34:37', '2026-02-05 07:34:37'),
(453, 1, 'updated', 'PageSection', '6', NULL, 'Updated careers page quote section', '2026-02-10 04:27:05', '2026-02-10 04:27:05'),
(454, 1, 'updated', 'PageItem', '1', NULL, 'Updated item 1', '2026-02-10 04:31:16', '2026-02-10 04:31:16'),
(455, 1, 'updated', 'PageItem', '5', NULL, 'Updated item 5', '2026-02-10 04:31:27', '2026-02-10 04:31:27'),
(456, 1, 'updated', 'PageItem', '5', NULL, 'Updated item 5', '2026-02-10 04:32:15', '2026-02-10 04:32:15'),
(457, 1, 'updated', 'PageItem', '3', NULL, 'Updated item 3', '2026-02-10 04:32:27', '2026-02-10 04:32:27'),
(458, 1, 'updated', 'PageSection', '15', NULL, 'Updated about us CEO vision section', '2026-02-10 04:36:07', '2026-02-10 04:36:07'),
(459, 1, 'updated', 'NavigationItem', '1', '[]', 'Updated navigation item: Home', '2026-02-10 05:08:55', '2026-02-10 05:08:55'),
(460, 1, 'updated', 'PageSection', '5', NULL, 'Updated contact section', '2026-02-10 05:47:07', '2026-02-10 05:47:07'),
(461, 1, 'updated', 'SiteSetting', NULL, NULL, 'Updated site settings', '2026-02-10 06:11:10', '2026-02-10 06:11:10'),
(462, 1, 'updated', 'SiteHeaderSetting', NULL, NULL, 'Updated site header settings', '2026-02-10 06:12:01', '2026-02-10 06:12:01'),
(463, 1, 'updated', 'PageSection', '1', NULL, 'Updated hero section', '2026-02-10 06:15:27', '2026-02-10 06:15:27'),
(464, 1, 'updated', 'PageSection', '1', NULL, 'Updated hero section', '2026-02-10 06:15:54', '2026-02-10 06:15:54'),
(465, 1, 'updated', 'PageSection', '1', NULL, 'Updated hero section', '2026-02-10 06:33:23', '2026-02-10 06:33:23'),
(466, 1, 'updated', 'PageSection', '1', NULL, 'Updated hero section', '2026-02-10 06:38:51', '2026-02-10 06:38:51'),
(467, 1, 'updated', 'PageSection', '1', NULL, 'Updated hero section', '2026-02-10 06:41:48', '2026-02-10 06:41:48'),
(468, 1, 'updated', 'PageSection', '1', NULL, 'Updated hero section', '2026-02-10 06:42:22', '2026-02-10 06:42:22'),
(469, 1, 'updated', 'PageSection', '1', NULL, 'Updated hero section', '2026-02-10 06:48:44', '2026-02-10 06:48:44'),
(470, 1, 'updated', 'PageSection', '2', NULL, 'Updated about section', '2026-02-10 07:03:31', '2026-02-10 07:03:31'),
(471, 1, 'updated', 'NavigationItem', '5', '[]', 'Updated navigation item: We Are', '2026-02-11 06:44:25', '2026-02-11 06:44:25'),
(472, 1, 'updated', 'NavigationItem', '2', '[]', 'Updated navigation item: Studio', '2026-02-11 06:45:58', '2026-02-11 06:45:58'),
(473, 1, 'deleted', 'Project', NULL, NULL, 'Deleted project: Residential Complex Development', '2026-02-14 06:16:03', '2026-02-14 06:16:03'),
(474, 1, 'deleted', 'Project', NULL, NULL, 'Deleted project: Luxury Apartment Interior', '2026-02-14 06:16:10', '2026-02-14 06:16:10'),
(475, 1, 'deleted', 'Project', NULL, NULL, 'Deleted project: Duplex and House Interior Design', '2026-02-14 06:16:14', '2026-02-14 06:16:14'),
(476, 1, 'deleted', 'Project', NULL, NULL, 'Deleted project: Retail Showroom Design', '2026-02-14 06:16:18', '2026-02-14 06:16:18'),
(477, 1, 'updated', 'Project', '1', NULL, 'Updated project: HAQUE HARETAGE', '2026-02-14 06:19:25', '2026-02-14 06:19:25'),
(478, 1, 'updated', 'Project', '1', NULL, 'Updated project: HAQUE HARETAGE', '2026-02-14 06:20:20', '2026-02-14 06:20:20'),
(479, 1, 'updated', 'Project', '1', NULL, 'Updated project: HAQUE HARETAGE', '2026-02-14 06:33:56', '2026-02-14 06:33:56'),
(480, 1, 'deleted', 'Project', NULL, NULL, 'Deleted project: High-Rise Construction', '2026-02-14 06:34:26', '2026-02-14 06:34:26'),
(481, 1, 'deleted', 'Project', NULL, NULL, 'Deleted project: Mixed-Use Development', '2026-02-14 06:34:33', '2026-02-14 06:34:33'),
(482, 1, 'deleted', 'Project', NULL, NULL, 'Deleted project: Urban Duplex Loft', '2026-02-14 06:34:43', '2026-02-14 06:34:43'),
(483, 1, 'deleted', 'Project', NULL, NULL, 'Deleted project: Corporate Office Space', '2026-02-14 06:34:47', '2026-02-14 06:34:47'),
(484, 1, 'deleted', 'Project', NULL, NULL, 'Deleted project: Fine Dining Restaurant', '2026-02-14 06:34:50', '2026-02-14 06:34:50'),
(485, 1, 'deleted', 'Project', NULL, NULL, 'Deleted project: Business Center Interior', '2026-02-14 06:34:54', '2026-02-14 06:34:54'),
(486, 1, 'deleted', 'Project', NULL, NULL, 'Deleted project: Contemporary Duplex Home', '2026-02-14 06:34:57', '2026-02-14 06:34:57'),
(487, 1, 'deleted', 'Project', NULL, NULL, 'Deleted project: Resort Lobby Design', '2026-02-14 06:35:01', '2026-02-14 06:35:01'),
(488, 1, 'deleted', 'Project', NULL, NULL, 'Deleted project: Casual Dining Cafe', '2026-02-14 06:35:04', '2026-02-14 06:35:04'),
(489, 1, 'updated', 'Project', '9', NULL, 'Updated project: NEXT CAFE', '2026-02-14 06:44:46', '2026-02-14 06:44:46'),
(490, 1, 'updated', 'Project', '9', NULL, 'Updated project: NEXT CAFE', '2026-02-14 06:46:03', '2026-02-14 06:46:03'),
(491, 1, 'updated', 'Project', '9', NULL, 'Updated project: NEXT CAFE', '2026-02-14 06:50:12', '2026-02-14 06:50:12'),
(492, 1, 'updated', 'Project', '9', NULL, 'Updated project: NEXT CAFE', '2026-02-14 06:50:43', '2026-02-14 06:50:43'),
(493, 1, 'updated', 'Project', '9', NULL, 'Updated project: NEXT CAFE', '2026-02-14 06:52:21', '2026-02-14 06:52:21'),
(494, 1, 'updated', 'Project', '9', NULL, 'Updated project: NEXT CAFE', '2026-02-14 07:05:41', '2026-02-14 07:05:41'),
(495, 1, 'updated', 'Project', '9', NULL, 'Updated project: NEXT CAFE', '2026-02-14 07:09:43', '2026-02-14 07:09:43'),
(496, 1, 'deleted', 'Project', NULL, NULL, 'Deleted project: Boutique Hotel Interior', '2026-02-14 07:10:05', '2026-02-14 07:10:05'),
(497, 1, 'deleted', 'Project', NULL, NULL, 'Deleted project: Sustainable Building Design', '2026-02-14 07:10:14', '2026-02-14 07:10:14'),
(498, 1, 'created', 'Project', '19', NULL, 'Created project: BellaDonna', '2026-02-14 07:24:11', '2026-02-14 07:24:11'),
(499, 1, 'updated', 'Project', '19', NULL, 'Updated project: BellaDonna', '2026-02-14 07:24:35', '2026-02-14 07:24:35'),
(500, 1, 'updated', 'PageSection', '37', NULL, 'Updated projects section', '2026-02-15 01:42:09', '2026-02-15 01:42:09'),
(501, 1, 'updated', 'PageSection', '37', NULL, 'Updated projects section', '2026-02-15 01:42:23', '2026-02-15 01:42:23'),
(502, 1, 'deleted', 'Client', '10', NULL, 'Deleted client Client 10', '2026-02-15 03:11:19', '2026-02-15 03:11:19');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('mechanix-cache-11829c5184976d792b86d0f1d426fb56', 'i:1;', 1769788578),
('mechanix-cache-11829c5184976d792b86d0f1d426fb56:timer', 'i:1769788578;', 1769788578),
('mechanix-cache-29a4880cfbded8a2bac83a17b5f8f18d', 'i:1;', 1771747716),
('mechanix-cache-29a4880cfbded8a2bac83a17b5f8f18d:timer', 'i:1771747716;', 1771747716),
('mechanix-cache-55088ecc6e20fa840a8fb545fb7a8cc7', 'i:1;', 1766755423),
('mechanix-cache-55088ecc6e20fa840a8fb545fb7a8cc7:timer', 'i:1766755423;', 1766755423),
('mechanix-cache-7b3600d2878bb04ea5b7dda871da1b15', 'i:1;', 1769790216),
('mechanix-cache-7b3600d2878bb04ea5b7dda871da1b15:timer', 'i:1769790216;', 1769790216),
('mechanix-cache-7f0c5a30a1a40068db9841fa13d1e1de', 'i:1;', 1766851530),
('mechanix-cache-7f0c5a30a1a40068db9841fa13d1e1de:timer', 'i:1766851530;', 1766851530),
('mechanix-cache-832ac62e5d821725a0731a7eecc6309a', 'i:1;', 1767613074),
('mechanix-cache-832ac62e5d821725a0731a7eecc6309a:timer', 'i:1767613073;', 1767613074),
('mechanix-cache-93863a5de9474bed771c05f2bfbaec52', 'i:1;', 1770722768),
('mechanix-cache-93863a5de9474bed771c05f2bfbaec52:timer', 'i:1770722768;', 1770722768),
('mechanix-cache-9b0bd6266520394f592249ab293ac0d4', 'i:1;', 1770813879),
('mechanix-cache-9b0bd6266520394f592249ab293ac0d4:timer', 'i:1770813879;', 1770813879),
('mechanix-cache-ab4079d395e1c320b5d81c4b714dbf14', 'i:1;', 1769113683),
('mechanix-cache-ab4079d395e1c320b5d81c4b714dbf14:timer', 'i:1769113683;', 1769113683),
('mechanix-cache-admin@gmail.com|182.48.82.120', 'i:1;', 1769113683),
('mechanix-cache-admin@gmail.com|182.48.82.120:timer', 'i:1769113683;', 1769113683),
('mechanix-cache-b27c6917130e663ad35ffc01259a1ab6', 'i:1;', 1771146220),
('mechanix-cache-b27c6917130e663ad35ffc01259a1ab6:timer', 'i:1771146220;', 1771146220),
('mechanix-cache-dea4cf4209fcb52605e7be91e7b4ef9e', 'i:1;', 1770721776),
('mechanix-cache-dea4cf4209fcb52605e7be91e7b4ef9e:timer', 'i:1770721776;', 1770721776);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `name`, `logo`, `url`, `order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Client 1', '/storage/clients/P26FUA0BPS7YZj66LA66vxo76CqcVjs0nbrAVQxv.jpg', 'https://example.com/client1', 2, 1, '2025-12-24 05:22:41', '2026-01-30 11:38:31'),
(2, 'Client 2', 'https://images.unsplash.com/photo-1762770647310-66f492eb832f?w=200&h=200&fit=crop', 'https://example.com/client2', 2, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(3, 'Client 3', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop', 'https://example.com/client3', 3, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(4, 'Client 4', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop', 'https://example.com/client4', 4, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(5, 'Client 5', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop', 'https://example.com/client5', 5, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(6, 'Client 6', 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop', 'https://example.com/client6', 6, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(7, 'Client 7', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop', 'https://example.com/client7', 7, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(8, 'Client 8', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', 'https://example.com/client8', 8, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(9, 'Client 9', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop', 'https://example.com/client9', 9, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(11, 'anushree', '/storage/clients/kIa7PanrEaGAoCsUEJJ83uyWHwMIWpjbmefd76aM.jpg', 'https://afaa.rc.edu.bd/', 2, 1, '2026-01-30 11:37:40', '2026-01-30 11:37:40');

-- --------------------------------------------------------

--
-- Table structure for table `contact_submissions`
--

CREATE TABLE `contact_submissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `status` enum('pending','in_progress','responded','closed') NOT NULL DEFAULT 'pending',
  `admin_notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_applications`
--

CREATE TABLE `job_applications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `job_opening_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `resume_path` varchar(255) DEFAULT NULL,
  `cover_letter` text DEFAULT NULL,
  `portfolio_url` varchar(255) DEFAULT NULL,
  `status` enum('pending','reviewing','accepted','rejected') NOT NULL DEFAULT 'pending',
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_openings`
--

CREATE TABLE `job_openings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `vacancies` int(11) NOT NULL DEFAULT 1,
  `deadline` date DEFAULT NULL,
  `category` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `job_openings`
--

INSERT INTO `job_openings` (`id`, `title`, `vacancies`, `deadline`, `category`, `description`, `is_active`, `order`, `created_at`, `updated_at`) VALUES
(1, 'junor Java Developer', 2, '2024-02-03', 'Developer', 'We are looking for an experienced Java Developer to join our team.', 1, 1, '2025-12-24 05:22:40', '2026-01-30 11:21:10'),
(2, 'PHP Developer', 1, '2024-02-15', 'Developer', 'We are looking for a skilled PHP Developer with Laravel experience.', 1, 2, '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(3, 'UI/UX Designer', 1, '2024-02-20', 'Design', 'Creative UI/UX Designer needed for web and mobile applications.', 1, 3, '2025-12-24 05:22:40', '2025-12-24 05:22:40');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_08_26_100418_add_two_factor_columns_to_users_table', 1),
(5, '2025_11_22_080521_create_site_settings_table', 1),
(6, '2025_11_22_080524_create_navigation_items_table', 1),
(7, '2025_11_22_080526_create_page_sections_table', 1),
(8, '2025_11_22_080528_create_page_contents_table', 1),
(9, '2025_11_22_080529_create_services_table', 1),
(10, '2025_11_22_080531_create_projects_table', 1),
(11, '2025_11_22_095449_create_admin_activities_table', 1),
(12, '2025_11_23_060137_create_job_openings_table', 1),
(13, '2025_11_23_060137_create_team_members_table', 1),
(14, '2025_11_23_060138_create_timeline_events_table', 1),
(15, '2025_11_23_071746_create_clients_table', 1),
(16, '2025_11_23_071746_create_tips_table', 1),
(17, '2025_11_23_073013_create_page_items_table', 1),
(18, '2025_11_23_095447_add_social_links_to_team_members_table', 1),
(19, '2025_11_24_042038_create_site_header_settings_table', 1),
(20, '2025_11_24_044555_add_logo_url_to_site_settings_table', 1),
(21, '2025_11_29_100000_create_job_applications_table', 1),
(22, '2025_11_29_120000_add_url_to_clients_table', 1),
(23, '2025_11_29_130000_create_contact_submissions_table', 1),
(24, '2025_12_21_000000_add_slug_to_projects_table', 1),
(25, '2025_12_21_000001_add_enhanced_fields_to_projects_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `navigation_items`
--

CREATE TABLE `navigation_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `label` varchar(255) NOT NULL,
  `href` varchar(255) DEFAULT NULL,
  `parent_id` bigint(20) UNSIGNED DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `navigation_items`
--

INSERT INTO `navigation_items` (`id`, `label`, `href`, `parent_id`, `order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Home', '/', NULL, 1, 0, '2025-12-24 05:22:40', '2026-02-10 05:08:55'),
(2, 'Studio', '/#about', NULL, 2, 0, '2025-12-24 05:22:40', '2026-02-11 06:45:58'),
(3, 'Services', '/#services', NULL, 3, 1, '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(4, 'Portfolio', '/#projects', NULL, 4, 1, '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(5, 'We Are', NULL, NULL, 5, 1, '2025-12-24 05:22:40', '2026-02-11 06:44:25'),
(6, 'Our Team', '/our-team', 5, 1, 1, '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(7, 'Life at Mechanix', '/life-at-mechanix', 5, 2, 1, '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(8, 'About Us', '/about-us', 5, 3, 1, '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(9, 'Careers', '/careers', NULL, 6, 1, '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(10, 'Clients', '/clients', NULL, 7, 1, '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(11, 'Tips', '/tips', NULL, 8, 1, '2025-12-24 05:22:40', '2025-12-24 05:22:40');

-- --------------------------------------------------------

--
-- Table structure for table `page_contents`
--

CREATE TABLE `page_contents` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `section_id` bigint(20) UNSIGNED NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` text DEFAULT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'text',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `page_contents`
--

INSERT INTO `page_contents` (`id`, `section_id`, `key`, `value`, `type`, `created_at`, `updated_at`) VALUES
(1, 1, 'subtitle', 'ARCHITECTURE II INTERIOR II FURNITURE', 'text', '2025-12-24 05:22:40', '2026-02-10 06:15:27'),
(2, 1, 'title', 'Spaces That', 'text', '2025-12-24 05:22:40', '2026-02-10 06:15:54'),
(3, 1, 'title_highlight', 'Tell Your Story', 'text', '2025-12-24 05:22:40', '2026-02-10 06:15:54'),
(4, 1, 'background_image', '/storage/hero/d3KfebCHsWhvgZQww3ZZBsa4neNN7jrkotYstpge.jpg', 'text', '2025-12-24 05:22:40', '2026-02-10 06:48:44'),
(5, 1, 'cta_text', 'Luxury in Every Line & Light', 'text', '2025-12-24 05:22:40', '2026-02-10 06:33:23'),
(6, 1, 'cta_link', '#contact', 'text', '2025-12-24 05:22:40', '2026-02-05 06:20:53'),
(7, 2, 'label', 'Who We Are', 'text', '2025-12-24 05:22:40', '2026-02-10 07:03:31'),
(8, 2, 'title', 'Designing Space. Defining Style.', 'text', '2025-12-24 05:22:40', '2026-02-10 07:03:31'),
(9, 2, 'description', 'Since 2017, We are a professional interior design company dedicated to creating beautiful, functional, and inspiring spaces. Our designs blend modern aesthetics with practical planning to ensure every space feels comfortable, elegant, and thoughtfully arranged. From residential homes to commercial interiors, we focus on quality craftsmanship, premium materials, and fine detailing. Every project is carefully designed to reflect our client’s lifestyle, personality, and vision. We believe great design is more than decoration — it is about creating environments that improve the way you live, work, and relax. With a commitment to creativity, precision, and client satisfaction, we transform ordinary spaces into refined experiences of modern living.', 'text', '2025-12-24 05:22:40', '2026-02-10 07:03:31'),
(10, 2, 'stat_clients', '50+', 'text', '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(11, 2, 'stat_clients_label', 'Clients', 'text', '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(12, 2, 'stat_satisfaction', '100%', 'text', '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(13, 2, 'stat_satisfaction_label', 'Satisfaction', 'text', '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(14, 2, 'stat_experience', '5+', 'text', '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(15, 2, 'stat_experience_label', 'Years Exp.', 'text', '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(16, 2, 'main_image', '/storage/about/s5yfFvJT5VBmEPgOFPW8CDwZGt5KgzmiMxGH5JBm.jpg', 'text', '2025-12-24 05:22:40', '2026-01-30 12:10:17'),
(17, 2, 'detail_image', '/storage/about/GUfuwEFmI9XAoGBw9zgqsiSxQIVnp5YZPFoeFlRK.jpg', 'text', '2025-12-24 05:22:40', '2026-01-30 12:10:17'),
(18, 2, 'detail_caption', 'Precision planning.', 'text', '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(19, 3, 'label', 'Founder & Leadership', 'text', '2025-12-24 05:22:40', '2026-02-05 07:07:03'),
(20, 3, 'title', 'Meet Our Visionary Leader', 'text', '2025-12-24 05:22:40', '2026-02-05 07:10:27'),
(21, 3, 'description', 'Engr. Mohammad Shariar Khan is the visionary entrepreneur behind Mechanix Interior, bringing a strong business mindset, leadership, and long-term vision to the interior design and execution industry. With a focus on quality, professionalism, and client satisfaction, he has built Mechanix to deliver premium residential and commercial interiors through structured planning, skilled teams, and consistent execution standards.', 'text', '2025-12-24 05:22:40', '2026-02-05 07:07:03'),
(22, 3, 'founder_name', 'Engr. Mohammad Shariar Khan', 'text', '2025-12-24 05:22:40', '2026-02-05 07:07:03'),
(23, 3, 'company_name', 'Nex Group of Industries', 'text', '2025-12-24 05:22:40', '2026-02-05 07:07:03'),
(24, 3, 'main_image', '/storage/founder/JOQrMgeaYhMkNxDjbj24sLvkBvNZpy2PG1AAhaZG.png', 'text', '2025-12-24 05:22:40', '2026-02-05 07:10:27'),
(25, 3, 'profile_image', '/storage/founder/FIDOkzsRNd5EwXjX0HkLLxLwHS1uYN6XsqnhljPj.png', 'text', '2025-12-24 05:22:40', '2026-02-05 07:10:27'),
(26, 3, 'cta_text', 'About Us', 'text', '2025-12-24 05:22:40', '2026-01-30 12:19:05'),
(27, 4, 'background_image', 'https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=2800&auto=format&fit=crop', 'image', '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(28, 4, 'title', 'Our Interior Design Process', 'text', '2025-12-24 05:22:40', '2026-02-05 07:16:34'),
(29, 5, 'title', 'Let’s Renovate Your Space', 'text', '2025-12-24 05:22:40', '2026-02-05 07:31:53'),
(30, 5, 'description', 'Ready to Transform Your Space? Contact the Best Interior Design Company. Get a free consultation from Mechanix Interior today.', 'text', '2025-12-24 05:22:40', '2026-02-05 07:25:33'),
(31, 5, 'address', '50 Lake Circus Kalabagan, Dhaka, Bangladesh, 1209', 'text', '2025-12-24 05:22:40', '2026-02-05 07:24:32'),
(32, 5, 'phone_primary', '+880 1817 22 11 00', 'text', '2025-12-24 05:22:40', '2026-02-10 05:47:07'),
(33, 5, 'phone_secondary', '+880 1984 886 886', 'text', '2025-12-24 05:22:40', '2026-02-10 05:47:07'),
(34, 5, 'email_primary', 'mechanix.biz@gmail.com', 'text', '2025-12-24 05:22:40', '2026-02-05 07:24:32'),
(35, 5, 'email_secondary', 'hello.nexgroup@gmail.com', 'text', '2025-12-24 05:22:40', '2026-02-05 07:33:59'),
(36, 6, 'quote', 'The only way to do great work is to love what you do.', 'text', '2025-12-24 05:22:41', '2026-01-30 11:20:54'),
(37, 6, 'quote_highlight', 'love what you do', 'text', '2025-12-24 05:22:41', '2026-01-30 11:20:54'),
(38, 6, 'author', '-Steve Jobs', 'text', '2025-12-24 05:22:41', '2026-01-30 11:20:54'),
(39, 6, 'background_image', '/storage/page-heroes/1Xj2QjOfegVfqEXRBHFz0SVsSqmP2c2qwHG2pRkL.png', 'image', '2025-12-24 05:22:41', '2026-02-10 04:27:05'),
(40, 7, 'title', 'Find Your Dream Role', 'text', '2025-12-24 05:22:41', '2026-01-30 11:18:36'),
(41, 7, 'subtitle', 'Where ambition meets opportunity. Join our growing team.', 'text', '2025-12-24 05:22:41', '2026-01-30 11:18:36'),
(42, 7, 'search_placeholder', 'Search by job title, keyword, or location...', 'text', '2025-12-24 05:22:41', '2026-01-30 11:18:37'),
(43, 7, 'search_button_text', 'Search Jobs', 'text', '2025-12-24 05:22:41', '2026-01-30 11:18:37'),
(44, 7, 'no_jobs_title', 'No jobs found', 'text', '2025-12-24 05:22:41', '2026-01-30 11:18:37'),
(45, 7, 'no_jobs_description', 'Try adjusting your search or filter to find what you\'re looking for.', 'text', '2025-12-24 05:22:41', '2026-01-30 11:18:37'),
(46, 8, 'quote', 'Design is not just what it looks like and feels like. Design is how it works.', 'text', '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(47, 8, 'quote_highlight', 'how it works', 'text', '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(48, 8, 'author', '- Steve Jobs', 'text', '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(49, 8, 'background_image', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2800&auto=format&fit=crop', 'image', '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(50, 9, 'quote', 'A satisfied customer is the best business strategy of all.', 'text', '2025-12-24 05:22:41', '2026-01-30 11:36:36'),
(51, 9, 'quote_highlight', 'best business strategy', 'text', '2025-12-24 05:22:41', '2026-01-30 11:36:36'),
(52, 9, 'author', '- Michael LeBoeuf', 'text', '2025-12-24 05:22:41', '2026-01-30 11:36:36'),
(53, 9, 'background_image', '/storage/page-heroes/p5CCIKxblSnztW7XKhUOn2QrSHkYtM9xstXH3t0l.jpg', 'image', '2025-12-24 05:22:41', '2026-01-30 11:36:36'),
(54, 10, 'quote', 'Culture is simply a shared way of doing something with passion.', 'text', '2025-12-24 05:22:41', '2026-01-30 11:45:28'),
(55, 10, 'quote_highlight', 'with passion', 'text', '2025-12-24 05:22:41', '2026-01-30 11:45:28'),
(56, 10, 'author', '- Brian Chesky', 'text', '2025-12-24 05:22:41', '2026-01-30 11:45:28'),
(57, 10, 'background_image', '/storage/page-heroes/l4oiD0mh3tILn5ItnqblETahPWaqxbMwDWool9mW.jpg', 'image', '2025-12-24 05:22:41', '2026-01-30 11:45:28'),
(58, 11, 'quote', 'Talent wins games, but teamwork and intelligence wins championships.', 'text', '2025-12-24 05:22:41', '2026-01-30 11:57:38'),
(59, 11, 'quote_highlight', 'teamwork and intelligence', 'text', '2025-12-24 05:22:41', '2026-01-30 11:57:38'),
(60, 11, 'author', '- Michael Jordan', 'text', '2025-12-24 05:22:41', '2026-01-30 11:57:38'),
(61, 11, 'background_image', '/storage/page-heroes/ESvxDfLsVsVhPpCBCidxk2cIGjQP8hytdPNXY8HA.png', 'image', '2025-12-24 05:22:41', '2026-01-30 11:57:38'),
(62, 12, 'quote', 'The details are not the details. They make the design.', 'text', '2025-12-24 05:22:41', '2026-01-30 12:03:08'),
(63, 12, 'quote_highlight', 'make the design', 'text', '2025-12-24 05:22:41', '2026-01-30 12:03:08'),
(64, 12, 'author', '- Charles Eames', 'text', '2025-12-24 05:22:41', '2026-01-30 12:03:08'),
(65, 12, 'background_image', '/storage/page-heroes/UL3DIyQ2atzC8HRRvjuKtVHqFsFWOGp3OAbcrExp.jpg', 'image', '2025-12-24 05:22:41', '2026-01-30 12:02:08'),
(66, 13, 'title', 'About Us', 'text', '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(67, 13, 'description', 'At Nexkraft, our success is built on the exceptional minds and collaborative spirit of our team. We\'re a collection of talented individuals who thrive on working together, transforming individual brilliance into groundbreaking achievements.', 'text', '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(68, 13, 'image', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop', 'image', '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(69, 15, 'title', 'CEO\'s Vision', 'text', '2025-12-24 05:22:41', '2026-02-10 04:36:07'),
(70, 15, 'quote', 'Exceptional talent, unwavering dedication. That\'s the MechaniX difference.', 'text', '2025-12-24 05:22:41', '2026-02-10 04:36:07'),
(71, 15, 'description', 'At MechaniX, we believe our greatest strength lies in our exceptional team and their unwavering dedication to innovation. Together, we are constantly pushing boundaries and developing groundbreaking solutions that make a real difference. I invite you to explore our website and learn more about how we can help you achieve your goals.', 'text', '2025-12-24 05:22:41', '2026-02-10 04:36:07'),
(72, 15, 'image', '/storage/about-us/rLwYvLUbQ2HOLTkYurYrYIpg8j4tlXGxneiEARC4.png', 'text', '2025-12-24 05:22:41', '2026-02-10 04:36:07'),
(73, 15, 'button_text', 'Appointment with CEO', 'text', '2025-12-24 05:22:41', '2026-02-10 04:36:07'),
(74, 15, 'button_link', '#contact', 'text', '2025-12-24 05:22:41', '2026-02-10 04:36:07'),
(75, 16, 'title', 'Core Values', 'text', '2025-12-24 05:22:41', '2026-01-30 10:32:07'),
(76, 16, 'description', 'Explore our core values that uphold the high standards and integrity we bring to every project and partnership.', 'text', '2025-12-24 05:22:41', '2026-01-30 10:32:07'),
(77, 17, 'title', 'Our Implementation Process', 'text', '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(78, 17, 'description', 'We follow a very systematic approach to software creation', 'text', '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(79, 18, 'title', 'Certifications & Awards', 'text', '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(80, 18, 'description', 'Recognized excellence in interior design and project management', 'text', '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(81, 19, 'title', 'Professional Affiliations', 'text', '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(82, 19, 'description', 'Proud members of leading industry organizations', 'text', '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(83, 20, 'title', '100+ companies uplift their business with Nexkraft. Tell us about your project vsdfvdsfv', 'text', '2025-12-24 05:22:41', '2026-01-30 10:30:16'),
(84, 20, 'button_text', 'Book a Meeting dfvfsd', 'text', '2025-12-24 05:22:41', '2026-01-30 10:30:16'),
(85, 20, 'button_link', '#contact fvasdc', 'text', '2025-12-24 05:22:41', '2026-01-30 10:30:16'),
(86, 21, 'text', 'gdsgdg gdfg Design is not just what it looks like and feels like.', 'text', '2025-12-24 05:22:41', '2026-01-30 11:13:38'),
(87, 21, 'author', 'Choyon', 'text', '2025-12-24 05:22:41', '2026-01-30 11:13:38'),
(88, 21, 'author_title', 'COO,ALPHAINNO', 'text', '2025-12-24 05:22:41', '2026-01-30 11:13:38'),
(89, 21, 'image', '/storage/about-us/GNB6wancerDL0zfVRMEHzYw7ONevaEUI3Rgeyc16.jpg', 'text', '2025-12-24 05:22:41', '2026-01-30 11:13:38'),
(90, 22, 'image', '/storage/our-team/KOSMc4mLRAoBlsn3SWG7SZyydmTGki475PNAumEe.png', 'text', '2025-12-24 05:22:41', '2026-01-30 11:56:03'),
(91, 23, 'title', 'Our Team', 'text', '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(92, 23, 'description', 'At Nexkraft, our success is built on the exceptional minds and collaborative spirit of our team. We\'re a collection of talented individuals who thrive on working together, transforming individual brilliance into groundbreaking achievements.', 'text', '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(93, 23, 'button_text', 'Join Our Family', 'text', '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(94, 23, 'button_link', '/careers', 'text', '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(95, 23, 'individuals_heading', 'Meet the Top minds behind the magic.', 'text', '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(96, 24, 'quote', 'Nexkraft is constantly pushing boundaries because of the exceptional minds on our team. They are the driving force behind our innovative solutions.', 'text', '2025-12-24 05:22:41', '2026-01-30 11:56:13'),
(97, 24, 'author', 'Md. Shahriar Khan, CEO', 'text', '2025-12-24 05:22:41', '2026-01-30 11:56:13'),
(98, 24, 'image', '/storage/our-team/Rx9dkTGThw8b1Yv3tjVKCEQvf82P5BFtDkDORkT7.png', 'text', '2025-12-24 05:22:41', '2026-01-30 11:56:33'),
(99, 25, 'quote', 'No matter how brilliant your mind or strategy, if you\'re playing a solo game, you\'ll always be beat by a great team.', 'text', '2025-12-24 05:22:41', '2026-01-30 11:56:30'),
(100, 25, 'author', 'Reid Hoffman, LinkedIn Co-founder', 'text', '2025-12-24 05:22:41', '2026-01-30 11:56:30'),
(101, 26, 'title', 'Nexkraft People: Beyond the Desk', 'text', '2025-12-24 05:22:41', '2026-01-30 11:56:37'),
(102, 27, 'title', 'Get to Know Us: Watch the Nexkraft Team in Motion', 'text', '2025-12-24 05:22:41', '2026-01-30 11:56:44'),
(103, 28, 'title', 'Tech Zone', 'text', '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(104, 28, 'description', 'Where innovation meets inspiration. Our state-of-the-art Tech Zone is equipped to empower developers to code, collaborate, and conquer any challenge.', 'text', '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(105, 28, 'image', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop', 'image', '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(106, 29, 'title', 'Design Zone', 'text', '2025-12-24 05:22:41', '2026-01-30 11:43:05'),
(107, 29, 'description', 'Think outside the box, inside our inspiring Design Zone. This creative hub is where ideas flourish, fueled by brainstorming sessions, sketching sessions, and crafting the future together.', 'text', '2025-12-24 05:22:41', '2026-01-30 11:43:05'),
(108, 29, 'image', '/storage/life-at-mechanix/fWp6F9ujWWUnhPKLhAyfJQh5Hx9XRdyiEbSWZZrL.jpg', 'text', '2025-12-24 05:22:41', '2026-01-30 11:40:20'),
(109, 30, 'title', 'Meeting Zone', 'text', '2025-12-24 05:22:41', '2026-01-30 11:43:20'),
(110, 30, 'description', 'From brainstorming sessions to strategic planning, our versatile meeting rooms are designed to spark collaboration and fuel powerful discussions that drive results.', 'text', '2025-12-24 05:22:41', '2026-01-30 11:43:20'),
(111, 30, 'image', '/storage/life-at-mechanix/ME7QOX2PPOI0cFqLb49yIGOKgwIydAO9oU94G9i7.jpg', 'text', '2025-12-24 05:22:41', '2026-01-30 11:40:15'),
(112, 31, 'quote', 'Work shouldn\'t be a place you escape from; it should be a place you escape to.', 'text', '2025-12-24 05:22:41', '2026-01-30 11:43:30'),
(113, 31, 'author', 'Brian Chesky, Airbnb Co-founder', 'text', '2025-12-24 05:22:41', '2026-01-30 11:43:30'),
(114, 32, 'title', 'Coffee Zone', 'text', '2025-12-24 05:22:41', '2026-01-30 11:43:42'),
(115, 32, 'description', 'Grab a cup of coffee, spark conversations, and fuel your creativity in our vibrant Coffee Zone. It\'s the perfect spot to collaborate, unwind, or simply get that extra boost.', 'text', '2025-12-24 05:22:41', '2026-01-30 11:43:42'),
(116, 32, 'image', '/storage/life-at-mechanix/cnEo7ukAOKgpIFMptEJbQjS8v87PVOVL3GOVB71Q.jpg', 'text', '2025-12-24 05:22:41', '2026-01-30 11:40:41'),
(117, 33, 'title', 'Team Dinner', 'text', '2025-12-24 05:22:41', '2026-01-30 11:44:00'),
(118, 33, 'description', 'We go beyond the daily grind to recognize the hard work and dedication of our amazing team with delicious meals that foster connections and build team spirit.', 'text', '2025-12-24 05:22:41', '2026-01-30 11:44:00'),
(119, 33, 'image', '/storage/life-at-mechanix/TZaBYGJHIvoGF7Zjo9jKpmEn0lH3OQ5nz6iIfPaA.jpg', 'text', '2025-12-24 05:22:41', '2026-01-30 11:40:58'),
(120, 34, 'title', 'A Glimpse into the life of Nexkraftians', 'text', '2025-12-24 05:22:41', '2026-01-30 11:44:15'),
(121, 38, 'page_title', 'Our Clients', 'text', '2026-01-30 11:35:34', '2026-01-30 11:35:50'),
(122, 38, 'page_subtitle', 'We are proud to have worked with these amazing organizations.', 'text', '2026-01-30 11:35:34', '2026-01-30 11:35:50'),
(123, 38, 'meta_title', 'Clients - Mechanix Interior', 'text', '2026-01-30 11:35:34', '2026-01-30 11:35:34'),
(124, 38, 'meta_description', 'View our trusted clients and partners.', 'text', '2026-01-30 11:35:34', '2026-01-30 11:35:34'),
(125, 39, 'page_title', 'Design Tips & Insights', 'text', '2026-01-30 12:01:38', '2026-01-30 12:01:56'),
(126, 39, 'page_subtitle', 'Expert advice to help you create your dream space.', 'text', '2026-01-30 12:01:38', '2026-01-30 12:01:56'),
(127, 39, 'meta_title', 'Design Tips - Mechanix Interior', 'text', '2026-01-30 12:01:38', '2026-01-30 12:01:38'),
(128, 39, 'meta_description', 'Get expert interior design tips and insights.', 'text', '2026-01-30 12:01:38', '2026-01-30 12:01:38'),
(129, 1, 'background_type', 'image', 'text', '2026-01-30 12:04:58', '2026-01-30 12:04:58'),
(130, 5, 'copyright_text', '© 2026 Mechanix Interior. All rights reserved.', 'text', '2026-01-30 12:20:36', '2026-02-05 07:24:32'),
(131, 5, 'form_name_label', 'Full Name', 'text', '2026-01-30 12:20:36', '2026-01-30 12:20:36'),
(132, 5, 'form_email_label', 'Email', 'text', '2026-01-30 12:20:36', '2026-01-30 12:20:36'),
(133, 5, 'form_phone_label', 'Phone Number', 'text', '2026-01-30 12:20:36', '2026-01-30 12:20:36'),
(134, 5, 'form_message_label', 'Your Message', 'text', '2026-01-30 12:20:36', '2026-01-30 12:20:36'),
(135, 5, 'form_submit_text', 'Send Message', 'text', '2026-01-30 12:20:36', '2026-01-30 12:20:36'),
(136, 36, 'section_title', 'Complete interior design services from consultation to installation', 'text', '2026-02-05 06:42:25', '2026-02-05 06:42:25'),
(137, 36, 'section_description', 'Transform your residential and commercial spaces with expert interior design services and complete furniture setup solutions | Serving Dhaka & All Over Bangladesh', 'text', '2026-02-05 06:42:25', '2026-02-05 06:42:25'),
(138, 5, 'social_facebook', 'https://www.facebook.com/mechanixinteriors', 'text', '2026-02-05 07:24:32', '2026-02-05 07:24:32'),
(139, 5, 'social_instagram', 'https://www.instagram.com/mechanixbd?fbclid=IwY2xjawPxeURleHRuA2FlbQIxMABicmlkETE0VFFvZko3Z1BVNDhQSEw5c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHp7qLq37xvl-81z8GvqkUxGviYpa7G9sb7u76T7yguX0-DAPCLZ9qZGZysza_aem_nTHoD31_g_Lv6AQx4fw8Vw', 'text', '2026-02-05 07:24:32', '2026-02-05 07:24:32'),
(140, 5, 'social_linkedin', 'https://www.linkedin.com/in/mechanix-interior?fbclid=IwY2xjawPxeTJleHRuA2FlbQIxMABicmlkETE0VFFvZko3Z1BVNDhQSEw5c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHrgWL1JYiIKbdX_EwwoTfu_HK054Mkpqh4VcswhAvmqvTVeYEEMPP0b5oA_G_aem_maA6X6dlAIRAm7BpewtuGg', 'text', '2026-02-05 07:24:32', '2026-02-05 07:24:32'),
(141, 37, 'section_title', 'PROJECTS', 'text', '2026-02-15 01:42:09', '2026-02-15 01:42:23'),
(142, 37, 'section_description', 'EXPLORE OUR RECENT WORK', 'text', '2026-02-15 01:42:09', '2026-02-15 01:42:09');

-- --------------------------------------------------------

--
-- Table structure for table `page_items`
--

CREATE TABLE `page_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `page_section_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `page_items`
--

INSERT INTO `page_items` (`id`, `page_section_id`, `title`, `description`, `image`, `icon`, `order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 14, '20+', 'Years of Continuous Execellence', NULL, NULL, 1, 1, '2025-12-24 05:22:41', '2026-02-10 04:31:16'),
(2, 14, '20+', 'Team Member', NULL, NULL, 2, 1, '2025-12-24 05:22:41', '2026-01-30 10:24:13'),
(3, 14, '110+', 'Client Worldwide', NULL, NULL, 3, 1, '2025-12-24 05:22:41', '2026-02-10 04:32:27'),
(4, 14, '99%', 'Client Satisfaction rate', NULL, NULL, 4, 1, '2025-12-24 05:22:41', '2026-01-30 10:24:49'),
(5, 14, '6+', 'Dedicated Team of Architects', NULL, NULL, 5, 1, '2025-12-24 05:22:41', '2026-02-10 04:32:15'),
(6, 16, 'Customer-Centric Excellence fvdsfv', 'Placing customers at the heart of everything we do, we consistently deliver top-tier solutions that align precisely with their unique needs, fostering lasting partnerships.dvdsv dvsdfv dfvdsfv dvds', NULL, 'Users fdv', 1, 1, '2025-12-24 05:22:41', '2026-01-30 10:27:45'),
(7, 16, 'Innovation First', 'We prioritize constant innovation, crafting solutions that push boundaries and adapt to evolving technological landscapes, ensuring our clients stay ahead in their industries.', NULL, 'Lightbulb', 2, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(8, 16, 'Collaborative Expertise', 'We thrive on collaboration, harnessing the collective expertise of our diverse team to create solutions that blend technical prowess with strategic insights.', NULL, 'Handshake', 3, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(9, 16, 'Reliability and Integrity', 'Guided by unwavering integrity, we build trust through reliable solutions and transparent communication, ensuring our clients\' confidence in our work.', NULL, 'ShieldCheck', 4, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(10, 17, 'Business Analysis', 'We analyze business needs and offer the best solution for our clients.', NULL, NULL, 1, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(11, 17, 'UI / UX Design', 'We create seamless and efficient user flows.', NULL, NULL, 2, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(12, 17, 'Development', 'We hire only highly experienced IT professionals.', NULL, NULL, 3, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(13, 17, 'Testing & QA', 'Our goal is to make our products work without fail.', NULL, NULL, 4, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(14, 17, 'Deployment', 'We assist companies in deployment, scaling and maintenance of applications.', NULL, NULL, 5, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(15, 17, 'Data Management', 'We help to manage all the business data in the system the right way.', NULL, NULL, 6, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(16, 18, NULL, NULL, '/storage/about-us/items/C8szIt7NrGORcDezXywga7gZ6QPv9Ez4ZCw5e8pc.jpg', NULL, 1, 1, '2025-12-24 05:22:41', '2026-01-30 10:28:04'),
(17, 18, NULL, NULL, 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=200&fit=crop&auto=format', NULL, 2, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(18, 18, NULL, NULL, 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=200&fit=crop&auto=format', NULL, 3, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(19, 18, NULL, NULL, 'https://images.unsplash.com/photo-1552581234-26160f608093?w=300&h=200&fit=crop&auto=format', NULL, 4, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(20, 19, NULL, NULL, 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&h=200&fit=crop&auto=format', NULL, 1, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(21, 19, NULL, NULL, '/storage/about-us/items/517xHJKBuB9oRqY3G51paQbFPuLZfIiE4HDC29uC.jpg', NULL, 2, 1, '2025-12-24 05:22:41', '2026-01-30 10:29:40'),
(22, 19, NULL, NULL, 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&h=200&fit=crop&auto=format', NULL, 3, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(23, 19, NULL, NULL, 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&h=200&fit=crop&auto=format', NULL, 4, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(24, 19, NULL, NULL, 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&h=200&fit=crop&auto=format', NULL, 5, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(25, 26, NULL, NULL, 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop', NULL, 1, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(26, 26, NULL, NULL, 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop', NULL, 2, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(27, 26, NULL, NULL, 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1000&auto=format&fit=crop', NULL, 3, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(28, 26, NULL, NULL, 'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?q=80&w=1000&auto=format&fit=crop', NULL, 4, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(29, 27, NULL, NULL, 'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?q=80&w=1000&auto=format&fit=crop', NULL, 1, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(30, 27, NULL, NULL, 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop', NULL, 2, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(31, 27, NULL, NULL, 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1000&auto=format&fit=crop', NULL, 3, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(32, 27, NULL, NULL, 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop', NULL, 4, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(33, 27, NULL, NULL, 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop', NULL, 5, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(34, 34, NULL, NULL, 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop', NULL, 1, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(35, 34, NULL, NULL, 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1000&auto=format&fit=crop', NULL, 2, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(36, 34, NULL, NULL, '/storage/life-at-mechanix/yDcwUMJDjTpNRxLRdURy2bNo6bES9jK24TOIFhZy.jpg', NULL, 4, 1, '2025-12-24 05:22:41', '2026-01-30 11:41:38'),
(37, 34, NULL, NULL, 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop', NULL, 4, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(38, 34, NULL, NULL, 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop', NULL, 5, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(39, 34, NULL, NULL, 'https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=1000&auto=format&fit=crop', NULL, 6, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(40, 34, NULL, NULL, 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1000&auto=format&fit=crop', NULL, 7, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(41, 34, NULL, NULL, 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1000&auto=format&fit=crop', NULL, 8, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(42, 35, NULL, NULL, 'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?q=80&w=1000&auto=format&fit=crop', NULL, 1, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(43, 35, NULL, NULL, 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop', NULL, 2, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(44, 35, NULL, NULL, 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1000&auto=format&fit=crop', NULL, 3, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(45, 35, NULL, NULL, 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop', NULL, 4, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(46, 35, NULL, NULL, 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop', NULL, 5, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(47, 35, NULL, NULL, 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop', NULL, 6, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(48, 35, NULL, NULL, 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop', NULL, 7, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(49, 35, NULL, NULL, 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1000&auto=format&fit=crop', NULL, 8, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(52, 18, NULL, NULL, '/storage/about-us/items/AVMKMBpK8HCg4CuDGnptXXu5eiBLm3TaqKrgMlaZ.jpg', NULL, 1, 1, '2026-01-30 10:29:23', '2026-01-30 10:29:23'),
(53, 19, NULL, NULL, '/storage/about-us/items/wkL6atPL0ZDM3sescYucbc6tPWwdPoCAGZ9IhqQF.jpg', NULL, 2, 1, '2026-01-30 10:30:03', '2026-01-30 10:30:03'),
(54, 35, NULL, NULL, '/storage/life-at-mechanix/nBiAZgpimFzUc2QGafhBnEJY0L2lEXjd37QVX4eh.jpg', NULL, 3, 1, '2026-01-30 11:41:24', '2026-01-30 11:41:24');

-- --------------------------------------------------------

--
-- Table structure for table `page_sections`
--

CREATE TABLE `page_sections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `page` varchar(255) NOT NULL,
  `section_key` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `page_sections`
--

INSERT INTO `page_sections` (`id`, `page`, `section_key`, `is_active`, `order`, `created_at`, `updated_at`) VALUES
(1, 'welcome', 'hero', 1, 1, '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(2, 'welcome', 'about', 1, 2, '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(3, 'welcome', 'founder', 1, 5, '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(4, 'welcome', 'video_break', 1, 6, '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(5, 'welcome', 'contact', 1, 6, '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(6, 'careers', 'page_hero', 1, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(7, 'careers', 'job_search', 1, 2, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(8, 'about-us', 'page_hero', 1, 0, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(9, 'clients', 'page_hero', 1, 0, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(10, 'life-at-mechanix', 'page_hero', 1, 0, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(11, 'our-team', 'page_hero', 1, 0, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(12, 'tips', 'page_hero', 1, 0, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(13, 'about-us', 'main', 1, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(14, 'about-us', 'stats', 1, 2, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(15, 'about-us', 'ceo_vision', 1, 3, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(16, 'about-us', 'values', 1, 4, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(17, 'about-us', 'process', 1, 5, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(18, 'about-us', 'certificates', 1, 6, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(19, 'about-us', 'affiliations', 1, 7, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(20, 'about-us', 'cta', 1, 8, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(21, 'about-us', 'quote', 1, 9, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(22, 'our-team', 'whole_team_photo', 1, 0, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(23, 'our-team', 'hero', 1, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(24, 'our-team', 'ceo_quote', 1, 2, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(25, 'our-team', 'team_quote', 1, 3, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(26, 'our-team', 'beyond_desk', 1, 4, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(27, 'our-team', 'team_motion', 1, 5, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(28, 'life-at-mechanix', 'tech_zone', 1, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(29, 'life-at-mechanix', 'design_zone', 1, 2, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(30, 'life-at-mechanix', 'meeting_zone', 1, 3, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(31, 'life-at-mechanix', 'quote', 1, 4, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(32, 'life-at-mechanix', 'coffee_zone', 1, 5, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(33, 'life-at-mechanix', 'team_dinner', 1, 6, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(34, 'life-at-mechanix', 'glimpse', 1, 7, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(35, 'life-at-mechanix', 'team_gallery', 1, 8, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(36, 'welcome', 'services', 1, 4, '2025-12-27 10:05:10', '2025-12-27 10:05:10'),
(37, 'welcome', 'projects', 1, 5, '2025-12-27 10:05:10', '2025-12-27 10:05:10'),
(38, 'clients', 'page_settings', 1, 1, '2026-01-30 11:35:26', '2026-01-30 11:35:26'),
(39, 'tips', 'page_settings', 1, 1, '2026-01-30 12:01:26', '2026-01-30 12:01:26');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) NOT NULL,
  `gallery` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`gallery`)),
  `amenities` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`amenities`)),
  `floor_plans` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`floor_plans`)),
  `description` text DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `slug`, `category`, `location`, `image_url`, `gallery`, `amenities`, `floor_plans`, `description`, `order`, `is_featured`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'HAQUE HARETAGE', 'haque-haretage', 'Residential', 'Bashundhara River view, Dhaka, Bangladesh.', '/storage/projects/DpZJxGzjSDqDSc3Kpdbl4NMsS3WhNzduyNjydQmY.jpg', '[\"\\/storage\\/projects\\/gallery\\/ONkNm15kRrRNvasguLisnrQ1eWEMH7jR2NRfvKZz.jpg\",\"\\/storage\\/projects\\/gallery\\/amfVEqo11iBIhmKOt311RIcoa1znJZdtYxQom632.jpg\",\"\\/storage\\/projects\\/gallery\\/SKr0CjNolxwOGkQvcht5szBbStHgtGOj3Cd6KqmW.jpg\",\"\\/storage\\/projects\\/gallery\\/Qsa26VW68a52mS8dqRRfw0TJTLh6UBYFCGv3UzDe.jpg\",\"\\/storage\\/projects\\/gallery\\/GXGuCqU8TNjCZ8vU42XpWd3ELCDCC915WgPv63IR.jpg\",\"\\/storage\\/projects\\/gallery\\/7AaaIZgi8Obgn2OX25UIxzV5rIfbXmpamJl4JKzO.jpg\"]', '[{\"id\":\"1\",\"name\":\"Swimming Pool\",\"icon\":\"Waves\"},{\"id\":\"2\",\"name\":\"Smart Home\",\"icon\":\"Smartphone\"},{\"id\":\"3\",\"name\":\"Garden\",\"icon\":\"Flower2\"}]', '[{\"id\":\"fp1\",\"title\":\"Ground Floor\",\"pdf_url\":\"https:\\/\\/www.w3.org\\/WAI\\/ER\\/tests\\/xhtml\\/testfiles\\/resources\\/pdf\\/dummy.pdf\"},{\"id\":\"fp2\",\"title\":\"First Floor\",\"pdf_url\":\"https:\\/\\/www.w3.org\\/WAI\\/ER\\/tests\\/xhtml\\/testfiles\\/resources\\/pdf\\/dummy.pdf\"}]', 'A premium residential landmark design successfully delivered and soon to be developed by Haque Builders. \r\n\r\nLand Area: 8 Kathas\r\nStructure: Ground + 9 Floors\r\nParking: 17 Parking Spaces\r\nUnit Type: 4-Bedroom Apartments\r\nSize: Approximately 2,350 sq. ft.', 1, 1, 1, '2025-12-24 05:22:41', '2026-02-14 06:33:56'),
(9, 'NEXT CAFE', 'next-cafe', 'Restaurant', 'Banani, Dhaka.', '/storage/projects/PRgdIgvnrJIGWmppN3uqvxqjtNlj5e6KZeRiKLYW.jpg', '[\"\\/storage\\/projects\\/gallery\\/orvln21H21gJ3SABMvBaAAanLgxxRWF0fLRRzNvR.jpg\",\"\\/storage\\/projects\\/gallery\\/iPC7p6gY8n8HdWDgPTFJv7NlMp5TMblVANM9mXXr.jpg\",\"\\/storage\\/projects\\/gallery\\/uw6PpRFFHKCwKk1koaHZJUg6etyAoSF6teXZ1VVi.jpg\",\"\\/storage\\/projects\\/gallery\\/Iz1gnkwjI7wkPwlDom3FZrHaTyHcsKafT2pNK9S4.jpg\",\"\\/storage\\/projects\\/gallery\\/uIO38uR1Ec4AHHCEObumg8S9H1FutTyFEjUOEZ5A.jpg\",\"\\/storage\\/projects\\/gallery\\/GpVT6ug3HAAJomNmfVc8JAfzMdJWtNOlJ0cEJuG2.jpg\",\"\\/storage\\/projects\\/gallery\\/mO9XQTGCoylGmbqcJPYiTDzJKpqZYAVkYg2HKynf.jpg\",\"\\/storage\\/projects\\/gallery\\/Us2jk8uFRT0gAXj0RBlHTgthxXDmj14rDaTVKduR.jpg\"]', '[]', '[]', 'A space as tasty as the food.\r\nFloor Size: 850 sft\r\nMeeting Zone', 9, 0, 1, '2025-12-24 05:22:41', '2026-02-14 07:09:43'),
(19, 'BellaDonna', 'belladonna', 'Residential', 'Block: L; Bashundhara, Dhaka', '/storage/projects/PmakeUcRFH1SDTXLiVXU13NwdK8JHndNga84FkZt.jpg', '[\"\\/storage\\/projects\\/gallery\\/uOknD0501rGb5JCYilxLjBZcc3qRjVx3mrKCmoSE.jpg\",\"\\/storage\\/projects\\/gallery\\/YFltWSkk1IMZWYoVnHufMvHWxmS72M5XdZxynP68.jpg\",\"\\/storage\\/projects\\/gallery\\/07r6KCopEwgsRN3Zk93iULz6PwEQlT8TslXgjFTl.jpg\",\"\\/storage\\/projects\\/gallery\\/vWDHUifT1JZVrQr9RuTYcThIEGSoKQpdjTratM5c.jpg\",\"\\/storage\\/projects\\/gallery\\/FIyTTvoeABAvSIThWKOj4q6Xe60KAGZjspjU7Ypx.jpg\",\"\\/storage\\/projects\\/gallery\\/9ZXtNopKqnpFtnEdPSk3yPwrfHaa0YmlfCh4KSL3.jpg\",\"\\/storage\\/projects\\/gallery\\/KXx3khhxzDdxkLVuE2ddjZQO43LJtrg33UzhUeiS.jpg\"]', '[]', '[]', 'Land Size: 3 Kath\r\nApartment Size: 1550 sft\r\nStoried: G+6\r\nParking: 6\r\nInfinity Swimming Pool\r\nBBQ Space', 10, 0, 1, '2026-02-14 07:24:11', '2026-02-14 07:24:35');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `title`, `description`, `icon`, `order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'ResidentiaL', 'Transforming houses into homes. We specialize in modern luxury apartments, duplexes, and private villas. HD', 'Home', 1, 1, '2025-12-24 05:22:40', '2026-01-30 12:10:58'),
(2, 'Commercial', 'Designing productive workspaces. Corporate offices, retail outlets, and showrooms that reflect your brand identity.', 'Briefcase', 2, 1, '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(3, 'Consultancy', 'Space planning, 3D visualization, and turnkey project management from concept to completion.', 'LayoutTemplate', 3, 1, '2025-12-24 05:22:40', '2025-12-24 05:22:40');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('3GKsvGosQwBN7w6wqjd9qmsL1HbBzmiV2YXNJoA9', NULL, '157.230.84.71', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibWVtbm1UaG9jdFNQaWtFZzV1SXZUS01NYWdZWlJqS2c3QmpoaXJCRyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly93d3cubWVjaGFuaXgubmV4Z3JvdXAuYml6IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1773066115),
('5kNEhnQHVk2oihF2qfuj62WBTEMkgFBBCzGdFnZJ', NULL, '103.175.127.199', 'WhatsApp/2.23.20.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidFdhemYzZ3RVRG56enROa1lkNUljRThWalpjM1BYc3hwdnBzOW9MWiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHBzOi8vbWVjaGFuaXgubmV4Z3JvdXAuYml6IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1772555950),
('9IcgTmCh0rqcQh1Y8G1qNDb8lSupHF16TK8oerRV', NULL, '103.175.127.199', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.4 Safari/605.1.15', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidzdJRUc1OVdCQmEyYk5qdFM4REFzMzZ5WFJ2aWY1RzJaeUtseGx5eiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHBzOi8vbWVjaGFuaXgubmV4Z3JvdXAuYml6IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1772555897),
('bFAJPJeptyyFCN0sUj9FSCm9Rai8ukkZEKsgOgG1', NULL, '34.57.81.107', 'Mozilla/5.0 (compatible; CMS-Checker/1.0; +https://example.com)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ3ZOY3pjMVNNbExNdHh3QjJaNzZwRXZqbHl4am5nMnN5WjJmS0ZFOSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly93d3cubWVjaGFuaXgubmV4Z3JvdXAuYml6IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1772555346),
('BGJVl7vi64Lm23DB5pgZqD3gzhXBj9n40GzirafY', NULL, '103.78.226.63', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWnVLODRXYVFFRXRwTFlFc2tuaGJWclNLRDJDVHY3ZHE4UG9McHdFSiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHBzOi8vbWVjaGFuaXgubmV4Z3JvdXAuYml6IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1772444295),
('BVHbKN3tkQpWPR2Wg7Vac5s03I4DMWD8WA0Pzj1b', NULL, '34.244.113.214', 'Mozilla/5.0 (compatible; NetcraftSurveyAgent/1.0; +info@netcraft.com)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYWlJcldJU2FKdmxBZ3F3Mjl6ekRyWjdLd1plOVgyeXhnbXd0cVBEYiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzM6Imh0dHBzOi8vd3d3Lm1lY2hhbml4Lm5leGdyb3VwLmJpeiI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1773373704),
('crkf5gahGQ7fAzE3vhNQm0zaAb8aPyPFC5NIFiiQ', NULL, '35.238.33.62', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.124 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaHJsMm53MlBKaGNrU3pVdzVwV0hGUWwwRm5CYndENGNaTm1CUzlCeCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly93d3cubWVjaGFuaXgubmV4Z3JvdXAuYml6IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1772341960),
('DBtd2MiK0XA38Li9yfSAPzrtvTMsuMfyeX4UaZzT', 1, '103.60.175.195', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiZHdMeGs1djE3N1ZJMHoxMHJ1MmVPaUlqMWpnRWFhMEFUSU0xSHdPQyI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjk6Il9wcmV2aW91cyI7YToyOntzOjM6InVybCI7czoyOToiaHR0cHM6Ly9tZWNoYW5peC5uZXhncm91cC5iaXoiO3M6NToicm91dGUiO3M6NDoiaG9tZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1772867952),
('f7kd6KGwV2I5Uc3y019xwfnTz3DcMdLiLKlktdeW', NULL, '64.233.173.99', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36 (compatible; Google-Read-Aloud; +https://support.google.com/webmasters/answer/1061943)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSFdjZWp5YWhzSWg3NUpjQjREaEM1b3ZlVTZodlJFVENtYWRnOUt2TSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHBzOi8vbWVjaGFuaXgubmV4Z3JvdXAuYml6IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1771946724),
('FjGGnk8t0jGTF6p1PJy2hRzjFUcNrouxHHPtA4k9', NULL, '182.48.82.81', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQVlZOWJYVnZzZ3l6eXdZODZGd3NHbWlKYjZ1OVpJWjRtVHEzZm9ZaCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHBzOi8vbWVjaGFuaXgubmV4Z3JvdXAuYml6IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1772128466),
('fLxLUjxIQvuvISGRkBDZUhgvwvV9TUwGgSVRJB76', NULL, '103.129.210.34', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiT3VqcVpNZFRkZEU0ZjhXcjUweWxIcTJ6bmluQzQ4U3Fyanp1Q1dhWCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHBzOi8vbWVjaGFuaXgubmV4Z3JvdXAuYml6IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1773157957),
('hzXaNSVXC6nReJM2AIlrTMgIJyQ6QNWfUDPOYHzN', NULL, '157.230.84.71', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRTg0SFFQNTRzRjVUcHVMWGNuT282WkxUWTFCUmxFRkVJeVhaNzdDTiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzM6Imh0dHBzOi8vd3d3Lm1lY2hhbml4Lm5leGdyb3VwLmJpeiI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1773066117),
('iSevSXAzXwMqJCnkB1DbvN1Y6Rr9JzJttkqqYUDd', NULL, '35.197.31.204', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUWozb3Nnb3Q5bDNNU2U1SlpBZHFQU2syN3dxZDVPMENCbXd5MUsyOCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjg6Imh0dHA6Ly9tZWNoYW5peC5uZXhncm91cC5iaXoiO3M6NToicm91dGUiO3M6NDoiaG9tZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1772454428),
('kc1CFPxNM62SGOyoGz3FTWFUAryCp4DS3JOgygdR', NULL, '185.247.137.196', 'Mozilla/5.0 (compatible; InternetMeasurement/1.0; +https://internet-measurement.com/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoid1BQdmhOQlpvMlgwZUt2V3pwYkVaVDd4bTc4VVQxUDdBcWpwUEZEaiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjg6Imh0dHA6Ly9tZWNoYW5peC5uZXhncm91cC5iaXoiO3M6NToicm91dGUiO3M6NDoiaG9tZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1771946649),
('lX1c4OEPozdFwWPNJiSy7hSzeApi7ws4YxLYlIVm', NULL, '14.232.208.159', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSTAwc0xtWlV1Z1NIOUVrM29xQW16dkdIWnAxekpJekRpQjI0RGlIUSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzM6Imh0dHBzOi8vd3d3Lm1lY2hhbml4Lm5leGdyb3VwLmJpeiI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1772157535),
('ncVaeaqAhRH4lmn8jzn7LZPpImKDEHyGwtSQyvLy', NULL, '172.253.216.55', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibGU2WnJHcVlsS2w4YTdTWU5pcVBnbzcwVHgwWnprU2JCUG1QcU1PdyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHBzOi8vbWVjaGFuaXgubmV4Z3JvdXAuYml6IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1772710781),
('NeunGQAAiYI4T30Isopj7v78U9Bf92873za6r8Mk', NULL, '34.252.127.146', 'Mozilla/5.0 (compatible; NetcraftSurveyAgent/1.0; +info@netcraft.com)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibEloUEtIUTRzMW1zdUhsbzZTeHJOREIxYUhWZkRRV3Z2WXJLU01ZZCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzM6Imh0dHBzOi8vd3d3Lm1lY2hhbml4Lm5leGdyb3VwLmJpeiI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1773301741),
('pHmXohRYR8XREb4QS3Tgi6W3io0WDttqjhLuqmLt', NULL, '59.153.101.155', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMWtPMElLbEZMYWQ0TDVyRnFMdTMxWmw1MHZUVjJIelRlMmdJQjRWUyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHBzOi8vbWVjaGFuaXgubmV4Z3JvdXAuYml6IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1772016971),
('QdmN2BtqLrJhIF7AKAqfLr2IvV35EtSCWarPE6CH', NULL, '143.110.157.203', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQnpHcnhkeUFoVmQ0VVNRU1FRS1ZwcFVObHNPWkxXR0t3UmtpNFJ5NiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHBzOi8vbWVjaGFuaXgubmV4Z3JvdXAuYml6IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1772463181),
('S9lvnZ3u1cNvS0fHwzrQC8flgHHJJD3sEjxfrxtM', NULL, '64.233.173.99', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36 (compatible; Google-Read-Aloud; +https://support.google.com/webmasters/answer/1061943)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidUhraUxNY29UMWNMZUxxZWwybmJIdTFCeHBidzFzUTFGSHpKMFJtdiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHBzOi8vbWVjaGFuaXgubmV4Z3JvdXAuYml6IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1771946724),
('shXMyqLsBMZdXAYFILU1WOoSnjuymXQ94J1T8kpG', NULL, '103.129.210.34', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOXBLQ09OZGZwbkFMcFI0WWRxR0ZSMVNtazQ0V0RRY2ZSdjdLcW9nTyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHBzOi8vbWVjaGFuaXgubmV4Z3JvdXAuYml6IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1772555969),
('TS0MsLYEzRRJlTlLNXGwlgRlirV1VpnyAoD6nNnP', NULL, '185.247.137.93', 'Mozilla/5.0 (compatible; InternetMeasurement/1.0; +https://internet-measurement.com/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiemdmNXhHelM3UkhrbURUSEttMHo3WmpCbGU5RmVVM1J0bktRRm9XUiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly93d3cubWVjaGFuaXgubmV4Z3JvdXAuYml6IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1772331146),
('ttbiEvv0OQyAE8A7dBN4x8c2b1Mj1MIYIDIJ9zwN', NULL, '184.33.96.113', 'Mozilla/5.0 (compatible; wpbot/1.4; +https://forms.gle/ajBaxygz9jSR8p8G9)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidTVHTXhJS0ZueEVvQTJXblNWcFhWd2owVE10aFJVMktpbnBUYm9sVCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHBzOi8vbWVjaGFuaXgubmV4Z3JvdXAuYml6IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1773060007),
('wpaWsFdXewdaewdpsDHLrjsxZUFd7YzuStLKu5Th', NULL, '64.233.173.99', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36 (compatible; Google-Read-Aloud; +https://support.google.com/webmasters/answer/1061943)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZllsUk5GUVlwQnpYbGlHckVPeTVPdUgwY1dJam9CRG16YTF3d3VBQiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHBzOi8vbWVjaGFuaXgubmV4Z3JvdXAuYml6IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1771946724),
('WPUhX6FGhBosXpjtawQeD7ldPRC3wQjh2cy7HbBQ', NULL, '98.87.115.128', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.193 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieXVObmdmOXFWak1QcWRRYm9MSlBINWFGdkt2WkRnM1E2akVZd2prcCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjg6Imh0dHA6Ly9tZWNoYW5peC5uZXhncm91cC5iaXoiO3M6NToicm91dGUiO3M6NDoiaG9tZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1772242119),
('xmFgD9FuPDJ8ZBWmxMauuOd48hlZ15MymXoDC6Pm', NULL, '103.78.226.63', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMTk0dUZNa0xMY0VOcHY4Y3dEMEQ3MU5adktXcjFBMXBlMm5wNjczcyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHBzOi8vbWVjaGFuaXgubmV4Z3JvdXAuYml6IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1772795490),
('Y08lUnz71SF096iXyEfh8ZkvFhJekvrXQGRje3ND', NULL, '143.110.157.203', 'Mozilla/5.0 (X11; Linux x86_64; rv:142.0) Gecko/20100101 Firefox/142.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicnhMVTRwTDRHYjdoUGZyVXlFT2VNVnpEV3gzTjZvSmYxUmNkMjBVSyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjg6Imh0dHA6Ly9tZWNoYW5peC5uZXhncm91cC5iaXoiO3M6NToicm91dGUiO3M6NDoiaG9tZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1772463179),
('ybZXSTpoLydmmFZSRR2HpCiulNUyk1Et5liuoIK8', NULL, '35.94.100.175', 'Mozilla/5.0 (compatible; wpbot/1.4; +https://forms.gle/ajBaxygz9jSR8p8G9)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZG1tZjNzNEM5UFVnb1RCNVVjd3M0cFBDM2VlaHlZNVFhNHJqWkozUyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzM6Imh0dHBzOi8vd3d3Lm1lY2hhbml4Lm5leGdyb3VwLmJpeiI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1773080806),
('yiF2dhOEPWmOJ3R9RAgyGDtb5TfW5ziBL2CKFQkC', NULL, '34.230.220.241', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSnMzV3NDYkNMRHhwb2ZZNEtjcm5BVzF0NHBCcTlIYlRLYkN0eHZqUyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzM6Imh0dHBzOi8vd3d3Lm1lY2hhbml4Lm5leGdyb3VwLmJpeiI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1773441886),
('z5lHGRrQud6DBZakL5cK5cpR89cXe5lHtlpO4XeE', NULL, '172.253.15.230', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaEN4SVZWcnlvd2hHN0hrSXVCUnJvSjl4bEVNbEN2MXRtSFNhZFlodyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHBzOi8vbWVjaGFuaXgubmV4Z3JvdXAuYml6IjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1772710420);

-- --------------------------------------------------------

--
-- Table structure for table `site_header_settings`
--

CREATE TABLE `site_header_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` text DEFAULT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'text',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `site_header_settings`
--

INSERT INTO `site_header_settings` (`id`, `key`, `value`, `type`, `created_at`, `updated_at`) VALUES
(1, 'facebook_url', 'https://www.facebook.com/mechanixinterior', 'text', '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(2, 'facebook_icon_visible', '1', 'boolean', '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(3, 'cta_button_text', 'Get in Touch', 'text', '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(4, 'cta_button_link', '#contact', 'text', '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(5, 'logo_url', '/storage/logos/2zzls9m3cedP57v2VjyQXXi6YRATIdLXZpHn6Z5U.png', 'text', '2026-02-10 06:12:01', '2026-02-10 06:12:01');

-- --------------------------------------------------------

--
-- Table structure for table `site_settings`
--

CREATE TABLE `site_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` text DEFAULT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'text',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `site_settings`
--

INSERT INTO `site_settings` (`id`, `key`, `value`, `logo_url`, `type`, `created_at`, `updated_at`) VALUES
(1, 'company_name', 'MECHANIX.', NULL, 'text', '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(2, 'facebook_url', 'https://www.facebook.com/mechanixinterior', NULL, 'text', '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(3, 'instagram_url', 'https://www.instagram.com/mechanixinterior', NULL, 'text', '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(4, 'linkedin_url', 'https://www.linkedin.com/company/mechanixinterior', NULL, 'text', '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(5, 'copyright_text', '© 2025 Mechanix Interior. Developed and maintained by Alphainno.', NULL, 'text', '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(6, 'welcome_modal_title', 'Project Kick-off Offer', NULL, 'text', '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(7, 'welcome_modal_description', 'Start your journey with Mechanix. Book a free, 30-minute virtual consultation with our lead designer to discuss the blueprint of your ideal space.', NULL, 'text', '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(8, 'welcome_modal_button_text', 'Book Now', NULL, 'text', '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(9, 'welcome_modal_button_link', 'https://mechanix.nexgroup.biz/#contact', NULL, 'text', '2025-12-24 05:22:40', '2026-02-05 07:34:37'),
(10, 'welcome_modal_image', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1500&auto=format&fit=crop', NULL, 'text', '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(11, 'welcome_modal_note', 'Limited slots available this week.', NULL, 'text', '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(12, 'welcome_modal_is_active', 'true', NULL, 'text', '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(13, 'logo_url', '/storage/logos/v8JOwScMfXVQmd9nygDtCWdiyXIORYOhQN6PwNn1.png', NULL, 'text', '2026-02-10 06:11:10', '2026-02-10 06:11:10'),
(14, 'logo_version', '1770725470', NULL, 'text', '2026-02-10 06:11:10', '2026-02-10 06:11:10'),
(15, 'favicon_url', '/storage/favicons/pNigVZIyWvArypXFCpG5Ca5N2ekZnanIkI1s9WaH.png', NULL, 'text', '2026-02-10 06:11:10', '2026-02-10 06:11:10');

-- --------------------------------------------------------

--
-- Table structure for table `team_members`
--

CREATE TABLE `team_members` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `linkedin_url` varchar(255) DEFAULT NULL,
  `facebook_url` varchar(255) DEFAULT NULL,
  `category` varchar(255) NOT NULL DEFAULT 'Individuals',
  `order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `team_members`
--

INSERT INTO `team_members` (`id`, `name`, `role`, `image_url`, `linkedin_url`, `facebook_url`, `category`, `order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'John Doe', 'CEO', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop', 'https://linkedin.com/in/johndoe', 'https://facebook.com/johndoe', 'Individuals', 1, 1, '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(2, 'Jane Smith', 'CTO', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop', 'https://linkedin.com/in/janesmith', 'https://facebook.com/janesmith', 'Individuals', 2, 1, '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(4, 'Sarah Williams', 'Designer', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop', 'https://linkedin.com/in/sarahwilliams', 'https://facebook.com/sarahwilliams', 'Individuals', 4, 1, '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(5, 'David Brown', 'Project Manager', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop', 'https://linkedin.com/in/davidbrown', 'https://facebook.com/davidbrown', 'Individuals', 5, 1, '2025-12-24 05:22:40', '2025-12-24 05:22:40'),
(6, 'Emily Davis', 'Marketing', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', NULL, 'https://facebook.com/emilydavis', 'Individuals', 6, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(7, 'Chris Wilson', 'Developer', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop', 'https://linkedin.com/in/chriswilson', 'https://facebook.com/chriswilson', 'Individuals', 7, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(8, 'Jessica Taylor', 'HR', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fHww', 'https://linkedin.com/in/jessicataylor', 'https://facebook.com/jessicataylor', 'Individuals', 8, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(9, 'Alex Lee', 'Data Analyst', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop', 'https://linkedin.com/in/alexlee', 'https://facebook.com/alexlee', 'Individuals', 9, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(10, 'Olivia Martinez', 'UX Researcher', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop', 'https://linkedin.com/in/oliviamartinez', 'https://facebook.com/oliviamartinez', 'Individuals', 10, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(11, 'Ryan Garcia', 'DevOps Engineer', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop', 'https://linkedin.com/in/ryangarcia', 'https://facebook.com/ryangarcia', 'Individuals', 11, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(12, 'Sophia Patel', 'Content Writer', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop', 'https://linkedin.com/in/sophiapatel', 'https://facebook.com/sophiapatel', 'Individuals', 12, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(13, 'Ethan Kim', 'QA Tester', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop', 'https://linkedin.com/in/ethankim', 'https://facebook.com/ethankim', 'Individuals', 13, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(14, 'Isabella Nguyen', 'Sales Manager', 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D', 'https://linkedin.com/in/isabellanguyen', 'https://facebook.com/isabellanguyen', 'Individuals', 14, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(15, 'Jaiden Sofia', 'Animator', 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D', 'https://linkedin.com/in/jaidensofia', 'https://facebook.com/jaidensofia', 'Individuals', 15, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41');

-- --------------------------------------------------------

--
-- Table structure for table `timeline_events`
--

CREATE TABLE `timeline_events` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `year` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `is_current` tinyint(1) NOT NULL DEFAULT 0,
  `order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `timeline_events`
--

INSERT INTO `timeline_events` (`id`, `year`, `title`, `description`, `is_current`, `order`, `created_at`, `updated_at`) VALUES
(1, '2011', 'Start of Nexkraft Journey', '', 0, 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(2, '2014', 'Registration of Nexkraft', '', 0, 2, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(3, '2018', 'International Exposure of Nexkraft', '', 0, 3, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(4, '2024', 'Present Day', '', 1, 4, '2025-12-24 05:22:41', '2025-12-24 05:22:41');

-- --------------------------------------------------------

--
-- Table structure for table `tips`
--

CREATE TABLE `tips` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `published_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tips`
--

INSERT INTO `tips` (`id`, `title`, `content`, `image`, `published_at`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Choosing the Right Color PaletteDFF', 'Colors can dramatically affect the mood of a room. Learn how to choose the perfect palette for your space.', '/storage/tips/KrVDXOQb9mH8RITHxMvMlw7ZWtQLMNalfnsnNxtj.jpg', '2025-12-23 18:00:00', 1, '2025-12-24 05:22:41', '2026-01-30 12:02:26'),
(2, 'Maximizing Small Spaces', 'Small spaces can be stylish and functional. Discover tips and tricks to make the most of your limited square footage.', 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=2076&auto=format&fit=crop', '2025-12-22 05:22:41', 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41'),
(3, 'Lighting Design 101', 'Good lighting is essential for any interior. Understand the basics of ambient, task, and accent lighting.', 'https://images.unsplash.com/photo-1544143086-828f66ac3945?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '2025-12-19 05:22:41', 1, '2025-12-24 05:22:41', '2025-12-24 05:22:41');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `two_factor_secret` text DEFAULT NULL,
  `two_factor_recovery_codes` text DEFAULT NULL,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Mechanix', 'mechanix@gmail.com', '2025-12-24 05:22:40', '$2y$12$f7dIj8pR1StJ.v8ytb7HdemnXvJ6aMtckK2YpRDKk5y9KiJhaYqTy', NULL, NULL, NULL, 'IMdmC00O3l33BC0IAAaqSvggGswFDC7w1VpaR079dS0jqPc9Yl6RDpxemZ1S', '2025-12-24 05:22:40', '2025-12-24 05:22:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_activities`
--
ALTER TABLE `admin_activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_activities_user_id_foreign` (`user_id`),
  ADD KEY `admin_activities_created_at_index` (`created_at`),
  ADD KEY `admin_activities_model_action_index` (`model`,`action`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_submissions`
--
ALTER TABLE `contact_submissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_applications`
--
ALTER TABLE `job_applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `job_applications_job_opening_id_foreign` (`job_opening_id`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_openings`
--
ALTER TABLE `job_openings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `navigation_items`
--
ALTER TABLE `navigation_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `navigation_items_parent_id_foreign` (`parent_id`);

--
-- Indexes for table `page_contents`
--
ALTER TABLE `page_contents`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `page_contents_section_id_key_unique` (`section_id`,`key`);

--
-- Indexes for table `page_items`
--
ALTER TABLE `page_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `page_items_page_section_id_foreign` (`page_section_id`);

--
-- Indexes for table `page_sections`
--
ALTER TABLE `page_sections`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `page_sections_page_section_key_unique` (`page`,`section_key`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `projects_slug_unique` (`slug`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `site_header_settings`
--
ALTER TABLE `site_header_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `site_header_settings_key_unique` (`key`);

--
-- Indexes for table `site_settings`
--
ALTER TABLE `site_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `site_settings_key_unique` (`key`);

--
-- Indexes for table `team_members`
--
ALTER TABLE `team_members`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `timeline_events`
--
ALTER TABLE `timeline_events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tips`
--
ALTER TABLE `tips`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_activities`
--
ALTER TABLE `admin_activities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=503;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `contact_submissions`
--
ALTER TABLE `contact_submissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job_applications`
--
ALTER TABLE `job_applications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `job_openings`
--
ALTER TABLE `job_openings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `navigation_items`
--
ALTER TABLE `navigation_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `page_contents`
--
ALTER TABLE `page_contents`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;

--
-- AUTO_INCREMENT for table `page_items`
--
ALTER TABLE `page_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `page_sections`
--
ALTER TABLE `page_sections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `site_header_settings`
--
ALTER TABLE `site_header_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `site_settings`
--
ALTER TABLE `site_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `team_members`
--
ALTER TABLE `team_members`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `timeline_events`
--
ALTER TABLE `timeline_events`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tips`
--
ALTER TABLE `tips`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_activities`
--
ALTER TABLE `admin_activities`
  ADD CONSTRAINT `admin_activities_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `job_applications`
--
ALTER TABLE `job_applications`
  ADD CONSTRAINT `job_applications_job_opening_id_foreign` FOREIGN KEY (`job_opening_id`) REFERENCES `job_openings` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `navigation_items`
--
ALTER TABLE `navigation_items`
  ADD CONSTRAINT `navigation_items_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `navigation_items` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `page_contents`
--
ALTER TABLE `page_contents`
  ADD CONSTRAINT `page_contents_section_id_foreign` FOREIGN KEY (`section_id`) REFERENCES `page_sections` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `page_items`
--
ALTER TABLE `page_items`
  ADD CONSTRAINT `page_items_page_section_id_foreign` FOREIGN KEY (`page_section_id`) REFERENCES `page_sections` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
