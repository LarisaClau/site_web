-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Gazdă: 127.0.0.1
-- Timp de generare: iul. 06, 2023 la 09:13 PM
-- Versiune server: 10.4.14-MariaDB
-- Versiune PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Bază de date: `licenta`
--

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `appointments`
--

CREATE TABLE `appointments` (
  `id_appointments` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_tehnician` int(11) NOT NULL,
  `id_service` int(11) NOT NULL,
  `appointment_date` text NOT NULL,
  `appointment_hour` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `appointments`
--

INSERT INTO `appointments` (`id_appointments`, `id_user`, `id_tehnician`, `id_service`, `appointment_date`, `appointment_hour`) VALUES
(66, 18, 1, 1, '10.05.2023, 00:00:00', '10'),
(67, 18, 1, 1, '10.05.2023, 00:00:00', '14'),
(68, 18, 1, 3, '16.06.2023, 00:00:00', '12'),
(69, 18, 1, 1, '14.06.2023, 00:00:00', '12'),
(70, 17, 1, 1, '16.06.2023, 00:00:00', '16'),
(71, 17, 1, 7, '29.06.2023, 00:00:00', '12'),
(72, 17, 1, 7, '23.06.2023, 00:00:00', '12'),
(73, 17, 1, 1, '14.06.2023, 00:00:00', '16'),
(74, 17, 1, 1, '13.07.2023, 00:00:00', '12'),
(77, 18, 1, 1, '20.07.2023, 00:00:00', '10');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `cart`
--

CREATE TABLE `cart` (
  `id_cart` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price_total` double NOT NULL,
  `product_type` varchar(255) NOT NULL,
  `course_year` varchar(11) NOT NULL,
  `course_city` varchar(255) NOT NULL,
  `course_date` varchar(255) NOT NULL,
  `teaches_classes` varchar(255) NOT NULL,
  `course_payment` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `cart`
--

INSERT INTO `cart` (`id_cart`, `id_user`, `id_product`, `quantity`, `price_total`, `product_type`, `course_year`, `course_city`, `course_date`, `teaches_classes`, `course_payment`) VALUES
(149, 17, 2, 11, 429, 'product', '', '', '', '', ''),
(150, 17, 23, 12, 540, 'product', '', '', '', '', ''),
(151, 17, 1, 1, 3600, 'course', '2', '2', '1 - 6 Iulie', 'da', 'integral'),
(152, 17, 100, 1, 150, 'product', '', '', '', '', ''),
(153, 17, 4, 1, 39, 'product', '', '', '', '', ''),
(168, 18, 1, 1, 39, 'product', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `city_courses`
--

CREATE TABLE `city_courses` (
  `id_c` int(11) NOT NULL,
  `id_year` int(11) NOT NULL,
  `city` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `city_courses`
--

INSERT INTO `city_courses` (`id_c`, `id_year`, `city`) VALUES
(1, 1, 'Brasov'),
(2, 2, 'Brasov'),
(3, 1, 'Iasi'),
(4, 2, 'Bucuresti'),
(5, 3, 'Bacau');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `short_name` varchar(255) NOT NULL,
  `trainer` varchar(255) NOT NULL,
  `duration` varchar(255) NOT NULL,
  `schedule` varchar(255) NOT NULL,
  `break` varchar(255) NOT NULL,
  `year` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `rate_1` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `courses`
--

INSERT INTO `courses` (`id`, `name`, `short_name`, `trainer`, `duration`, `schedule`, `break`, `year`, `city`, `date`, `price`, `rate_1`, `img`) VALUES
(1, 'Universal – Stilist protezist de unghii – acreditat – Level 1', '', 'Andreea Popescu', '6 zile', '10:00- terminarea lucrării (18:00-21:00)', '13 - 13.30', '2023', 'Brasov', '10 - 15 Iulie', '3600', '1000', 'https://i.imgur.com/Drv1rGA.jpg'),
(2, 'Universal – Stilist protezist de unghii – acreditat – Level 1', '', 'Miruna Andreiescu', '6 zile', '10:00- terminarea lucrării (18:00-21:00)', '13 - 13.30', '2023', 'Brasov', '17 - 22 Iulie', '3800', '1200', 'https://i.imgur.com/B5dFr0h.jpg'),
(3, 'Master – stilist protezist de unghii – acreditat – Level 2', '', 'Andreea Popescu', '5 zile', '10:00- terminarea lucrării (18:00-21:00)', '13 - 13:30', '2023', 'Brasov', '24- 28 Iulie', '4000', '1000', 'https://i.imgur.com/MEsBrNq.jpg'),
(4, 'Master – stilist protezist de unghii –  Level 2', '', 'Miruna Andreiescu', '5 zile', '10:00- terminarea lucrării (18:00-21:00)', '13 - 13:30', '2023', 'Brasov', '3 - 7 August', '4200', '1200', 'https://i.imgur.com/B8RO3RZ.jpg'),
(5, 'Perfect Slim Level 2', '', 'Andreea Popescu', '2 zile', '10:00 - 20:00', '13 - 13:30', '2023', 'Brasov', '15 - 16 Iulie', '1800', '500', 'https://i.imgur.com/ZBkYKqh.jpg'),
(6, 'Perfect Slim Level 2', '', 'Miruna Andreiescu', '2 zile', '10:00 - 20:00', '13 - 13:30', '2023', 'Brasov', '15 - 16 Iulie', '2000', '500', 'https://i.imgur.com/Tq3n0Zd.jpg'),
(7, 'Curs Pedichiură Express – Level 1', '', 'Lidia Pusco', '2 zile', '10:00 - 20:00', '13 - 13:30', '2023', 'Brasov', '22 -23 Iulie', '2000 ', '500', 'https://i.imgur.com/isV21wY.jpg'),
(8, 'Curs Perfecționare Pedichiura - Level 2', '', 'Lidia Pusco', '5 zile', '10:00 - 20:00', '13 - 13:30', '2023', 'Brasov', '14 - 18 August', '5000 ', '1500', 'https://i.imgur.com/XNSoybf.jpg');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `date_courses`
--

CREATE TABLE `date_courses` (
  `id_d` int(11) NOT NULL,
  `id_city` int(11) NOT NULL,
  `date` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `date_courses`
--

INSERT INTO `date_courses` (`id_d`, `id_city`, `date`) VALUES
(1, 1, '22 - 27 Iunie'),
(2, 2, '1 - 6 Iulie'),
(3, 1, '1 - 6 August'),
(4, 4, '7 - 12 Iulie'),
(5, 3, '14 - 19 Iulie'),
(6, 5, '21 - 26 Iulie');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `delivery_methods`
--

CREATE TABLE `delivery_methods` (
  `id_delivery` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `delivery_methods`
--

INSERT INTO `delivery_methods` (`id_delivery`, `name`, `time`, `price`) VALUES
(1, 'Livrare prin curier', 'in 2 - 4 lucratoare', 15),
(2, 'Ridicare de la sediu', 'in 1 zi lucratoare', 5);

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `newsletter`
--

CREATE TABLE `newsletter` (
  `id_newsletter` int(11) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `newsletter`
--

INSERT INTO `newsletter` (`id_newsletter`, `email`) VALUES
(4, 'larisamagdas@yahoo.com'),
(8, 'larisamagdgas@yahoo.com'),
(17, 'fsdfsdf@asda.com'),
(18, 'fsdfsdf@asda.com'),
(19, 'test@yahoo.com'),
(20, 'test@yahoo.com'),
(21, 'test@yahoo.com'),
(22, 'asda@asd'),
(23, 'larisamagdas@yahoo.com'),
(24, 'larisamagdas@yahoo.com'),
(25, 'sdfsdf@asd'),
(26, 'larisamagdas@yahoo.com'),
(27, 'larisamagdas@yahoo.com');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `orders`
--

CREATE TABLE `orders` (
  `id_order` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `total_price` int(11) NOT NULL,
  `delivery_method` varchar(255) NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `shipping_address` varchar(255) NOT NULL,
  `billing_address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `orders`
--

INSERT INTO `orders` (`id_order`, `id_user`, `order_date`, `total_price`, `delivery_method`, `payment_method`, `shipping_address`, `billing_address`) VALUES
(32, 18, '2023-05-23 16:55:26', 54, 'Livrare prin curier', 'Plata ramburs', 'Str. Nicopole Nr. 46, Ap. 52, Et. 3', 'Str. Nicopole Nr. 46, Ap. 52, Et. 3'),
(33, 18, '2023-05-23 17:01:03', 54, 'Livrare prin curier', 'Plata ramburs', 'Str. Nicopole Nr. 46 Ap. 52', 'Str. Nicopole Nr. 46 Ap. 52'),
(34, 18, '2023-05-23 17:03:55', 44, 'Ridicare de la sediu', 'Plata ramburs', 'Str. Nicopole Nr. 46 Ap. 52', 'Str. Nicopole Nr. 46 Ap. 52'),
(35, 18, '2023-05-23 17:06:04', 54, 'Livrare prin curier', 'Plata ramburs', 'Str. Nicopole Nr. 46 Ap. 52', 'Str. Nicopole Nr. 46 Ap. 52'),
(36, 18, '2023-05-23 17:07:28', 44, 'Ridicare de la sediu', 'Plata ramburs', 'Str. Plevnei Nr. 16 Ap. 2 Interfon Nr. 2', 'Str. Plevnei Nr. 16 Ap. 2 Interfon Nr. 2'),
(37, 18, '2023-05-23 17:08:37', 54, 'Livrare prin curier', 'Plata ramburs', 'Str. Plevnei Nr. 16 Ap. 2 Interfon Nr. 2', 'Str. Plevnei Nr. 16 Ap. 2 Interfon Nr. 2'),
(38, 18, '2023-05-23 17:10:16', 54, 'Livrare prin curier', 'Plata ramburs', 'Str. Plevnei Nr. 16 Ap. 2 Interfon Nr. 2', 'Str. Plevnei Nr. 16 Ap. 2 Interfon Nr. 2'),
(39, 18, '2023-05-23 17:12:49', 5, 'Ridicare de la sediu', 'Plata ramburs', 'Str. Plevnei Nr. 16 Ap. 2 Interfon Nr. 2', 'Str. Plevnei Nr. 16 Ap. 2 Interfon Nr. 2'),
(40, 18, '2023-05-23 17:20:06', 137, 'Livrare prin curier', 'Plata ramburs', 'Str. Plevnei Nr. 16 Ap. 2 Interfon Nr. 2', 'Str. Plevnei Nr. 16 Ap. 2 Interfon Nr. 2'),
(41, 17, '2023-06-06 15:29:39', 132, 'Livrare prin curier', 'Plata ramburs', 'Str. Plevnei Nr. 16 Ap. 2 Interfon Nr. 2', 'Str. Plevnei Nr. 16 Ap. 2 Interfon Nr. 2'),
(42, 17, '2023-06-06 21:58:05', 1083, 'Ridicare de la sediu', 'Plata ramburs', 'Str. Plevnei Nr. 16 Ap. 2 Interfon Nr. 2', 'Str. Plevnei Nr. 16 Ap. 2 Interfon Nr. 2'),
(51, 18, '2023-07-04 19:46:03', 0, '', '', '', ''),
(52, 18, '2023-07-04 19:48:04', 1204, 'Livrare prin curier', 'Plata ramburs', 'Str. Nicopole Nr. 46, Ap. 52, Et. 3', 'Str. Nicopole Nr. 46, Ap. 52, Et. 3'),
(53, 18, '2023-07-05 11:59:01', 4893, 'Livrare prin curier', 'Plata ramburs', 'Str. Nicopole Nr. 46, Ap. 52, Et. 3', 'Str. Nicopole Nr. 46, Ap. 52, Et. 3'),
(54, 18, '2023-07-05 16:05:17', 150, 'Livrare prin curier', 'Plata ramburs', 'Str. Nicopole Nr. 46, Ap. 52, Et. 3', 'Str. Nicopole Nr. 46, Ap. 52, Et. 3');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `orders_products`
--

CREATE TABLE `orders_products` (
  `id_order` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price_total` varchar(255) NOT NULL,
  `course_year` int(11) NOT NULL,
  `course_city` int(11) NOT NULL,
  `course_date` varchar(255) NOT NULL,
  `teaches_classes` varchar(255) NOT NULL,
  `course_payment` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `orders_products`
--

INSERT INTO `orders_products` (`id_order`, `id_product`, `type`, `quantity`, `price_total`, `course_year`, `course_city`, `course_date`, `teaches_classes`, `course_payment`) VALUES
(0, 5, '', 1, '', 0, 0, '', '', ''),
(0, 1, '', 1, '', 2, 4, '7 - 12 Iulie', 'da', 'avans'),
(0, 2, '', 4, '', 0, 0, '', '', ''),
(17, 1, '', 1, '', 0, 0, '', '', ''),
(17, 2, '', 1, '', 0, 0, '', '', ''),
(17, 3, '', 1, '', 0, 0, '', '', ''),
(18, 1, '', 1, '', 0, 0, '', '', ''),
(18, 2, '', 1, '', 0, 0, '', '', ''),
(18, 3, '', 1, '', 0, 0, '', '', ''),
(19, 1, '', 1, '', 0, 0, '', '', ''),
(19, 4, '', 1, '', 0, 0, '', '', ''),
(20, 2, 'product', 1, '', 0, 0, '', '', ''),
(21, 2, 'product', 1, '', 0, 0, '', '', ''),
(22, 1, 'product', 1, '', 0, 0, '', '', ''),
(22, 2, 'product', 1, '', 0, 0, '', '', ''),
(27, 1, 'product', 10, '', 0, 0, '', '', ''),
(27, 2, 'product', 1, '', 0, 0, '', '', ''),
(27, 3, 'product', 1, '', 0, 0, '', '', ''),
(27, 1, 'course', 1, '', 2, 2, '1 - 6 Iulie', 'da', 'avans'),
(28, 1, 'product', 10, '', 0, 0, '', '', ''),
(28, 20, 'product', 1, '', 0, 0, '', '', ''),
(28, 2, 'product', 2, '', 0, 0, '', '', ''),
(28, 3, 'product', 1, '', 0, 0, '', '', ''),
(28, 4, 'product', 1, '', 0, 0, '', '', ''),
(28, 5, 'product', 1, '', 0, 0, '', '', ''),
(31, 3, 'product', 3, '', 0, 0, '', '', ''),
(31, 4, 'product', 1, '', 0, 0, '', '', ''),
(32, 1, 'product', 1, '', 0, 0, '', '', ''),
(33, 1, 'product', 1, '', 0, 0, '', '', ''),
(34, 1, 'product', 1, '', 0, 0, '', '', ''),
(35, 1, 'product', 1, '', 0, 0, '', '', ''),
(36, 1, 'product', 1, '', 0, 0, '', '', ''),
(37, 1, 'product', 1, '', 0, 0, '', '', ''),
(38, 1, 'product', 1, '', 0, 0, '', '', ''),
(39, 22, 'product', 1, '', 0, 0, '', '', ''),
(40, 1, 'product', 1, '', 0, 0, '', '', ''),
(40, 20, 'product', 1, '', 0, 0, '', '', ''),
(40, 12, 'product', 1, '', 0, 0, '', '', ''),
(41, 3, 'product', 3, '', 0, 0, '', '', ''),
(42, 2, 'product', 1, '', 0, 0, '', '', ''),
(42, 4, 'product', 1, '', 0, 0, '', '', ''),
(42, 1, 'course', 1, '', 2, 2, '1 - 6 Iulie', 'da', 'avans'),
(51, 100, 'product', 1, '', 0, 0, '', '', ''),
(52, 100, 'product', 1, '', 0, 0, '', '', ''),
(52, 104, 'product', 1, '', 0, 0, '', '', ''),
(52, 103, 'product', 1, '', 0, 0, '', '', ''),
(52, 1, 'course', 1, '', 2, 2, '1 - 6 Iulie', 'nu', 'avans'),
(53, 1, 'course', 1, '', 2, 2, '1 - 6 Iulie', 'da', 'avans'),
(53, 33, 'product', 1, '', 0, 0, '', '', ''),
(53, 32, 'product', 1, '', 0, 0, '', '', ''),
(53, 1, 'product', 18, '', 0, 0, '', '', ''),
(53, 1, 'course', 1, '', 2, 2, '1 - 6 Iulie', 'da', 'integral'),
(54, 100, 'product', 1, '', 0, 0, '', '', '');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(55) NOT NULL,
  `id_brand` int(11) NOT NULL,
  `weight` varchar(20) NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(155) NOT NULL,
  `id_category` int(11) NOT NULL,
  `id_subcategory` int(11) NOT NULL,
  `description` longtext NOT NULL,
  `way_of_ussage` longtext NOT NULL,
  `add_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `stoc` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `products`
--

INSERT INTO `products` (`id`, `name`, `id_brand`, `weight`, `price`, `image`, `id_category`, `id_subcategory`, `description`, `way_of_ussage`, `add_date`, `stoc`) VALUES
(1, 'Oja semi Cupio To Go! Spring Collection - Dahlia', 1, '15', 39, 'https://i.imgur.com/6ZJJVnX.jpg', 1, 3, 'Special creata pentru a satisface nevoile tuturor femeilor, gama de oje semipermanente Cupio To go! include culori variate cu texturi diferite. Intre cele peste 400 de nuante disponibile vei gasi atat culori mate, cat si culori cu particule de sidef sau granule cu glitter. In functie de personalitatea si preferintele tale, din gama Cupio To go! poti alege oje semipermanente in culori pastel, clasice, neon si multe alte nuante vibrante care respecta cele mai noi trenduri in domeniul manichiurii.', '<span style=\"color:red;\">1. Se pregateste unghia naturala dupa metoda standard (se da forma unghiilor, se imping si se indeparteaza cuticulele, apoi se indeparteaza luciul unghiei naturale cu o pila buffer.)\r\n2. Se aplica un strat de Base Lac Cupio To Go! care se usuca in 30 de secunde in lampa LED sau in 120 de secunde in lampa UV.\r\n3. Se aplica alternativ 2 straturi de culoare (cel de-al doilea strat se poate aplica dupa ce primul a fost uscat minim 30 de secunde), apoi unghia se tine 60 de secunde la lampa LED sau 120 -180 de secunde la lampa UV.\r\n4. Se sigileaza cu Top Coat Gel Lac si se usuca 60-90 de secunde in lampa LED sau 3-4 minute in lampa UV.\r\n5. Se sterge stratul lipicios cu Cleaner.</span>', '2023-06-03 12:39:10', 'In stoc'),
(2, 'Oja semi Cupio To Go! Spring Collection - Bee Orchid', 1, '15', 39, 'https://i.imgur.com/oYfGAQM.jpg', 1, 3, '', '', '2023-06-03 12:39:14', 'In stoc'),
(3, 'Oja semi Ruby Collection Flame Scarlet', 1, '15', 39, 'https://i.imgur.com/GDAPyam.jpg', 1, 3, '', '', '2023-06-03 12:39:16', 'In stoc'),
(4, 'Oja semipermanenta Ce vor femeile - Fa-ti de cap', 1, '15', 39, 'https://i.imgur.com/hZsvtmi.jpg', 1, 3, '', '', '2023-06-03 12:39:18', 'In stoc'),
(5, 'Oja semi Ce vor femeile - Ce se poarta', 1, '15', 39, 'https://i.imgur.com/YLRpTTE.jpg', 1, 3, '', '', '2023-06-03 12:39:21', 'In stoc'),
(6, 'Oja semi Cupio To Go! Marina', 1, '15', 39, 'https://i.imgur.com/NEQRySo.jpg', 1, 3, '', '', '2023-06-03 12:39:33', 'In stoc'),
(8, 'Oja semi Pixie Collection - Aurora', 1, '10', 53, 'https://i.imgur.com/bXrSVJ4.jpg', 1, 3, '', '', '2023-06-03 12:39:36', 'In stoc'),
(9, 'Oja semipermanenta Cupio To Go! Gold Collection Night ', 1, '15', 39, 'https://i.imgur.com/6VKJA79.jpg', 1, 3, '', '', '2023-06-03 12:39:38', 'In stoc'),
(10, 'Rubber Base Sheer Collection - Silk Magnolia', 1, '15', 49, 'https://i.imgur.com/Vq9Lfj1.jpg', 1, 1, '', '', '2023-06-03 12:39:41', 'In stoc'),
(11, 'Rubber base Urban Collection - District ', 1, '15', 49, 'https://i.imgur.com/sFuApLk.jpg', 1, 1, '', '', '2023-06-03 12:39:42', 'In stoc'),
(12, 'Rubber base French Collection - Skin', 1, '15', 49, 'https://i.imgur.com/nYssaNy.jpg', 1, 1, '', '', '2023-06-03 12:39:44', 'In stoc'),
(20, 'Cupio RevoGel Classic French', 1, '30', 64, 'https://i.imgur.com/jyz6w1m.jpg', 2, 0, '', '', '2023-06-03 13:11:58', 'In stoc'),
(21, 'Cupio RevoGel Ivory Sparks', 1, '15', 34, 'https://i.imgur.com/sV8H8ZM.jpg', 2, 0, '', '', '2023-06-03 13:11:45', 'In stoc'),
(22, 'Yas Beauty Lab - Rubber Base Clear', 2, '15', 49, 'https://i.imgur.com/YytPAeO.jpg', 1, 1, '', '', '2023-06-03 12:39:53', 'In stoc'),
(23, 'Yas Beauty Lab - No wipe Top Coat', 2, '15', 45, 'https://i.imgur.com/PowI1lk.jpg', 1, 2, '', '', '2023-06-03 12:39:56', 'In stoc'),
(24, 'Yas Beauty Lab - Oja semi Flash Cat Eye 5', 2, '10', 34, 'https://i.imgur.com/Tv1hH7Y.jpg', 1, 3, '', '', '2023-06-03 12:39:58', 'In stoc'),
(25, 'Yas Beauty Lab - Oja semi Flash Cat Eye 1', 2, '10', 34, 'https://i.imgur.com/NQdJfPb.jpg', 1, 3, '', '', '2023-06-03 12:40:00', 'In stoc'),
(26, 'Yas Beauty Lab - Oja semi Flash Cat Eye 6', 2, '10', 34, 'https://i.imgur.com/W9oHW1X.jpg', 1, 3, '', '', '2023-06-03 12:40:02', 'In stoc'),
(27, 'Yas Beauty Lab - Oja semi Black Color', 2, '10', 29, 'https://i.imgur.com/ItKxOyG.jpg', 1, 3, '', '', '2023-06-03 12:40:05', 'In stoc'),
(28, 'Crystal Nails - Oja semi 3STEP CRYSTALAC – 3S164\r\n', 3, '8', 49, 'https://i.imgur.com/C95PK2T.jpg', 1, 3, '', '', '2023-06-03 12:40:10', 'In stoc'),
(29, 'Crystal Nails - ONE STEP CRYSTALAC 6\r\n', 3, '8', 59, 'https://i.imgur.com/thmnJPU.jpg', 1, 3, '', '', '2023-06-03 12:40:13', 'In stoc'),
(30, 'Crystal Nails - ONE STEP CRYSTALAC 13\r\n', 3, '8', 59, 'https://i.imgur.com/zc1kIwJ.jpg', 1, 3, '', '', '2023-06-03 12:40:22', 'In stoc'),
(31, 'Crystal Nails - ONE STEP CRYSTALAC – 40\r\n', 3, '8', 59, 'https://i.imgur.com/sgEN3yf.jpg', 1, 3, '', '', '2023-06-03 12:40:24', 'In stoc'),
(32, 'Crystal Nails - ONE STEP CRYSTALAC 62\r\n', 3, '8', 59, 'https://i.imgur.com/tiNTJJV.jpg', 1, 3, '', '', '2023-06-03 12:40:26', 'In stoc'),
(33, 'Crystal Nails - ONE STEP CRYSTALAC 74\r\n', 3, '8', 59, 'https://i.imgur.com/nILsSA7.jpg', 1, 3, '', '', '2023-06-03 12:43:04', 'In stoc'),
(34, 'Crystal Nails - COOL TOP GEL ORIGINAL\r\n', 3, '15', 70, 'https://i.imgur.com/kaItyrE.jpg', 1, 2, '', '', '2023-06-03 13:03:09', 'In stoc'),
(35, 'Cupio RevoGel Crystal Clear', 1, '30', 64, 'https://i.imgur.com/2mIM47k.jpg', 2, 5, '', '', '2023-06-03 13:09:34', 'In stoc'),
(36, 'Cupio RevoGel Snow White', 1, '15', 34, 'https://i.imgur.com/LadMOf7.jpg', 2, 5, '', '', '2023-06-03 14:55:38', 'In stoc'),
(37, 'Cupio RevoGel Nudissimo', 1, '30', 64, 'https://i.imgur.com/vS9NmIP.jpg', 2, 5, '', '', '2023-06-03 14:57:30', 'In stoc'),
(38, 'Supreme Sculpting Cover Gel Rose', 1, '50', 159, 'https://i.imgur.com/Jd05eVP.jpg', 2, 4, '', '', '2023-06-03 14:59:41', 'In stoc'),
(39, 'Supreme Sculpting Cover Gel Nude', 1, '50', 159, 'https://i.imgur.com/WX8gVNj.jpg', 2, 4, '', '', '2023-06-03 15:01:30', 'In stoc'),
(40, 'Gel UV Flexi Slim Pink Peony', 1, '30', 119, 'https://i.imgur.com/OO91eLg.jpg', 2, 4, '', '', '2023-06-03 15:02:54', 'In stoc'),
(41, 'Neo Glass Builder Gel ', 1, '50', 159, 'https://i.imgur.com/hPv1hhw.jpg', 2, 4, '', '', '2023-06-03 15:04:11', 'In stoc'),
(42, 'NEO Builder Gel Cover Blossom', 1, '50', 159, 'https://i.imgur.com/w36sWX8.jpg', 2, 4, '', '', '2023-06-03 15:08:26', 'In stoc'),
(43, 'Gel color Cupio Dark Turquoise', 1, '5', 24, 'https://i.imgur.com/3ZnyqUF.jpg', 2, 6, '', '', '2023-06-03 15:10:29', 'In stoc'),
(44, 'Gel color Cupio Water Lily\r\n', 1, '5', 24, 'https://i.imgur.com/xjgrdAS.jpg', 2, 6, '', '', '2023-06-03 15:11:26', 'In stoc'),
(45, 'Glitter gel Superstar Cupio Glitz\r\n', 1, '5', 29, 'https://i.imgur.com/zMBzI27.jpg', 2, 6, '', '', '2023-06-03 15:13:46', 'In stoc'),
(46, 'Glitter gel Cupio Splendor', 1, '5', 29, 'https://i.imgur.com/y3JxByF.jpg', 2, 6, '', '', '2023-06-03 15:24:52', 'In stoc'),
(47, 'Gel Color One Layer Day Dream\r\n', 1, '5', 34, 'https://i.imgur.com/cTcNSNA.jpg', 2, 6, '', '', '2023-06-03 15:15:53', 'In stoc'),
(48, 'Gel Color One Layer Nectar', 1, '5', 34, 'https://i.imgur.com/dBGt4AN.jpg', 2, 6, '', '', '2023-06-03 15:17:26', 'In stoc'),
(49, 'Gel Color One Layer Cyclamen\r\n', 1, '5', 34, 'https://i.imgur.com/oDF68JK.jpg', 2, 6, '', '', '2023-06-03 15:18:38', 'In stoc'),
(50, 'Gel Color Cupio Rosa', 1, '5', 34, 'https://i.imgur.com/0qDZgjZ.jpg', 2, 6, '', '', '2023-06-03 15:20:15', 'In stoc'),
(51, 'Gel Color One Layer Wine Stain\r\n', 1, '5', 34, 'https://i.imgur.com/nqv9AWC.jpg', 2, 6, '', '', '2023-06-03 15:21:34', 'In stoc'),
(52, 'Gel Color One Layer April Snow', 1, '5', 34, 'https://i.imgur.com/yzaGamZ.jpg', 2, 6, '', '', '2023-06-03 15:24:20', 'In stoc'),
(53, 'XTREME SUPERIOR BUILDER GEL – COVER PINK', 3, '50', 209, 'https://i.imgur.com/jXih0Ys.jpg', 2, 4, '', '', '2023-06-03 15:27:37', 'In stoc'),
(54, 'XTREME PUDDING+ BUILDER GEL – COVER PINK', 3, '50', 209, 'https://i.imgur.com/osPlMUt.jpg', 2, 4, '', '', '2023-06-03 15:29:53', 'In stoc'),
(55, 'XTREME SUPERIOR BUILDER GEL – NATURAL PINK', 3, '50', 209, 'https://i.imgur.com/BD5GZwl.jpg', 2, 4, '', '', '2023-06-03 15:31:05', 'In stoc'),
(56, 'BABYBOOMER BUILDER CRYSTAL WHITE GEL', 3, '50', 209, 'https://i.imgur.com/1r30VON.jpg', 2, 4, '', '', '2023-06-03 15:32:37', 'In stoc'),
(57, 'XTREME PUDDING+ BUILDER GEL – CLEAR', 3, '50', 209, 'https://i.imgur.com/rsRDboh.jpg', 2, 4, '', '', '2023-06-03 15:34:17', 'In stoc'),
(58, 'Cupio Soak Off Remover', 1, '120', 9, 'https://i.imgur.com/o0Dlc7e.jpg', 3, 7, '', '', '2023-06-03 15:50:09', 'In stoc'),
(59, 'Crystal Nails EASY REMOVER – MUȘEȚEL', 3, '1000', 49, 'https://i.imgur.com/3B5miyq.jpg', 3, 7, '', '', '2023-06-03 15:52:19', 'In stoc'),
(60, 'Cupio Solutie de pregatire - Primer cu acid', 1, '10', 25, 'https://i.imgur.com/g4u7CjI.jpg', 6, 8, '', '', '2023-06-03 16:27:42', 'In stoc'),
(61, 'Cupio Solutie pregatire - Nail Prep', 1, '10', 21, 'https://i.imgur.com/24Ce5lU.jpg', 3, 8, '', '', '2023-06-03 16:29:24', 'In stoc'),
(62, 'Cupio Solutie de pregatire - Nail Fresh', 1, '10', 24, 'https://i.imgur.com/Ill88Kx.jpg', 3, 8, '', '', '2023-06-03 16:30:39', 'In stoc'),
(63, 'Cupio Solutie de pregatire - Nail Bonder', 1, '15', 25, 'https://i.imgur.com/XTSmTE5.jpg', 3, 8, '', '', '2023-06-03 16:32:58', 'In stoc'),
(64, 'Yas Beauty Lab Solutie de pregatire - Nail Prep', 2, '12', 19, 'https://i.imgur.com/LtBA8Wu.jpg', 3, 8, '', '', '2023-06-03 16:35:36', 'In stoc'),
(65, 'Cleaner parfumat Cupio - Shine', 1, '100', 18, 'https://i.imgur.com/GIIxUHc.jpg', 3, 9, '', '', '2023-06-03 16:54:14', 'In stoc'),
(66, 'Cleaner parfumat Cupio - Apple', 1, '100', 18, 'https://i.imgur.com/Qn3kUom.jpg', 3, 9, '', '', '2023-06-03 16:47:48', 'In stoc'),
(67, 'Cleaner parfumat Cupio - Lemon ', 1, '100', 18, 'https://i.imgur.com/CktHZhB.jpg', 3, 9, '', '', '2023-06-03 16:49:35', 'In stoc'),
(68, 'Cleaner parfumat Cupio - Straw', 1, '100', 18, 'https://i.imgur.com/8hGHc78.jpg', 3, 9, '', '', '2023-06-03 16:54:30', 'In stoc'),
(69, 'Cupio Cleaner', 1, '120', 11, 'https://i.imgur.com/BKN0xys.jpg', 3, 9, '', '', '2023-06-03 16:53:13', 'In stoc'),
(70, 'Cupio Ulei cuticule cu pipeta Banane ', 1, '15', 9, 'https://i.imgur.com/rXfBSlU.jpg', 3, 10, '', '', '2023-06-03 16:56:11', 'In stoc'),
(71, 'Cupio Ulei cuticule cu pipeta Melon', 1, '15', 9, 'https://i.imgur.com/P8ABiRO.jpg', 3, 10, '', '', '2023-06-03 16:57:11', 'In stoc'),
(72, 'Cupio Ulei cuticule cu pipeta Kiwi', 1, '15', 9, 'https://i.imgur.com/dbyJrkO.jpg', 3, 10, '', '', '2023-06-03 16:58:20', 'In stoc'),
(73, 'Cupio Ulei cuticule cu pipeta Bubble Gum', 1, '15', 9, 'https://i.imgur.com/qWpZO7o.jpg', 3, 10, '', '', '2023-06-03 17:00:58', 'In stoc'),
(74, 'Cupio Ulei cuticule cu pipeta Spring Garden', 1, '15', 9, 'https://i.imgur.com/xZkvZta.jpg', 3, 10, '', '', '2023-06-03 17:02:16', 'In stoc'),
(75, 'Forfecuta profesionala de cuticule pentru stangaci', 1, '70', 82, 'https://i.imgur.com/bzKmwCR.jpg', 4, 11, '', '', '2023-06-03 17:07:14', 'In stoc'),
(76, 'Forfecuta cuticule cu varf ascutit Edge Collection E01', 1, '70', 69, 'https://i.imgur.com/FuAxLon.jpg', 4, 11, '', '', '2023-06-03 17:05:35', 'In stoc'),
(77, 'Forfecuta de cuticule Cupio PRO Absolute', 1, '70', 68, 'https://i.imgur.com/5odxlIU.jpg', 4, 11, '', '', '2023-06-03 17:06:47', 'In stoc'),
(78, 'Forfecuta profesionala de cuticule Cupio PRO19', 1, '70', 68, 'https://i.imgur.com/Qh9eCPy.jpg', 4, 11, '', '', '2023-06-03 17:08:00', 'In stoc'),
(79, 'Forfecuta de unghii pentru copii Cupio Baby Care', 1, '60', 69, 'https://i.imgur.com/nCan6e4.jpg', 4, 11, '', '', '2023-06-03 17:09:30', 'In stoc'),
(83, 'Instrument de cuticule Nova Collection N21', 1, '100', 29, 'https://i.imgur.com/ylRgdnP.jpg', 4, 12, '', '', '2023-06-03 17:11:39', 'In stoc'),
(84, 'Instrument profesional manichiura Cupio PRO50', 1, '110', 43, 'https://i.imgur.com/h6XFDEi.jpg', 4, 12, '', '', '2023-06-03 17:12:54', 'In stoc'),
(85, 'Instrument profesional pentru manichiura Cup19', 1, '100', 34, 'https://i.imgur.com/UJeSfUg.jpg', 4, 12, '', '', '2023-06-03 17:14:17', 'In stoc'),
(86, 'Instrument profesional manichiura Cupio PRO02', 1, '100', 49, 'https://i.imgur.com/xfXwNgF.jpg', 4, 12, '', '', '2023-06-03 17:15:18', 'In stoc'),
(87, 'Instrument profesional pentru manichiura Cup18', 1, '100', 41, 'https://i.imgur.com/Db1LELr.jpg', 4, 12, '', '', '2023-06-03 17:16:12', 'In stoc'),
(88, 'Pensula manichiura gel one stroke Premium Cupio Nr.1', 1, '40', 55, 'https://i.imgur.com/tppwQQ2.jpg', 4, 13, '', '', '2023-06-03 17:17:45', 'In stoc'),
(89, 'Pensula manichiura gel Oval Premium Cupio Nr 1', 1, '40', 79, 'https://i.imgur.com/eM53RLd.jpg', 4, 13, '', '', '2023-06-03 17:18:39', 'In stoc'),
(90, 'Bit carbid cu duritate fina F0513-F', 1, '20', 60, 'https://i.imgur.com/PqVKQPz.jpg', 4, 14, '', '', '2023-06-03 17:19:55', 'In stoc'),
(91, 'Bit carbid pentru corectii under refill', 1, '20', 65, 'https://i.imgur.com/8mevi4z.jpg', 4, 14, '', '', '2023-06-03 17:21:11', 'In stoc'),
(92, 'Bit diamant Cupio Bullet - duritate fina', 1, '30', 39, 'https://i.imgur.com/4YuvPIn.jpg', 4, 14, '', '', '2023-06-03 17:22:16', 'In stoc'),
(93, 'Pila Profesionala pentru unghii Long-Lasting Cupio', 1, '30', 7, 'https://i.imgur.com/22yZhlr.jpg', 4, 15, '', '', '2023-06-03 17:23:50', 'In stoc'),
(94, 'Pila profesionala lavabila pentru unghii Super Lasting', 1, '35', 11, 'https://i.imgur.com/RZvPpqS.jpg', 4, 15, '', '', '2023-06-03 17:25:12', 'In stoc'),
(95, 'Tipsuri reutilizabile pentru extensii Russian Almond', 1, '150', 48, 'https://i.imgur.com/K3gIRa6.jpg', 4, 16, '', '', '2023-06-03 17:27:11', 'In stoc'),
(96, 'Lampa led unghii Cupio Rocket 90W', 1, '500', 499, 'https://i.imgur.com/oD5dFFp.jpg', 5, 17, '', '', '2023-06-03 17:28:40', 'In stoc'),
(97, 'Freza electrica Cupio Turbo Bee', 1, '400', 879, 'https://i.imgur.com/oKBmzPr.jpg', 5, 18, '', '', '2023-06-03 17:31:26', 'In stoc'),
(99, 'Aspirator de praf 80W Cupio Dusty Silver', 1, '500', 309, 'https://i.imgur.com/aTyjKQU.jpg', 5, 19, '', '', '2023-06-03 17:34:16', 'In stoc'),
(100, 'Sterilizator cu quartz Glam Cupio', 1, '400', 150, 'https://i.imgur.com/5NY6Z1Z.jpg', 5, 20, '', '', '2023-06-04 19:50:15', 'In stoc'),
(101, 'Folie de transfer set 10 African Print', 1, '60', 15, 'https://i.imgur.com/ogcTCwE.jpg', 7, 0, '', '', '2023-06-03 17:37:33', 'In stoc'),
(102, 'Folie de transfer set 10 Black Lace', 1, '60', 15, 'https://i.imgur.com/OYMiLDy.jpg', 7, 0, '', '', '2023-06-03 17:38:42', 'In stoc'),
(103, 'Servetele unghii Cupio 325 buc', 1, '100', 14, 'https://i.imgur.com/cWxD3OO.jpg', 6, 24, '', '', '2023-06-03 17:42:41', 'In stoc'),
(104, 'Servetele curatare unghii Cupio ', 1, '100', 25, 'https://i.imgur.com/rLNRwMj.jpg', 6, 24, '', '', '2023-06-03 17:44:51', 'In stoc');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `products_brand`
--

CREATE TABLE `products_brand` (
  `id_brand` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `products_brand`
--

INSERT INTO `products_brand` (`id_brand`, `name`) VALUES
(1, 'Cupio'),
(2, 'Yas'),
(3, 'Crystal Nails');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `products_category`
--

CREATE TABLE `products_category` (
  `id_category` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `products_category`
--

INSERT INTO `products_category` (`id_category`, `name`) VALUES
(1, 'Oje semi'),
(2, 'Gel UV'),
(3, 'Solutii'),
(4, 'Ustensile'),
(5, 'Aparatura'),
(6, 'Consumabile'),
(7, 'Nail Art');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `products_subcategory`
--

CREATE TABLE `products_subcategory` (
  `id_subcategory` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `id_category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `products_subcategory`
--

INSERT INTO `products_subcategory` (`id_subcategory`, `name`, `id_category`) VALUES
(1, 'Baze si baze rubber', 1),
(2, 'Topuri', 1),
(3, 'Oje semi colorate', 1),
(4, 'Geluri de constructie', 2),
(5, 'Polygeluri', 2),
(6, 'Geluri colorate', 2),
(7, 'Remover', 3),
(8, 'Primer', 3),
(9, 'Cleaner', 3),
(10, 'Ulei cuticule', 3),
(11, 'Forfecute', 4),
(12, 'Pushere', 4),
(13, 'Pensule', 4),
(14, 'Capete de freza', 4),
(15, 'Pile', 4),
(16, 'Sabloane si tipsuri', 4),
(17, 'Lampi led', 5),
(18, 'Freze electrice', 5),
(19, 'Aspiratoare', 5),
(20, 'Aparate curatat instrumentar', 5),
(21, 'Dezinfectati', 6),
(22, 'Manusi si masti', 6),
(23, 'Pungi de sterilizare', 6),
(24, 'Servetele', 6);

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `register`
--

CREATE TABLE `register` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `fname` text NOT NULL,
  `birthday` date NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `register`
--

INSERT INTO `register` (`id`, `name`, `fname`, `birthday`, `phone`, `address`, `email`, `password`, `created`) VALUES
(17, 'Magdas', 'Larisa', '2023-12-01', '7462677212', 'Str. Labis Nr. 333 Brasov', 'magdaslarisa@yahoo.com', '12345678Aa', '2023-05-24 18:34:25'),
(18, 'Magdas', 'Larisa', '2023-05-16', '1245875421', 'Str. Nicopole Nr. 46 Ap. 52', 'larisamagdas@yahoo.com', '123', '2023-07-05 11:53:12'),
(19, 'test', 'test', '2023-05-17', '', '', 'larisamagdas2@yahoo.com', '12341234Aa', '2023-05-24 19:05:57'),
(20, 'test', 'test', '2023-06-02', '', '', 'test@asd.om', '12341234Aa', '2023-05-27 12:58:38');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `reviews`
--

CREATE TABLE `reviews` (
  `id_review` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `review` varchar(255) NOT NULL,
  `star` int(11) NOT NULL,
  `date_r` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_product` int(11) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `reviews`
--

INSERT INTO `reviews` (`id_review`, `id_user`, `user_name`, `review`, `star`, `date_r`, `id_product`, `type`) VALUES
(39, 17, 'Claudia', 'Recomand', 4, '2023-05-19 12:30:03', 1, 'product'),
(50, 17, 'Larisa', 'Foarte bun cursul', 5, '2023-05-19 22:17:39', 1, 'course'),
(59, 18, 'Marius', 'Un produs foarte bun', 5, '2023-05-26 20:57:09', 1, 'product'),
(60, 17, 'Claudia', 'Destul de bun!', 4, '2023-06-07 07:28:38', 2, 'course'),
(63, 18, 'Larisa', 'Imi place foarte mult', 5, '2023-07-05 11:29:19', 1, 'product'),
(64, 18, 'Larisa', 'Imi place foarte mult', 5, '2023-07-05 11:43:13', 1, 'product');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `service`
--

CREATE TABLE `service` (
  `id_service` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `duration` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `service`
--

INSERT INTO `service` (`id_service`, `id_category`, `service_name`, `duration`, `price`) VALUES
(1, 1, 'Constructie gel S', '2h', '180'),
(2, 1, 'Constructie gel M', '2h', '200'),
(3, 1, 'Constructie gel L', '2h', '220'),
(4, 1, 'Intretinere gel S', '2h', '160'),
(5, 1, 'Intretinere gel M', '2h', '180'),
(6, 1, 'Intreginere gel L', '2h', '200'),
(7, 2, 'Semi cu apex', '2h', '140'),
(8, 2, 'Intretinere semi cu apex', '2h', '150'),
(9, 1, 'Constructie gel S', '2h', '200'),
(10, 1, 'Constructie gel M', '2h', '220'),
(11, 1, 'Constructie gel L', '2h', '250'),
(12, 1, 'Intretinere gel S', '2h', '180'),
(13, 1, 'Intretinere gel M', '2h', '200'),
(14, 1, 'Intretinere gel L', '2h', '230');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `services_category`
--

CREATE TABLE `services_category` (
  `id_category` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `services_category`
--

INSERT INTO `services_category` (`id_category`, `category_name`) VALUES
(1, 'Unghii gel'),
(2, 'Unghii semi');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `tehnicians`
--

CREATE TABLE `tehnicians` (
  `id_tehnician` int(11) NOT NULL,
  `img_1` varchar(255) NOT NULL,
  `img_2` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `describe_1` text NOT NULL,
  `describe_2` text NOT NULL,
  `describe_3` text NOT NULL,
  `price_range` int(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `tehnicians`
--

INSERT INTO `tehnicians` (`id_tehnician`, `img_1`, `img_2`, `name`, `describe_1`, `describe_2`, `describe_3`, `price_range`, `address`, `city`, `phone`) VALUES
(1, 'https://i.imgur.com/pvyTr0H.jpg', 'https://i.imgur.com/yYBfOgE.jpeg', 'Ana Miculescu', 'Peste 5 ani experienta', '100+ cursuri la activ', 'Preda si cursuri', 4, 'Strada Mihai Viteazu 22', 'Brasov', '0746267721'),
(3, 'https://i.imgur.com/HzMfjil.jpg', 'https://i.imgur.com/eiHddVz.png', 'Adela Matache', 'Peste 9 ani experienta', '150+ cursuri la activ', 'Preda cursuri de peste 3 ani', 5, 'Strada Basarab 41 ', 'Brasov', '0773901026'),
(4, 'https://i.imgur.com/QixuQdN.jpg', 'https://i.imgur.com/mmHz8PC.jpg', 'Mara Tite', 'Peste 3 ani experienta', '50+ cursuri la activ', 'Timp scurt de lucru', 3, 'Strada Narciselor 23', 'Iasi', '0742617232'),
(7, 'https://i.imgur.com/9r5xM3W.jpg', 'https://i.imgur.com/MYgZBx7.jpg', 'Andreea Marmar', 'Peste 6 ani experienta', 'Experta la lungimi mari', 'Preda cursuri de peste 5 ani', 5, 'Strada Iorga 11', 'Bucuresti', '0747286632'),
(8, 'https://i.imgur.com/C7zBlzs.jpg', 'https://i.imgur.com/bUszmov.png', 'Alina Matache', 'Peste 2 ani experienta', 'Peste 100 de nuante de oja', 'Timp scurt de lucru', 2, 'Strada Lunga 34', 'Arad', '0753425521');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `tehnician_details`
--

CREATE TABLE `tehnician_details` (
  `id_tehnician` int(11) NOT NULL,
  `monday` varchar(255) NOT NULL,
  `tuesday` varchar(255) NOT NULL,
  `wednesday` varchar(255) NOT NULL,
  `thursday` varchar(255) NOT NULL,
  `friday` varchar(255) NOT NULL,
  `saturday` varchar(255) NOT NULL,
  `sunday` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `tehnician_details`
--

INSERT INTO `tehnician_details` (`id_tehnician`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `sunday`) VALUES
(1, '10:00 - 19:00', '10:00 - 19:00', '10:00 - 19:00', '10:00 - 19:00', '10:00 - 19:00', '10:00 - 15:00', 'Inchis'),
(3, '10:00 - 19:00', '10:00 - 19:00', '10:00 - 19:00', '10:00 - 19:00', '10:00 - 19:00', 'Inchis', 'Inchis'),
(4, '10:00 - 20:00', '10:00 - 20:00', '10:00 - 20:00', '10:00 - 20:00', '10:00 - 20:00', '10:00 - 20:00', 'Inchis');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `tehnician_services`
--

CREATE TABLE `tehnician_services` (
  `id_tehnician` int(11) NOT NULL,
  `id_service` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `tehnician_services`
--

INSERT INTO `tehnician_services` (`id_tehnician`, `id_service`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(3, 9),
(3, 10),
(3, 11),
(3, 12),
(3, 13),
(3, 14);

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `tehnician_services_category`
--

CREATE TABLE `tehnician_services_category` (
  `id_tehnician` int(11) NOT NULL,
  `id_service` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `vouchers`
--

CREATE TABLE `vouchers` (
  `id_voucher` int(11) NOT NULL,
  `cod_voucher` varchar(255) NOT NULL,
  `procent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `vouchers`
--

INSERT INTO `vouchers` (`id_voucher`, `cod_voucher`, `procent`) VALUES
(1, 'test', 10);

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `wishlist`
--

CREATE TABLE `wishlist` (
  `id_wishlist` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `product_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `wishlist`
--

INSERT INTO `wishlist` (`id_wishlist`, `id_product`, `id_user`, `product_type`) VALUES
(243, 6, 18, 'product'),
(244, 8, 18, 'product'),
(245, 9, 18, 'product'),
(246, 10, 18, 'product'),
(247, 11, 18, 'product'),
(266, 4, 18, 'product'),
(270, 2, 18, 'course'),
(272, 104, 17, 'product'),
(273, 3, 17, 'product'),
(274, 6, 17, 'product'),
(275, 2, 17, 'product'),
(276, 23, 17, 'product'),
(277, 1, 17, 'course'),
(288, 34, 18, 'product'),
(289, 30, 18, 'product'),
(290, 29, 18, 'product'),
(291, 12, 18, 'product'),
(293, 33, 18, 'product'),
(296, 2, 18, 'product'),
(317, 1, 18, 'course');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `year_courses`
--

CREATE TABLE `year_courses` (
  `id_y` int(11) NOT NULL,
  `id_course` int(11) NOT NULL,
  `year` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `year_courses`
--

INSERT INTO `year_courses` (`id_y`, `id_course`, `year`) VALUES
(1, 7, '2023'),
(2, 1, '2023'),
(3, 1, '2024'),
(4, 2, '2023'),
(5, 2, '2024'),
(6, 3, '2023'),
(7, 4, '2023'),
(8, 5, '2023'),
(9, 6, '2023'),
(10, 8, '2023');

--
-- Indexuri pentru tabele eliminate
--

--
-- Indexuri pentru tabele `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id_appointments`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_tehnician` (`id_tehnician`),
  ADD KEY `id_service` (`id_service`);

--
-- Indexuri pentru tabele `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id_cart`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `quantity` (`quantity`),
  ADD KEY `price_total` (`price_total`),
  ADD KEY `quantity_2` (`quantity`);

--
-- Indexuri pentru tabele `city_courses`
--
ALTER TABLE `city_courses`
  ADD PRIMARY KEY (`id_c`),
  ADD KEY `id_year` (`id_year`);

--
-- Indexuri pentru tabele `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexuri pentru tabele `date_courses`
--
ALTER TABLE `date_courses`
  ADD PRIMARY KEY (`id_d`),
  ADD KEY `id_city` (`id_city`);

--
-- Indexuri pentru tabele `delivery_methods`
--
ALTER TABLE `delivery_methods`
  ADD PRIMARY KEY (`id_delivery`);

--
-- Indexuri pentru tabele `newsletter`
--
ALTER TABLE `newsletter`
  ADD PRIMARY KEY (`id_newsletter`);

--
-- Indexuri pentru tabele `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id_order`);

--
-- Indexuri pentru tabele `orders_products`
--
ALTER TABLE `orders_products`
  ADD KEY `id_order` (`id_order`),
  ADD KEY `id_product` (`id_product`);

--
-- Indexuri pentru tabele `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_subcategory` (`id_category`),
  ADD KEY `id_subcategory_2` (`id_category`),
  ADD KEY `id_brand` (`id_brand`);

--
-- Indexuri pentru tabele `products_brand`
--
ALTER TABLE `products_brand`
  ADD PRIMARY KEY (`id_brand`);

--
-- Indexuri pentru tabele `products_category`
--
ALTER TABLE `products_category`
  ADD PRIMARY KEY (`id_category`);

--
-- Indexuri pentru tabele `products_subcategory`
--
ALTER TABLE `products_subcategory`
  ADD PRIMARY KEY (`id_subcategory`),
  ADD KEY `id_category` (`id_category`);

--
-- Indexuri pentru tabele `register`
--
ALTER TABLE `register`
  ADD PRIMARY KEY (`id`);

--
-- Indexuri pentru tabele `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id_review`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_product` (`id_product`);

--
-- Indexuri pentru tabele `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id_service`),
  ADD KEY `id_category` (`id_category`);

--
-- Indexuri pentru tabele `services_category`
--
ALTER TABLE `services_category`
  ADD PRIMARY KEY (`id_category`);

--
-- Indexuri pentru tabele `tehnicians`
--
ALTER TABLE `tehnicians`
  ADD PRIMARY KEY (`id_tehnician`);

--
-- Indexuri pentru tabele `tehnician_details`
--
ALTER TABLE `tehnician_details`
  ADD PRIMARY KEY (`id_tehnician`);

--
-- Indexuri pentru tabele `tehnician_services`
--
ALTER TABLE `tehnician_services`
  ADD KEY `id_tehnician` (`id_tehnician`),
  ADD KEY `id_service` (`id_service`);

--
-- Indexuri pentru tabele `tehnician_services_category`
--
ALTER TABLE `tehnician_services_category`
  ADD KEY `id_tehnician` (`id_tehnician`),
  ADD KEY `id_service` (`id_service`);

--
-- Indexuri pentru tabele `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`id_voucher`);

--
-- Indexuri pentru tabele `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id_wishlist`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexuri pentru tabele `year_courses`
--
ALTER TABLE `year_courses`
  ADD PRIMARY KEY (`id_y`),
  ADD KEY `id_course` (`id_course`);

--
-- AUTO_INCREMENT pentru tabele eliminate
--

--
-- AUTO_INCREMENT pentru tabele `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id_appointments` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT pentru tabele `cart`
--
ALTER TABLE `cart`
  MODIFY `id_cart` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=169;

--
-- AUTO_INCREMENT pentru tabele `city_courses`
--
ALTER TABLE `city_courses`
  MODIFY `id_c` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pentru tabele `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pentru tabele `date_courses`
--
ALTER TABLE `date_courses`
  MODIFY `id_d` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pentru tabele `delivery_methods`
--
ALTER TABLE `delivery_methods`
  MODIFY `id_delivery` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pentru tabele `newsletter`
--
ALTER TABLE `newsletter`
  MODIFY `id_newsletter` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pentru tabele `orders`
--
ALTER TABLE `orders`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT pentru tabele `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT pentru tabele `products_brand`
--
ALTER TABLE `products_brand`
  MODIFY `id_brand` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pentru tabele `products_category`
--
ALTER TABLE `products_category`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pentru tabele `products_subcategory`
--
ALTER TABLE `products_subcategory`
  MODIFY `id_subcategory` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pentru tabele `register`
--
ALTER TABLE `register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pentru tabele `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id_review` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT pentru tabele `service`
--
ALTER TABLE `service`
  MODIFY `id_service` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pentru tabele `services_category`
--
ALTER TABLE `services_category`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pentru tabele `tehnicians`
--
ALTER TABLE `tehnicians`
  MODIFY `id_tehnician` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pentru tabele `tehnician_details`
--
ALTER TABLE `tehnician_details`
  MODIFY `id_tehnician` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pentru tabele `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `id_voucher` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pentru tabele `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id_wishlist` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=318;

--
-- AUTO_INCREMENT pentru tabele `year_courses`
--
ALTER TABLE `year_courses`
  MODIFY `id_y` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constrângeri pentru tabele eliminate
--

--
-- Constrângeri pentru tabele `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `register` (`id`),
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`id_tehnician`) REFERENCES `tehnicians` (`id_tehnician`),
  ADD CONSTRAINT `appointments_ibfk_3` FOREIGN KEY (`id_service`) REFERENCES `service` (`id_service`);

--
-- Constrângeri pentru tabele `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `register` (`id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`);

--
-- Constrângeri pentru tabele `city_courses`
--
ALTER TABLE `city_courses`
  ADD CONSTRAINT `city_courses_ibfk_1` FOREIGN KEY (`id_year`) REFERENCES `year_courses` (`id_y`);

--
-- Constrângeri pentru tabele `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`id`) REFERENCES `year_courses` (`id_course`);

--
-- Constrângeri pentru tabele `date_courses`
--
ALTER TABLE `date_courses`
  ADD CONSTRAINT `date_courses_ibfk_1` FOREIGN KEY (`id_city`) REFERENCES `city_courses` (`id_c`);

--
-- Constrângeri pentru tabele `orders_products`
--
ALTER TABLE `orders_products`
  ADD CONSTRAINT `orders_products_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`);

--
-- Constrângeri pentru tabele `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `products_category` (`id_category`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`id_brand`) REFERENCES `products_brand` (`id_brand`);

--
-- Constrângeri pentru tabele `products_subcategory`
--
ALTER TABLE `products_subcategory`
  ADD CONSTRAINT `products_subcategory_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `products_category` (`id_category`);

--
-- Constrângeri pentru tabele `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `register` (`id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`);

--
-- Constrângeri pentru tabele `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `service_ibfk_1` FOREIGN KEY (`id_service`) REFERENCES `tehnician_services` (`id_service`);

--
-- Constrângeri pentru tabele `services_category`
--
ALTER TABLE `services_category`
  ADD CONSTRAINT `services_category_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `service` (`id_category`);

--
-- Constrângeri pentru tabele `tehnician_details`
--
ALTER TABLE `tehnician_details`
  ADD CONSTRAINT `tehnician_details_ibfk_1` FOREIGN KEY (`id_tehnician`) REFERENCES `tehnicians` (`id_tehnician`);

--
-- Constrângeri pentru tabele `tehnician_services`
--
ALTER TABLE `tehnician_services`
  ADD CONSTRAINT `tehnician_services_ibfk_1` FOREIGN KEY (`id_tehnician`) REFERENCES `tehnician_details` (`id_tehnician`);

--
-- Constrângeri pentru tabele `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `register` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
