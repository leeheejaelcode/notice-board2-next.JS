// 이름 정규식
export const NAME_REG = /^[가-힣a-zA-Z0-9]{2,8}$/;
// 이메일 정규식
export const EMAIL_REG =
  /^(?=.*[0-9a-zA-Z].{2,})[0-9a-zA-Z]{3,}@[a-zA-Z]+\.[a-zA-Z]{2,3}$/;
// 핸드폰번호 정규식
export const PHONENUMBER_REG = /^0\d{10}$/;
// 비밀번호 정규식
export const PASSWORD_REG =
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>?/-]{8,}$/;
