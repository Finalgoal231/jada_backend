import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/keys";

export const genToken = ({ payload, expiresIn, callback }) => {
    jwt.sign(payload, JWT_SECRET, { expiresIn }, (err, token) => {
        if (err) console.log(err);
        callback(token);
    });
};
