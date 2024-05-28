import * as repository from "../repository/memberRepository.js";

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
