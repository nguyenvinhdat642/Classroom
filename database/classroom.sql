-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th12 07, 2023 lúc 05:09 AM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `classroom`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `adminnotifications`
--

CREATE TABLE `adminnotifications` (
  `notificationID` int(11) NOT NULL,
  `userID` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `noi_dung` text DEFAULT NULL,
  `ngay_tao` date DEFAULT NULL,
  `loai_thong_bao` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `announcements`
--

CREATE TABLE `announcements` (
  `announcementID` int(11) NOT NULL,
  `courseID` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `noi_dung` text DEFAULT NULL,
  `ngay_dang` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `assignments`
--

CREATE TABLE `assignments` (
  `assignmentID` int(11) NOT NULL,
  `courseID` int(11) DEFAULT NULL,
  `assignmentName` varchar(255) NOT NULL,
  `deadline` date DEFAULT NULL,
  `ngay_tao` date DEFAULT NULL,
  `content` text DEFAULT NULL,
  `documentPath` varchar(255) DEFAULT NULL,
  `userID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `assignments`
--

INSERT INTO `assignments` (`assignmentID`, `courseID`, `assignmentName`, `deadline`, `ngay_tao`, `content`, `documentPath`, `userID`) VALUES
(1, 1, 'học làm  giàu part1', '2023-12-09', NULL, 'asdad', 'D:\\Classroom\\public\\files\\1\\luphi2158@gmail.com\\52000642_Lab01.docx', 3),
(2, 3, 'chat box', '2023-12-09', NULL, 'asdafa', 'D:\\Classroom\\public\\files\\3\\luphi2158@gmail.com\\52000642_Lab01.docx', 3),
(3, 3, 'chat box 2', '2023-12-10', NULL, 'asdafa', 'D:\\Classroom\\public\\files\\3\\luphi2158@gmail.com\\52000642_Lab01.docx', 3),
(4, 3, 'chat bot 3', '2023-12-22', NULL, 'asdaf', 'D:\\Classroom\\public\\files\\3\\luphi2158@gmail.com\\tb-dkmh-hk1-2023-2024--cq_bskhoa27-(20230915_054146_485).doc', 3),
(5, 1, 'học làm  giàu part 2', '2023-12-09', NULL, 'asdaf', 'D:\\Classroom\\public\\files\\1\\luphi2158@gmail.com\\52000642_Lab01.docx', 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `courses`
--

CREATE TABLE `courses` (
  `courseID` int(11) NOT NULL,
  `courseName` varchar(255) NOT NULL,
  `teacherID` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `bai_tap` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `courses`
--

INSERT INTO `courses` (`courseID`, `courseName`, `teacherID`, `description`, `bai_tap`, `image`, `content`) VALUES
(1, 'học làm  giàu', 3, 'asda', '', '1701850949138-381172105_1090258635691103_1132138287470103672_n.png', NULL),
(3, 'Write A ChatGPT Chatbot With Node.js', 3, 'In this video we will build an AI chatbot from scratch using Node.js, the OpenAI library and the ChatGPT API.', '', '1701853156848-hq720.jpg', '<iframe width=\"935\" height=\"526\" src=\"https://www.youtube.com/embed/1YU83Lw58eo\" title=\"Write A ChatGPT Chatbot With Node.js\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>'),
(4, 'Sự Thật Về Drama Kyenn (ft. @hoagenius )', 3, 'Tóm tắt hacker: \r\nHack tố cáo hack nhưng thằng tố cáo hack lại bị chửi ngu hơn cả thằng hack, nhưng thằng tố cáo hack lại chứng tỏ mình không hack và sĩ gái nên ko chịu nhận mình hack, check đi check lại thì thằng hack lại còn đc khen hơn cả thằng tố cáo hack.', '', '1701873025062-hq720 (1).jpg', '<iframe width=\"935\" height=\"526\" src=\"https://www.youtube.com/embed/RN4tYj9xsZk\" title=\"Sự Thật Về Drama Kyenn (ft. @hoagenius )\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>'),
(5, 'Đi ăn TRỨNG, mới đổi VJ nên chúng tôi hơi lệch sóng | Cạn Ví', 3, '\r\n61.818 lượt xem  Đã công chiếu 14 giờ trước\r\nHỢP TÁC MỜI LIÊN HỆ:\r\nEmail: partners.98smedia@gmail.com\r\nZalo: 0349585580 (Thủy Trần)\r\nHết tiền nên chúng tôi đi ăn TRỨNG | Cạn Ví', '', '1701914699618-hq720.jpg', 'Đi ăn TRỨNG, mới đổi VJ nên chúng tôi hơi lệch sóng | Cạn Ví\r\n\r\n<iframe width=\"935\" height=\"526\" src=\"https://www.youtube.com/embed/MdRxh2RYbQo\" title=\"Đi ăn TRỨNG, mới đổi VJ nên chúng tôi hơi lệch sóng | Cạn Ví\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `discussions`
--

CREATE TABLE `discussions` (
  `discussionID` int(11) NOT NULL,
  `courseID` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `noi_dung` text DEFAULT NULL,
  `ngay_tao` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `discussion_users`
--

CREATE TABLE `discussion_users` (
  `discussionID` int(11) DEFAULT NULL,
  `userID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `enrollments`
--

CREATE TABLE `enrollments` (
  `enrollmentID` int(11) NOT NULL,
  `courseID` int(11) DEFAULT NULL,
  `studentID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `enrollments`
--

INSERT INTO `enrollments` (`enrollmentID`, `courseID`, `studentID`) VALUES
(3, 3, 4),
(4, 1, 4),
(5, 4, 4),
(6, 5, 4);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `grades`
--

CREATE TABLE `grades` (
  `gradeID` int(11) NOT NULL,
  `courseID` int(11) DEFAULT NULL,
  `studentID` int(11) DEFAULT NULL,
  `assignmentID` int(11) DEFAULT NULL,
  `diem_so` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `instructors`
--

CREATE TABLE `instructors` (
  `instructorID` int(11) NOT NULL,
  `userID` int(11) DEFAULT NULL,
  `noi_dung_giang_vien` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lectures`
--

CREATE TABLE `lectures` (
  `lectureID` int(11) NOT NULL,
  `courseID` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `noi_dung` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `schedules`
--

CREATE TABLE `schedules` (
  `scheduleID` int(11) NOT NULL,
  `courseID` int(11) DEFAULT NULL,
  `ngay_hoc` date DEFAULT NULL,
  `gio_hoc` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `submissions`
--

CREATE TABLE `submissions` (
  `submissionID` int(11) NOT NULL,
  `assignmentID` int(11) DEFAULT NULL,
  `studentID` int(11) DEFAULT NULL,
  `noi_dung` text DEFAULT NULL,
  `ngay_nop` date DEFAULT NULL,
  `diem_so` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`userID`, `password`, `email`, `role`) VALUES
(1, 'password123', 'user1@example.com', 'user'),
(2, '$2b$10$8UwpW22Vn5I1vsBBzn5sLu95D68IK0lKC5HSjlK6rJNurOhoDqHfO', 'nguyenvinhdat12a2@gmail.com', 'admin'),
(3, '$2b$10$uQf1xnVLk92Zx3mKffJOdet1TXBdwHrbFh4c99Rt/s8ZzNfAFVVSS', 'luphi2158@gmail.com', 'teacher'),
(4, '$2b$10$hGqWyn23Zd2W4qGWXQf//ulf.sCFesK4B5OOH0W2IaKLQfhsCtkpS', 'vinhdatgg09@gmail.com', 'user');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `adminnotifications`
--
ALTER TABLE `adminnotifications`
  ADD PRIMARY KEY (`notificationID`),
  ADD KEY `userID` (`userID`);

--
-- Chỉ mục cho bảng `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`announcementID`),
  ADD KEY `courseID` (`courseID`);

--
-- Chỉ mục cho bảng `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`assignmentID`),
  ADD KEY `courseID` (`courseID`);

--
-- Chỉ mục cho bảng `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`courseID`),
  ADD KEY `teacherID` (`teacherID`);

--
-- Chỉ mục cho bảng `discussions`
--
ALTER TABLE `discussions`
  ADD PRIMARY KEY (`discussionID`),
  ADD KEY `courseID` (`courseID`);

--
-- Chỉ mục cho bảng `discussion_users`
--
ALTER TABLE `discussion_users`
  ADD KEY `discussionID` (`discussionID`),
  ADD KEY `userID` (`userID`);

--
-- Chỉ mục cho bảng `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`enrollmentID`),
  ADD KEY `courseID` (`courseID`),
  ADD KEY `studentID` (`studentID`);

--
-- Chỉ mục cho bảng `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`gradeID`),
  ADD KEY `courseID` (`courseID`),
  ADD KEY `studentID` (`studentID`),
  ADD KEY `assignmentID` (`assignmentID`);

--
-- Chỉ mục cho bảng `instructors`
--
ALTER TABLE `instructors`
  ADD PRIMARY KEY (`instructorID`),
  ADD KEY `userID` (`userID`);

--
-- Chỉ mục cho bảng `lectures`
--
ALTER TABLE `lectures`
  ADD PRIMARY KEY (`lectureID`),
  ADD KEY `courseID` (`courseID`);

--
-- Chỉ mục cho bảng `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`scheduleID`),
  ADD KEY `courseID` (`courseID`);

--
-- Chỉ mục cho bảng `submissions`
--
ALTER TABLE `submissions`
  ADD PRIMARY KEY (`submissionID`),
  ADD KEY `assignmentID` (`assignmentID`),
  ADD KEY `studentID` (`studentID`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `adminnotifications`
--
ALTER TABLE `adminnotifications`
  MODIFY `notificationID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `announcements`
--
ALTER TABLE `announcements`
  MODIFY `announcementID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `assignments`
--
ALTER TABLE `assignments`
  MODIFY `assignmentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `courses`
--
ALTER TABLE `courses`
  MODIFY `courseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `discussions`
--
ALTER TABLE `discussions`
  MODIFY `discussionID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `enrollmentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `grades`
--
ALTER TABLE `grades`
  MODIFY `gradeID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `instructors`
--
ALTER TABLE `instructors`
  MODIFY `instructorID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `lectures`
--
ALTER TABLE `lectures`
  MODIFY `lectureID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `schedules`
--
ALTER TABLE `schedules`
  MODIFY `scheduleID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `submissions`
--
ALTER TABLE `submissions`
  MODIFY `submissionID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `adminnotifications`
--
ALTER TABLE `adminnotifications`
  ADD CONSTRAINT `adminnotifications_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`);

--
-- Các ràng buộc cho bảng `announcements`
--
ALTER TABLE `announcements`
  ADD CONSTRAINT `announcements_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `courses` (`courseID`);

--
-- Các ràng buộc cho bảng `assignments`
--
ALTER TABLE `assignments`
  ADD CONSTRAINT `assignments_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `courses` (`courseID`);

--
-- Các ràng buộc cho bảng `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`teacherID`) REFERENCES `users` (`userID`);

--
-- Các ràng buộc cho bảng `discussions`
--
ALTER TABLE `discussions`
  ADD CONSTRAINT `discussions_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `courses` (`courseID`);

--
-- Các ràng buộc cho bảng `discussion_users`
--
ALTER TABLE `discussion_users`
  ADD CONSTRAINT `discussion_users_ibfk_1` FOREIGN KEY (`discussionID`) REFERENCES `discussions` (`discussionID`),
  ADD CONSTRAINT `discussion_users_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`);

--
-- Các ràng buộc cho bảng `enrollments`
--
ALTER TABLE `enrollments`
  ADD CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `courses` (`courseID`),
  ADD CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`studentID`) REFERENCES `users` (`userID`);

--
-- Các ràng buộc cho bảng `grades`
--
ALTER TABLE `grades`
  ADD CONSTRAINT `grades_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `courses` (`courseID`),
  ADD CONSTRAINT `grades_ibfk_2` FOREIGN KEY (`studentID`) REFERENCES `users` (`userID`),
  ADD CONSTRAINT `grades_ibfk_3` FOREIGN KEY (`assignmentID`) REFERENCES `assignments` (`assignmentID`);

--
-- Các ràng buộc cho bảng `instructors`
--
ALTER TABLE `instructors`
  ADD CONSTRAINT `instructors_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`);

--
-- Các ràng buộc cho bảng `lectures`
--
ALTER TABLE `lectures`
  ADD CONSTRAINT `lectures_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `courses` (`courseID`);

--
-- Các ràng buộc cho bảng `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `courses` (`courseID`);

--
-- Các ràng buộc cho bảng `submissions`
--
ALTER TABLE `submissions`
  ADD CONSTRAINT `submissions_ibfk_1` FOREIGN KEY (`assignmentID`) REFERENCES `assignments` (`assignmentID`),
  ADD CONSTRAINT `submissions_ibfk_2` FOREIGN KEY (`studentID`) REFERENCES `users` (`userID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;