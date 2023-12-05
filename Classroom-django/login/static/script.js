function validatePassword(event) {
  event.preventDefault();

  // Lấy giá trị của mật khẩu và mật khẩu xác nhận
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;

  // Lấy đối tượng hiển thị thông báo lỗi
  var passwordError = document.getElementById("password-error");

  // Kiểm tra độ dài mật khẩu
  if (password.length < 8) {
    passwordError.textContent = "Password should be at least 8 characters long.";
  } else if (password === confirmPassword) {
    // Kiểm tra mật khẩu và mật khẩu xác nhận
    passwordError.textContent = "";
    alert("Passwords match! You can proceed with signup.");
  } else {
    passwordError.textContent = "Passwords do not match. Please try again.";
  }
}

function sendOTP() {
  // Tạo mã OTP ngẫu nhiên (đơn giản cho mục đích minh họa)
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Gửi mã OTP đến người dùng (ví dụ: in ra màn hình)
  alert(`OTP Sent: ${otp}`);

  // Lưu mã OTP để sử dụng khi xác nhận
  localStorage.setItem('otp', otp);
}

function verifyOTP() {
  // Lấy mã OTP đã lưu
  const storedOTP = localStorage.getItem('otp');

  // Lấy mã OTP nhập từ người dùng
  const enteredOTP = document.getElementById('otpInput').value;

  // So sánh mã OTP
  if (storedOTP === enteredOTP) {
    alert('OTP Verified Successfully!');
  } else {
    alert('Invalid OTP. Please try again.');
  }
}
