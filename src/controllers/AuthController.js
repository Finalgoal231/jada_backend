import { compareSync, hashSync } from "bcryptjs";
import { knex } from "../config/db";
import { genToken } from "../utils/genToken";
import randomstring from "randomstring";
const table = "users";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await knex(table).where("email", email).first();
    if (!user) {
      return res.json({ message: "not_found" });
    } else if (user.deleted) {
      return res.json({ message: "user_closed" });
    }
    const isMatch = compareSync(password, user.password);
    if (isMatch) {
      const payload = {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        avatar: user.avatar,
        loginSuccess: true,
        otpEnabled: user.otp_enabled,
      };
      genToken({
        payload,
        expiresIn: 3600 * 24,
        callback: (token) => {
          return res.json({
            message: "login_success",
            token: "Bearer " + token,
            loginSuccess: true,
            otpEnabled: user.otp_enabled,
          });
        },
      });
    } else {
      return res.json({ message: "password_err" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const register = async (req, res) => {
  try {
    const { email, password, fullname } = req.body;
    const rid = randomstring.generate();
    const user = await knex(table).where("email", email).first();
    if (user) {
      return res.json({ message: "user_exist" });
    } else {
      const pwd = hashSync(password, 10);
      await knex(table).insert({
        id: rid,
        email,
        password: pwd,
        fullname,
      });
      return res.json({ message: "register_success" });
    }
  } catch (error) {
    console.log(error);
  }
};
