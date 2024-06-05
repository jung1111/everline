import * as repository from "../repository/memberRepository.js";
import nodemailer from "nodemailer";
import crypto from "crypto";

/* login 처리 */

export const getLogin = async (req, res) => {
  const { userId, userPass } = req.body;
  const result = await repository.getLogin(userId, userPass);

  res.json(result);
  res.end();
};

/* id 중복체크 */
export const getIdCheck = async (req, res) => {
  const { userId } = req.body; // POST로 받으면 body로
  const result = await repository.getIdCheck(userId);
  res.json(result);
  res.end();
};

/* sign up */
export const getSignup = async (req, res) => {
  const formData = req.body;
  const result = await repository.getSignup(formData);
  res.json(result);
  res.end();
};

export const findUserId = async (req, res) => {
  const { userName, mobileNumber1, mobileNumber2 } = req.body;
  const result = await repository.findUserId(
    userName,
    mobileNumber1,
    mobileNumber2
  ); // 수정된 부분
  res.json(result);
};

export const findUserPs = async (req, res) => {
  const { userName, userId } = req.body;
  console.log(req.body);
  const result = await repository.findUserPs(userId, userName); // 수정된 부분
  res.json(result);
};

export const sendAuthCode = async (req, res) => {
  const { email } = req.body;
  const authCode = crypto.randomBytes(3).toString("hex"); // 인증번호 생성

  // 이메일 전송 설정
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "mingongjuw@gmail.com",
      pass: "mingongjuw06",
    },
  });

  const mailOptions = {
    from: "record609@naver.com",
    to: email,
    subject: "인증번호",
    text: `인증번호는 ${authCode} 입니다.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ authCode });
  } catch (error) {
    res.status(500).json({ error: "인증번호 전송에 실패했습니다." });
  }
};
